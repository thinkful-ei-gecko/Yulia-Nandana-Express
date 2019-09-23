'use strict';
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

app.get('/cipher',(req,res)=>{
  const text = req.query.text;
  const shift = req.query.shift;
  let decipher = '';

  function isUpperCase(str) {
    return str === str.toUpperCase();
  }

  for(let i = 0; i < text.length; i++){
    if(isUpperCase(text[i])){
      decipher += String.fromCharCode((text.charCodeAt(i) + shift - 65) % 26 + 65);
    } else {
    //else add lowercase letters
      decipher += String.fromCharCode((text.charCodeAt(i) + shift - 97) % 26 + 97);
    }
  }
  res.send(decipher);
});

app.listen(8000,() => console.log('server running on 8000'));