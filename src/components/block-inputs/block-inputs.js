import 'maskedinput/dist/jquery.inputmask.bundle.js';
import '../date-picker/date-picker'

const inputText = document.querySelector('.block-inputs__input_active');
if (inputText) inputText.firstElementChild.value = 'This is pretty awesome';

$('.block-inputs__input-date').inputmask('datetime',{
    mask: '1.2.y', 
    placeholder: 'ДД.ММ.ГГГГ', 
    leapday: '29.02', 
    separator: '.', 
    alias: 'dd.mm.yyyy'
});