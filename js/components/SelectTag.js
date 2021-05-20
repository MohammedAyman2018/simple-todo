(function Tags(ratingElement) {
    ratingElement.outerHTML = `
        <div class="col-auto">
            <label for="Tag" class="form-label">Tag name</label>
            <input class="form-control" autocomplete="off" list="tags" id="Tag" placeholder="ex: Important">
            <datalist id="tags">
                <!-- JS WILL RENDER TAGS HERE -->
            </datalist>
        </div>

        <div class="col-auto">
            <p>Tag color</p>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="primary"
                    value="primary">
                <label class="form-check-label" for="primary">primary</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="secondary"
                    value="secondary">
                <label class="form-check-label" for="secondary">secondary</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="success"
                    value="success">
                <label class="form-check-label" for="success">success</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="danger"
                    value="danger">
                <label class="form-check-label" for="danger">danger</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="warning"
                    value="warning">
                <label class="form-check-label" for="warning">warning</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="info"
                    value="info">
                <label class="form-check-label" for="info">info</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="light"
                    value="light">
                <label class="form-check-label" for="light">light</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dark"
                    value="dark">
                <label class="form-check-label" for="dark">dark</label>
            </div>
        </div>
    `
    
    const listsInStorage = localStorage.getItem('lists')
    const tagList = document.getElementById('tags')
    tagList.innerHTML = ''

    if (listsInStorage) {
        const tags = JSON.parse(listsInStorage).map(x => JSON.parse(x.tag).color)

        tags.forEach(tag => {
            tagList.innerHTML += `<option value='${tag}'>${tag}</option>`
        })
    }
})(document.querySelector('[data-component="tag-color"]'))

