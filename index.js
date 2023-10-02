import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

const appSettings = {
    databaseURL: "https://shopping-list-8ded5-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(itemsInDB, inputValue)
    clearInputFieldEl()
})

onValue(itemsInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()
        /*
        for ( let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            addItemToList(currentItemValue)
        }

         */

        itemsArray.map((item) => {
            renderList(item)
        })

    } else {
        shoppingListEl.textContent = "No items here.... yet!"
    }

})


function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function renderList(item) {
    let newEl = document.createElement("li")
    let currentItemID = item[0]
    let currentItemValue = item[1]
    newEl.addEventListener("dblclick", function () {
        let exactLocationInDB = ref(database, `items/${currentItemID}`)
        remove(exactLocationInDB)
    })

    newEl.textContent = currentItemValue
    shoppingListEl.append(newEl)
}