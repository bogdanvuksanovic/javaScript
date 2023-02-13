let totalItems = 0;
function addToCart(element){
let container = element.closest(`.item`);
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
    items.innerHTML += `
    <div class="selected-items">
        <h3>${name}</h3>
        <p>Cena: ${price}<br>Kolicina: ${quantityInt}<br>Cena: ${price}
        <button id="dltBtn" onClick="removeItem()">Remove Item</button>
    </div>
    `;

    element.innerText = `Added`;
    element.setAttribute(`disabled`,``);

    total.innerHTML = `<hr>Ukupan racun: ${totalItems}`

    console.log(totalItems)

}else{
    console.log(`Dodati kolicinu`)
}


}