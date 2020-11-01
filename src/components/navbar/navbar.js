const navbar = document.querySelectorAll('.navbar');

for (let i = 0; i < navbar.length; i++) {
  navbar[i].addEventListener('click', setActive);
}

function setActive(event) {
  let activeItem = event.target.classList.contains('navbar__item');
  if (activeItem) {
    const navbar = event.target.closest('.navbar');
    let navbarItems = navbar.querySelectorAll('.navbar__item_active');
    for (let i = 0; i < navbarItems.length; i++) {
      navbarItems[i].classList.remove('navbar__item_active');
    }
    event.target.classList.add('navbar__item_active');
  }
}