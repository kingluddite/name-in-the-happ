export function testThis() {
  console.log('yo from helper');
}

export function testTwo() {
  console.log('another test');
}

export function randomArrItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
