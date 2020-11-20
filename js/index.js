//DOM elements
const monDiv = document.querySelector("#monster-container")
const form = document.querySelector("#monster-form")
const next50 = document.querySelector("#forward")
const last50 = document.querySelector("#back")

//event listeners

form.addEventListener("submit", formHandler)
next50.addEventListener("click", nextMonster)
last50.addEventListener("click", lastMonster)
//next 50 monsters
function nextMonster(){
    fetch("http://localhost:3000/monsters?_limit=50")
    .then (response => response.json())
    .then (monstersArray => renderMonsters(monstersArray))
}
//last 50
function lastMonster(){
    fetch("http://localhost:3000/monsters?_limit=50")
    .then (response => response.json())
    .then (monstersArray => renderMonsters(monstersArray))
}
//add new monster

function formHandler(event){
    event.preventDefault()
    monObj = {}
    monObj.name = event.target.name.value
    monObj.age = event.target.age.value
    monObj.description = event.target.description.value
    debugger
    fetch("http://localhost:3000/monsters", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monObj),
    })
        .then(response => response.json())
        .then(returnedMonObj => {
            renderMonster(returnedMonObj)
            console.log('Success:', returnedMonObj);
    })
        .catch((error) => {
        console.error('Error:', error);
    });
}


//create a monster
function renderMonster(monster){
    const monLi = document.createElement("li")
    monLi.textContent = `Name: ${monster.name}, Age: ${monster.age}`
    const p = document.createElement("p")
    p.textContent = `Description: ${monster.description}` 
    monLi.append(p)
    monDiv.append(monLi)
}


//render all monsters

function renderMonsters(monstersArray){
    monstersArray.forEach(renderMonster)
}

// Initialize

function initialize(){
fetch("http://localhost:3000/monsters?_limit=50")
.then (response => response.json())
.then (monstersArray => renderMonsters(monstersArray))
}
initialize()