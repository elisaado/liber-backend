import debug from 'debug';
import app from './router';

const log = debug('index');

app.listen(3000, () => {
    log("Listening on port 3000");
});
