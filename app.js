const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const initDB = require('./config/db');
const routes = require('./routes/index');

const { URL, PORT } = require('./config/config');
const { initLogging, logErrors, writeRequestLog } = require('./middleware/logging');
const { limiter } = require('./middleware/rateLimiter');

const app = express();

initDB();
initLogging();

// app.use(cors());
app.use(cors({
  origin: 'https://api.lacatastrophe.nomoredomains.monster/movies',
  credentials: true,
}));
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  writeRequestLog(req);
  next();
});

app.use(routes);

// Celebrate validation
app.use(errors());

app.use(logErrors);

app.listen(PORT, () => {
  console.log(`Server is running on\nport: ${PORT}\n url: ${URL}`);
});
