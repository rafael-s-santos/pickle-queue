let queue = [];

function renderCurrentCharacter(character) {
  const currentDiv = document.getElementById("currentCharacter");
  const section = document.getElementById("attendingSection");

  if (character) {
    section.style.display = "flex";
    currentDiv.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <h3>${character.name}</h3>
      <p>Espécie: ${character.species}</p>
      <p>Status: ${character.status}</p>
    `;
  } else {
    section.style.display = "none";
    currentDiv.innerHTML = "";
  }
}



const addSound = new Audio('add.mp3');
const removeSound = new Audio('remove.mp3');

const queueContainer = document.getElementById("queueContainer");
const addBtn = document.getElementById("addCharacter");
const removeBtn = document.getElementById("removeCharacter");

function renderQueue() {
  queueContainer.innerHTML = "";
  queue.forEach(character => {
    const card = document.createElement("div");
    card.className = "character-card fade-in";
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <p>${character.name}</p>
    `;
    queueContainer.appendChild(card);
  });
}

function attendCharacter() {
  if (queue.length === 0) {
    alert("Nenhum personagem na fila!");
    return;
  }

  const character = queue.shift();
  removeSound.play();
  renderCurrentCharacter(character);
  renderQueue();
}


async function addCharacter() {
  const id = Math.floor(Math.random() * 826) + 1;
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();
    queue.push(data);
    addSound.play();
    renderQueue();
  } catch (error) {
    alert("Erro ao buscar personagem. Tente novamente.");
  }
}

function removeCharacter() {
  if (queue.length > 0) {
    const firstCard = queueContainer.children[0];
    firstCard.classList.remove("fade-in");
    firstCard.classList.add("fade-out");

   
    setTimeout(() => {
      queue.shift();
      removeSound.play();
      renderQueue();
    }, 500); 
  } else {
    alert("A fila está vazia!");
  }
}

addBtn.addEventListener("click", addCharacter);
removeBtn.addEventListener("click", attendCharacter);

renderCurrentCharacter(null);

