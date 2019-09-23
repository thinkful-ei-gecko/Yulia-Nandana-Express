const express = require('express');
const morgan = require('morgan');

const app = express();

//middlewear
app.use(morgan('dev'));

app.get('/sum',(req,res)=>{
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.send(`The sum of a and b is ${a+b}`);
});

app.listen(8000,() => console.log('server running on 8000'));