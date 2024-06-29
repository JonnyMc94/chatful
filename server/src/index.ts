import { config } from 'dotenv';
config({ path: './.env.local' });

import app from './app';
const port = process.env.SERVER_PORT || 3000;

console.log('Environment Variables:');
console.log('HOST:', process.env.HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('USER:', process.env.USER);
console.log('PASSWORD:', process.env.PASSWORD);
console.log('DATABASE:', process.env.DATABASE);
console.log('SERVER_PORT:', process.env.SERVER_PORT);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
