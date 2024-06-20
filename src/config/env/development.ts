import { configDotenv } from 'dotenv';
configDotenv();

const development = { ...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,};

export default development;
