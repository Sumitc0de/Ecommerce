import { clothSet } from './products.js';

// Track added product IDs
const cartItems = new Set();

// Load saved cart HTML and items from localStorage
window.addEventListener("DOMContentLoaded", () => {
    try {
        const savedCart = localStorage.getItem("cart");
        const savedCartItems = localStorage.getItem("cartItems");

        if (savedCartItems) {
            const items = JSON.parse(savedCartItems);
            if (Array.isArray(items)) {
                items.forEach(id => cartItems.add(id));
            }
            
           
        }

        if (savedCart) {
            const cartSection = document.getElementById("cart-section");
            if (cartSection) {
                cartSection.innerHTML = savedCart;
                reattachEvents();
                getTotalCartQty();
                getTotalCartPrice();
            }
        }
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
    }
});

function saveCart() {
    try {
        const cartSection = document.getElementById("cart-section");
        if (cartSection) {
            const cartHTML = cartSection.innerHTML;
            localStorage.setItem("cart", cartHTML);
            localStorage.setItem("cartItems", JSON.stringify(Array.from(cartItems)));
        }
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
}


function getTotalCartQty() {
    let total = 0;
    document.querySelectorAll("#cart-section .qty").forEach(qtyEl => {
        total += parseInt(qtyEl.textContent);
    });
    const counter = document.getElementById("cart_item_counter");
    if (counter) counter.textContent = total;
    return total;
}

function getTotalCartPrice() {
    let totalPrice = 0;
    const cartItems = document.querySelectorAll("#cart-section .my-2");

    cartItems.forEach(cartItem => {
        const name = cartItem.querySelector("p").textContent.trim();
        const qty = parseInt(cartItem.querySelector(".qty").textContent);
        const match = clothSet.find(p => p.productName === name);
        if (match) {
            const price = parseInt(match.price);
            totalPrice += price * qty;
            console.log(price);
        }
    });

    const priceEl = document.getElementById("total_price");
    if (priceEl) priceEl.textContent = `Total: ₹ ${totalPrice.toLocaleString('en-IN')}`;
}

function addToCart(productID) {
    const product = clothSet.find(item => item.id === productID);
    const cartContainer = document.getElementById("cart-container");
    const cartItemContainer = document.getElementById("cart-section");

    if (window.innerWidth <= 768) {
    cartContainer.style.width = "100%";  // On mobile
} else {
    cartContainer.style.width = "30%";   // On desktop
}

    const cartCloseButton = document.getElementById("closed-btn");
    cartCloseButton.addEventListener("click", () => {
        cartContainer.style.width = "0%";
    });

    if (cartItems.has(productID)) return;

    cartItems.add(productID);

    const cartItem = document.createElement('div');
    cartItem.className = "my-2 w-full md:h-[12vw] h-[25vh] flex items-center justify-center border-[1px] border-[#857d7d9e] rounded-sm overflow-hidden";
    cartItem.innerHTML = `
        <div class="w-[40%] h-full bg-cover bg-center">
        <img src="${product.image}" alt="${product.productName}" class="w-full h-full object-cover">
        </div>
        <div class="w-[60%] h-full px-4 pt-1">
            <p class="text-gray-900 xs:text-sm font-semibold">${product.productName}</p>
            <div class="w-full h-2 py-3 flex items-center gap-5">
                <p class="text-gray-900 xs:text-sm md:font-semibold">Color: <span class="font-normal">${product.color || 'N/A'}</span></p>
                <p class="text-gray-900 xs:text-sm md:font-semibold">Size: <span class="font-normal">${product.sizes}</span></p>
            </div>
            <p>Rs. ${product.price.toLocaleString('en-IN')}</p>
            <div class="flex items-center justify-start w-[9vw] h-[3.5vw] bg-[#F6F6F6] border-[1px] border-[#857d7d9e] rounded-xs overflow-hidden mt-4">
                <div class="w-[70%] h-full bg-white hidden md:flex items-center gap-2 justify-between px-4 text-gray-700">
                    <ion-icon name="add-outline" class="add-outline cursor-pointer text-lg w-5 h-5"></ion-icon>
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
    getTotalCartPrice(); // ✅ call to update price

    const qtyElement = cartItem.querySelector(".qty");

    cartItem.querySelector(".add-outline").addEventListener("click", () => {
        qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
        saveCart();
        getTotalCartQty();
        getTotalCartPrice();
    });

    cartItem.querySelector(".remove-outline").addEventListener("click", () => {
        let qty = parseInt(qtyElement.textContent);
        if (qty > 1) {
            qtyElement.textContent = qty - 1;
            saveCart();
            getTotalCartQty();
            getTotalCartPrice();
        }
    });

    cartItem.querySelector(".trash-icon").addEventListener("click", () => {
        cartItemContainer.removeChild(cartItem);
        cartItems.delete(productID);
        saveCart();
        getTotalCartQty();
        getTotalCartPrice();

        if (cartItemContainer.children.length === 0) {
            cartContainer.style.width = "0%";
        }
    });
}

function reattachEvents() {
    const cartItemContainer = document.getElementById("cart-section");
    const cartContainer = document.getElementById("cart-container");

    cartItemContainer.querySelectorAll(".my-2").forEach(cartItem => {
        const qtyElement = cartItem.querySelector(".qty");
        const name = cartItem.querySelector("p").textContent.trim();
        const match = clothSet.find(p => p.productName === name); // ✅ fix added

        cartItem.querySelector(".add-outline").addEventListener("click", () => {
            qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
            saveCart();
            getTotalCartQty();
            getTotalCartPrice();
        });

        cartItem.querySelector(".remove-outline").addEventListener("click", () => {
            let qty = parseInt(qtyElement.textContent);
            if (qty > 1) {
                qtyElement.textContent = qty - 1;
                saveCart();
                getTotalCartQty();
                getTotalCartPrice();
            }
        });

        cartItem.querySelector(".trash-icon").addEventListener("click", () => {
            cartItem.remove();
            if (match) cartItems.delete(match.id); // ✅ fixed
            saveCart();
            getTotalCartQty();
            getTotalCartPrice();

            if (cartItemContainer.children.length === 0) {
                cartContainer.style.width = "0%";
            }
        });
    });
}

export default addToCart;
