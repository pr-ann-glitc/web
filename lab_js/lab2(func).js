//Вернуть число в обратном порядке 123 -> 321
function reverseNumber(number) {
    let returnNumber = 0;
    let orig = Math.abs(number);
    while (orig > 0) {
        returnNumber = orig % 10 + returnNumber * 10;
        orig = Math.floor(orig / 10);
    }
    return returnNumber;
}
console.log(reverseNumber(123))

//Вернуть число без повторяющихся цифр 111333456 -> 13456
function deleteRepeats(number) {
    const numberArray = String(Math.abs(number)).split('');
    let stringResult = '';
    // numberArray.forEach(element => {
    //     if (!stringResult.includes(element)) {
    //         stringResult += element;
    //     }         
    // });
    for (let num of numberArray) {
        if (!stringResult.includes(num)) {
            stringResult += num;
        }
    }
    return Number(stringResult);
}
console.log(deleteRepeats(111333456))

//Посчитать, сколько раз в данном числе встречается данная цифра (1355567, 5) -> 3
function findRepeats(number, element) {
    const numberArray = String(Math.abs(number)).split('');
    let res = 0;
    for (let num of numberArray) {
        if (num == element) {
            res++;
        }
    }
    return res;
}
console.log(findRepeats(1355567, 5))

//Посчитать самую длинную последовательность нулей/единиц в двоичной записи данного числа
function lengthNull(number, a) {
    const numberSecond = number.toString(2);
    let maxL = 0;
    let curL = 0;
    for (let i = 0; i < numberSecond.length; i++) {
        if (numberSecond[i] == a) {
            curL++;
            maxL = Math.max(maxL, curL);
        } else {
            curL = 0
        }
    }
    return maxL;
}
console.log(lengthNull(124, 1));


//2
//Найти самый первый неповторяющийся символ в строке
function firstNoRepeat(userString) {
    const str = String(userString).toLowerCase();
    for (let i = 0; i < str.length; i++) {
        const currentChar = str[i];
        if (str.indexOf(currentChar) === str.lastIndexOf(currentChar)) {
            return currentChar;
        }
    }
    return null; 
}
console.log(firstNoRepeat('фыфвавЫпрс'));

// Cгенерировать строку заданной длины из случайных символов, взятых из набора английскийх букв и цифр: (5) -> '2fvg6'
function generateString(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * alphabet.length);
        result += alphabet[randomIndex];
    }
    return result;
}
console.log(generateString(6))

// Вернуть только уникальные символы строки: 'позволяеткопироватьтекстиз' -> 'позвляеткираьс'
function unicString(userString) {
    const numberArray = String(userString).split('');
    let stringResult = '';
    numberArray.forEach(element => {
        if (!stringResult.includes(element)) {
            stringResult += element;
        }         
    });
    return stringResult;
}
console.log(unicString('позволяеткопироватьтекстиз'));