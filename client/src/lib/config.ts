import 'dotenv/config';

const config = {
  host: process.env.REACT_APP_HOST,
  stage: process.env.REACT_APP_STAGE,
  databaseURL: process.env.REACT_APP_DB_URI,
};

export default config;
