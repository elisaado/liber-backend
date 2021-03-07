import app from './router';
var debug = require('debug')('index');

app.listen(3000, () => {
    debug("Listening on port 3000");
});
