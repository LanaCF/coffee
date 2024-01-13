const doc = document;
const waterArr = [];
let id = 0;

class CoffeeMachine {
  _on = false;

  renderCoffeeMachine() {
    const parent = doc.querySelector('.main');

    const html = 
        `<div class="coffeemachine-block">
        <div class="coffeemachine-block__machine-box">
          <div class="coffeemachine-button">
            <div class="coffeemachine-button__button_box">
              <button class="coffeemachine-button__button_item button_on">
                ON
              </button>
  
              <button class="coffeemachine-button__button_item button_off">
                OFF
              </button>
            </div>

            <div class="coffeemachine-button__info-on-off">
              <p class="coffeemachine-button__info-on-off_text">Machine OFF</p>
            </div>
          </div>

          <div class="coffeemachine-block__machine">
            <img src="img/coffeemachine.png" alt="" class="coffeemachine-block__machine_img">
          </div>

          <div class="coffeemachine-info">
            <div class="coffeemachine-info__box">
              <p class="coffeemachine-info__text brand bold">
                Brand: 
              </p>
  
              <p class="coffeemachine-info__text brand-name">
                ${ this.brand }
              </p>
            </div>

            <div class="coffeemachine-info__box">
              <p class="coffeemachine-info__text drinks bold">
                Drinks: 
              </p>
  
              <p class="coffeemachine-info__text drinks-list">
                ${ this.coffeeTypes.join(', ') }
              </p>
            </div>

            <div class="coffeemachine-info__box">
              <p class="coffeemachine-info__text volume bold">
                Volume: 
              </p>
  
              <p class="coffeemachine-info__text volume-value">
                ${ this.waterVolume }L
              </p>
            </div>
          </div>
        </div>

        <div class="coffeemachine-water">
          <div class="coffeemachine-water__capacitywater">
            <div class="coffeemachine-water__water"></div>
          </div>

          <div class="coffeemachine-water__volume">
            <div class="coffeemachine-water__volume-allowed">
              <p class="coffeemachine-water__liter">
                3L
              </p>
            </div>

            <div class="coffeemachine-water__volume-allowed">
              <p class="coffeemachine-water__liter">
                2L
              </p>
            </div>

            <div class="coffeemachine-water__volume-allowed-liter">
              <p class="coffeemachine-water__liter">
                1L
              </p>
            </div>

            <div class="coffeemachine-water__volume-warning">
              <p class="coffeemachine-water__liter red">
                0.5L
              </p>
            </div>
          </div>
        </div>

        <div class="coffeemachine-selection-preparation-coffee">
          <div class="coffeemachine-selection-coffee"></div>

          <div class="coffeemachine-preparation-coffee">
            <div class="coffeemachine-preparation-coffee__box-time">
              <div class="coffeemachine-preparation-coffee__timer">
                <p id="${ this.id }" class="coffeemachine-preparation-coffee__countdown">
                  00:07
                </p>
              </div>

              <div class="coffeemachine-preparation-coffee__message-coffee-prepared">
                <p class="coffeemachine-preparation-coffee__message-done"></p>
              </div>
            </div>

            <div class="coffeemachine-preparation-coffee__done-cup">
              <div class="">
                <img src="img/coffee.png" alt="" class="coffeemachine-preparation-coffee__done-cup-img">
              </div>
            </div>
          </div>
        </div>
      </div>`;

    this._element = document.createElement('div');
    this._element.innerHTML = html;
  
    parent.insertAdjacentElement('beforeend', this._element);
  }

  constructor(brand, coffeeTypes, waterVolume) {
    this.brand = brand;
    this.coffeeTypes = coffeeTypes;
    this.waterVolume = waterVolume;
    this.id = id++;

    if (waterVolume) {
      this.waterVolumeH = (this.waterVolume * 200);
      if (localStorage.getItem(this.id) == null) {
        localStorage.setItem(this.id, this.waterVolumeH);
      } else {
        this.waterVolumeH = localStorage.getItem(this.id);
      }
      console.log(this.id, ' ', this.waterVolumeH);
    }

    this.renderCoffeeMachine();
    this.renderTypeCoffee();
    this.buttonOnOff();
    this.makeCoffee();
  }

  renderTypeCoffee() {
    const parentButton = this._element.querySelector('.coffeemachine-selection-coffee');
    parentButton.innerHTML = '';

    for (let item of this.coffeeTypes) {
      const button = document.createElement('button');
      button.className = 'coffeemachine-selection-coffee__type-coffee';
      button.disabled = false;
      button.style.opacity = 0.5;
      button.style.cursor = 'not-allowed';
      button.innerText = item;

      parentButton.appendChild(button);
    }
  }

  on() {
    this._on = true;
    console.log('-= ON =-');
    this.makeCoffee();
  }

  off() {
    this._on = false;
    this._element.querySelector('.coffeemachine-water__water').style.height = 0;
    const buttonTextOff = this._element.querySelector('.coffeemachine-button__info-on-off_text');
    buttonTextOff.innerHTML = 'Machine OFF';
    buttonTextOff.style.color = 'red';
    console.log('-= OFF =-');
  }

  checkOn() {
    /*if (!this._on) {
      console.log('Coffee Machine is OFF !!!');
    } else {
      console.log('Coffee Machine is ON !!!');
    }*/
    return this._on;
  }

  buttonOnOff() {
    const buttonOn = this._element.querySelector('.button_on');
    const buttonOff = this._element.querySelector('.button_off');
    const buttonText = this._element.querySelector('.coffeemachine-button__info-on-off_text');
    const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
  
    buttonOn.onclick = () => {
      buttonText.innerHTML = 'Machine ON';
      buttonText.style.color = 'green';
      

      for (let item of buttonCoffee) {
        item.disabled = false;
        item.style.opacity = 1;
        item.style.cursor = 'pointer';
      }
      this.on();  
    };
  
    buttonOff.onclick = () => {
      this.off();
      buttonText.innerHTML = 'Machine OFF';
      buttonText.style.color = 'red';

      for (let item of buttonCoffee) {
        item.disabled = true;
        item.style.opacity = 0.5;
        item.style.cursor = 'not-allowed';
      }
    };
  }

  makeCoffee() {
    const typeCoffeeButtons = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
    const water = this._element.querySelector('.coffeemachine-water__water');
    const infoMakingCoffee = this._element.querySelector('.coffeemachine-preparation-coffee__message-done');
    const infoAddWater = this._element.querySelector ('.coffeemachine-water__volume-warning');

    if (!this.checkOn()) {
      console.log('Не можливо зробити каву, немає живлення! Coffee Machine is OFF !!!');
      return this.checkOn();
    }

    if (this.coffeeTypes.length === 0) {
      console.log(`Помилка`);
      this.off();
      return;
    } else {
      console.log(`Параметри кнопок вибору кави`, this.coffeeTypes);
    }
    

    let localStorageWaterVolume = localStorage.getItem(this.id);

    // Якщо дані відсутні або невірні, встановлюємо значення за замовчуванням
    /*if (!localStorageWaterVolume || isNaN(parseFloat(localStorageWaterVolume))) {
      localStorageWaterVolume = this.localStorageWaterVolume;
    }*/
    if (localStorageWaterVolume != null) {
      console.log('localStorageWaterVolume: ', localStorageWaterVolume);
      water.style.height = localStorageWaterVolume + 'px';
    } else {
      water.style.height = this.waterVolume * 200 + 'px';
      console.log(water.style.height);
    }

    

    function resultMakeCoffe() {
      const resultMakeCoffeText = 'Ваша кава готова';
      infoMakingCoffee.innerHTML = resultMakeCoffeText;
    }

    function countdown(valueT, docElement) {
      //const countBack = thiselem.querySelectorAll('${ this.id }');
      const countBack = docElement;
      // Визначаємо початкову дату і час.
      const startDate = new Date();
      startDate.setHours(0, 0, 0);
      startDate.setSeconds(0);
      // Визначаємо кінцеву дату і час.
      const endDate = new Date();
      endDate.setHours(0, 0, 0);
      endDate.setSeconds(valueT);
      //console.log("endDate", endDate);
      // Розраховуємо різницю між початковою і кінцевою датами і часами.
      let difference = endDate - startDate;
      //const difference = valueT*1000;
      console.log("difference", difference / 1000);
      // Запуск циклу.
      let interval = setInterval(() => {
        // Зменшуємо різницю на одиницю.
        difference -= 1000;
        //countBack.innerHTML = '00:0'+(difference / 1000);
    
        // В кінці циклу виводимо повідомлення.
        console.log(difference / 1000);
        console.log(countBack);
        // Якщо різниця дорівнює 0, то зупиняємо цикл.
        if (difference <= 0) {
          clearInterval(interval);
          resultMakeCoffe();
          console.log("Час вичерпався!");
        }
      }, 1000);
    }

    for (let button of typeCoffeeButtons) {
      button.addEventListener('click', () => {
        let lastWaterVolumeH = this.waterVolumeH - 100;
        if (lastWaterVolumeH >= 100) {
          water.style.height = `${ lastWaterVolumeH }px `;
          if (localStorageWaterVolume >= lastWaterVolumeH) {
            localStorage.setItem(`${ this.id }`, lastWaterVolumeH);
            this.waterVolumeH = lastWaterVolumeH;
          }
          infoMakingCoffee.innerHTML = 'Wait please. <br> Coffee is being prepared.'
          countdown(7, document.getElementById('#'+this.id));
          //setTimeout(resultMakeCoffe, 7000);
          if (lastWaterVolumeH == 100){
            infoMakingCoffee.innerHTML = 'Wait please. <br> Coffee is being prepared.<br>The water is running out! Add water.';
              const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
              for (let item of buttonCoffee) {
                item.disabled = true;
                item.style.opacity = 0.5;
                item.style.cursor = 'not-allowed';
              }
    
              infoAddWater.innerHTML =
              `<p class="coffeemachine-water__liter red">
                0.5L
              </p>
            
              <button class="coffeemachine-water__add-water">
                  Add water
              </button>`;
          }
        } else {
            infoMakingCoffee.innerHTML = 'The water is running out! Add water.'
            return;
        }
        
        const buttonAddWater = this._element.querySelector('.coffeemachine-water__add-water');

        buttonAddWater.onclick = () => {
          const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
          water.style.height = this.waterVolume * 200 + 'px';
          localStorage.setItem(`${ this.id }`, this.waterVolume * 200);
          this.waterVolumeH = this.waterVolume * 200;

          for (let item of buttonCoffee) {
            item.disabled = false;
            item.style.opacity = 1;
            item.style.cursor = 'pointer';
          }
          localStorageWaterVolume = localStorage.getItem(this.id);
        }
        localStorageWaterVolume = localStorage.getItem(this.id);
        console.log('localStorageWaterVolume: ', localStorageWaterVolume);
      });
    }

    /*for (let button of typeCoffeeButtons) {
      button.addEventListener('click', () => {
        water.style.height = `${ this.waterVolume * 200 - 100 }px `;
        infoMakingCoffee.innerHTML = 'Wait please. <br> Coffee is being prepared.'
        countdown(7, document.getElementById('#'+this.id));
        setTimeout(resultMakeCoffe, 7000);

        if (water.style.height === '100px') {
          const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');

          for (let item of buttonCoffee) {
            item.disabled = true;
            item.style.opacity = 0.5;
            item.style.cursor = 'not-allowed';
          }

          infoAddWater.innerHTML =
          `<p class="coffeemachine-water__liter red">
            0.5L
          </p>
        
          <p class="coffeemachine-water__liter-warning red">
          The water is running out! <br> Add water.
          </p>
          
          <button class="coffeemachine-water__add-water">
              Add water
          </button>`;
        }

        const buttonAddWater = this._element.querySelector('.coffeemachine-water__add-water');

        buttonAddWater.onclick = () => {
          water.style.height = this.waterVolume * 200 + 'px';
        }
      });
    }*/

    

    //localStorage.setItem('waterVolume', localStorageWaterVolume);
  }
}

const coffeeMach1 = new CoffeeMachine('Philips', ['Espresso', 'Double Espresso', 'Macchiato', 'Latte', 'Americano'], 3);
const coffeeMach2 = new CoffeeMachine('Samsung', ['Macchiato', 'Latte', 'Espresso'], 2);
const coffeeMach3 = new CoffeeMachine('Samsung', [], 2);
const coffeeMach4 = new CoffeeMachine('Simens', ['Espresso', 'Double Espresso'], 1);


const saveLocalStorage = (products, maxId) => {
  localStorage.setItem('maxProductId', maxProduct.id);
};

const getsaveLocalStorageAdmin = () => {
  const getData = localStorage.getItem('products');
  return;
};
