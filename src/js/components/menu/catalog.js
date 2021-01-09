import Data from "../../services/Data";
import OpenMenu from "./openMenu";

export default class Catalog{
    constructor(){
        this.data = new Data('./assets/database/dataBase.json');
    }

    render(){
        this.data.getCategory(data => {
            let categoryList = '';
            
            data.forEach(item => categoryList += `
                <li class="catalog-list__item">
                    <a href="goods.html?cat=${item}">${item}</a>
                </li>
            `);

            const catalog = `
            <div class="catalog">
                <button type="button" class="btn btn-close catalog-btn" id="hnf-menu-close-btn" aria-expanded="true"
                        title="Закрыть меню" aria-label="Закрыть меню">
                    <svg focusable="false" class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.0002 13.4144L16.9499 18.3642L18.3642 16.9499L13.4144 12.0002L18.3642 7.05044L16.95 5.63623L12.0002 10.586L7.05044 5.63623L5.63623 7.05044L10.586 12.0002L5.63624 16.9499L7.05046 18.3642L12.0002 13.4144Z"></path>
                    </svg>
                </button>
                <h2>Каталог</h2>
                <ul class="catalog-list">
                    <li class="catalog-list__item active"><a href="goods.html?cat=Мебель">Мебель</a></li>
                    <li class="catalog-list__item"><a href="goods.html?cat=Кухня">Кухня</a></li>
                    <li class="catalog-list__item"><a href="goods.html?cat=Текстиль">Текстиль</a></li>
                    <li class="catalog-list__item"><a href="goods.html?cat=Освещение">Освещение</a></li>
                    <li class="catalog-list__item"><a href="goods.html?cat=Декор">Декор</a></li>
                </ul>
            </div>
            <div class="overlay"></div>
        `;
        document.body.insertAdjacentHTML('beforeend', catalog);
            
        document.body.insertAdjacentHTML('beforeend',
        `<div class="subcatalog">
            <button type="button" class="btn btn-return catalog-btn" aria-expanded="true" title="Закрыть меню"
                    aria-label="Закрыть меню">
                <svg focusable="false" class="svg-icon  hnf-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.70613 11.2927L3.99902 11.9997L4.70606 12.7069L11.999 20.0008L13.4133 18.5867L7.82744 13.0001H19.9999V11.0001H7.82729L13.4144 5.41328L12.0002 3.99902L4.70613 11.2927Z"></path>
                </svg>
            </button>
        </div>`);

        new OpenMenu('.btn-burger', '.btn-close', '.catalog', 'open', {
            menu: '.subcatalog',
            activeClass: 'subopen',
            triggers: '.catalog-list__item',
            close: '.catalog-btn'
        }).init()
        })
    }
}