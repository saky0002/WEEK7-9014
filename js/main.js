import { enemyList } from './data.js';
let enemies = [...enemyList]; //copy the contents of enemyList to a new array
//with let we are allowed to replace the contents of enemies with a new array

document.addEventListener('DOMContentLoaded', init);

function init() {
  //when the page loads...
  buildEnemyCards();
  addListeners();
}

function addListeners() {
  //add a submit listener to the form
  let form = document.querySelector('#enemyForm');
  form.addEventListener('submit', addUserToList);

  //add delete listeners for cards
  let section = document.querySelector('#enemies');
  section.addEventListener('click', removeFromList);

  //do the reset
  document.getElementById('btnCancel').addEventListener('click', (ev) => {
    document.getElementById('enemyForm').reset(); //clear the form
    ev.preventDefault(); //don't submit the form
    ev.stopPropagation();
  });
}

function buildEnemyCards() {
  // if (!enemyList) return;
  let section = document.querySelector('#enemies');
  //called when page loads AND after any update to the enemyList
  section.innerHTML = enemies
    .map((enemy) => {
      // console.log(enemy);
      return `<div class="enemy" data-ref="${enemy.uuid}">
        <h3>${enemy.name}</h3>
        <p>${enemy.reason}</p>
        <button class="btnDelete">Forgive Them</button>
      </div>`;
    })
    .join(' ');
}

function addUserToList(ev) {
  //save the form data in the list
  //remember to generate a uuid for each enemy
  //rebuild the list of enemies cards
  ev.preventDefault(); //STOP the SUBMIT happening. No page reload
  document.getElementById('enemy').classList.remove('error');
  document.getElementById('reason').classList.remove('error');
  let uuid = crypto.randomUUID();
  let name = document.getElementById('enemy').value; //what the user typed
  let reason = document.getElementById('reason').value; //what the user typed
  if (!name) {
    document.getElementById('enemy').classList.add('error');
    return;
  }
  if (!reason) {
    document.getElementById('reason').classList.add('error');
    return;
  }
  let newEnemy = {
    uuid,
    name,
    reason,
  };
  enemies.unshift(newEnemy);
  buildEnemyCards();
  document.getElementById('enemyForm').reset();
}

function removeFromList(ev) {
  //find the uuid in the card whose button was clicked
  //remove from the enemyList
  //rebuild the list of enemies cards
  let target = ev.target;
  // console.log(target.tagName, target.localName, ev.currentTarget.localName);
  if (target.localName === 'button' && target.classList.contains('btnDelete')) {
    let card = target.closest('.enemy');
    if (card) {
      let uuid = card.getAttribute('data-ref');
      enemies = enemies.filter((enemy) => {
        if (enemy.uuid === uuid) {
          return false;
        }
        return true;
      });
      console.log(enemies);
      buildEnemyCards();
    }
  }
}
