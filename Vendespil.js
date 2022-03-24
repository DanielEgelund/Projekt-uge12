let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const cards = document.querySelectorAll(".back");
const kort = document.querySelectorAll(".card");


function flipCard() {
    if (lockBoard) {
        return lockBoard;
    }
    if (this === firstCard){
        return firstCard;
    }

    this.classList.toggle("hide"); // Ændrer elementents class till card.hide

    // Når der trykkes på et kort kontrolleres der om kortet allerede er trykket på. Hvis det ikke er så sættes hasflipped til true
    // og firstCard = det trykkede kort
    // Hvis det er sandt at det første kort er trykket og man trykker på et nyt sættes secondCard til this som er det man nu har trykket på
    if (!hasFlippedCard){ 
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;

        matchChecker();
    }
}

// Hvert element har en data-brand="x". Hvis data-brand er det samme på to trykkede kort er det et match og så fjernes eventListeneren
// og boardet resettes
function matchChecker(){

    if (firstCard.dataset.brand === secondCard.dataset.brand){
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    } else {
        // Hvis kortene ikke har samma data-brand så låses boarded i 1000 ms, for at brugeren ikke kan trykke på noget inden kortene
        // Har vendt sig om igen. Derudover fjerne "hide" fra classen så den igen bare hedder class="back"
            lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("hide");
            secondCard.classList.remove("hide");
            resetBoard();
        }, 1000);
    }
}

// Resetter board ved at sætte variablerne tilbage til som de startede og gør firstCard og secondCard tomme.
// Hver gang resetBoard køres svarer det til at et nyt forsøg begynder
function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

// Hvert element har en style.order som via tal sortere rækkefølgen på elementerne.
// Funktionen giver hvert kort en style.order mellem 0 og 11
// Elementer med lavest style.order vises først i rækkefølgen osv.

(function shuffle(){
    kort.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();
// Paranteser gør det til en IIFE - den udføreres med det samme.


// Eventlistener der lytter på click. Hvis der klikkes så kører funktionen flipCard.
cards.forEach(card => card.addEventListener("click", flipCard));