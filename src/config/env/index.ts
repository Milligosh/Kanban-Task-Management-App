import { configDotenv } from 'dotenv';
import development from './development';
import test from './test';

configDotenv();



export default {
  development: {...development },
  test: {...test },
}[process.env.NODE_ENV || 'development'];
