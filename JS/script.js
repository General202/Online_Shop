async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("shop.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

let items_list = document.querySelector('.items-list')

function getCardHtml(item){
    return` <div class="card my-3" style="width: 18rem;">
    <img src="img/${item.image}" class="card-img-top my-3" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5> 
      <p class="card-text">${item.description}</p>
      <h6>${item.price} грн</h6>
      <button href="#" class = "btn btn-primary" style="background-color: rgb(78, 172, 94); border-color: black;" 
      onmouseover="this.style.backgroundColor='rgb(37, 104, 48)'; this.style.transform='rotate(5deg)';"
      onmouseout="this.style.backgroundColor='rgb(78, 172, 94)'; this.style.transform='scale(1)';">Додати в кошик</button>
    </div>
  </div>`
}

getProducts().then(function(items){
    items.forEach(function(item){
        items_list.innerHTML += getCardHtml(item)
    });
})
