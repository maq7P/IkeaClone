import Data from "../../services/Data";
export default class Subcatalog{
    constructor(){
        this.data = new Data('./assets/database/dataBase.json')
    }
    creatInnerMenu(textHeader) {
        this.data.getSubcategory(textHeader, data => {
            try{
            document.querySelector('.subcatalog-header').remove()
            document.querySelector('.subcatalog-list').remove()
        } catch(e){

        }
        let categoryList = '';

        data.forEach(item => categoryList += `
            <li class="subcatalog-list__item">
                <a href="goods.html?subcat=${item}">${item}</a>
            </li>
        `);

        const subcatalog = `
                <div class="subcatalog-header">
                    <a href="goods.html?cat=${textHeader}">
                        ${textHeader}
                    </a>
                </div>

                <ul class="subcatalog-list">
                    ${categoryList}
                </ul>
        `;
        document.querySelector('.subcatalog').insertAdjacentHTML('beforeend', subcatalog);
        })
    }
}