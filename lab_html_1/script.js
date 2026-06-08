let tasks = []
let counter = 1
let currentFilter = 'all'
let currentMode = 'none'

function createTask(title) {
    const date = new Date()
    const task = {
        id: counter,
        title: title,
        date: date.toISOString(), //для сортировки
        displayDate: date.toLocaleDateString(), // Для отображения
        isDone: false
    }
    counter++;
    return task;
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id)
    if (index !== -1) {
        tasks.splice(index, 1)
    }
    updateList()
}

function deleteAllTasks() {
    tasks.length = 0;
    updateList()
}

function resetFilters() {
    currentMode = 'none'
    currentFilter = 'all'
    updateList()
    applyFilterVisual('all')
}

function getFilteredTasks() {
    switch(currentFilter) {
        case 'done':
            return tasks.filter(task => task.isDone === true)
        case 'ndone':
            return tasks.filter(task => task.isDone === false)
        default:
            return [...tasks]
    }
}

function sortTasks(curTasks) {
    switch(currentMode) {
        case 'new':
            return [...curTasks].sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'old':
            return [...curTasks].sort((a, b) => new Date(a.date) - new Date(b.date))
        case 'start':
            return [...curTasks].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
        case 'finish':
            return [...curTasks].sort((a, b) => b.title.localeCompare(a.title, 'ru'))
        default:
            return curTasks
    }
}

function updateList() {
    let filteredTasks = getFilteredTasks()
    filteredTasks = sortTasks(filteredTasks)
    
    const listHTML = filteredTasks.map(task => {
        const checkedAttribute = task.isDone ? 'checked' : ''
        return `<li class="list-element" id="${task.id}">
                    <div class="container-list-element">
                        <input class="input-checkbox" type="checkbox" id="${task.id}" ${checkedAttribute}>
                        <div class="container-task">
                            <label class="task" for="${task.id}">${task.title}</label>
                            <label class="date">от ${task.displayDate}</label>
                        </div>
                    </div>
                    <button class="button-cancel" id="${task.id}">&#10006;</button>
                </li>`;
    }).join('');
    
    document.querySelector('#list').innerHTML = listHTML

    document.querySelectorAll('.button-cancel').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = parseInt(this.id)
            deleteTask(taskId)
        })
    })

    document.querySelectorAll('.input-checkbox').forEach(input => {
        input.addEventListener('change', function() {
            const taskId = parseInt(this.id)
            const task = tasks.find(task => task.id === taskId)
            if (task) {
                task.isDone = this.checked
                updateList()
            }
        })
    })
    
    updateCounters()
}

function updateCounters() {
    const countDone = tasks.filter(task => task.isDone === true).length
    const countNotDone = tasks.filter(task => task.isDone === false).length
    const countAll = tasks.length
    document.getElementById('done').textContent = `СДЕЛАНО (${countDone})`
    document.getElementById('ndone').textContent = `НЕ СДЕЛАНО (${countNotDone})`
    document.getElementById('all').textContent = `ВСЕ (${countAll})`
}

function applyFilter(filterType) {
    currentFilter = filterType
    applyFilterVisual(filterType)
    updateList()
}

function applyFilterVisual(filterType) {
    document.querySelectorAll('.refs a').forEach(link => {
        link.classList.remove('active')
    })
    const filterLink = document.getElementById(filterType)
    if (filterLink) {
        filterLink.classList.add('active')
    }
}

const form = document.querySelector('#myForm')
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const titleInput = document.querySelector('#title-task')
    const title = titleInput.value;
    if (title.trim() !== '') {
        const task = createTask(title.trim())
        tasks.push(task) 
        updateList()
    }
    titleInput.value = ''
    titleInput.focus()
})

form.addEventListener('reset', function(event) {
    setTimeout(() => {
        document.querySelector('#title-task').focus()
    }, 0)
})

document.getElementById('done').addEventListener('click', function(event) {
    event.preventDefault();
    applyFilter('done')
})

document.getElementById('ndone').addEventListener('click', function(event) {
    event.preventDefault();
    applyFilter('ndone')
})

document.getElementById('all').addEventListener('click', function(event) {
    event.preventDefault();
    applyFilter('all')
})

document.getElementById('sort').addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    changeSortVisible();
})

document.getElementById('from-new').addEventListener('click', function(event) {
    currentMode = 'new'
    updateList()
    changeSortVisible();
})

document.getElementById('from-old').addEventListener('click', function(event) {
    currentMode = 'old'
    updateList()
    changeSortVisible();
})

document.getElementById('start').addEventListener('click', function(event) {
    currentMode = 'start'
    updateList()
    changeSortVisible();
})

document.getElementById('finish').addEventListener('click', function(event) {
    currentMode = 'finish'
    updateList()
    changeSortVisible();
})

function changeSortVisible() {
    const sortDiv = document.getElementById('sort-div')
    if (sortDiv.style.display === "block") {
        sortDiv.style.display = "none"
    } else {
        sortDiv.style.display = "block"
    }
}

document.addEventListener('click', function(event) {
    const sortDiv = document.getElementById('sort-div')
    const sortButton = document.getElementById('sort')
    if (sortDiv && sortButton && !sortDiv.contains(event.target) && event.target !== sortButton) {
        sortDiv.style.display = 'none'
    }
})

document.getElementById('reset-filters').addEventListener('click', function() {
    resetFilters()
})

document.getElementById('delete-tasks').addEventListener('click', function() {
    if (tasks.length === 0) return
    
    if (confirm('Вы уверены, что хотите удалить все задачи?')) {
        deleteAllTasks()
    }
})

applyFilter('all')