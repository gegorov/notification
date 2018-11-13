import { data } from './data.js'; // eslint-disable-line

const modal = document.getElementById('notification');
const closeButton = document.getElementById('modal-button-close');
const checkBox = document.getElementById('toggle');
const leftButton = document.getElementById('controls-left');
const rightButton = document.getElementById('controls-right');
const flag = 'disableTips';
const [...tips] = data;
const STARTING_TIP_INDEX = 0;
let tipId = STARTING_TIP_INDEX;

function renderNotification(container) {
  setTimeout(
    () => {
      container.style.display = 'block';
    },
    5000,
  );
}
function setCircle(id, type) {
  document.getElementById(id).innerHTML = `${type === 'active' ? '<i class="fas fa-circle"></i>' : '<i class="far fa-circle"></i>'}`;
}


function setTip(id) {
  const tip = tips[id];
  const liId = `tip${id}`;
  document.getElementById('modal-content').innerHTML = `<p>${tip.text}<br> <strong>${tip.author}</strong></p>`;
  setCircle(liId, 'active');
}


function left() {
  setCircle(`tip${tipId}`, 'no');
  tipId -= 1;
  if (tipId < 0) {
    tipId = tips.length - 1;
  }
  setTip(tipId);
}

function right() {
  setCircle(`tip${tipId}`, 'no');
  tipId += 1;
  if (tipId === tips.length) {
    tipId = 0;
  }
  setTip(tipId);
}


window.onload = () => {
  if (localStorage.getItem(flag) !== 'true') {
    renderNotification(modal);
    setTip(STARTING_TIP_INDEX);
  }
};

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

leftButton.addEventListener('click', () => {
  left();
});

rightButton.addEventListener('click', () => {
  right();
});

checkBox.addEventListener('change', (e) => {
  if (e.target.checked) {
    localStorage.clear();
    localStorage.setItem(flag, 'true');
  } else {
    localStorage.clear();
    localStorage.setItem(flag, 'false');
  }
});

document.onkeydown = (e) => {
  const code = e.keyCode;
  switch (code) {
    case 37: { left(); break; }
    case 39: { right(); break; }
    case 27: { modal.style.display = 'none'; break; }
    default: break;
  }
};

const indexMap = {
  tip0: 0,
  tip1: 1,
  tip2: 2,
  tip3: 3,
  tip4: 4,
  tip5: 5,
};
document.getElementById('controls').addEventListener('click', (e) => {
  const parent = e.target.closest('li');
  const elementId = parent.getAttribute('id');
  setCircle(`tip${tipId}`, 'no');
  tipId = indexMap[elementId];
  setTip(indexMap[elementId]);
});
