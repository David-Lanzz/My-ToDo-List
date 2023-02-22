import './style.css';
import { addlists, List } from './modules/functionality.js';
import defaultExport from './modules/status.js';

const outputarray = JSON.parse(localStorage.getItem('inputarray'));

window.addEventListener('click', (e) => {
  const targeted = e.target.parentNode.firstElementChild;
  if (e.target.id === 'edit') {
    targeted.nextElementSibling.toggleAttribute('readonly');
    targeted.nextElementSibling.classList.toggle('edited');
  } else if (e.target.id === 'addbtn') {
    addlists();
  } else if (e.target.id === 'clear') {
    const filteredarray = List.items.filter((elements) => elements.completed === false);
    List.items = filteredarray;
    List.loop();
  } else if (e.target.id === 'refresh') {
    if (outputarray) {
      window.location.reload();
    }
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