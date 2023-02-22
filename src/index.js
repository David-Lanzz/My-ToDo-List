import './style.css';
import { addlists, List } from './modules/functionality.js';

const outputarray = JSON.parse(localStorage.getItem('inputarray'));

window.addEventListener('click', (e) => {
  if (e.target.id === 'edit') {
    e.target.parentNode.firstElementChild.nextElementSibling.toggleAttribute('readonly');
    e.target.parentNode.firstElementChild.nextElementSibling.classList.toggle('edited');
  } else if (e.target.id === 'addbtn') {
    addlists();
  } else if (e.target.id === 'check') {
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
  } else if (e.target.id === 'clear') {
    const filteredarray = List.items.filter((elements) => elements.completed === false);
    List.items = filteredarray;
    List.loop();
  } else if (e.target.id === 'refresh') {
    if (outputarray) {
      List.items = outputarray;
      List.loop();
    }
  }
});

window.addEventListener('load', () => {
  if (outputarray) {
    List.items = outputarray;
    List.loop();
  }
});