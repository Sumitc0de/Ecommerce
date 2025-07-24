import { clothSet } from './products.js';
import viewProduct from './viewProduct.js';
import addToCart from './addTocart.js';



// console.log(clothSet);

function headerScrollEffect() {
    const header = document.querySelector("#header");
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.scrollY;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down
            header.style.top = "-40px";
        } else {
            // Scroll up
            header.style.top = '0px';
        }
        lastScrollTop = scrollTop;
    });
}

headerScrollEffect();

// function menuSection() {
//     const MenuIcon = document.getElementById("menu-icon");
//     const CloseIcon = document.getElementById("close-icon");
//     const MenuSection = document.getElementById("mobile-menu-section");

//     MenuIcon.addEventListener("click", () => {
//         MenuSection.style.display = 'block';
//         gsap.fromTo("#mobile-menu-section", 
//             { width: '0%', opacity: 0 }, 
//             { width: '320px', opacity: 1, duration: 0.3 }
//         );
//     });

//     CloseIcon.addEventListener('click', () => {
//         gsap.to("#mobile-menu-section", {
//             width: '0%',
//             opacity: 0,
//             duration: 0.3,
//             onComplete: () => {
//                 MenuSection.style.display = 'none';
//             }
//         });
//     });
// }


const productListing = () => {
    for (let i = 0; i <= clothSet.length; i++) {
        const product1 = document.createElement("div");
        product1.id = 'product-box';
        product1.className = "w-[23%] lg:h-[30vw]  rounded-xl overflow-hidden";
        product1.innerHTML = `
            <div id="product-image" class="w-full h-[80%] relative cursor-pointer overflow-hidden">
                <img src="${clothSet[i].image}" alt="shirt1" class="object-cover w-full h-full hover:scale-105 ease-out duration-200">
                
                <div id="adding-tool" class="hidden absolute bottom-4 inset-x-1 ease-in-out duration-300" >
                    <ul class="flex items-center justify-center gap-2">
                        <li id="add_to_cart" class="px-3 py-3 flex items-center justify-center rounded-4xl bg-white border-[1px] border-gray-600 hover:drop-shadow-md duration-200 ease-in-out hover:shadow-2xl"><ion-icon name="add-outline"></ion-icon></li>

                        <li id="view_product" class="px-3 py-3 flex items-center justify-center rounded-4xl bg-white border-[1px] border-gray-600 hover:drop-shadow-md duration-200 ease-in-out hover:shadow-2xl"><ion-icon name="eye-outline"></ion-icon></li>

                        <li id="wishlist" class="px-3 py-3 flex items-center justify-center rounded-4xl bg-white border-[1px] border-gray-600 hover:drop-shadow-md duration-200 ease-in-out hover:shadow-2xl"><ion-icon name="heart-outline"></ion-icon></li>
                    </ul>
                </div>
            </div>
            <div id="product-info" class="w-full h-[20%] p-4">
  <p id="prod-name" class="text-center font-semibold text-lg">${clothSet[i].productName}</p>
  <p id="prod-price" class="text-center text-green-600">RS. ${clothSet[i].price}</p>
</div>

    `;

        const productContainer = document.getElementById("product-container")
        productContainer.appendChild(product1)

        product1.querySelector("#view_product").addEventListener("click", () => {
            viewProduct(clothSet[i].id);
        })

        // let isProductAdded = false;
        product1.querySelector("#add_to_cart").addEventListener("click", () => {
            addToCart(clothSet[i].id);
            
        });








        const product2 = document.createElement("div");
        product2.className = "flex items-center justify-center w-full xs:w-[48%] xs:h-[20vw] lg:w-[32%] h-[45vw] lg:h-44 md:w-[30%]  md:h-20 rounded-lg overflow-hidden border-[1px] border-[#c9c5c5ba]";
        product2.innerHTML = `<div class="w-[40%] h-full flex items-center justify-center">
                    <img src="${clothSet[i].image}" alt="shirt1" class="w-full h-full object-cover hover:scale-105 ease-out duration-200">
                </div>

                <div class="w-[60%] h-full p-4 flex flex-col items-start justify-center bg-[#ffffffba]">
                    <p class="font-semibold lg:text-lg">${clothSet[i].productName}</p>
                    <p class="py-1.5">
                    <ul class="flex items-center justify-start gap-2">
                        <li id="add_to_cart"
                            class="px-3 py-1.5 flex items-center justify-center rounded-lg bg-white border-[1px] border-gray-600 hover:drop-shadow-md duration-200 ease-in-out hover:shadow-2xl cursor-pointer">
                            <button></button><ion-icon name="add-outline"></ion-icon></li>

                        <li id="wishlist"
                            class="px-3 py-1.5 flex items-center justify-center rounded-lg bg-white border-[1px] border-gray-600 hover:drop-shadow-md duration-200 ease-in-out hover:shadow-2xl">
                            <ion-icon name="heart-outline"></ion-icon></li>
                    </ul>
                    </p>

                    <p class="pt-4">Rs. ${clothSet[i].price}</p>
                </div>`;


        document.getElementById("sales-container").appendChild(product2);

          product2.querySelector("#add_to_cart").addEventListener("click", () => {
            addToCart(clothSet[i].id);
        });

    }
}

productListing();
