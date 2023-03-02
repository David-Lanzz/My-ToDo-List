class List {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

    static items = [
      { description: 'lanzz', completed: false },
      { description: 'lanzz', completed: true },
      { description: 'lanzz', completed: false },
      { description: 'lanzz', completed: true },
    ];

    static filter() {
      const filteredarray = List.items.filter((elements) => elements.completed === false);
      List.items = filteredarray;
      return List.loop();
    }

  static localStorage = {}

  static loop() {
    let output = '';
    for (let i = 0; i < List.items.length; i += 1) {
      List.items[i].index = i + 1;
      output += `<li class="listitem" id="${List.items[i].index}">
         <input type="checkbox" class="check" id="check">
         <input id="${List.items[i].index}" type="text" value="${List.items[i].description}" class="input" readonly>
         <i id="edit" class="fa-solid fa-ellipsis-vertical"></i><i class="fa-solid fa-trash-can trash visibletrash" id='trash'></i></li>`;
    }
    // listcontainer.innerHTML = output;
    List.localStorage.inputarray = JSON.stringify(List.items);
    return output;
  }
}
module.exports = List;