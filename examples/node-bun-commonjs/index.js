const { reverser } = require('shorturl-reverser');

async function example() {
  const url = 'tinyurl.com/4hfst357';
  const result = await reverser(url);
  console.log(result);
}

example();