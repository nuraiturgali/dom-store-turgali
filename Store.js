class Store {
    #products = [];

    constructor(products = []) {
        this.#products = products;
    }

    add(product) {
        this.#products.push(product);
    }

    remove(index) {
        this.#products.splice(index, 1);
    }

    updateQty(index, change) {
        const product = this.#products[index];

        if (!product) return;

        product.qty += change;

        if (product.qty < 0) {
            product.qty = 0;
        }
    }

    get products() {
        return this.#products;
    }

    get total() {
        return this.#products.reduce(
            (sum, product) => sum + product.price * product.qty,
            0
        );
    }
}