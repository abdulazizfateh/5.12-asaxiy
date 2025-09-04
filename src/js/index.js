const API = "https://68b8916ab7154050432895c3.mockapi.io/products";

const productsWrapperEl = document.querySelector(".products_card_wrapper");
const cartCountHeaderEl = document.querySelector(".cart_count_header");
const likedCountHeaderEl = document.querySelector(".liked_count_header");
let productsData = [];

let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let likedData = JSON.parse(localStorage.getItem("liked")) || [];
cartCountHeaderEl.textContent = cartData.length;
likedCountHeaderEl.textContent = likedData.length;

const getProductData = async () => {
    const response = await fetch(API);
    const data = await response.json();
    productsData = data;
    renderProductCards(data);
}
getProductData();

const renderProductCards = (data) => {
    productsWrapperEl.innerHTML = "";
    data?.map((item) => {
        const newProductCard = document.createElement("div");
        newProductCard.className = "product_card bg-white rounded-[20px] overflow-hidden flex flex-col";
        newProductCard.innerHTML = `
                            <div class="product_card_image relative flex items-center justify-center">
                                <img class="h-40 object-cover"
                                    src="${item.image}"
                                    alt="">
                                    <img data-id="${item.id}" class="like_btn w-5 cursor-pointer absolute top-4 right-3" src="./assets/images/icon-heart.svg" alt="" />
                            </div>
                            <div class="product_card_body p-4 flex flex-col flex-1">
                                <p class="text-sm font-[P4] line-clamp-2 mb-2">${item.title}</p>
                                <div class="flex-1 flex flex-col justify-end">
                                    <div class="flex items-center justify-between gap-2 mb-3">
                                    <div class="flex items-center gap-1">
                                        <img src="./assets/images/icon-star.svg" alt="Star Icon">
                                        <img src="./assets/images/icon-star.svg" alt="Star Icon">
                                        <img src="./assets/images/icon-star.svg" alt="Star Icon">
                                        <img src="./assets/images/icon-star.svg" alt="Star Icon">
                                        <img src="./assets/images/icon-star.svg" alt="Star Icon">
                                        <img src="./assets/images/icon-star.svg" alt="Star Iconˆ">
                                    </div>
                                    <p class="text-xs text-secondary-text font-[P4]">${item.reviewCount} reviews</p>
                                </div>
                                <p class="text-xl font-bold text-primary mb-2">$${item.price}</p>
                                <div class="w-full h-[30px] border border-third rounded-sm flex items-center p-[5px]">
                                    <p class="text-sm font-[P4] text-third">$${(item.price / 12).toFixed(2).replace('.', ',')} x 12 month</p>
                                </div>
                                <div class="mt-4">
                                ${cartData.some((i) => i.id === item.id) ?
                `<button data-id='${item.id}' class="product_card_body_remove_btn w-full h-10 rounded-lg bg-white border border-primary">
                                    <p data-id='${item.id}' class="product_card_body_remove_btn text-primary text-sm font-[P6] tracking-wide">Remove from cart</p>
                                </button>` :
                `<button data-id='${item.id}' class="product_card_body_add_btn w-full h-10 rounded-lg bg-primary">
                                        <p data-id='${item.id}' class="product_card_body_add_btn text-white text-sm font-[P6] tracking-wide">Add to cart</p>
                                    </button>`
            }
                                </div>
                                </div>
                            </div>
        `
        productsWrapperEl.append(newProductCard);
    })
}


productsWrapperEl.addEventListener("click", (e) => {
    const id = +e.target.dataset.id;
    const product = productsData.find((item) => item.id === id);
    if (e.target.classList.contains("product_card_body_add_btn")) {
        cartData = [...cartData, { ...product, quantity: 1 }];
        cartCountHeaderEl.textContent = cartData.length;
        renderProductCards(productsData);
    } else if (e.target.classList.contains("product_card_body_remove_btn")) {
        cartData = cartData.filter((item) => item.id !== id);
        cartCountHeaderEl.textContent = cartData.length;
        renderProductCards(productsData);
    } else if (e.target.classList.contains("like_btn")) {
        const doesExist = likedData.some((item) => item.id === id);
        if (!doesExist) {
            likedData = [...likedData, product];
            likedCountHeaderEl.textContent = likedData.length;
        } else {
            likedData = likedData.filter((item) => item.id !== id);
            likedCountHeaderEl.textContent = likedData.length;
        }
    }
    localStorage.setItem("liked", JSON.stringify(likedData));
    localStorage.setItem("cart", JSON.stringify(cartData));
})