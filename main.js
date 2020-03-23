const arrows = document.querySelectorAll(".arrow");

const [arrowHome, arrowKontak, arrowInfo, arrowAbout, ArrowExperyment] = arrows;
const cards = document.querySelectorAll(".card");
const menuNames = document.querySelectorAll(".menu_name");

function rotArrow() {
  let rot = arrows[1].style.transform;
  if (!rot) {
    rot = 0;
    openCards();
  } else {
    const liczba = parseInt(
      arrows[1].style.transform.split("(")[1].split("d")[0]
    );
    rot = liczba % 360;
    rot == 180 ? closeCards() : openCards();
  }
  arrows.forEach(arrow => (arrow.style.transform = `rotate(${-rot + 180}deg)`));
}

function closeCards() {
  cards.forEach((card, idx, cards) => {
    card.classList.remove("up");
    card.classList.remove("open");
  });
}

function openCards() {
  cards.forEach((card, idx, cards) => {
    card.classList.remove("active");
    card.classList.remove("up");
    card.classList.add("open");
  });
  menuNames.forEach(menuName => menuName.classList.remove("hidden"));
  arrows.forEach((arrow, idx) => {
    idx !== 0 ? arrow.classList.add("hidden") : null;
  });
}

function makeActiveCard() {
  rotArrow();
  this.classList.add("hidden");
  const cardId = this.parentNode.id;
  const cardArray = Array.from(cards);
  const toActive = cardArray.findIndex(elementor => {
    return elementor.id === `${cardId}`;
  });
  console.log(toActive);
  cards.forEach((card, idx, cards) => {
    idx != toActive
      ? card.classList.remove("active")
      : card.classList.add("active");
    idx < toActive ? card.classList.add("up") : card.classList.remove("up");
    idx >= toActive
      ? card.classList.remove("open")
      : card.classList.add("open");
  });
  arrows.forEach(arrow => arrow.classList.add("hidden"));
  arrows[0].classList.remove("hidden");
  arrows[toActive].classList.remove("hidden");

  // rotArrowAll();
}
// --------------- LISENERS -------------------------
arrows.forEach((arrow, idx, arrows) => {
  arrow.addEventListener("click", rotArrow.bind(arrow));
});
menuNames.forEach((menuName, idx, menuNames) => {
  menuName.addEventListener("click", makeActiveCard.bind(menuName));
});
