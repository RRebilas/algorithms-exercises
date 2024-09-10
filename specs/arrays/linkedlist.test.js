/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    this.length++;

    if (!this.head) {
      this.head = node;
    } else {
      // set the current last node next to the new node
      this.tail.next = node;
    }
    // override the last node with the new one
    this.tail = node;
  }

  pop() {
    if (!this.head) return null;
    if (this.head === this.tail) {
      this.length = 0;
      const node = this.head;
      this.head = this.tail = null;
      return node;
    }

    const preLastNode = this.head;
    while (preLastNode.next) {
      preLastNode = preLastNode.next;
    }

    const last = preLastNode.next;
    preLastNode.next = null;
    this.tail = preLastNode;
    this.length--;
    return last;
  }

  get(index) {
    if (!this.head || index > this.length - 1 || index < 0) return null;
    if (index === 0) return this.head.value;
    if (index === this.length - 1) return this.tail.value;

    let currentIndex = 0;
    let item = this.head;

    while (currentIndex < index) {
      item = item.next;

      currentIndex++;
    }

    return item.value;
  }

  delete(index) {
    if (!this.head || index < 0 || index > this.length - 1) return null;
    if (index === this.length - 1) return this.pop();
    if (index === 0) {
      const head = this.head;
      this.head = head.next;
      this.length--;
      return head;
    }

    let currentIndex = 0;
    let preItemToNodeToDelete = this.head;

    while (currentIndex < index - 1) {
      preItemToNodeToDelete = preItemToNodeToDelete.next;

      currentIndex++;
    }

    let itemToDelete = preItemToNodeToDelete.next;
    preItemToNodeToDelete.next = itemToDelete.next;
    this.length--;
    return itemToDelete;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const list = new LinkedList();
list.push(12);
list.push(13);
list.push(154);
list.push(1);
list.push(2);
list.delete(2);

// list.push(1512);
console.log(list.get(2), list.get(1), list.get(3), list.length);
// console.log(list.get(1));
// console.log(list.get(2));
// console.log(list.get(3));
// unit tests
// do not modify the below code
// describe("LinkedList", function () {
//   const range = (length) =>
//     Array.apply(null, { length: length }).map(Number.call, Number);
//   const abcRange = (length) =>
//     range(length).map((num) => String.fromCharCode(97 + num));
//   let list;

//   beforeEach(() => {
//     list = new LinkedList();
//   });

//   test("constructor", () => {
//     expect(list).toEqual(expect.any(LinkedList));
//   });

//   test("push", () => {
//     abcRange(26).map((character) => list.push(character));
//     expect(list.length).toEqual(26);
//   });

//   test("pop", () => {
//     abcRange(13).map((character) => list.push(character));
//     expect(list.length).toEqual(13);
//     range(10).map(() => list.pop());
//     expect(list.length).toEqual(3);
//     expect(list.pop()).toEqual("c");
//   });

//   test("get", () => {
//     list.push("first");
//     expect(list.get(0)).toEqual("first");
//     list.push("second");
//     expect(list.get(1)).toEqual("second");
//     expect(list.get(0)).toEqual("first");
//     abcRange(26).map((character) => list.push(character));
//     expect(list.get(27)).toEqual("z");
//     expect(list.get(0)).toEqual("first");
//     expect(list.get(9)).toEqual("h");
//     list.pop();
//     expect(list.get(list.length - 1)).toEqual("y");
//   });

//   test("delete", () => {
//     abcRange(26).map((character) => list.push(character));
//     list.delete(13);
//     expect(list.length).toEqual(25);
//     expect(list.get(12)).toEqual("m");
//     expect(list.get(13)).toEqual("o");
//     list.delete(0);
//     expect(list.length).toEqual(24);
//     expect(list.get(0)).toEqual("b");
//   });
// });
