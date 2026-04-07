//1
// Объявите две переменные: admin и name. Запишите строку "Джон" в переменную name.
// Скопируйте значение из переменной name в admin. Выведите на экран значение admin, используя функцию alert (должна показать «Джон»).
let admin, firstName;
firstName = "John";
admin = firstName;
console.log(admin)

//2
let a = prompt("Первое число?", 1);
let b = prompt("Второе число?", 2);

alert(Number(a) + Number(b)); 

//3
//При помощи цикла for выведите чётные числа от 2 до 10.
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
// Напишите цикл, который предлагает prompt ввести число, большее 100. Если посетитель ввёл другое число – попросить ввести ещё раз, и так далее.
// Цикл должен спрашивать число пока либо посетитель не введёт число, большее 100, либо не нажмёт кнопку Отмена (ESC).
let userNumber = prompt("введите число больше 100!: ");
while (userNumber < 100 && userNumber !== null) {
    userNumber = prompt("введите число больше 100!: ")
}
alert("userNumber = " + userNumber)

//6
// Напишите код, который выводит все простые числа из интервала от 2 до n
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
for (let i = 2; i < n; i++) {
    if (isPrime(i)) 
        console.log(i)
}