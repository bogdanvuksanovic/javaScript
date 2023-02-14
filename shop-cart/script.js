let totalItems = 0;
let itemsInCart = [];
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
        let itemsInCart = {
            name: name,
            price: price,
            quantity: quantityInt,
            priceAll: totalItem
        }
        
        items.innerHTML += `
        <div class="selected-items">
            <h3>${name}</h3>
            <p>Cena: ${price}<br>
            Kolicina: ${quantityInt}<br>
            Cena: <span>${totalItem}</span>
            <button id="dltBtn" onClick="removeItem(this)">Obrisati porudzbinu</button>
        </div>
        `;
        localStorage.setItem(`shopCart`, JSON.stringify(itemsInCart));

        element.innerText = `Dodato`;
        //element.setAttribute(`disabled`,``);

        total.innerHTML = `<hr>Ukupan racun: ${totalItems}`;

        console.log(totalItems)

    }else{
        alert(`Dodati kolicinu`)
    }
}

function removeItem(element){

    let container = element.closest(`.selected-items`);
    let totalItem = container.querySelector(`p span`).innerText;
    let total = document.querySelector(`.total`);
    //console.log(price)
    totalItem = parseInt(totalItem);

    //console.log(typeof(totalItems))

    totalItems -= totalItem;
    total.innerHTML = `<hr>Ukupan racun: ${totalItems}`;

    container.remove();

    
}