class Product {
    #id
    #title
    #description
    #price
    #thumbnails
    #stock
    #category
    #code
    #status


    constructor( title, description, price, thumbnails = [], stock, category, code) {
        this.#title = title,
        this.#description = description,
        this.#price = price,
        this.#thumbnails = thumbnails,
        this.#stock = stock,
        this.#category = category,
        this.#code = code,
        this.#status = true
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getPrice() {
        return this.#price;
    }

    getThumbnails() {
        return this.#thumbnails;
    }

    getStock() {
        return this.#stock;
    }

    getCategory() {
        return this.#category;
    }

    getCode() {
        return this.#code;
    }

    getStatus() {
        return this.#status;
    }

    setId(id) {
        this.#id = id;
    }

    setTitle(title) {
        this.#title = title;
    }

    setDescription(description) {
        this.#description = description;
    }

    setPrice(price) {
        this.#price = price;
    }

    setThumbnails(thumbnails) {
        this.#thumbnails = thumbnails;
    }

    setStock(stock) {
        this.#stock = stock;
    }

    setCategory(category) {
        this.#category = category;
    }

    setCode(code) {
        this.#code = code;
    }

    setStatus(status) {
        this.#status = status;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            price: this.#price,
            thumbnails: this.#thumbnails,
            stock: this.#stock,
            category: this.#category,
            code: this.#code,
            status: this.#status
        }
    }
}

export default Product;