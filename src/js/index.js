const API = "https://68b8916ab7154050432895c3.mockapi.io/products";

const productsWrapperEl = document.querySelector(".products_card_wrapper");
const getProductData = async () => {
    const response = await fetch(API);
    const data = await response.json();
    renderProductCards(data);
}
getProductData();

const renderProductCards = (data) => {
    console.log(data);

    data?.map((item) => {
        const newProductCard = document.createElement("div");
        newProductCard.className = "product_card bg-white rounded-[20px] overflow-hidden flex flex-col";
        newProductCard.innerHTML = `
                            <div class="product_card_image flex items-center justify-center">
                                <img class="h-40 object-cover"
                                    src="${item.image}"
                                    alt="">
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
                                    <button class="product_card_body_add_btn w-full h-10 rounded-lg bg-primary">
                                        <p class="text-white text-sm font-[P6] tracking-wide">Add to cart</p>
                                    </button>
                                </div>
                                </div>
                            </div>
        `
        productsWrapperEl.append(newProductCard);
    })
}