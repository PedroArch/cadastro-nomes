///state da aplicação
const names = ['Guilherme', 'Rodrigo', 'Diego', 'Marcelo'];
isEditing = false;
currentIndex = null;

window.addEventListener('load', () => {
  render();
  const inputName = document.querySelector('#inputName');
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
});

function render() {
  createList();
}

function createList() {
  const ul = document.querySelector('#list');
  ul.innerHTML = '';
  names.forEach((name, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('nameLi');

    const span = createSpan(name, index);
    const button = createDeleteButton(index);

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  });
}

function handleTyping(event) {
  if (event.key === 'Enter') {
    if (isEditing === false) {
      insertName(event.target.value);
      event.target.value = '';
    } else {
      updateName(event.target.value);
    }
    isEditing = false;
  }
}

function insertName(newName) {
  if (newName.trim() === '' || newName.length < 3) {
    return;
  }
  names.push(newName);
  render();
}

function createDeleteButton(index) {
  const i = index;

  function deleteName() {
    names.splice(i, 1);
    render();
  }

  const button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add('btn-danger');
  button.classList.add('deleteButton');
  button.textContent = 'x';

  button.addEventListener('click', deleteName);
  return button;
}

function createSpan(name, index) {
  function editName() {
    isEditing = true;
    inputName = document.querySelector('#inputName');
    inputName.value = name;
    currentIndex = i;
    inputName.focus();

    inputName.addEventListener('keyup', handleTyping);
  }

  const i = index;
  const span = document.createElement('span');
  span.classList.add('spanName');
  span.textContent = name;

  span.addEventListener('click', editName);

  return span;
}

function updateName(newName) {
  names[currentIndex] = newName;
  render();
}
