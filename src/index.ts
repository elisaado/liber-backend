import express from 'express'
import debug from 'debug';
import router from './router';

const log = debug('index');
const app = express()

app.use(express.json())
app.use('/api', router)

app.listen(3000, () => {
  log("Listening on port 3000");
});
