export const listcontainer = document.querySelector('#listcontainer');
const descript = document.querySelector('#description');

export class List {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static items = [

  ];

  static filter() {
    const filteredarray = List.items.filter((elements) => elements.completed === false);
    List.items = filteredarray;
    List.loop();
  }

  static loop() {
    let output = '';
    for (let i = 0; i < List.items.length; i += 1) {
      List.items[i].index = i + 1;
      output += `<li class="listitem" id="${List.items[i].index}">
       <input type="checkbox" class="check" id="check">
       <input id="${List.items[i].index}" type="text" value="${List.items[i].description}" class="input" readonly>
       <i id="edit" class="fa-solid fa-ellipsis-vertical"></i><i class="fa-solid fa-trash-can trash visibletrash" id='trash'></i></li>`;
    }
    listcontainer.innerHTML = output;
    localStorage.setItem('inputarray', JSON.stringify(List.items));
  }
}

export const addlists = () => {
  if (descript.value) {
    const newItem = new List(descript.value);
    descript.value = '';
    newItem.completed = false;
    List.items.push(newItem);
    List.loop();
  }
};
