import { clothSet } from './products.js';
import cart from './cart.js';

// Track added product IDs
const cartItems = new Set();


// Load saved cart HTML on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedCart = localStorage.getItem("cart");
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {   
        const items = JSON.parse(savedCartItems);
        cart(items)
    }

    if (savedCart) {
        document.getElementById("cart-section").innerHTML = savedCart;
        reattachEvents(); // reattach events to loaded elements
        getTotalCartQty(); // update total on reload
    }
});

function saveCart() {
    const cartHTML = document.getElementById("cart-section").innerHTML;
    localStorage.setItem("cart", cartHTML);
    localStorage.setItem("cartItems",JSON.stringify(Array.from(cartItems)));
}

function getTotalCartQty() {
    let total = 0;
    document.querySelectorAll("#cart-section .qty").forEach(qtyEl => {
        total += parseInt(qtyEl.textContent);
    });
    // console.log("🛒 Total Items in Cart:", total);
    const counter = document.getElementById("cart_item_counter");
    if (counter) counter.textContent = total;
}

function addToCart(productID) {
    const product = clothSet.find(item => item.id === productID);
    const cartContainer = document.getElementById("cart-container");
    const cartItemContainer = document.getElementById("cart-section");

console.log(cartItems);
    
    // Open cart
    cartContainer.style.width = "30%";

    // Cart close button
    const cartCloseButton = document.getElementById("closed-btn");
    cartCloseButton.addEventListener("click", () => {
        cartContainer.style.width = "0%";
    });

    // Check if product already added
    if (cartItems.has(productID)) {
        return; // Don't add again
    }

    // Mark product as added
    cartItems.add(productID);

    // Create cart item
    const cartItem = document.createElement('div');
    cartItem.className = "my-2 w-full h-[12vw] flex items-center justify-center border-[1px] border-[#857d7d9e] rounded-sm overflow-hidden";
    cartItem.innerHTML = `
        <div class="w-[40%] h-full bg-cover bg-center" style="background-image: url(${product.image});"></div>
        <div class="w-[60%] h-full px-4 pt-1">
            <p class="text-gray-900 font-semibold">${product.productName}</p>
            <div class="w-full h-2 py-3 flex items-center gap-5">
                <p class="text-gray-900 font-semibold">Color: <span class="font-normal">${product.color || 'N/A'}</span></p>
                <p class="text-gray-900 font-semibold">Size: <span class="font-normal">${product.sizes}</span></p>
            </div>
            <p>Rs. ${product.price}</p>
            <div class="flex items-center justify-start w-[9vw] h-[3.5vw] bg-[#F6F6F6] border-[1px] border-[#857d7d9e] rounded-xs overflow-hidden mt-4">
                <div class="w-[70%] h-full bg-white flex items-center gap-2 justify-between px-4 text-gray-700">
                    <ion-icon name="add-outline" class="add-outline cursor-pointer text-lg w-5 h-5" ></ion-icon>
                    <p class="qty">1</p>
                    <ion-icon name="remove-outline" class="remove-outline cursor-pointer text-lg w-5 h-5"></ion-icon>
                </div>
                <div class="flex items-center justify-center w-[30%] h-full">
                    <ion-icon name="trash" class="trash-icon cursor-pointer text-lg w-5 h-5"></ion-icon>
                </div>
            </div>
        </div>`;

    cartItemContainer.appendChild(cartItem);
    saveCart();
    getTotalCartQty();

    // Events for this cart item only
    const qtyElement = cartItem.querySelector(".qty");

    cartItem.querySelector(".add-outline").addEventListener("click", () => {
        qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
        saveCart();
        getTotalCartQty();
    });

    cartItem.querySelector(".remove-outline").addEventListener("click", () => {
        let qty = parseInt(qtyElement.textContent);
        if (qty > 1) {
            qtyElement.textContent = qty - 1;
            saveCart();
            getTotalCartQty();
        }
    });

    cartItem.querySelector(".trash-icon").addEventListener("click", () => {
        cartItemContainer.removeChild(cartItem);
        cartItems.delete(productID);
        saveCart();
        getTotalCartQty();
        if (cartItemContainer.children.length === 0) {
            cartContainer.style.width = "0%";
        }
    });
}

// 🔁 Reattach click events after loading from localStorage
function reattachEvents() {
    const cartItemContainer = document.getElementById("cart-section");
    const cartContainer = document.getElementById("cart-container");

    cartItemContainer.querySelectorAll(".my-2").forEach(cartItem => {
        const qtyElement = cartItem.querySelector(".qty");

        cartItem.querySelector(".add-outline").addEventListener("click", () => {
            qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
            saveCart();
            getTotalCartQty();
        });

        cartItem.querySelector(".remove-outline").addEventListener("click", () => {
            let qty = parseInt(qtyElement.textContent);
            if (qty > 1) {
                qtyElement.textContent = qty - 1;
                saveCart();
                getTotalCartQty();
            }
        });

        cartItem.querySelector(".trash-icon").addEventListener("click", () => {
            cartItem.remove();
            saveCart();
            getTotalCartQty();
            if (cartItemContainer.children.length === 0) {
                cartContainer.style.width = "0%";
            }
        });
    });
}

export default addToCart;
