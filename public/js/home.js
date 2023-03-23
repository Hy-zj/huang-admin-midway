/*
 * @Description: 
 * @Author: huangyue
 * @LastEditors: huangyue
 * @LastEditTime: 2023-03-21 18:36:29
 */
const duration = 0.8;
const delay = 0.3;
// eslint-disable-next-line no-undef
const revealText = document.querySelector('.reveal');
const letters = revealText.textContent.split('');
revealText.textContent = '';
const middle = letters.filter(e => e !== ' ').length / 2;
letters.forEach((letter, i) => {
    // eslint-disable-next-line no-undef
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
    revealText.append(span);
});
