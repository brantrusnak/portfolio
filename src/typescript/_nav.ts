let buttons = document.querySelectorAll('a.nav-button');

export function setupButtons() {
    buttons.forEach(btn => btn.addEventListener('click', (event: Event) => {
        let element = document.querySelector(`#${btn.getAttribute('data-section')}`);
        if(element) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            element.scrollIntoView({behavior: 'smooth'});
        }
    }))
}