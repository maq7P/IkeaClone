const fadeIn = (block, speed) => {
    let countOfOpacity = 0;
    requestAnimationFrame(() => {
        countOfOpacity += speed;
        block.style.opacity = countOfOpacity;
        if (countOfOpacity < 1) {
            requestAnimationFrame(fadeIn);
        }
    });
}
const fadeOut = (block, speed) => {
    let countOfOpacity = 1;
    const _fadeOut = () => {
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
export {
    fadeIn,
    fadeOut
}