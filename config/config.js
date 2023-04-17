require('dotenv').config();

const {
  PORT = 3000,
  URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'jwt_secret',
} = process.env;

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_CONFLICT = 409;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

const errMsgs = {
  badData: 'Incorrect data passed.',
  badToken: 'Bad Token.',
  badUrl: 'Bad URL.',
  badRoute: 'Lost your way?',
  conflictEmail: 'User with the same email alrealy exists.',
  badEmailPsw: 'Either email or password is/are wrong.',
  badId: 'Wrong user ID.',
  movNotFound: 'Movie not found.',
  noRightsMovRm: 'You may only remove your own movies.',
};

const resMsg = {
  signOutSuccess: 'Signed out!',
  movRmSuccess: 'Movie was deleted successfully.',

};

module.exports = {
  PORT,
  URL,
  JWT_SECRET,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
  errMsgs,
  resMsg,
};
