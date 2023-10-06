import express from 'express';
import nunjucks from 'nunjucks';

const app = express();
const PORT = 8080;

app.use('/assets', express.static('node_modules/govuk-frontend/govuk/assets'));

app.use([
    express.json(),
    express.urlencoded({extended: true}),
    express.static('public')
])

nunjucks.configure([
    "node_modules/govuk-frontend/",
    "views"
], {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})