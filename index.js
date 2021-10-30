const express = require('express');
const routerApi = require('./routes/index.routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// var corsOptions = {
//   origin: 'https://localhost:8080',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

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
