import * as LazyLoad from 'vanilla-lazyload';

export default function (){
    new (LazyLoad as any)({ elements_selector: '.lazy' });
}
