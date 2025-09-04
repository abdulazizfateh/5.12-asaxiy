const cartInfoWrapper = document.querySelector(".cart_info_wrapper");
const cartNotFound = document.querySelector(".cart_info_not_found");
const cartInfoProductsWrapperEl = document.querySelector(".cart_info_products");
const cartCountEl = document.querySelector(".cart_count");
const cartTotalEl = document.querySelector(".cart_total");
const cartCountHeaderEl = document.querySelector(".cart_count_header");
const likedCountHeaderEl = document.querySelector(".liked_count_header");

let cartData = JSON.parse(localStorage.getItem("cart"));
let likedData = JSON.parse(localStorage.getItem("liked"));
cartCountHeaderEl.textContent = cartData.length;
likedCountHeaderEl.textContent = likedData.length;

cartCountEl.textContent = cartData.length;
const renderCartData = () => {
    cartInfoProductsWrapperEl.innerHTML = "";
    cartData.map((item) => {
        const newProductCart = document.createElement("div");
        newProductCart.innerHTML = `
                            <div class='cart_info_product flex p-4 flex-col items-start md:flex-row md:items-center gap-2 border-b border-[#e5e5e5]'>
                                <div class="cart_info_image">
                                    <img class="w-[80px] h-[80px] xl:w-[124px] xl:h-[124px] object-cover"
                                        src='${item.image}'
                                        alt="${item.title}">
                                </div>
                                <div class="cart_info_body w-full flex items-center gap-3 xl:gap-9 justify-between">
                                    <p class="md:w-[270px] text-sm md:text-base font-[P4]">${item.title}</p>
       <div class="flex flex-col items-end gap-1 md:gap-6 md:items-center md:flex-row">
                                    <div class="md:w-[200px] flex items-center gap-6">
                                        <button ${item.quantity <= 1 ? "disabled" : ""} data-id="${item.id}"
                                            class="decrease_quantity size-[30px] flex items-center justify-center pb-[3px] bg-white border border-primary rounded-full">-</button>
                                        <p class="product_quantity font-[P4] text-lg">${item.quantity}</p>
                                        <button data-id="${item.id}"
                                            class="increase_quantity size-[30px] flex items-center justify-center pb-[3px] bg-white border border-primary rounded-full">+</button>
                                    </div>
                                    <div class="lg:w-[140px] flex flex-col gap-1">
                                        <p class="text-lg font-[P6] text-primary">$${item.price}</p>
                                        <p class="text-sm text-start hidden md:block text-third border border-third rounded-sm px-2">$${(item.price / 12).toFixed(2)} per month</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <img data-id="${item.id}" class="w-6 cursor-pointer" src="../assets/images/icon-heart.svg" alt="Heart Icon">
                                        <img data-id="${item.id}" class="remove_product cursor-pointer w-6" src="../assets/images/icon-trash.svg" alt="Trash Icon">
                                    </div></div> 
                                </div>
                            </div>
        `
        cartInfoProductsWrapperEl.append(newProductCart);
    })
}
renderCartData();

cartInfoProductsWrapperEl.addEventListener("click", (e) => {
    const id = +e.target.dataset.id;
    let product = cartData.find((item) => item.id === id);
    if (product) {
        if (e.target.classList.contains("increase_quantity")) {
            product.quantity += 1;
            calcTotalPrice();
        } else if (e.target.classList.contains("decrease_quantity")) {
            product.quantity -= 1;
            calcTotalPrice();
        }

        if (e.target.classList.contains("remove_product")) {
            product.quantity = 0;
            cartData = cartData.filter(item => item.id !== id);
            renderCartData();
            checkCart();
            cartCountEl.textContent = cartData.length;
            calcTotalPrice();
            cartCountHeaderEl.textContent = cartData.length;
        }

        const parent = e.target.closest(".cart_info_product");
        const quantityEl = parent.querySelector(".product_quantity");
        const decreaseBtn = parent.querySelector(".decrease_quantity");
        quantityEl.textContent = product.quantity;
        if (product.quantity <= 1) {
            decreaseBtn.setAttribute("disabled", "true");
        } else {
            decreaseBtn.removeAttribute("disabled");
        }
        localStorage.setItem("cart", JSON.stringify(cartData));
    }
})
const calcTotalPrice = () => {
    const total = cartData.reduce((sum, item) => {
        return (sum += (+item.quantity * +item.price));
    }, 0)
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
}
calcTotalPrice();

const checkCart = () => {
    if (!cartData.length) {
        cartNotFound.style.display = "flex";
        cartInfoWrapper.style.display = "none";
    }
}
checkCart();

