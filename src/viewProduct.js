import { clothSet } from './products.js';
import addToCart from './addTocart.js';

window.addEventListener("DOMContentLoaded", () => {
    const savedCart = localStorage.getItem("cart");
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
        const items = JSON.parse(savedCartItems);
        cart(items);
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
    localStorage.setItem("cartItems", JSON.stringify(Array.from(cartItems)));
}

function viewProduct(productID) {
    const product = clothSet.find(item => item.id === productID);

    if (product) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
        <div id="product_view_container" 
            class="fixed left-0 top-0 z-[99999] w-full h-full bg-[#00000097] flex items-center justify-center">
            <div id="poduct_page"
                class="w-[60%] h-[70%] bg-white flex items-center justify-center rounded-lg overflow-hidden">
                <div class="h-full w-[50%] flex items-center justify-center bg-cover bg-center">
                    <img src="${product.image}" alt="product-image" class="w-full h-full object-cover">
                </div>

                <div class="h-full w-[50%] p-8 flex flex-col items-start justify-start gap-2 relative">
                    <div id="closed-btn" class="absolute right-3 top-3">
                        <ion-icon name="close-outline"
                            class="w-6 h-6 bg-black rounded-4xl p-2 text-white cursor-pointer"></ion-icon>
                    </div>

                    <h1 class="lg:text-2xl lg:font-semibold">${product.productName}</h1>
                    <p class="lg:text-xl">RS.${product.price}</p>
                    <p class="text-gray-500">Rating: ${product.rating} (${product.reviews} reviews)</p>
                    <p class="text-gray-500">Category: ${product.category}</p>
                    <p class="text-gray-500">${product.description}</p>

                    <br>
                    <div id="add_to_cart_container" class="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
  <button id="addCartBtn" class="w-full sm:w-[70%] h-12 bg-black text-white rounded-sm">
    Add To Cart
  </button>
</div>


                    
                    <p class="mt-4"><a href="#">View Full Details &#8594;</a></p>
                </div>
            </div>
        </div>`;

        document.body.appendChild(productDiv);
        document.body.style.overflow = 'hidden';

        const counterText = productDiv.querySelector("#add_counter_box p");

        // Close modal
        productDiv.querySelector("#closed-btn").addEventListener("click", () => {
            document.body.removeChild(productDiv);
            document.body.style.overflow = 'auto';
        });
        
        // Add to Cart
        productDiv.querySelector("#addCartBtn").addEventListener("click", () => {
            addToCart(productID); 
            document.body.removeChild(productDiv);
            document.body.style.overflow = 'auto';
        });
    }
}

export default viewProduct;
