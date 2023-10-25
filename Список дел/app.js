async function fetchData() {
  // console.log('I am called');
  let todos = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (todos.ok) {
    let jsonTodos = await todos.json();
    let users = await fetch("https://jsonplaceholder.typicode.com/users");
    if (users.ok) {
      let jsonUsers = await users.json();
      const mySelect1 = document.querySelector("#user-todo");
      for (let user of jsonUsers) {
        let option = document.createElement("option");
        option.innerHTML = user["name"];
        mySelect1.append(option);
      }
      const mySelect2 = document.querySelector("#todo-list");
      for (let todo of jsonTodos) {
        let li = document.createElement("li");
        mySelect2.append(li);
        li.style.margin = "20px";
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        if (todo["completed"]) {
          input.setAttribute("checked", "checked");
        }
        input.addEventListener("click", handleClick);
        li.appendChild(input);
        let span = document.createElement("span");
        span.innerHTML =
          todo["title"] +
          " by " +
          "<b>" +
          filterById(jsonUsers, todo["userId"])["name"] +
          "</b>";
        span.style.margin = "20px";
        li.appendChild(span);
        let button = document.createElement("button");
        button.innerHTML = "<b> x </b>";
        button.style.color = "red";
        button.addEventListener("click", removeTodo);
        li.appendChild(button); 
      }
    } else {
      alert("Ошибка HTTP при получении пользователей: " + users.status);
    }
  } else {
    alert("Ошибка HTTP при получении задач: " + todos.status);
  }
}

async function removeTodo(evt) {
    let target = evt.target;
    text = target.closest("li").querySelector('span').innerHTML;
    ctext = text.substr(0, text.indexOf(' by <b>'));
    let todos = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (todos.ok){
      let jsonTodos = await todos.json();
      target.closest("li").remove();
      let tid =  filterByTitle(jsonTodos, ctext)['id'];
      let del = await fetch(`https://jsonplaceholder.typicode.com/todos/${tid}`, {
        method: 'DELETE'});
      if (!del.ok){
        alert("Ошибка: " + del.status);
      }
    } else {
      alert("Ошибка при получении данных " + todos.status);
    } 
}

async function addTodo(evt) {
  evt.preventDefault();
  const mySelect = document.querySelector("#todo-list");
  let newTodo = document.querySelector("#new-todo");
  let newUser = document.querySelector("#user-todo");

  let li = document.createElement("li");
  li.style.margin = "20px";

  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("click", handleClick);
  li.appendChild(input);

  let span = document.createElement("span");
  span.innerHTML =
    newTodo.value +
    " by " +
    "<b>" +
    newUser.value +
    "</b>";
  span.style.margin = "20px";
  li.appendChild(span);
  
  let button = document.createElement("button");
  button.innerHTML = "<b> x </b>";
  button.style.color = "red";
  button.addEventListener("click", removeTodo);
  li.appendChild(button);

  let users = await fetch("https://jsonplaceholder.typicode.com/users");
  if (users.ok){
    let jsonUsers = await users.json();
    let uid =  filterByName(jsonUsers, newUser.value)['id'];
    let post = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        userId: uid,
        title: newTodo.value,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      if (post.ok){
        mySelect.prepend(li);
        newTodo.value = '';
      } else {
        alert("Ошибка: " + post.status);
      }
  } else {
    alert("Ошибка при получении данных " + users.status)
  }

}




window.addEventListener('DOMContentLoaded', evt => {
  fetchData();
  const addTaskButton = document.querySelector('.add-todo');
  addTaskButton.addEventListener('click', addTodo);
});


function filterById(jsonObject, id) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["id"] == id;
  })[0];
}

function filterByName(jsonObject, name) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["name"] == name;
  })[0];
}

function filterByTitle(jsonObject, title) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["title"] == title;
  })[0];
}


async function handleClick(e) {
  let target = e.target;
  onoff = target.closest("li").querySelector('input').checked;
  let todos = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (todos.ok){
    let jsonTodos = await todos.json();
    text = target.closest("li").querySelector('span').innerHTML;
    ctext = text.substr(0, text.indexOf(' by <b>'));
    let tid = filterByTitle(jsonTodos, ctext)['id'];
    let uid = filterByTitle(jsonTodos, ctext)['userId'];
    let put = await fetch(`https://jsonplaceholder.typicode.com/todos/${tid}`, {
    method: 'PUT',
    body: JSON.stringify({
      userId: uid,
      id: tid,
      title: ctext,
      completed: onoff,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    if (!put.ok){
      alert("Ошибка: " + put.status);
    }
  } else {
      alert("Ошибка при получении данных " + todos.status)
  }
}


