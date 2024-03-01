let label = document.getElementById('label');
let shoppingCart = document.getElementById('shoping-cart');
let basket = JSON.parse(localStorage.getItem('Data')) || [];
// console.log(basket)


let calculation = () => {
  let items = document.getElementById("items");
  items.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

let shoppingCartItem = () => {

  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = shopData.find((y) => y.id === id);
      return ` 
  
              <div class="cart-item">
                <img width="100px" src="${search.img}" alt=""/>
                <div class="cart-leftItem">
                <div class="cart-top">                
                  <p>${search.name}<p>
                  <p>$ ${search.price}</p>        
                  <i onclick="removeItem(${id})" class="fa-solid fa-xmark"></i>
                </div>
                  <div class="button">
                        <i onclick='decrement(${id})' class="fa-solid fa-minus"></i>
                        <p id=${id} class="quantity">${item}</p>
                        <i onclick='increment(${id})' class="fa-solid fa-plus"></i>                        
                </div>  
                <h3>$ ${item * search.price}</h3>         
                </div>                
                
              </div>
            `
    }).join(''))
  }
  else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
          <h2>Cart is empty</h2>
          <a href="./index.html">
          <button>Back to home</button>
          </a>
        `
  }

}

shoppingCartItem()

function increment(id) {
  let selectedId = id
  // console.log("selectedId :", selectedId)
  let search = basket.find((x) => x.id === selectedId);
  // console.log("Search :", search)    
  
  if (search === undefined) {
      basket.push({
          id: selectedId,
          item: 1,
      });
  }
  else {
      search.item += 1
  }
  shoppingCartItem()
  update(id);
  localStorage.setItem("Data",JSON.stringify(basket));
}

function decrement(id) {
  let selectedId = id
  // console.log("selectedId :", selectedId)
  let search = basket.find((x) => x.id === selectedId);
  // console.log("Search :", search)
  if (search === undefined) return
  else if (search.item === 0) return
  else {
      search.item -= 1
  }
 
   update(id);
   basket = basket.filter((x)=> x.item !== 0);
   shoppingCartItem()
   localStorage.setItem("Data",JSON.stringify(basket));
}

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  shoppingCartItem()
  calculation();
  totalAmount()
  
};

let removeItem = (id)=>{
   let selectedId =id
  basket = basket.filter((x)=> x.id !== selectedId);
   localStorage.setItem("Data",JSON.stringify(basket));
   shoppingCartItem();
   totalAmount();
   calculation();

}

let totalAmount = ()=>{

  if(basket.length !==0){
    
    let amount = basket.map((x)=>{
      let {item,id}=x;
      let search = shopData.find((y)=> y.id === id)
      return item* search.price
    
    }).reduce((x,y)=>x+y,0);
    label.innerHTML = `
       <h2>Total Bill:$ ${amount}</h2>
       <button class="checkout">Checkout</button>
       <button onclick="clearCart()" class="clear-cart">Clear Cart</button>
    `
  }
  else return
    
}

totalAmount();

let clearCart = ()=>{
  basket = []   
  localStorage.setItem("Data",JSON.stringify(basket));
  shoppingCartItem();
  calculation();
}