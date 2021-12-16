import express from 'express';
import Router from './routes/route.js'
const app = express();
const PORT = 5000;

app.use('/api', Router)

app.listen(5000, () => console.log(`Server is running on port: http://localhost:${PORT}`))