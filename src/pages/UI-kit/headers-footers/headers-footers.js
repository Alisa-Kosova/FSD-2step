import './headers-footers.scss';
import '../../../components/navbar/navbar.js'

const user = 'Юлий Цезарь';
const elemButton = document.getElementsByClassName('header__button');

for (let i = 2; i < 4; i++) {
  elemButton[i].classList.add('header__button_hidden');
}

const headUser = document.querySelectorAll('.header__user');
headUser[1].classList.remove('header__user_hidden');

const elemUser = headUser[1].querySelector('.user__name');
elemUser.innerHTML = user;
