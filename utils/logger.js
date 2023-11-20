import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import useragent from 'useragent';
import isbot from 'isbot';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, '../logs/logs.json');

function getRealIp(req) {
	// Trust the X-Forwarded-For header, which is set by most proxies
	return req.headers['x-forwarded-for'] || req.ip;
}
function logRequest(req, res, next) {
	const realIp = getRealIp(req);
	const agent = useragent.parse(req.headers['user-agent']);
	const isBot = isbot(req.headers['user-agent']);

	const logEntry = {
		timestamp: new Date().toISOString(),
		ip: realIp,
		url: req.originalUrl,
		method: req.method,
		userAgent: req.headers['user-agent'],
		os: agent.os.toString(),
		browser: agent.toAgent(),
		isBot: isBot
	};

	fs.readFile(logFilePath, (err, data) => {
		let logs = [];

		if (!err && data) {
			try {
				logs = JSON.parse(data.toString());
			} catch (parseErr) {
				console.error("Error parsing logs file:", parseErr);
				// Handle malformed JSON file (e.g., by renaming the corrupted file and starting a new log file)
			}
		}

		logs.push(logEntry);

		fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), writeErr => {
			if (writeErr) console.error(writeErr);
		});
	});

	next();
}

export default logRequest;
