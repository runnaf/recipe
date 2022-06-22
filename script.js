const search = document.querySelector('#search');
const apiAdress = 'http://194.87.214.100/';

const simmillerCard = (recipes) => {
  const containerCards = document.querySelector('.recipes__list');
  containerCards.innerHTML = '';
  recipes.forEach(item=>{
    const card = document.createElement('li');
    card.classList.add('recipe__item');
    card.innerHTML = `
      <div class="container__card container__card--left">
        <h3 class="recipe__name">${item.title}</h3>
        <img src="${apiAdress + item.picture}" class="recipe__image" width="200" height="300">
      </div>
      <div class="container__card container__card--rigth">
        <h3 class="recipe__name">${item.title}</h3>
        <div class="ingredients">
          <div class="ingredient__available ingredient">
            <h4>есть дома</h4>      
          </div>
          <div class="ingredient__unavailable ingredient">
            <h4>нужно купить</h4>
          </div>
        <p class="recipe__description">${item.recipe}</p>
        <p>Приятного аппетита, всем, кто любит овсянку...пом-пом</p>
        <button type="button" class="button__close"></button>
      </div>
    `
    containerCards.append(card);
    const ingredientContainer = card.querySelector('.ingredient__available');  
    getIngredients(item.ingredients, ingredientContainer);
    transformer(card)
    listenerCheckedIngredient(card)
    cardTurent(card)
  })
}

const getIngredients = (ingredients, container) => {
  ingredients.forEach(ingredient=>{
    const ingredientName = document.createElement('p');
    ingredientName.classList.add('ingredient__name');
    ingredientName.textContent = ingredient;
    container.append(ingredientName)
  })
}


const transformer = (card) => {
  const side = card.querySelector('.container__card--left');
  side.addEventListener('click', ()=>{
    if (!card.classList.contains('flip-left-to-right')) {
      card.classList.add('flip-right-to-left')
    } else  {
      card.classList.remove('flip-left-to-right')
      card.classList.add('flip-right-to-left')
    }
  })
}

const cardTurent = (card) => {
  const btn = card.querySelector('.button__close');
  btn.addEventListener('click', ()=>{
    card.classList.add('flip-left-to-right')
    card.classList.remove('flip-right-to-left')
  })
}


const listenerCheckedIngredient = (card) => {
  const available = card.querySelector('.ingredient__available');
  const unavailable = card.querySelector('.ingredient__unavailable');
  const fields = card.querySelectorAll('.ingredient__name');
  
  fields.forEach(field => {
    field.addEventListener('click', ()=>{
      if (!field.classList.contains('checked')) {
        field.classList.add('checked');
        available.prepend(field)
        unavailable.append(field)
      } else {
        field.classList.remove('checked');
        unavailable.prepend(field)
        available.append(field)
      }
    }) 
  })    
}

const getFilter = () =>{
  const cards = document.querySelectorAll('.recipe__item');
  
  search.addEventListener('keyup', (event)=>{
    const word = event.target.value.toLowerCase();

    cards.forEach (item => {
      const ingredients = Array.from(item.querySelectorAll('.ingredient__name')).map(item => item.textContent.toLowerCase()).join(', ')
      item.querySelector('.recipe__name').textContent.toLowerCase().includes(word) || ingredients.includes(word) ? item.style.display='flex' : item.style.display='none';
    })
  })
}


const getData = () => {
  fetch('http://194.87.214.100/recipes')
  .then(res=>res.json())
  .then(data => Object.values(data))
  .then (data => {
    simmillerCard(data);
  })
  .then(getFilter).catch(console.error())
}

getData(listenerCheckedIngredient)
