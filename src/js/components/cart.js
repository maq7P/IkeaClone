import Data from '../services/Data';
import ShopOptions from '../services/shopOptions';
import {
    addInWishList,
    addInCart
} from './addInWishList';

export default class Cart extends ShopOptions {
    constructor() {
        super()
        this.data = new Data('./assets/database/dataBase.json');
    }



    generatePage() {
        if(this.cartList.length > 0){
            const main = `
                <main>
                    <div class="container cart-wrapper">
                        <h2 class="cart-header">Корзина</h2>
                        
                        <ul class="cart-list"></ul>

                        <div class="cart-total">
                            <span class="cart-total-label">Сумма</span>
                            <span class="cart-total-price"></span>
                        </div>

                        <form id="form" class="cart-form">
                            <label>
                                <input type="text" name="name" placeholder="Ваше имя">
                            </label>
                            <label>
                                <input type="email" name="email" placeholder="Ваш email">
                            </label>
                            <button type="submit" class="cart-checkout">Оформить</button>
                        </form>
                    </div>
                </main>
            `;
            document.body.insertAdjacentHTML('beforeend', main);
        }
        const emptyCart = () => {
            if (document.querySelector('main')) {
                document.querySelector('main').remove()
            }
            const main = document.createElement('main');
            document.querySelector('header').append(main);
            main.insertAdjacentHTML('afterend', `
            <div class="cart__empty container animated fadeIn">
                <h3 class="cart__empty-header">Корзина пока что пуста</h3>
                <img src="./assets/image/cartEmpty.svg" class="cart__empty-img">
                <p class="cart__empty-text">Не готовы к покупкам? <br> Сохраните на будущее!</p>
                <a href="index.html" type="button" class="cart__empty-btn">Смотрите наши товары</a>
            </div>
            `);
        }
        const generateCards = (data) => {
            if (!data.length) {
                emptyCart();
            } else{
                const cartList = document.querySelector('.cart-list');
                let total = 0;
                data.forEach(({name, img, price, description, id, count}, i) => {
                    const currentCartList = this.cartList.find((item) => id === item.id);

                    let options = '';
                    let selected = currentCartList.count > count ? count : currentCartList.count;
                    for (let i = 1; i <= count; i++) {
                        options += `<option value="${i}" ${i === selected ? 'selected=true' : ''}>${i}</option>`;
                    }
                    cartList.insertAdjacentHTML('beforeend', `
                        <li class="cart-item" data-idd="${id}" data-price="${price}">
                            <div class="product">
                                <div class="product__image-container">
                                    <img src="${img[0]}" itemprop="image" alt="${name} - ${description}">
                                </div>
                                <div class="product__description">
                                    <h3 class="product__name">
                                        <a href="card.html#${id}">${name}</a></h3>
                                    <p class="product_description-text">${description}</p>
                                </div>
                                <div class="product__prices">
                                    <div class="product__price-type product__price-type-regular">
                                        <div>
                                            <div class="product__total product__total-regular">${price * currentCartList.count}.-</div>
                                            ${currentCartList.count > 1 ? `<div class="product__price-regular">${price}.-</div>` :  `<div class="product__price-regular"></div>`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">
                                <p class="product__have">${count} в наличии</p>

                                <div class="product__controls-options">
                                    <div class="product-controls__remove">
                                        <button type="button" class="btn btn-remove">
                                            <img src="./assets/image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                        </button>
                                    </div>
                                    <div class="product-controls__quantity">
                                        <select title="Выберите количество" aria-label="Выберите количество">
                                            ${options}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `);
                    total += (price * currentCartList.count);
                    if(i === data.length-1){
                        document.querySelector('.cart-total-price').textContent = total + '.-';
                    }
                });

                // change
                const selects = document.querySelectorAll('select');
                selects.forEach((select) => {
                    select.addEventListener('change', e => {
                        const value = e.target.value;
                        const cartItem = e.target.closest('.cart-item');
                        const productTotal = cartItem.querySelector('.product__total');
                        const productPriceRegular = cartItem.querySelector('.product__price-regular');
                        const id = cartItem.dataset.idd;

                        
                        const wasProductTotal = +productTotal.textContent.slice(0, -2);

                        let wasValue;
                        select.forEach(option => {
                            if (option.getAttribute('selected') === 'true'){
                                wasValue = +option.value;
                                option.setAttribute('selected', false)
                            }
                        });
                        //console.log(wasValue);

                        select[+value - 1].setAttribute('selected', true)
                        //console.log(select[+value-1]);
                        let price;
                        if (productPriceRegular.textContent) {
                            price = +productPriceRegular.textContent.slice(0,-2);
                        } else{
                            price = +productTotal.textContent.slice(0,-2);
                        }
                        
                        if (value > 1){
                            productPriceRegular.textContent = price + '.-';
                            productTotal.textContent = (+value * price) + '.-';
                            this.cartList.find(item => {
                                if (item.id === id) {
                                    item.count = +value
                                }
                            });
                            this.setInLocalStorage('cartList', this.cartList);
                        } else{
                            productPriceRegular.textContent = '';
                            productTotal.textContent = price + '.-';
                            this.cartList.find(item => {
                                if (item.id === id) {
                                    item.count = +value;
                                }
                            });
                            this.setInLocalStorage('cartList', this.cartList);
                        }
                        //console.log(wasValue, 'было');
                        const currentProductTotal = +productTotal.textContent.slice(0, -2);

                        if (currentProductTotal > wasProductTotal){
                            total += currentProductTotal - wasProductTotal;
                            this.sumCartList += (+value) - wasValue;
                            this.setInLocalStorage('sumCartList', this.sumCartList);
                        } else{
                            total -= wasProductTotal - currentProductTotal;
                            this.sumCartList -= wasValue - (+value)
                            this.setInLocalStorage('sumCartList', this.sumCartList);
                        }

                        //console.log(+value, 'стало');
                        document.querySelector('.cart-total-price').textContent = total + '.-';
                        document.querySelector('#sumCartList').textContent = this.sumCartList;

                        
                    })
                });
                // click on remove
                const btnsRemove = document.querySelectorAll('.btn-remove');
                btnsRemove.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const blockBtns = e.target.closest('.product__controls-options');

                        const delBlock = `
                            <div class="del">
                                <div class="del__text">
                                    Вы уверены, что хотите удалить этот товар из <strong>Корзина</strong>?
                                </div>
                                <div class="del__btns">
                                    <button class="del__btn" id="cancel">Отменить</button>
                                    <button class="del__btn" id="accept">Удалить</button>
                                </div>
                            </div>
                        `;
                        
                        blockBtns.insertAdjacentHTML('beforeend', delBlock);

                        // blockBtns.style.display = 'none';
                        blockBtns.querySelector('.product-controls__remove').style.display   = 'none';
                        blockBtns.querySelector('.product-controls__quantity').style.display = 'none';
                        const cancel = blockBtns.querySelector('#cancel');
                        const accept = blockBtns.querySelector('#accept');
                        
                        
                        cancel.addEventListener('click', () => {
                            blockBtns.querySelector('.product-controls__remove').style.display   = '';
                            blockBtns.querySelector('.product-controls__quantity').style.display = '';
                            blockBtns.querySelector('.del').remove();
                        });

                        accept.addEventListener('click', () => {
                            const cartItem = accept.closest('.cart-item');
                            const id = cartItem.dataset.idd
                            const delItem = this.cartList.find(item => item.id === id);
                            const count = delItem.count

                            const index = this.cartList.indexOf(delItem);
                            this.cartList.splice(index, 1);

                            this.sumCartList -= +count;

                            this.setInLocalStorage('cartList', this.cartList);
                            this.setInLocalStorage('sumCartList', this.sumCartList);

                            cartItem.remove();
                            if(!this.sumCartList){
                                document.querySelector('#sumCartList').remove();
                                emptyCart();
                            } else{
                                document.querySelector('#sumCartList').textContent = this.sumCartList;
                            }
                        });

                    })
                });
            }
        }

        if (location.pathname.includes('cart')) {
            this.data.cart(this.cartList, generateCards);
        }
    }
}