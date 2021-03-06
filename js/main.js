
const backgrounds = {
    blurry: ['blurry-gradient-haikei (1).svg', 'blurry-gradient-haikei (2).svg', 'blurry-gradient-haikei.svg'],
    layered: ['layered-peaks-haikei.svg', 'layered-steps-haikei.svg'],
    'stacked waves': ['stacked-waves-haikei.svg'],
    wave: ['wave-haikei.svg'],
    'circle scatter': ['circle-scatter-haikei.svg'],
    cute: ['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg','7.jpeg']
}

function addEvents() {
    // Get Create List Button
    const createListBtn = document.getElementById('createListBtn')
    const bgTypeSectionImages = document.querySelectorAll('#bgType img')

    createListBtn.onclick = createList

    bgTypeSectionImages.forEach(img => {
        img.onclick = function (e) {
            bgTypeSectionImages.forEach(img => {
                img.classList.remove('active')
                img.nextElementSibling.classList.remove('active')
            })

            const image = e.target
            const overlay = e.target.nextElementSibling

            image.classList.toggle('active')
            overlay.classList.toggle('active')
        }
    })
}

function createList() {
    const valid = validateForm()
    if (valid) {
        const listNameInput = document.getElementById('listName')
        const name = listNameInput.value

        const activeBg = document.querySelector('#bgType img.active').getAttribute('alt')
        const randomIdx = Math.floor(Math.random() * backgrounds[activeBg].length)
        const bg = `/${activeBg}/${backgrounds[activeBg][randomIdx]}`

        const checkedColor = document.querySelector('input[name="inlineRadioOptions"]:checked').value
        const tag = checkedColor !== 'none' ? {
            name: document.getElementById('Tag').value,
            color: document.querySelector('input[name="inlineRadioOptions"]:checked').value
        } : null

        const list = {
            name,
            bg,
            tag: checkedColor !== 'none' ? JSON.stringify(tag) : null,
            items: [],
            archive: [],
            createdAt: Date.now()
        }

        const listsInStorage = localStorage.getItem('lists')
        if (listsInStorage) {
            const arr = [...JSON.parse(listsInStorage), list]
            localStorage.setItem('lists', JSON.stringify(arr))
        } else {
            localStorage.setItem('lists', JSON.stringify([list]))
        }
        resetPage()
        renderLists()
    } else {
        const toast = new bootstrap.Toast(document.querySelector('.toast'))
        toast.show()
    }
}

function renderLists(tagName) {
    const listsCard = document.getElementById('listsCard').lastElementChild
    const listsInStorage = localStorage.getItem('lists')
    let displayedLists = []

    if (tagName) {
        if (tagName === 'Without Tag') {
            displayedLists = JSON.parse(listsInStorage).filter((x) => !JSON.parse(x.tag))
        } else if (tagName === 'all') {
            displayedLists = JSON.parse(listsInStorage)
        } else {
            displayedLists = JSON.parse(listsInStorage).filter((x) => JSON.parse(x.tag) && JSON.parse(x.tag).name === tagName)
        }
    } else {
        displayedLists = JSON.parse(listsInStorage)
    }

    if (listsInStorage && JSON.parse(listsInStorage).length > 0) {
        listsCard.innerHTML = ''
        displayedLists.forEach(list => {
            const tag = JSON.parse(list.tag)
            listsCard.innerHTML += `
                <div class="col-md-4 my-3 col-lg-3">
                    <div class="list" style="background-image: url('./images/lists-bg/${list.bg}')">
                        <a href="./list.html?name=${list.name}" class="${list.bg.includes('cute') ? 'text-dark' : ''} list-name">
                            ${list.name}
                            ${list.tag ? `<span class="mx-1 badge rounded-pill bg-${tag.color} ${['light', 'info', 'warning'].includes(tag.color) ? 'text-dark' : ''}">${tag.name}</span>` : ''}
                        </a>
                        <small class="${list.bg.includes('cute') ? 'text-dark' : ''} list-date">${new Date(list.createdAt).toLocaleDateString().replaceAll('/', '-')}</small>
                    </div>
                </div>
            `
        })
    } else {
        listsCard.innerHTML += `<p>Add your first list now.</p>`
    }

}

function resetPage() {
    const listNameInput = document.getElementById('listName')
    const tagNameInput = document.getElementById('Tag')
    const tagColor = document.querySelector('input[name="inlineRadioOptions"]:checked')
    const activeBg = document.querySelector('#bgType img.active')

    listNameInput.value = ''
    tagNameInput.value = ''
    tagColor.checked = false;
    activeBg.nextElementSibling.classList.remove('active')
    activeBg.classList.remove('active')
}

function validateForm() {
    const listNameInput = document.getElementById('listName')
    const tagNameInput = document.getElementById('Tag')
    const tagColor = document.querySelector('input[name="inlineRadioOptions"]:checked')
    const activeBg = document.querySelector('#bgType img.active')

    return !!listNameInput.value &&
        ((tagColor.value !== 'none' && tagNameInput.value) || tagColor.value === 'none') &&
        tagColor && tagColor.checked &&
        activeBg && activeBg.nextElementSibling.classList.contains('active') &&
        activeBg.classList.contains('active')
}

function filterLists () {
    const tagList = document.getElementById('filters')
    tagList.addEventListener('change', (e) => {
        renderLists(e.target.value)
    })
    
    if (localStorage.getItem('lists')) {
        const tags = [... new Set(JSON.parse(localStorage.getItem('lists')).map(x => JSON.parse(x.tag) ? JSON.parse(x.tag).name : 'Without Tag'))]
    
        tagList.innerHTML = '<option value="all">All</option>'
        tags.forEach(tag => {
            tagList.innerHTML += `<option value='${tag}'>${tag}</option>`
        })
    }
}

(
    () => {
        addEvents()
        renderLists(),
        filterLists()
    }
)()
