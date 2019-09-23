
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

app.get('/lotto',(req,res)=>{
  const numbers  = req.query.numbers;
  let randomNumArray=[];
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
  for(let i=0; i<6;i++){
    randomNumArray.push(getRandomIntInclusive(1,20));
  }

  function compareArray(array1, array2) {
    const count=0;
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array2[j] == array1[i]) {
          count= count+1;
        }
      }
    }
    return count;
  }
  const matchedNumbers=compareArray(numbers,randomNumArray);
  let message='';
  if(matchedNumbers<4){
    message = 'Sorry ,you loose';
  }
  if(matchedNumbers===4){
    message='Congratulations, you win a free ticket';
  }
  if(matchedNumbers===5){
    message='Congratulations! You win $100!';

  }
  if(matchedNumbers===6){
    message= 'Wow! Unbelievable! You could have won the mega millions!';
  }
  console.log(randomNumArray);
  res.send(message);
});

app.listen(8080,() => console.log('server running on 8000'));