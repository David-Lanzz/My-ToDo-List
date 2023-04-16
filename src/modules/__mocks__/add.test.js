/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const List = require('../methods.js');

Enzyme.configure({ adapter: new Adapter() });

const dom = new JSDOM('<section id="section"><p>Hello i am lanzz</p></section>');
const { document } = dom.window;
const container = document.querySelector('#section');

const descript = new JSDOM('<input type=\'text\' id=\'descript\'>');
descript.value = 'lanzz';
container.innerHTML += descript;
const funct = jest.fn(() => {
  if (descript.value) {
    const newItem = new List(descript.value);
    newItem.completed = false;
    List.items.push(newItem);
  } return List.filter();
});

const button = shallow((<button onClick={funct}>Ok!</button>));

describe('Final test=s for status updates and general delete methods', () => {
  describe('items should be added and removed from the dom', () => {
    test('if loop is read and hard coded list objects get added to the dom', () => {
      container.innerHTML = List.loop();
      const listitems = document.querySelectorAll('#section li');
      expect(listitems).toHaveLength(4);
    });

    test('expect local storage to be truthy', () => {
      expect(List.localStorage).not.toBe(null);
    });
    test('expect filter method to filter out items with truthy completed status', () => {
      container.innerHTML = List.filter();
      const listitems = document.querySelectorAll('#section li');
      expect(listitems).toHaveLength(2);
    });
    test('add exactly one <li> element to the list in the DOM', () => {
      button.simulate('click');
      expect(List.items).toHaveLength(3);
    });
    test('if trash is not null', () => {
      const removed = document.querySelector('#trash');
      const looped = jest.fn((targeted = removed.parentNode.firstElementChild) => {
        for (let i = 0; i < List.items.length; i += 1) {
          if (targeted.nextElementSibling.id === List.items[i].index.toString()) {
            List.items[i].completed = true;
          }
        } return List.filter();
      });
      const trash = shallow(<button onClick={looped}>remove</button>);
      trash.simulate('click');
      expect(List.items).toHaveLength(2);
    });
  });
  describe('Final tests to check for status updates,local storage and dom manipulation', () => {
    test('expect task description to change', () => {
      const edited = document.querySelector('#edit');
      const targeted = edited.parentNode.firstElementChild;
      edited.value = 'Esther';
      const parent = edited.parentNode;
      const edit = jest.fn((targeted = edited.parentNode.firstElementChild) => {
        targeted.nextElementSibling.toggleAttribute('readonly');
        targeted.nextElementSibling.classList.toggle('edited');
        parent.lastElementChild.classList.toggle('visibletrash');
        for (let i = 0; i < List.items.length; i += 1) {
          if (targeted.nextElementSibling.id === List.items[i].index.toString()) {
            List.items[i].description = edited.value;
          }
        } List.localStorage.inputarray = JSON.stringify(List.items);
        return List.items;
      });
      List.items = edit();
      container.innerHTML = List.loop();
      expect(List.items[0].description).toBe('Esther');
    });
    test('expect local storage data to be the same as list items data', () => {
      const outputarray = JSON.parse(List.localStorage.inputarray);
      expect(outputarray[0].description).toBe('Esther');
    });
    test('expect status completed of items to change', () => {
      const checked = document.querySelector('#check');
      const status = jest.fn((targeted = checked.parentNode.firstElementChild) => {
        targeted.nextElementSibling.classList.toggle('checked');
        for (let i = 0; i < List.items.length; i += 1) {
          if (targeted.nextElementSibling.id
              === List.items[i].index.toString() && List.items[i].completed === false) {
            List.items[i].completed = true;
            return List.items[i].completed;
          } if (targeted.nextElementSibling.id
              === List.items[i].index.toString() && List.items[i].completed === true) {
            List.items[i].completed = false;
            return List.items[i].completed;
          }
        }
      });
      const checkBtn = shallow((<button onClick={status}>Check</button>));
      checkBtn.simulate('click');
      List.localStorage.inputarray = JSON.stringify(List.items);
      expect(List.items[0].completed).toBe(true);
    });
    test('if the local storage and list items array have the same content', () => {
      const outputarray = JSON.parse(List.localStorage.inputarray);
      expect(outputarray[0].completed).toBe(true);
    });
    test('if the dom renders out the content of list items', () => {
      container.innerHTML = List.loop();
      const listitems = document.querySelectorAll('#section li');
      expect(listitems).toHaveLength(2);
    });
    test('expect filter method to filter out items with truthy completed status', () => {
      const clearcompleted = shallow((<button onClick={List.filter}>Clear</button>));
      clearcompleted.simulate('click');
      container.innerHTML = List.loop();
      const listitems = document.querySelectorAll('#section li');
      expect(listitems).toHaveLength(1);
    });
    test('expect previous local storage items with truthy values to have been filtered out', () => {
      List.localStorage.inputarray = JSON.stringify(List.items);
      const outputarray = JSON.parse(List.localStorage.inputarray);
      expect(outputarray).toHaveLength(1);
    });
  });
});
