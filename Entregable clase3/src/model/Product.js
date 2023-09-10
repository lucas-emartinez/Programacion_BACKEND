class Product {

    // Principio de encapsulamiento, 
    // solo se puede acceder a los atributos de la clase a través de los getter y setter
    // Los atributos de la clase son privados, no se puede acceder a ellos desde afuera de la clase
    #id;
    #title;
    #stock;
    #price;
    #code;
    #thumbnail;
    #description;

    constructor(title, description, stock, price, code, thumbnail) {
        this.#title = title;
        this.#description = description
        this.#stock = stock;
        this.#price = price;
        this.#code = code;
        this.#thumbnail = thumbnail
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getTitle() {
        return this.#title;
    }

    setTitle(title) {
        this.#title = title;
    }

    getStock() {
        return this.#stock;
    }

    setStock(stock) {
        this.#stock = stock;
    }

    getPrice() {
        return this.#price;
    }

    setPrice(price) {
        this.#price = price;
    }

    getCode() {
        return this.#code;
    }

    setCode(code) {
        this.#code = code;
    }

    getThumbnail() {
        return this.#thumbnail;
    }

    setThumbnail(thumbnail) {
        this.#thumbnail = thumbnail;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            stock: this.#stock,
            price: this.#price,
            code: this.#code,
            thumbnail: this.#thumbnail
        }
    }
    
}

module.exports = Product;


