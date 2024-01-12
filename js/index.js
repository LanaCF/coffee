const doc = document;

class CoffeeMachine {
  // _on = false;

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

              <p class="coffeemachine-water__liter-warning red">
                The water is running out! <br> Add water.
              </p>
            </div>
          </div>
        </div>

        <div class="coffeemachine-selection-preparation-coffee">
          <div class="coffeemachine-selection-coffee"></div>

          <div class="coffeemachine-preparation-coffee">
            <div class="coffeemachine-preparation-coffee__box-time">
              <div class="coffeemachine-preparation-coffee__timer">
                <p class="coffeemachine-preparation-coffee__countdown">
                  00:07
                </p>
              </div>

              <div class="coffeemachine-preparation-coffee__message-coffee-prepared">
                <p class="coffeemachine-preparation-coffee__message-done">
                  Done! <br> Delicious!
                </p>
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

  makeCoffee() {
    const typeCoffeeButtons = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
    const water = this._element.querySelector('.coffeemachine-water__water');

    let localStorageWaterVolume = localStorage.getItem('waterVolume');

    // Якщо дані відсутні або невірні, встановлюємо значення за замовчуванням
    if (!localStorageWaterVolume || isNaN(parseFloat(localStorageWaterVolume))) {
      localStorageWaterVolume = this.localStorageWaterVolume;
    }

    water.style.height = this.waterVolume * 200 + 'px';
    console.log(water.style.height);
  
    for (let button of typeCoffeeButtons) {
      button.addEventListener('click', () => {
        water.style.height = `${ this.waterVolume * 200 - 100 }px `;
      });
    }

    localStorage.setItem('waterVolume', localStorageWaterVolume);
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
    };
  
    buttonOff.onclick = () => {
      buttonText.innerHTML = 'Machine OFF';
      buttonText.style.color = 'red';

      for (let item of buttonCoffee) {
        item.disabled = true;
        item.style.opacity = 0.5;
        item.style.cursor = 'not-allowed';
      }
    };
  }

  
}

const coffeeMach1 = new CoffeeMachine('Philips', ['Espresso', 'Double Espresso', 'Macchiato', 'Latte', 'Americano'], 3);
const coffeeMach2 = new CoffeeMachine('Samsung', ['Macchiato', 'Latte', 'Espresso'], 2);


const saveLocalStorage = (products, maxId) => {
  localStorage.setItem('maxProductId', maxProduct.id);
};

const getsaveLocalStorageAdmin = () => {
  const getData = localStorage.getItem('products');
  return;
};
