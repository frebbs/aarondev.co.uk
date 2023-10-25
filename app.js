import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use([
    express.json(),
    express.urlencoded({extended: true}),
    express.static('public')
])

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})