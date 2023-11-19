import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

import rootRouter from './routes/rootRouter.js';

app.use([
    express.json(),
    express.urlencoded({extended: true}),
    express.static('public')
]);

app.set('view engine', 'ejs');

app.use('/', rootRouter);


// 404 Error Handler

app.use((req, res, next) => {
   res.status(404).render('404', {requestedUrl: req.originalUrl});
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})