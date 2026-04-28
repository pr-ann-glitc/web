//Найти максимальную разницу между элементами массива
const firstArray = [0, 12, 100, 23, -3]
const min = Math.min(...firstArray)
const max = Math.max(...firstArray)
const result1 = max - min;
document.getElementById('array1').textContent ='[' + firstArray.join(', ') + ']'
document.getElementById('result1').textContent = result1

//Вернуть массив без повторяющихся элементов
const secondArray = [0, 12, 12, 0, 12, 100, 23, -3, 13, 12, 23, 0, 0]
let resultArray2 = []
secondArray.forEach(element => {
    if (!resultArray2.includes(element)) {
        resultArray2.push(element)
    }
})
document.getElementById('array2').textContent ='[' + secondArray.join(', ') + ']'
document.getElementById('result2').textContent = '[' + resultArray2.join(', ') + ']'

//Дан массив объектов, вернуть только те, у которых isDone: true
const thirdArray = [
    {id: 1, isDone: true}, 
    {id: 2, isDone: false},
    {id: 3, isDone: true}
]
let resultThirdArray = []
thirdArray.forEach(element => {
    if (element.isDone == true) {
        resultThirdArray.push(element)
    }
})
document.getElementById('array3').textContent =JSON.stringify(thirdArray)
document.getElementById('result3').textContent = JSON.stringify(resultThirdArray)

//Найти элементы массива, которые больше указанного числа
function findGreater(userArray, number) {
    let resultArray = []
    userArray.forEach(element => {
        if (element > number) {
            resultArray.push(element)
        }
    });
    return resultArray
}
const fourthArray = [1, 4, 6, 3, 2]
const fourthNumber = 2
const result4 = findGreater(fourthArray, fourthNumber)
document.getElementById('array4').textContent ='[' + fourthArray.join(', ') + ']'
document.getElementById('num4').textContent = fourthNumber
document.getElementById('result4').textContent = '[' + result4.join(', ') + ']'

//Дан многомерный массив произвольной вложенности. Написать функцию, делающую из него "плоский" массив
const userArray0 = [1, 4, [34, 1, 20], [6, [6, 12, 8], 6]]
function flatArray(userArray) {
    const resultArray = String(userArray).split(',').map(Number)
    return resultArray
}
const flatResult = flatArray(userArray0)
document.getElementById('result5').textContent = '[' + flatResult.join(', ') + ']'

//Найти, сколько есть в массиве пар чисел, дающих в сумме 0
const userArray = [-7, 12, 4, 6, -4, -12, 0]
function pairSumNull(userArray) {
    const countMap = {}
    for (const num of userArray) {
        countMap[num] = (countMap[num] || 0) + 1
    }
    let pairs = 0
    for (const key in countMap) {
        const x = Number(key)
        if (x > 0 && countMap[-x] !== undefined) {
            pairs++
        } else if (x === 0 && countMap[0] >= 2) {
            pairs++
        }
    }
    return pairs
}
const pairResult = pairSumNull(userArray)
document.getElementById('array6').textContent ='[' + userArray.join(', ') + ']'
document.getElementById('result6').textContent = pairResult

//Найти, сколько есть в массиве троек чисел, дающих в сумме 0:
const userArray2 = [-1, 0, 1, 2, -1, -4]
function trioSumNull(userArray) {
    const n = userArray.length
    let count = 0
    const arr = [...userArray].sort((a, b) => a - b)
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue
        let left = i + 1
        let right = n - 1
        while (left < right) {
            const sum = arr[i] + arr[left] + arr[right]
            if (sum === 0) {
                count++;
                while (left < right && arr[left] === arr[left + 1]) left++
                while (left < right && arr[right] === arr[right - 1]) right--
                left++
                right--
            } else if (sum < 0) {
                left++
            } else {
                right--
            }
        }
    }
    return count
}
const trioResult = trioSumNull(userArray2)
document.getElementById('array7').textContent ='[' + userArray2.join(', ') + ']'
document.getElementById('result7').textContent = trioResult