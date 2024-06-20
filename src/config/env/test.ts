import { configDotenv } from 'dotenv';
configDotenv();

const test = {...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,};

export default test;
