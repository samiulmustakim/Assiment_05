const array = ['mus', 'sam', 'ok']

const createlement = (arr) => {
    const htmlElement = arr.map((el) => `<div class="badge btn-soft badge-error">${el}</div>`)
    return(htmlElement.join(""))
}
createlement(array)
