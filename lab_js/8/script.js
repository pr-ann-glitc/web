// Написать функцию counter(n), которая выводит в консоль раз в секунду числа n, n-1 ... 2, 1, 0 и останавливается
function counter(n) {
    let counter = n;
    const timerId = setInterval(() => { 
        console.log(counter);
        document.getElementById('result1').textContent = counter;
        if (counter === 0) {
            clearInterval(timerId);
        } 
        counter--;
    }, 1000);
}
document.getElementsByClassName('button-start')[0].addEventListener('click', function() {
    const val = document.getElementById('input-task1').value;
    counter(val);
});




//Написать функцию createCounter(n), возвращающую объект с методами:
// start() -- запускает (или возобновляет) счётчик c интервалом 1 секунда: N, N-1.
// pause() -- приостанавливает счёт, но не сбрасывает счётчик.
// stop() -- останавливает счёт, сбрасывает счётчик.
function createCounter(n) {
    let count = n;
    let timerId = null;
    const timer = {
        start() {
            if (timerId !== null) {
                clearInterval(timerId);
                timerId = null;
            }
            timerId = setInterval(() => {
                document.getElementById('result2').textContent = count;
                if (count >= 0) {
                    count--;
                } else {
                    this.stop()
                }
            }, 1000);
        },
        pause() {
            if (timerId !== null) {
                clearInterval(timerId);
                timerId = null;
            }
        },
        stop() {
            clearInterval(timerId);
            timerId = null;
            count = n;
            document.getElementById('result2').textContent = null;
        }
    }
    return timer;
}

let currentCounter = null;
document.getElementById('input-task2').addEventListener('blur', function() {
    const val = document.getElementById('input-task2').value;
    currentCounter = createCounter(val);
});

document.getElementById('button-start').addEventListener('click', function() {
    currentCounter.start();
});

document.getElementById('button-pause').addEventListener('click', function() {
    if (currentCounter) {
        currentCounter.pause();
        document.getElementById('result2').textContent += " pause";
    }
});

document.getElementById('button-stop').addEventListener('click', function() {
    if (currentCounter) currentCounter.stop();
});




// Написать функцию delay(N), возвращающую промис, который сделает resolve() через N секунд.
function delay(n) {
    const time = n*1000;
    const userPromise = new Promise((resolve) => {
        setTimeout(() => {resolve()}, time)
    })
    return userPromise;
}

document.getElementById('button-resolve').addEventListener('click', function() {
    const userN = document.getElementById('input-task3').value
    delay(userN).then(
        result => document.getElementById('result3').textContent = "time is over"
    );
    document.getElementById('result3').textContent = null;
})



// Решить задачу со счётчиком N, N-1 ... 2, 1, 0 через функцию delay.
function newCounter(n) {
    let count = n;
    document.getElementById('result4').textContent = count;
    if (count === 0) return;
    delay(1).then(() => newCounter(n-1))
}
document.getElementById('button-resolve1').addEventListener('click', function() {
    const userN = document.getElementById('input-task4').value
    newCounter(userN)
})


// Написать функцию, возвращающую название первого репозитория на github.com по имени пользователя 
// (2 последовательных запроса: https://api.github.com/users/%USERNAME%).
async function fetchToGitHub(userName) {
    const responseUser = await fetch(`https://api.github.com/users/${userName}`)
    const userJson = await responseUser.json();
    const responseRepository = await fetch(userJson.repos_url);
    const repos = await responseRepository.json();
    return repos[0].name;
}
document.getElementById('button-fetch').addEventListener('click', function() {
    const userName = document.getElementById('input-task5').value;
    fetchToGitHub(userName).then(name => document.getElementById('result5').textContent = name);
})



//переписать с помощью async await
class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);
    if (response.status === 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}

async function getGithubUser() {
    while (true) {
        const name = prompt("Введите логин?", "iliakan");
        
        try {
            const user = await loadJson(`https://api.github.com/users/${name}`);
            alert(`Полное имя: ${user.name}.`);
            return user;
        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) {
                alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
            } else {
                throw err;
            }
        }
    }
}

getGithubUser();