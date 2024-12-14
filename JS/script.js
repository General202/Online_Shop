async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("shop.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
  // Розділяємо всі куки на окремі частини
  const cookies = document.cookie.split(';')
  // Шукаємо куки з вказаним ім'ям
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim() // Видаляємо зайві пробіли
      // Перевіряємо, чи починається поточне кукі з шуканого імені
      if (cookie.startsWith(cookieName + '=')) {
          // Якщо так, повертаємо значення кукі
          return cookie.substring(cookieName.length + 1) // +1 для пропуску "="
      }
  }
  // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок 
  return ''
}


let items_list = document.querySelector('.items-list')

function getCardHtml(item){
    return` <div class="card my-3" style="width: 15rem;">
    <img src="img/${item.image}" class="card-img-top my-3" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5> 
      <p class="card-text">${item.description}</p>
      <h6>${item.price} грн</h6>
      <button href="#" class = "btn btn-primary my_cart_btn" data-product='${JSON.stringify(item)}' style="background-color: rgb(78, 172, 94); border-color: black;" 
      onmouseover="this.style.backgroundColor='rgb(37, 104, 48)'; this.style.transform='rotate(1deg)';"
      onmouseout="this.style.backgroundColor='rgb(78, 172, 94)'; this.style.transform='scale(1)';" >Додати в кошик</button>
    </div>
  </div>`
}

class ShoppingCart{
  constructor(){
    this.items = {}
    this.loadCartFromCookies()
  }
    // Зберігання кошика в кукі
    saveCartToCookies() {
      let cartJSON = JSON.stringify(this.items);
      document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
  }


  // Завантаження кошика з кукі
  loadCartFromCookies() {
      let cartCookie = getCookieValue('cart');
      if (cartCookie && cartCookie !== '') {
          this.items = JSON.parse(cartCookie);
      }
  }

  addItem(item){
    if (this.items[item.id]){
      this.items[item.id].quantity += 1
    }else{
      this.items[item.id] = item
      this.items[item.id].quantity = 1
    }
    this.saveCartToCookies()
  }

}

let cart = new ShoppingCart()
const myModal = new bootstrap.Modal('#exampleModal', {
  keyboard: false
})

function addToCart(event){
  let data = event.target.getAttribute('data-product')
  let item = JSON.parse(data)
  cart.addItem(item)
  showCart()
  myModal.show()

  console.log(cart.items)
}

getProducts().then(function(items){
  items.forEach(function(item){
      items_list.innerHTML += getCardHtml(item)
  })
  let addBtn_list = document.querySelectorAll(".my_cart_btn")
  addBtn_list.forEach(function(btn){
      btn.addEventListener("click", addToCart)
  })
})

//Додавання товарів кошика на сторінку
function getCartItem(item){
    return` 
    <div class="card">
      <div class="row">
        <div class="col">
          <img src="img/${item.image}" class="img-fluid">
        </div>
        <div class="col mx-3">${item.title}</div>
        <div class="col">${item.quantity} шт.</div>
        <div class="col">${item.price}грн.</div>
      </div>
    </div>`
}

function showCart(){
  cart_list.innerHTML =""
  for (let key in cart.items){
    cart_list.innerHTML+= getCartItem(cart.items[key])
  }
  
}

let cart_list =document.querySelector(".modal-body")

showCart()

