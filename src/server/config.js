const path=require('path');
const exphbsrequire('express-handlebars');


module.exports = (app) =>{

    //settings
    app.set('port', process.env.PORT || 3000);
    app.set('views',path.join(__dirname,'views'));
    app.engine('.hbs', exphbs({
        defaultLayout:'main',
        partialsDir:path.join(app.get('views'),'partials'),
        layoutsDir:path.join(app.get('views'),('layouts')),
        extname:'.hbs',
        helpers:require('./helpers')
    }));

    app.set('view engine','hbs');
    //middlewares

    //routes
    return app;
}