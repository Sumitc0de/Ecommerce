import { clothSet } from './products.js';
import addToCart from './addTocart.js';

function viewProduct(productID) {

    // console.log(productID);
    const product = clothSet.find(item => item.id === productID);

    if (product) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `<div id="product_view_container" 
        class="fixed left-0 top-0 z-[99999] w-full h-full bg-[#00000097] flex items-center justify-center ">
        <div id="poduct_page"
            class="w-[60%] h-[70%] bg-white flex items-center justify-center rounded-lg overflow-hidden">
            <div class="h-full w-[50%] flex items-center justify-center bg-cover bg-center">
            <img src="${product.image}" alt="product-image" class="w-full h-full object-cover">
            </div>

            <div class="h-full w-[50%] p-8 flex flex-col items-start justify-start gap-2 relative">

               
                <div id="closed-btn" class="absolute right-3 top-3  "><ion-icon name="close-outline"
                        class="w-6 h-6 bg-black rounded-4xl p-2 text-white"></ion-icon></div>

                <h1 class="lg:text-2xl lg:font-semibold">${product.productName}</h1>
                <p class="lg:text-xl">RS.${product.price}</p>
                <p class="text-gray-500">Rating : ${product.rating} (${product.reviews} reviews)</p>
                <p class="text-gray-500">Category : ${product.category}</p>
                <p class="text-gray-500"> ${product.description}</p>
                <br>
                <div id="add_to_cart_container" class="w-full h-12 flex items-center justify-center gap-2 mt-3">
                    <div id="add_counter_box" class="w-[30%] h-full bg-white flex items-center border-2 border-black justify-between px-4">
                        <ion-icon name="add-outline" id="increment_btn" class="text-lg"></ion-icon>
                        <p>1</p>
                        <ion-icon name="remove-outline" id="decrement_btn" class="text-lg"></ion-icon>

                    </div>
                    <button id="addCartBtn" class="w-[70%] h-full bg-black rounded-sm text-white">Add To Cart</button>
                </div>
                <button class="w-full h-12 bg-black rounded-sm text-white mt-5  ">But It Now</button>
                <p class="mt-4"><a href="">View Full Details &#8594;</a></p>
            </div>
        </div>
    </div>`;

        document.body.appendChild(productDiv);
        document.body.style.overflow = 'hidden';

        productDiv.querySelector("#closed-btn").addEventListener("click", () => {
            document.body.removeChild(productDiv);
            document.body.style.overflow = 'auto';
        })

        productDiv.querySelector("#increment_btn").addEventListener("click", () => {
            const counterBox = productDiv.querySelector("#add_counter_box p");
            let currentQty = parseInt(counterBox.textContent);
            if (currentQty < product.stock) {
                currentQty++;
                counterBox.textContent = currentQty;
                addToCart(productID, currentQty);
            }
        });

        productDiv.querySelector("#decrement_btn").addEventListener("click", () => {
            const counterBox = productDiv.querySelector("#add_counter_box p");
            let currentQty = parseInt(counterBox.textContent);
            if (currentQty > 1) {
                currentQty--;
                counterBox.textContent = currentQty;
                addToCart(productID, currentQty);
            }
        });

        productDiv.querySelector("#addCartBtn").addEventListener("click", () => {
            const qty = parseInt(productDiv.querySelector("#add_counter_box p").textContent);
            for (let i = 0; i < qty; i++) {
                addToCart(productID);
            }
            document.body.removeChild(productDiv);
            document.body.style.overflow = 'auto';
        });
    }






}

export default viewProduct;