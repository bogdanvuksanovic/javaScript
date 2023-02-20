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
                Cena: ${price}<br>
                Kolicina: ${quantityInt}<br>
                Cena: <span>${totalItem}</span><br>
            </div>
            <div class="inputs">
                <input class="cart-quantity" type = "number"  min = 0 value="${quantityInt}">
                <button id="dltBtn" onclick="removeItem(this)">Obrisati porudzbinu</button>
            </div>
        </div>
        `;

        cart.push(items.value)
        localStorage.setItem("shopCart", JSON.stringify( cart));
        //container.push(items[0])
        for(let i = 0; i < cart.length; i++){
            

        };

        console.log(cart);

        element.innerText = `Dodato`;
        element.setAttribute(`disabled`,``);

        total.innerHTML = `
        <button id="purchase" onclick="purchase()">Zavrsi porudzbinu</button>
        <hr>Ukupan racun: ${totalItems}
        `;

        console.log(totalItems)

    }else{
        alert(`Dodati kolicinu`)
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

    //console.log(price)
    totalItem = parseInt(totalItem);

    //console.log(typeof(totalItems))

    totalItems -= totalItem;
    total.innerHTML = `
    <button id="purchase" onClick="purchase()">Zavrsi porudzbinu</button>
    <hr>Ukupan racun: ${totalItems}`;

    container.remove(element); 

    console.log(name);

    items.forEach(function(pizza){
        let nameItem = pizza.querySelector(`.content h3`).innerText;
        if(nameItem === name){
            pizza.querySelector(`.action input`).value = 0;
            pizza.querySelector(`.action button`).removeAttribute(`disabled`);

            pizza.querySelector(`.action button`).innerText = `Dodaj`;
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
    alert(`Uspesno izvrsena kupovina, vas racun je ${totalItems}`);
    totalItems -= totalItems;
    total.innerHTML = `
        <hr>Ukupan racun: ${totalItems}
    `;

    console.log(totalItems);

    console.log(selectedItems);
    
    container.remove();

    items.forEach(function(pizza){
        let nameItem = pizza.querySelector(`.content h3`).innerText;
        if(nameItem === name){
            pizza.querySelector(`.action input`).value = 0;
            pizza.querySelector(`.action button`).removeAttribute(`disabled`);

            pizza.querySelector(`.action button`).innerText = `Dodaj`;
        }
        console.log(nameItem)
    });
    
}
