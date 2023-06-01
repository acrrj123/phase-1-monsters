let currentPage = 1

document.addEventListener("DOMContentLoaded", () => {

  fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
  .then(r => r.json())
  .then(monsters => addMonsters(monsters))

  let form = document.createElement("form")
  form.id = "monster-form"
  let nameInput = document.createElement("input")
  nameInput.id = "name"
  nameInput.placeholder = "name..."
  let ageInput = document.createElement("input")
  ageInput.id = "age"
  ageInput.placeholder = "age..."
  let descriptionInput = document.createElement("input")
  descriptionInput.id = "description"
  descriptionInput.placeholder = "description..."
  let button = document.createElement("button")
  button.textContent = "Create"
  form.append(nameInput)
  form.append(ageInput)
  form.append(descriptionInput)
  form.append(button)
  document.getElementById("create-monster").appendChild(form)
  form.addEventListener("submit", e => {
    e.preventDefault()
    //console.log(e)
    let name = e.target.name.value
    let age = e.target.age.value
    let description = e.target.description.value
    let header = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    let obj = {
      name: name,
      age: age,
      description: description
    }
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: header,
      body: JSON.stringify(obj)
    })
  })

  let monsterContainer = document.getElementById("monster-container")
    
  document.getElementById("back").addEventListener("click", e => {
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${--currentPage}`)
    .then(r => r.json())
    .then(monsters => addMonsters(monsters))
  })

  document.getElementById("forward").addEventListener("click", e => {
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${++currentPage}`)
    .then(r => r.json())
    .then(monsters => addMonsters(monsters))
  })

  function addMonsters(monsters)  {
    //console.log(monsters)
    monsters.forEach(monster => {
      let monsterDiv = document.createElement("div")
      let h2 = document.createElement("h2")
      h2.textContent = monster.name
      let h4 = document.createElement("h4")
      h4.textContent = monster.age
      let p = document.createElement("p")
      p.textContent = monster.description
      monsterDiv.appendChild(h2)
      monsterDiv.appendChild(h4)
      monsterDiv.appendChild(p)
      monsterContainer.appendChild(monsterDiv)
    })
  }
})