import express from 'express';
import connectDatabase from './config/db';

//start express app
const app = express();

//connect database
connectDatabase();

//configure express
app.use(express.json({extended: false}));

app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

app.post('/api/users', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.listen(3000, () => console.log('Express server running on port 3000'));