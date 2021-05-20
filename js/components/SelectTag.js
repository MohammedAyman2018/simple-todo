(function Tags(ratingElement) {
    ratingElement.outerHTML = `
        <div class="col-md-auto">
            <label for="Tag" class="form-label">Tag name</label>
            <input class="form-control" autocomplete="off" list="tags" id="Tag" placeholder="ex: Important">
            <datalist id="tags">
                <!-- JS WILL RENDER TAGS HERE -->
            </datalist>
        </div>

        <div class="col-auto">
            <p>Tag color</p>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="none"
                    value="none">
                <label class="form-check-label" for="none">No tag</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="primary"
                    value="primary">
                <label class="form-check-label" for="primary">
                <span class="mx-1 badge rounded-pill bg-primary">primary</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="secondary"
                    value="secondary">
                <label class="form-check-label" for="secondary">
                <span class="mx-1 badge rounded-pill bg-secondary">secondary</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="success"
                    value="success">
                <label class="form-check-label" for="success">
                <span class="mx-1 badge rounded-pill bg-success">success</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="danger"
                    value="danger">
                <label class="form-check-label" for="danger">
                <span class="mx-1 badge rounded-pill bg-danger">danger</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="warning"
                    value="warning">
                <label class="form-check-label" for="warning">
                <span class="mx-1 badge rounded-pill bg-warning text-dark">warning</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="info"
                    value="info">
                <label class="form-check-label" for="info">
                <span class="mx-1 badge rounded-pill bg-info text-dark">info</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="light"
                    value="light">
                <label class="form-check-label" for="light">
                <span class="mx-1 badge rounded-pill bg-light text-dark">light</span>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dark"
                    value="dark">
                <label class="form-check-label" for="dark">
                <span class="mx-1 badge rounded-pill bg-dark">dark</span>
                </label>
            </div>
        </div>
    `

    const listsInStorage = localStorage.getItem('lists')
    const tagList = document.getElementById('tags')
    tagList.innerHTML = ''

    if (listsInStorage) {
        const tags = [... new Set(JSON.parse(listsInStorage).map(x => JSON.parse(x.tag) ? JSON.parse(x.tag).name : 'Without Tag'))]

        tags.forEach(tag => {
            tagList.innerHTML += `<option value='${tag}'>${tag}</option>`
        })
    }
})(document.querySelector('[data-component="tag-color"]'))

