let totalItems = 0;
let cart = [];
function addToCart(element){
    
    let container = element.closest(`.one-item`);
    let price = container.querySelector(`.price`).innerText;
    let name = container.querySelector(`h3`).innerText;
    let quantity = container.querySelector(`.quantity`).value;
    let items = document.querySelector(`.items`);
    let total = document.querySelector(`.total`);

    price = price.substring(1,price.length)
    price = parseInt(price)
    let quantityInt = parseInt(quantity);
    let priceInt = parseInt(price)

    if(quantityInt > 0){
        let totalItem = quantityInt * priceInt;
        totalItems += totalItem;
        cart = [{
            name: name,
            price: priceInt,
            quantity: quantityInt,
            priceAll: totalItem
        }]

        items.innerHTML += `
        <div class="selected-items">
            <div class="itemss">
                <h3>${name}</h3>
                Price: $<span class="pricee">${priceInt}</span><br>
                <p clas="totalPrice">Total price: $${totalItem}</p><br>
            </div>
            <div class="inputs">
                <input class="cart-quantity" type = "number"  min = 1 value="${quantityInt}">
                <button id="dltBtn" onclick="removeItem(this)">Delete the order</button>
            </div>
        </div>
        `;

        cart.push(items.value)
        localStorage.setItem("shopCart", JSON.stringify( cart));

        element.innerText = `Added`;
        element.setAttribute(`disabled`,``);

        total.innerHTML = `
        <button id="purchase" onclick="purchase()">Complete the order</button>
        <hr>
        <div class='total-bill'>Total bill: $${totalItems}</div>
        `;

        items.getElementsByClassName(`cart-quantity`)[0].addEventListener(`change`, quantityChanged)

        
    }else{
        alert(`Add quantity`)
    }
}

function quantityChanged(element) {
    input = document.querySelector(`.cart-quantity`).value;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateList()
}

function updateList(){

    let selItems = document.querySelectorAll(`.selected-items`);
    let totalElement = document.querySelector(`.total-bill`);

    let totalItems = 0;
    selItems.forEach((selItem)=>{
        let priceElement = selItem.querySelector(`.pricee`);
        let price = parseInt(priceElement.innerHTML.replace("$",""));
        let quantity = selItem.querySelector(`.cart-quantity`).value;
        totalItems += price*quantity;
        console.log(typeof(price))
        console.log(quantity)
    })

    totalElement.innerHTML =`<div class='total-bill'>Total bill: $${totalItems}</div>`;
}

function removeItem(element){

    let container = element.closest(`.selected-items`);
    let totalItem = container.querySelector(`p`).innerText;
    let total = document.querySelector(`.total`);
    let name = container.querySelector(`h3`).innerText;
    let items = document.querySelectorAll(`.one-item`);

    totalItem = totalItem.substring(14,totalItem.length)
    
    totalItem = parseInt(totalItem);
    console.log(totalItem)
    console.log(totalItems)
    totalItems -= totalItem;

    console.log(totalItems)
    total.innerHTML = `
    <button id="purchase" onClick="purchase()">Complete the order</button>
    <hr><div class='total-bill'>Total bill: $${totalItems}</div>
    `;

    container.remove(element); 

    console.log(name);

    items.forEach(function(pizza){
        let nameItem = pizza.querySelector(`.content h3`).innerText;
        if(nameItem === name){
            pizza.querySelector(`.action input`).value = 0;
            pizza.querySelector(`.action button`).removeAttribute(`disabled`);

            pizza.querySelector(`.action button`).innerText = `Add`;
        }
        console.log(nameItem)
    });
}

function purchase(){

    let container = document.querySelector(".items");
    let selectedItems = document.querySelectorAll(`.selected-items`)
    let total = document.querySelector(`.total-bill`);
    let totalItem = document.querySelector(`.total-bill`).innerText;
    let name = container.querySelector(`h3`).innerText;
    let items = document.querySelectorAll(`.one-item`);

    
    totalItem = totalItem.substring(13, totalItem.length)
    totalItem = parseInt(totalItem);
    console.log(totalItem)
    console.log(typeof(totalItems))
    updateList();

    alert(`You have successfuly completed the order, your bill is $${totalItem}`);
    totalItems -= totalItems;
    total.innerHTML = `
        Total bill: $${totalItems}
    `;

    console.log(totalItems);

    console.log(selectedItems);
    
    items.forEach(function(pizza){
        let nameItem = pizza.querySelector(`.content h3`).innerText;
        pizza.querySelector(`.action input`).value = 0;
        pizza.querySelector(`.action button`).removeAttribute(`disabled`);
        pizza.querySelector(`.action button`).innerText = `Add`;
        //console.log(nameItem)
    });
    while(container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }
}