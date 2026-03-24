import express from 'express';
import dbConnection from './config/db.js';

dbConnection();

const app = express()

app.get('/',(req, resp) => {
    resp.send('API is running')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`server started on port ${PORT}`));