/* eslint-disable no-unused-vars */
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const List = require('../add.js');

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
describe('Final test to test if items get added and removed to and from the dom', () => {
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
  test('if one item is added to lists', () => {
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
