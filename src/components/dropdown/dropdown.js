const buttonDropdown = document.getElementsByClassName('dropdown__button');
const checkmark = '<div class="dropdown__checkmark"></div>';
let dropdownData = [];

class dropdownlist {
  constructor(id, name, fields) {
    this.id = id;
    this.name = name;
    this.fields = fields;
    this.total = 0;
  }
}

for (let i = 0; i < buttonDropdown.length; i++) {
  buttonDropdown[i].addEventListener('click', showDropdown);

  const dropdownList = buttonDropdown[i].nextElementSibling;
  dropdownList.addEventListener('click', dropdownListClick);

  let dropdownButtonUse = dropdownList.querySelector('.dropdown__button-use');
  let dropdownButtonclear = dropdownList.querySelector('.dropdown__button-clear');
  if (dropdownButtonUse) dropdownButtonUse.addEventListener('click', useData);
  if (dropdownButtonclear) dropdownButtonclear.addEventListener('click', clearData);

  buttonDropdown[i].closest('.dropdown').id = i;
  fillDropdownData(buttonDropdown[i], i);
}

function showDropdown() {
  let listDropdown = this.nextElementSibling;
  if (listDropdown.classList.contains("dropdown__list_hidden")) {
    listDropdown.classList.remove("dropdown__list_hidden");
    this.classList.add('dropdown__border');
  } else {
    listDropdown.classList.add("dropdown__list_hidden");
    this.classList.remove('dropdown__border');
  }
}

function fillDropdownData(data, id) {
  let fields = [];
  let fieldsItem = data.nextElementSibling.getElementsByClassName('dropdown__list-item-text');
  for (let i = 0; i < fieldsItem.length; i++) {
    fields[i] = { 'text': fieldsItem[i].innerText, 'amount': 0 }
  }
  dropdownData.push(new dropdownlist(id, data.innerText, fields));
}

function dropdownListClick(event) {
  if (event.target.className === 'dropdown__increase') {
    changeAmount(event.target, 'inc');
  } else if (event.target.classList.contains('dropdown__decrease')) {
    changeAmount(event.target, 'dec');
  }
}

function changeAmount(target, operation) {
  const parent = target.closest('.dropdown');
  const listItem = target.closest('.dropdown__list-item');
  const listItemText = listItem.querySelector('.dropdown__list-item-text').innerText.toLowerCase();
  const buttonDropdown = findDropdownButton(parent);
  const blockbuttons = parent.querySelector('.dropdown__block-buttons');

  dropdownData.map((item) => {
    if (item.id == parent.id) {
      item.fields.map((field) => {
        if (field.text == listItemText) {
          field.amount = calculate(field.amount, operation);
          listItem.querySelector('.dropdown__amount').innerText = field.amount;
          item.total = calculate(item.total, operation);
          changeBrightnessBorder(target, field.amount);
          if (blockbuttons) {
            showButtonClear(item.total, target);
          } else {
            installButtonText(buttonDropdown, item)
          }
        }
      })
    }
  })
}

function calculate(amount, operation) {
  if (operation == 'inc') {
    amount += 1;
  } else {
    if (amount > 0) {
      amount -= 1;
    }
  }
  return amount;
}

function changeBrightnessBorder(target, amount) {
  const parentTarget = target.closest('.dropdown__block-consider');
  let decrease = parentTarget.querySelector('.dropdown__decrease');
  if (amount > 0) {
    decrease.classList.add('dropdown__decrease_dark');
  } else {
    decrease.classList.remove('dropdown__decrease_dark');
  }
}

function showButtonClear(total, target) {
  const parentTarget = target.closest('.dropdown__list');
  let buttonClear = parentTarget.querySelector('.dropdown__button-clear');

  if (total > 0) {
    buttonClear.classList.remove('dropdown__button-clear_hidden');
  } else {
    buttonClear.classList.add('dropdown__button-clear_hidden');
  }
}

function useData(event) {
  const parent = event.target.closest('.dropdown');
  let buttonDropdown = findDropdownButton(parent);
  let dataList = dropdownData.filter((item) => {
    return item.id == parent.id;
  })
  installButtonText(buttonDropdown, dataList[0]);
}

function installButtonText(buttonDropdown, data) {
  let textButton = '';

  if (data.total) {
    data.fields.forEach((item, i) => {
      if (item.amount) {
        textButton += item.amount + ' ' + item.text + ' ';
      }
    });
  } else {
    textButton = data.name;
  }
  const fullText = textButton + checkmark;
  buttonDropdown.innerHTML = fullText;
}

function clearData(event) {
  const parent = event.target.closest('.dropdown');
  let buttonDropdown = findDropdownButton(parent);
  let dropdownAmount = parent.querySelectorAll('.dropdown__amount');

  for (let i = 0; i < dropdownAmount.length; i++) {
    dropdownAmount[i].innerText = 0;
  }

  dropdownData.map((item) => {
    if (item.id == parent.id) {
      let fullText = item.name + checkmark;
      buttonDropdown.innerHTML = fullText;
      item.total = 0;
      item.fields.map((listItem) => {
        listItem.amount = 0;
      });
    }
  })
}

function findDropdownButton(parent) {
  return parent.querySelector('.dropdown__button');
}