const express = require('express');
const routerApi = require('./routes/index.routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);
app.use(logErrors); //tiene q ir despues de router api
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('app on port ' + port);
});
