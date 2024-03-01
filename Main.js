const shop = document.querySelector('.shop');

let basket = JSON.parse(localStorage.getItem('Data')) || [] ;
console.log(basket)

let getShop = () => {
    return (
        shop.innerHTML = shopData.map((x) => {
            let { id, name, price, desc, img } = x;
            let search =basket.find((x)=> x.id === id) || []
            return `
            <div class="item" id = 'product-id-${id}'>
            <img width="100%" src=${img}>
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="button">
                        <i onclick='decrement(${id})' class="fa-solid fa-minus"></i>
                        <p id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</p>
                        <i onclick='increment(${id})' class="fa-solid fa-plus"></i>                        
                    </div>
                </div>
            </div>
        </div>
        `
        }).join(''))
}

getShop()

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
     localStorage.setItem("Data",JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let items = document.getElementById("items");
    items.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y ,0);
}

calculation ()