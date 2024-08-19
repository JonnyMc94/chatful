import { config } from 'dotenv';
config({ path: './.env.local' });

import server from './app';
const port = process.env.SERVER_PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
