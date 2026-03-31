//1
let admin, firstName;
firstName = "John";
admin = firstName;
console.log(admin)

//2
let a = prompt("Первое число?", 1);
let b = prompt("Второе число?", 2);

alert(Number(a) + Number(b)); 

//3
for (let i = 1; i < 11; i++) {
    if (i%2 == 0)
        console.log(i);
}

//4
let i = 0;
while (i < 3) {
    console.log( `number ${i}!` );
    i++;
}

//5
let userNumber = prompt("введите число больше 100!: ");
while (userNumber < 100 && userNumber !== null) {
    userNumber = prompt("введите число больше 100!: ")
}
alert("userNumber = " + userNumber)

//6
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

let n = prompt("number: ");
for (let i = 1; i < n; i++) {
    if (isPrime(i)) 
        console.log(i)
}