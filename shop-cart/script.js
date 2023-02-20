let totalItems = 0;
let itemsInCart = [];
let cart = [];
function addToCart(element){
    
    let container = element.closest(`.one-item`);
    let price = container.querySelector(`.price`).innerText;
    let name = container.querySelector(`h3`).innerText;
    let quantity = container.querySelector(`.quantity`).value;
    let items = document.querySelector(`.items`);
    let total = document.querySelector(`.total`);

    //console.log(total);

    price = price.substring(1,price.length)
    //console.log(typeof(quantity))
    let quantityInt = parseInt(quantity);
    let priceInt = parseInt(price)
 

    //console.log(typeof(quantityInt))


    if(quantityInt > 0){
        let totalItem = quantityInt * price;
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
                Price: $${price}<br>
                Quantity: ${quantityInt}<br>
                Total price: <span>$${totalItem}</span><br>
            </div>
            <div class="inputs">
                <input class="cart-quantity" type = "number"  min = 0 value="${quantityInt}">
                <button id="dltBtn" onclick="removeItem(this)">Delete the order</button>
            </div>
        </div>
        `;

        cart.push(items.value)
        localStorage.setItem("shopCart", JSON.stringify( cart));
        //container.push(items[0])
        for(let i = 0; i < cart.length; i++){
            

        };

        console.log(cart);

        element.innerText = `Added`;
        element.setAttribute(`disabled`,``);

        total.innerHTML = `
        <button id="purchase" onclick="purchase()">Complete the order</button>
        <hr>Total bill: $${totalItems}
        `;

        console.log(totalItems)

    }else{
        alert(`Add quantity`)
    }
}

function updateList(element){
    addToCart(element);
}

function removeItem(element){

    let container = element.closest(`.selected-items`);
    let totalItem = container.querySelector(`span`).innerText;
    let total = document.querySelector(`.total`);
    let name = container.querySelector(`h3`).innerText;
    let items = document.querySelectorAll(`.one-item`);


    totalItem = totalItem.substring(1,totalItem.length)
    //console.log(price)
    //console.log(typeof(totalItem))
    totalItem = parseInt(totalItem);

    //console.log(typeof(totalItems))
    console.log(totalItems)
    totalItems -= totalItem;

    console.log(totalItems)
    total.innerHTML = `
    <button id="purchase" onClick="purchase()">Complete the order</button>
    <hr>Ukupan racun: $${totalItems}
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
    let total = document.querySelector(`.total`);
    let totalItem = document.querySelector(`span`).innerText;
    let name = container.querySelector(`h3`).innerText;
    let items = document.querySelectorAll(`.one-item`);

    //console.log(price)
    totalItem = parseInt(totalItem);

    console.log(typeof(totalItems))
    alert(`You have successfuly completed the order, your bill is $${totalItems}`);
    totalItems -= totalItems;
    total.innerHTML = `
        <hr>Total bill: $${totalItems}
    `;

    console.log(totalItems);

    console.log(selectedItems);
    

    items.forEach(function(pizza){
        let nameItem = pizza.querySelector(`.content h3`).innerText;
        if(nameItem === name){
            pizza.querySelector(`.action input`).value = 0;
            pizza.querySelector(`.action button`).removeAttribute(`disabled`);

            pizza.querySelector(`.action button`).innerText = `Add`;
        }
        console.log(nameItem)
    });
    container.remove();

}
