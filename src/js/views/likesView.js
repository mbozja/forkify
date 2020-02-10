import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heaart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`/assets/img/icons.svg#${iconString}`);
    //icon.svg#icon-heart-outlined
}