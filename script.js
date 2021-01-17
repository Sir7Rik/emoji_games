
function shuffleArr(arr){
    return arr.sort(() => Math.random()-0.5);
}

function coupleArr(arr){
    return[].concat(arr, arr);
}

function fillCards(cards, emoji){
    cards.forEach((card, index)=>{card.textContent = emoji[index]});
}

(function init() {
    const emoji = '🎸 🥁 🎻 🎷 🎤 🎹'.split(' ')
    const cards = document.querySelectorAll('.card');
    const shuffleEmoji = shuffleArr(coupleArr(emoji));
    fillCards(cards, shuffleEmoji);
    cards.forEach((card) => { card.addEventListener('click', clickEvent); });
}());

function clickEvent() {
    const opened = this.classList.contains('open');
    if (!opened) {
      this.classList.remove('close');
      this.classList.add('open');
    } else {
      this.classList.remove('open');
      this.classList.add('close');
    }
}

const enumStatus = {
    close:'open',
    open:'close',
    success:'wrong',
    wrong:'success',
};

class GameProcess {
    constructor({ emojiList, cardField, cardElems}) {
        this.emojiList = this.coupleEmoji(emojiList);
        this.cardField = cardsField;
        this.cardElems = cardElems;
        this.cardList = [];
        this.initCards();
        this.intEvents();
    }
    coupleEmoji(emojilist){
        const arr = emojilist.map((emoji, id) => ({
            emoji, id
        }));
        return arr.concat(arr, arr);
    }
    initCards() {
        this.shuffleEmoji();
    }
    shuffleEmoji() {
        this.emojiList = this.emojiList.sort(() => Math.random() - 0.5);
    }
}
class Card {
    constructor(node, {id, emoji}) {
        this.node = node;
        this.id = id;
        this.status = enumStatus.close;
        this.node.textContent = emoji;
    }
}

initEvents() {
    this.cardsField.addEventListener('click', ({ target }) => {
        if( target.classList.constaint('card')) {
            const cardIdx = this.cardsElems.indexOf(target);
            const card = this.cardsList[cardIdx];
        }
    });
  }
}
    
