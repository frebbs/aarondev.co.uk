import express from 'express';
import logRequest from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;

import rootRouter from './routes/rootRouter.js';

app.use([
    logRequest,
    express.json(),
    express.urlencoded({extended: true}),
    express.static('public')
]);

app.set('view engine', 'ejs');

app.use('/', rootRouter);


// 404 Error Handler

app.use((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(404).render('404', { requestedUrl: fullUrl });
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})