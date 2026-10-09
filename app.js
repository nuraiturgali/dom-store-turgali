const store = new Store([
    {
        name: "Coffee",
        price: 1500,
        qty: 2
    },
    {
        name: "Cake",
        price: 2500,
        qty: 1
    },
    {
        name: "Tea",
        price: 1000,
        qty: 3
    }
]);


const form = document.querySelector("#product-form");

const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const qtyInput = document.querySelector("#qty");

const nameError = document.querySelector("#name-error");
const priceError = document.querySelector("#price-error");
const qtyError = document.querySelector("#qty-error");

const productList = document.querySelector("#product-list");
const totalElement = document.querySelector("#total");


function render() {

    productList.innerHTML = "";

    store.products.forEach((product, index) => {

        const productElement = document.createElement("div");

        productElement.className = "product";

        productElement.innerHTML = `
            <div class="product-name">
                ${product.name}
            </div>

            <div>
                ${product.price} ₸
            </div>

            <div>
                Qty: ${product.qty}
            </div>

            <div class="actions">

                <button
                    data-action="decrease"
                    data-index="${index}"
                >
                    −
                </button>

                <button
                    data-action="increase"
                    data-index="${index}"
                >
                    +
                </button>

                <button
                    class="delete"
                    data-action="delete"
                    data-index="${index}"
                >
                    Delete
                </button>

            </div>
        `;

        productList.appendChild(productElement);
    });


    totalElement.textContent =
        store.total.toFixed(2);
}


function clearErrors() {

    nameError.textContent = "";
    priceError.textContent = "";
    qtyError.textContent = "";
}


function validateForm() {

    clearErrors();

    let valid = true;

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const qty = Number(qtyInput.value);


    if (name === "") {

        nameError.textContent =
            "Product name is required.";

        valid = false;
    }


    if (
        priceInput.value === "" ||
        price <= 0
    ) {

        priceError.textContent =
            "Price must be greater than 0.";

        valid = false;
    }


    if (
        qtyInput.value === "" ||
        Number.isNaN(qty)
    ) {

        qtyError.textContent =
            "Quantity must be a number.";

        valid = false;
    }


    return valid;
}


form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }


    const product = {

        name: nameInput.value.trim(),

        price: Number(priceInput.value),

        qty: Number(qtyInput.value)
    };


    store.add(product);

    form.reset();

    clearErrors();

    render();
});


productList.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }


    const action = button.dataset.action;

    const index = Number(button.dataset.index);


    if (action === "delete") {

        store.remove(index);
    }


    if (action === "increase") {

        store.updateQty(index, 1);
    }


    if (action === "decrease") {

        store.updateQty(index, -1);
    }


    render();
});


render();