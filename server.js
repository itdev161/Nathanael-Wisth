import express from 'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';

//start express app
const app = express();

//connect database
connectDatabase();

//configure express
app.use(express.json({extended: false}));

app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

app.post(
    '/api/users',
    [
        check('name', 'Please enter your name').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }else{
            res.send(req.body);
        }
})

app.listen(3000, () => console.log('Express server running on port 3000'));