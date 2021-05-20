const allLists = JSON.parse(localStorage.getItem('lists'))
const queries = new URLSearchParams(window.location.search)
const nameQuery = queries.get('name')
const listIdx = allLists.findIndex(x => x.name === nameQuery)
const list = allLists[listIdx]
function init() {

    /**
     * Get All Lists and parse them.
     * Get the list name from the URL query.
     * Find the list with the same name from localStorage.
     * Display the list. 
     */
    const pageLabel = document.getElementById('listName')
    const removeList = document.getElementById('removeList')
    const editListName = document.getElementById('editListName')

    removeList.addEventListener('click', (e) => {
        if (confirm('You sure you want to delete the list?')) {
            allLists.splice(listIdx, 1)
            localStorage.setItem('lists', JSON.stringify(allLists))
            location.replace('/')
        }
    })

    editListName.addEventListener('click', (e) => {
        const oldTitle = list.name
        const newTitle = prompt('Edit list name: ', oldTitle)
        if (newTitle) {
            list.name = newTitle
            localStorage.setItem('lists', JSON.stringify(allLists))
            queries.set('name', newTitle)
            pageLabel.innerText = queries.get('name')
        }
    })

    pageLabel.innerText = nameQuery
    const AddTaskBtn = document.getElementById('AddTask')
    AddTaskBtn.addEventListener('click', AddTask)
}

init()

/**
 * Get New Task input value.
 * Get Tags Input value and color.
 * Add The Task to the list.
 * Update localStorage. 
 */
function AddTask() {
    const valid = validateForm()
    if (valid) {
        const newTaskInput = document.getElementById('newItem')
        const tagNameInput = document.getElementById('Tag')
        const tagColorInput = document.querySelector('input[name="inlineRadioOptions"]:checked')

        const task = {
            title: newTaskInput.value,
            tag: {
                name: tagNameInput.value,
                color: tagColorInput.value
            },
            type: 'todo',
            state: false
        }

        list.items.push(task)
        console.log(list);
        localStorage.setItem('lists', JSON.stringify(allLists))
        resetForm()
        renderTasks()
    } else {
        const toast = new bootstrap.Toast(document.querySelector('.toast'))
        toast.show()
    }
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList')
    const archivedList = document.getElementById('archivedList')
    const tasks = list.items
    const archive = list.archive
    tasksList.innerHTML = ''
    archivedList.innerHTML = ''

    if (tasks.length > 0) {
        tasks.forEach((task, idx) => {
            tasksList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        ${task.title}
                        <span class="mx-1 badge rounded-pill bg-${task.tag.color} ${['light', 'info', 'warning'].includes(task.tag.color) ? 'text-dark' : ''}">${task.tag.name}</span>
                    </div>
                </div>
                <i data-idx="${idx}" data-btnType="archive" class="bi bi-archive text-danger cursor-pointer mx-2"></i>
                <i data-idx="${idx}" data-title="${task.title}" data-btnType="edit" class="bi bi-pen text-warning cursor-pointer mx-2"></i>
                <input class="form-check-input task-done" type="checkbox" value="${idx}" aria-label="">
            </li>
            `
        })
    } else {
        tasksList.innerHTML = '<p>Add your first task now.</p>'
    }

    if (archive.length > 0) {
        archive.forEach((task, idx) => {
            archivedList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    ${task.title}
                    <span class="mx-1 badge rounded-pill bg-${task.tag.color} ${['light', 'info', 'warning'].includes(task.tag.color) ? 'text-dark' : ''}">${task.tag.name}</span>
                </div>
            </div>
            <i data-idx="${idx}" data-btnType="undo" class="bi bi-reply text-success cursor-pointer mx-2"></i>
        </li>
        `
        });
    } else {
        archivedList.innerHTML = '<p>Your archive is clean.</p>'

    }

    const checkboxes = document.querySelectorAll('input.task-done')
    checkboxes.forEach(checkbox => checkbox.addEventListener('click', (e) => {
        list.items[e.target.value].state = e.target.checked
        localStorage.setItem('lists', JSON.stringify(allLists))
    }))

    deleteTaskEvent()
    editTaskEvent()
    undoTaskEvent()
}

function validateForm() {
    const newTaskInput = document.getElementById('newItem')
    const tagNameInput = document.getElementById('Tag')
    const tagColorInput = document.querySelector('input[name="inlineRadioOptions"]:checked')

    return !!newTaskInput.value &&
        !!tagNameInput.value &&
        tagColorInput
}

function resetForm() {
    const newTaskInput = document.getElementById('newItem')
    const tagNameInput = document.getElementById('Tag')
    const tagColorInput = document.querySelector('input[name="inlineRadioOptions"]:checked')

    newTaskInput.value = ''
    tagNameInput.value = ''
    tagColorInput.checked = false
}

function deleteTaskEvent() {
    const archiveBtns = document.querySelectorAll('i[data-btnType="archive"]')
    archiveBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-idx')
        list.items[idx].state = false
        list.archive.push(list.items[idx])
        list.items.splice(idx, 1)

        localStorage.setItem('lists', JSON.stringify(allLists))
        renderTasks()
    }))
}

function editTaskEvent() {
    const editBtns = document.querySelectorAll('i[data-btnType="edit"]')
    editBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-idx')
        const oldTitle = e.target.getAttribute('data-title')
        const newTitle = prompt('Edit Task name: ', oldTitle)
        if (newTitle) {
            list.items[idx].title = newTitle
            localStorage.setItem('lists', JSON.stringify(allLists))
            renderTasks()
        }
    }))
}

function undoTaskEvent() {
    const undoBtns = document.querySelectorAll('i[data-btnType="undo"]')
    undoBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-idx')
        list.archive[idx].state = false
        list.items.push(list.archive[idx])
        list.archive.splice(idx, 1)
        localStorage.setItem('lists', JSON.stringify(allLists))
        renderTasks()
    }))
}

renderTasks()