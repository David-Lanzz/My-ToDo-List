import './style.css';
import { addlists, List } from './modules/functionality.js';
import defaultExport from './modules/status.js';

const outputarray = JSON.parse(localStorage.getItem('inputarray'));

window.addEventListener('click', (e) => {
  const targeted = e.target.parentNode.firstElementChild;
  if (e.target.id === 'edit') {
    targeted.nextElementSibling.toggleAttribute('readonly');
    targeted.nextElementSibling.classList.toggle('edited');
    e.target.parentNode.lastElementChild.classList.toggle('visibletrash');
    for (let i = 0; i < List.items.length; i += 1) {
      if (targeted.nextElementSibling.id === List.items[i].index.toString()) {
        List.items[i].description = targeted.nextElementSibling.value;
      }
    } localStorage.setItem('inputarray', JSON.stringify(List.items));
  } else if (e.target.id === 'addbtn') {
    addlists();
  } else if (e.target.id === 'clear') {
    List.filter();
  } else if (e.target.id === 'refresh') {
    if (outputarray) {
      window.location.reload();
    }
  } else if (e.target.id === 'trash') {
    for (let i = 0; i < List.items.length; i += 1) {
      if (targeted.nextElementSibling.id === List.items[i].index.toString()) {
        List.items[i].completed = true;
      }
    } List.filter();
  }
});
window.addEventListener('change', (e) => {
  if (e.target.id === 'check') {
    defaultExport(e);
  }
});

window.addEventListener('load', () => {
  if (outputarray) {
    List.items = outputarray;
    List.loop();
  }
});