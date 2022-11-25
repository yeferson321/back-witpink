import app from './app.js';

// settings
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);

/* Starting the server. */
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})