const addInWishList = (btn, wishList, name, id, set, emptyBlock) => {
    btn.addEventListener('click', e => {
        // if(wishList.length < 1 && location.search === "?wishlist"){
        //     console.log(132);
        //     console.log(emptyBlock);
        //     return;
        // }
        e.preventDefault();
        if (e.target.closest('.contains-wishlist')) {
            btn.classList.remove('contains-wishlist');
            btn.style.opacity = '';
            const index = wishList.indexOf(id);
            wishList.splice(index, 1);
            set('wishList', wishList);
            if (location.search === '?wishlist'){
                const thatRemove = btn.closest('.goods-list__item');
                let countOfOpacity = 1;
                const fadeOut = () => {
                    countOfOpacity -= 0.07;
                    thatRemove.style.opacity = countOfOpacity;
                    if (countOfOpacity > 0){
                        requestAnimationFrame(fadeOut);
                    } else {
                        thatRemove.remove();
                    }
                }
                requestAnimationFrame(fadeOut);
            }
        } else {
            btn.classList.add('contains-wishlist');
            btn.style.opacity = 0.3;
            if (name) {
                document.body.insertAdjacentHTML('beforeend', `
                <div class="goods-popup">
                    <div class="goods-popup__name">
                        <strong>${name}</strong> добавлен в избранное.
                    </div>
                    <a href="goods.html?wishlist" class="goods-popup__check">Посмотреть</a>
                    <div class="goods-popup__link">
                        <button id="btn-close">×</button>
                    </div>
                </div>
                `);

                const popups = document.body.querySelectorAll('.goods-popup');
                popups.forEach(popup => {
                    popup.classList.add('animated', 'fadeIn')
                    const btnPopup = popup.querySelector('#btn-close');
                    btnPopup.addEventListener('click', () => {
                        popup.remove();
                    });
                });


                setTimeout(() => {
                    popups.forEach(popup => {
                        popup.remove();
                    });
                }, 2000);
            }
            wishList.push(id)
            set('wishList', wishList);
        }
    });
}
const styleBtnCart = (btn, currentCartList, count) => {
    btn.style.backgroundImage = 'none';
    btn.style.backgroundColor = 'rgb(0, 88, 163)';
    const img = document.createElement('img');
    img.style = "height: 20px; width: 20px;";
    img.src = "./assets/image/gal.png";
    img.classList.add('animated', 'fadeIn');
    btn.append(img);

    if (!currentCartList || currentCartList.count < count - 1) {
        setTimeout(() => {
            btn.childNodes[1].remove();
            btn.style.backgroundImage = '';
            btn.style.backgroundColor = '';
        }, 1000);
    }
}
const addInCart = (btn, cartList, count, id, set) => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if(!btn.querySelector('img')){ 

            const currentCartList = cartList.find(item => e.target.dataset.idd === item.id);
            styleBtnCart(btn, currentCartList, count);
            if(!currentCartList || currentCartList.count < count){

                let flag = false;
                cartList.find((item) => {
                    if (item.id === id) {
                        item.count++;
                        flag = true;
                    }
                });
                if (!flag) {
                    cartList.push({
                        id,
                        count: 1,
                    });
                }

                let sumCart = 0
                cartList.forEach(item => {
                    sumCart += item.count;
                })
                if (document.querySelector('.btn-cart span')) {
                    document.querySelector('.btn-cart span').textContent = sumCart;
                } else {
                    const span = `<span>1</span>`;
                    document.querySelector('.btn-cart').insertAdjacentHTML('beforeend', span)
                }
                set('sumCartList', sumCart)
                set('cartList', cartList)
            } else{
            
            }
        }
    })
}
export {
    addInWishList,
    addInCart,
    styleBtnCart
};