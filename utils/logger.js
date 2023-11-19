import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import useragent from 'useragent';
import isbot from 'isbot';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, '../logs/logs.json'); // Adjust the path as needed


function logRequest(req, res, next) {
	const agent = useragent.parse(req.headers['user-agent']);
	const isBot = isbot(req.headers['user-agent']);

	const logEntry = {
		timestamp: new Date().toISOString(),
		ip: req.ip,
		url: req.originalUrl,
		method: req.method,
		userAgent: req.headers['user-agent'],
		os: agent.os.toString(),  // Operating System
		browser: agent.toAgent(), // Browser
		isBot: isBot             // Whether the visitor is a bot
	};


	// Append log entry to the file
	fs.readFile(logFilePath, (err, data) => {
		if (err && err.code === 'ENOENT') {
			// If the file doesn't exist, create it with the first log entry
			return fs.writeFile(logFilePath, JSON.stringify([logEntry], null, 2), err => {
				if (err) console.error(err);
			});
		} else if (data) {
			// If the file exists, append the log entry
			const logs = JSON.parse(data.toString());
			logs.push(logEntry);
			fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), err => {
				if (err) console.error(err);
			});
		}
	});

	next();
}

export default logRequest;
