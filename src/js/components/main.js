export default class Main {
    render(){
        const main = `
            <main>
                <div class="container">
                    <h1 class="main-header">ИКЕА. Сила дома.</h1>
                    <aside class="offer">
                        <a href="card.html#idd059">
                            <picture>
                                <source srcset="./assets/image/b47e07ee97fd5f9bf030d258d462a945.webp" type="image/webp">
                                <img src="./assets/image/b47e07ee97fd5f9bf030d258d462a945.jpg" alt="СЛАТТУМ">
                            </picture>

                        </a>
                        <a class="offer-extra" href="goods.html?subcat=Кровати">
                            <p>Посмотрите, как можно улучшить свой сон</p>
                            <svg focusable="false" viewBox="0 0 24 24" class="offer-arrow" aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M19.2937 12.7074L20.0008 12.0003L19.2938 11.2932L12.0008 3.99927L10.5865 5.41339L16.1727 11.0003H4V13.0003H16.1723L10.5855 18.5868L11.9996 20.0011L19.2937 12.7074Z"></path>
                            </svg>
                        </a>
                    </aside>
                </div>
            </main>
        `;
        document.body.insertAdjacentHTML('beforeend', main)
    }
}