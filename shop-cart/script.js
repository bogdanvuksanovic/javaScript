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

 

    //console.log(typeof(quantityInt))


    if(quantityInt > 0){
        let totalItem = quantityInt * price;
        totalItems += totalItem;
        /*itemsInCart = {
            name: name,
            price: price,
            quantity: quantityInt,
            priceAll: totalItem
        }*/
        
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
                <button id="dltBtn" onClick="removeItem(this)">Obrisati porudzbinu</button>
            </div>
        </div>
        `;
        
        localStorage.setItem("shopCart", JSON.stringify(cart));
        element.innerText = `Dodato`;
        //element.setAttribute(`disabled`,``);

        total.innerHTML = `
        <button id="purchase" onClick="purchase()">Zavrsi porudzbinu</button>
        <hr>Ukupan racun: ${totalItems}
        `;

        console.log(totalItems)

    }else{
        alert(`Dodati kolicinu`)
    }
}

function updateList(){
    
}

function removeItem(element){

    let container = element.closest(`.selected-items`);
    let totalItem = container.querySelector(`span`).innerText;
    let total = document.querySelector(`.total`);
    //console.log(price)
    totalItem = parseInt(totalItem);

    //console.log(typeof(totalItems))

    totalItems -= totalItem;
    total.innerHTML = `
    <button id="purchase" onClick="purchase()">Zavrsi porudzbinu</button>
    <hr>Ukupan racun: ${totalItems}`;

    container.remove(element); 
}

function purchase(){

    let container = document.querySelector(".items");
    let total = document.querySelector(`.total`);
    let totalItem = container.querySelector(`span`).innerText;

    //console.log(price)
    totalItem = parseInt(totalItem);

    console.log(typeof(totalItems))
    alert(`Uspesno izvrsena kupovina, vas racun je ${totalItems}`);
    totalItems -= totalItems;
    total.innerHTML = `
        <hr>Ukupan racun: ${totalItems}
    `;

    console.log(totalItems)

    console.log(container);
    
    container.remove();
    
}
