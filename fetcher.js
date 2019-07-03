const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const readline = require('readline');

let data;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(args[0], (error, response, body) => {
  data = body;
  if (error) {
    console.log(error);

  } else {
    fs.access(args[1], err => {
      if (err) {
        fs.writeFile(args[1], data, err => {
          if (err) {
            return console.log(err);
          }
          console.log(`Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}`);
          rl.close();
        });
      } else {
        rl.question('File already exists, do you want to overwrite it? Y/N? ', (answer) => {
          if (answer === 'Y' || answer === 'y') {
            fs.writeFile(args[1], data, err => {
              if (err) {
                return console.log(err);
              }
              console.log(`Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}`);
              rl.close();
            });
          } else {
            console.log(`Exit the application!`);
            rl.close();
          }
        });
      }
    });
  }
});



