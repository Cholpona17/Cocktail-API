const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const getAllCoctails = API + 'filter.php?c=Cocktail'
const getByName = API + 'search.php?s='
const filterByAlco = API + 'filter.php?a='
const getById = API + 'lookup.php?i='

const form = document.querySelector('#search')
const input = document.getElementById('inp')
const select = document.querySelector('#select')
const output = document.querySelector('.output')

const getCoctails = async () => {
    const request = await fetch(getAllCoctails)
    const response = await request.json()
    renderCoctails(response.drinks);
}
const getFilterAlco = async () => {
    const request = await fetch(filterByAlco + select.value)
    const response = await request.json()
    renderCoctails(response.drinks);

}
const getCoctailByName = async () => {
    let request = ''
    if (input.value.length >= 2) {
        request = await fetch(getByName + input.value)
    } else {
        request = await fetch(getAllCoctails)
    }
    const response = await request.json()
    renderCoctails(response.drinks);
}
const getCoctailById = async (id) => {
    const request = await fetch(getById + id)
    const response = await request.json()
    renderDetaiInfo(response.drinks[0])

}

const renderCoctails = (data) => {
    output.innerHTML = ''
    data ?
        data.map(el => {
            const card = document.createElement('div')
            card.classList.add('card')

            const img = document.createElement('img')
            const name = document.createElement('h2')
            img.src = el.strDrinkThumb
            name.textContent = el.strDrink

            card.addEventListener('click', () => getCoctailById(el.idDrink))

            card.append(img, name)
            output.append(card)
        })
        : output.innerHTML = '<h1>Server Error</h1>'
}
const renderDetaiInfo = (coctail) => {
    console.log(coctail);
    output.innerHTML = ''
    const block = document.createElement('div')
    block.classList.add('block')
    const img = document.createElement('img')
    img.src = coctail.strDrinkThumb
    const name = document.createElement('h2')
    name.textContent = coctail.strDrink
    const instr = document.createElement('p')
    instr.textContent = 'Instructions' + coctail.strInstructions
    const ingrDiv = document.createElement('div')
    for (let key in coctail) {
        if (key.includes('strIngredient') && coctail[key] != null) {
            let ingr = document.createElement('li')
            ingr.textContent = coctail[key]
            ingrDiv.append(ingr)
        }
    }


    block.append(img, name, instr, ingrDiv, backButton)
    output.append(block)
}
form.addEventListener('submit', e => e.preventDefault())
input.addEventListener('keyup', getCoctailByName)
select.addEventListener('change', getFilterAlco)
const backButton = document.createElement('button')
backButton.textContent = '<Back'
backButton.addEventListener('click', getCoctails)


getCoctails()