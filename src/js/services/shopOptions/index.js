export default class ShopOptions{
    constructor(){
        this.popular = this.getFromLocalStorage('popular');
        this.wishList = this.getFromLocalStorage('wishList');
        this.cartList = this.getFromLocalStorage('cartList');
        this.sumCartList = +this.getFromLocalStorage('sumCartList');
        this.counterNewProduct = 6;

        // Сделать также как в EKEA
        // При "Ничего не найдено" показывает:
        // Популярные товар, и также , как у них на сайте
    }

    getFromLocalStorage(key) {
        return localStorage.getItem(key) ?
            JSON.parse(localStorage.getItem(key)) : []
    }

    setInLocalStorage(key, arr) {
        localStorage.setItem(key, JSON.stringify(arr))
    }
}
// Удалять пробелы в поиске