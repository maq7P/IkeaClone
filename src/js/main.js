import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import Catalog from './components/menu/catalog';
import Goods from "./components/goods";
import Item from "./components/item/item";
import Cart from './components/cart';

window.addEventListener('DOMContentLoaded', () => {

    new Header().render();
    new Catalog().render();

    if (location.pathname === '/' || location.pathname === '/index.html') {
        new Main().render();
        new Footer().render();
    }

    if (location.pathname.includes('card')) {
        new Item().generatePage();
        new Footer().render();
    }
    if(location.pathname === '/cart.html'){
        new Cart().generatePage();
        new Footer().render();
    }
    if (location.pathname === '/goods.html') {
        new Goods().generatePage();
        new Footer().render();
    }
})

/* 

   (х) 1) Если товара нет в наличии, то при переходе на него и клике на кнопку "Следить за товаром
        добавляется товар. Исправить баг." 
   (х) 2) Также исправить поведение этой кнопки, сделать стили.
   (х) 3) При клике на эту кнопку должно открываться окно, в котором пользователь вводит свои данные
        а данные отправляются на сервер. При поступлении товара приходит сообщение пользователю
        
   (х) 4) Если список желаемого пуст, то пользователь должен видеть "Популярные товары".

   (х) 5) Доделать коризину.
   (х) 6) Собирать данные со страницы корзиные + данные веденые пользователем в форме и отправлять на сервер.

   (х) 7) Реализовать страницу офромления заказа.
   (х) 8) Реализовать вход пользователя в личный кабинет.

*/
