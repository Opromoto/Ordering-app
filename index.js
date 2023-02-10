import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { menuArray } from './data.js'

// GLOBAL SCOPE *INITIALIZE*
const purchase = document.getElementById("purchase")
const form = document.getElementById("form")

let purchaseArray = []


// MAIN CLICK HANDLER
document.addEventListener('click', function(e) {

        menuArray.forEach(function(menu) {
            if (e.target.id == menu.id) {
                handlePurchaseRender(menu)
            }
        })
        if (e.target.dataset.remove) {
            removePurchase(e)
        } else if (e.target.id === "order-btn") {
            handlePayment()
        }
        // else if (e.target.id === payBtn) {
        //     handleForm(e)            
        // }



    })
form.addEventListener("submit", function(e) {
    e.preventDefault()
    let formData = new FormData(form)
    document.getElementById("modal").style.display = "none"

    let  userName = formData.get("full-name")
    purchase.innerHTML = `<div class="message-div">
                            <p>Thanks ${userName}! your order is on its way</p>
                        </div>`
   
})
    // FUNCTIONS


function handlePayment() {

    if (document.getElementById("modal").style.display !== "flex") {
        document.getElementById("modal").style.display = "flex"
        let amount = 0
        purchaseArray.forEach((item) => {
            amount += item.price
        })
        document.getElementById("order-btn").style.background = "#6da391"
        form.innerHTML += ` <input type="submit" value="Pay  ${" $" + amount}" id="pay-btn">`
    }

}

function handlePurchaseRender(menuObj) {
    purchase.style.display = 'block'
    pushPurchase(menuObj)
}

function pushPurchase(menuObj) {
    if (!purchaseArray.find(obj => JSON.stringify(obj) === JSON.stringify(menuObj))) {
        purchaseArray.push(menuObj)
        menuObj.uuid = uuidv4()
        renderPurchase()
    }




}

function renderPurchase() {
    let totalPrice = 0
    let purchaseString = ''
    let totalString = ''

    purchaseArray.forEach((item) => {
        purchaseString += `
                    <div class="purchase-section" id='remove-${item.id}'>
                        <h3>${item.name}</h3>
                        <p data-remove="${item.uuid}">remove</p>
                        <h5>${'$' + item.price}</h5>
                    </div>`
        totalPrice += item.price
        totalString = `<div class="total-price">
                        <h3>Total price:</h3>
                        <h5>${'$' + totalPrice}</h5>
                    </div>
                    <button id="order-btn">Complete order</button>`
    })
    purchase.innerHTML = `<h3>Your order</h3>
                        <div class="append" id="append">
                            ${purchaseString}
                        </div>
                        <div class="append-total-price">
                            ${totalString}
                        </div>`

}

function removePurchase(e) {

    purchaseArray = purchaseArray.filter(function(item) {
        return item.uuid !== e.target.dataset.remove

    })
    if (purchaseArray[0]) {
        renderPurchase()
    } else {
        purchase.innerHTML = ''
    }
}



// RENDER MENU ITEMS ONCE PAGE LOADS 

function getHtmlString() {
    let htmlString = ''

    menuArray.forEach(function(menu) {
        let ingredient = ''
        for (let i in menu.ingredients) {
            if (Number(i) === menu.ingredients.length - 1) {
                ingredient += menu.ingredients[i]
            } else {
                ingredient += menu.ingredients[i] + ', '
            }
        }

        htmlString += `
                <div class="menu-item">
                    <h1>${menu.emoji}</h1>
                    <div>
                        <h3>${menu.name}</h3>
                        <p>${ingredient}</p>
                        <h4>${'$' + menu.price}</h4>
                    </div>
                    <button id='${menu.id}'>+</button>
                </div>`
    })
    return htmlString
}

function renderHtml() {
    document.querySelector('main').innerHTML = getHtmlString()
}
renderHtml()