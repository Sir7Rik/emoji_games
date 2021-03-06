
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
    const timerNode = document.querySelector('.timer');
    const alertNode = document.querySelector('.alert');
   new GameProcess({
       emojiList,
       cards,
       shuffleEmoji,
       timerNode,
       alertNode
   })
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

function secondToTime(s){
    const minute = Math.floor(s / 60);
    const _seconds = s % 60;
    const secondsFormat = _seconds < 10 ? `0${_seconds}` : _seconds.toString();
    return `${minutes}:${secondsFormat}`;
}

class GameProcess {
    constructor({ emojiList, cardField, cardElems, timerNode, alertNode}) {
        this.emojiList = this.coupleEmoji(emojiList);
        this.cardField = cardsField;
        this.cardElems = cardElems;
        this.cardList = [];
        this.initCards();
        this.initEvents();
        this.timerNode = this.timerNode;
        this.alertNode = this.alertNode;
        this.timerOpts = {
            seconds: 1,
        }
    }

    setTime(){
        this.timerNode.textContent = secondToTime(seconds);
    }


    clearContext(){
        this.gameStarted = false;
        ['win', 'lose'].forEach((i) => {
            thi.alertNode.querySelector(`.${i}`).classList.add('invisible');
        });
        this.alertNode.classList.add('invisible');
    }

    init(){
        this.initCards();
        this.initEvents();
        this.setTime(this.timerOpts.seconds);
    }

    initTimer(){
        let {seconds} = this.timerOpts;
        this.timeId = setInterval(() => {
            seconds--;
            this.setTime(seconds);
            if(!seconds){
                this.endGame(false);

            }
        }, 1000);
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
    initEvents() {
        this.cardsField.addEventListener('click', ({ target }) => {
            if( target.classList.constaint('card')) {
                const cardIdx = this.cardsElems.indexOf(target);
                const card = this.cardsList[cardIdx];
                if (card.getStatus() === enumStatus.close){
                    this.closeWrong();
                    this.checkCards(card);
                }
            }
        });
      }
      closeWrong(){
          this.cardList.filter(
              (x) => x.getStatus() === enumStatus.wrong
          ).forEach((x) => x.close ()); 
      }
      restartGame(){
          this.cardList.forEach((x) => x.close());
          this.initCards();
          this.setTime(this.timerOpts.seconds);
          this.clearContext();
      }
      endGame(win){
          clearInterval(this.timeId);
          const status = win ? 'win' : 'lose';
          const btnText = win ? 'Играть снова' : 'Еще разок?';
          this.alertNode.querySelector('.alert__button').textContent = btnText;
          this.alertNode.querySelector(`.${status}`).classList.remove('invisible');
          this.alertNode.classList.remove('invisible');
      }

      checkCards(card){
          if (!this.gameStarted){
              this.gameStarted = true;
              this.initTimer();
          }
          const findOpenCard = this.cardList.find((x) => x.getStatus() === enumStatus.open);
          if(findOpenCard){
              const isCouple = cards.getId() === findOpenCard.getId();
              if(isCouple){
                  findOpenCard.success();
                  cards.success(true);
              } else {
                  findOpenCard.wrong();
                  card.wrong(true);
              }
          } else{
              cards.open();
          }
          if (this.cardList.every((x) => x.getStatus() ===enumStatus.success)){
              this.endGame(true);
          }
      }
      coupleEmoji(emojiList){
        const arr = this.emojiList.map((emoji, id) => ({
            emoji, id,
        }));
        return arr.concat(arr);
      }
    }



class Card {
    constructor(node, {id, emoji}) {
        this.node = node;
        this.id = id;
        this.status = enumStatus.close;
        this.node.textContent = emoji;
    }
    getStatus(){

        return this.status;
    }
    getId(){
        return this.id;

    }
    addClass(name){
        this.node.classList.add(name)

    }
    removeClass(){
        this.node.classList.remove(name)

    }
    clearContext(){
        ['open', 'wrong', 'success', 'open-success', 'open-wrong'].forEach((n) => this.removeClass(n));
    }
    open(){
        this.removeClass('close');
        this.addClass('open');
        this.status = enumStatus.open;
    }
    close(){
        this.clearContext();
        this.addClass('close');
        this.status = enumStatus.close;
    }
    success(flip){
        this.removeClass('close');
        this.addClass(flip ? 'open-success' : 'success');
        this.status = enumStatus.success;

    }
    wrong(flip){
        this.removeClass('close');
        this.addClass(flip ? 'open-wrong' : 'wrong');
        this.status = enumStatus.wrong;
    }

    checkCards(card){
        const findOpenCard = this.cardsList.find((x) => x.getStatus() === enumStatus.open);
        if (findOpenCard) {
            const isCouple = card.getId() === findOpenCard.getId();
            if (isCouple){
                findOpenCard.success();
                card.success(true);
            }
            else {
                findOpenCard.wrong();
                card.wrong(true);
            }
        }
        else {
            card.open();
        }
    }
}


    
