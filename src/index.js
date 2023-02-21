import './style.css';

const listcontainer = document.querySelector('#listcontainer');
const items = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  }, {
    description: 'Complete todo list project',
    completed: false,
    index: 1,
  },
];
const addlists = () => {
  let output = '';
  for (let i = 0; i < items.length; i += 1) {
    output += `<li class="listitem" id="${items.index}"><input type="checkbox" class="check" id="check"><input type="text" value="${items[i].description}" class="input"><i class="fa-solid fa-ellipsis-vertical"></i></li>`;
  }
  listcontainer.innerHTML = output;
};
addlists();