import { List } from './functionality.js';

export default function checkstatus(e) {
  e.target.parentNode.firstElementChild.nextElementSibling.classList.toggle('checked');
  for (let i = 0; i < List.items.length; i += 1) {
    if (e.target.parentNode.firstElementChild.nextElementSibling.id
      === List.items[i].index.toString() && List.items[i].completed === false) {
      List.items[i].completed = true;
    } else if (e.target.parentNode.firstElementChild.nextElementSibling.id
      === List.items[i].index.toString() && List.items[i].completed === true) {
      List.items[i].completed = false;
    }
  }
}
