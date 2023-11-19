
const rootController_GET = {
    root: (req, res) => {
        res.render('home');
    },
    contact: (req, res) => {
        res.render('contact');
    },
    about: (req, res) => {
        res.render('about');
    }
}

const rootController_POST = {
//     TODO: Add POST method
}

export {rootController_GET, rootController_POST};