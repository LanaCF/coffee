const doc = document;

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
                  <p class="coffeemachine-button__info-on-off_text">Machine ON</p>
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
                    Simens
                  </p>
                </div>
    
                <div class="coffeemachine-info__box">
                  <p class="coffeemachine-info__text drinks bold">
                    Drinks: 
                  </p>
      
                  <p class="coffeemachine-info__text drinks-list">
                    Espresso, Double Espresso, Macchiato, Latte, Americano
                  </p>
                </div>
    
                <div class="coffeemachine-info__box">
                  <p class="coffeemachine-info__text volume bold">
                    Volume: 
                  </p>
      
                  <p class="coffeemachine-info__text volume-value">
                    2L
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
              <div class="coffeemachine-selection-coffee">
                <button class="coffeemachine-selection-coffee__type-coffee">
                  Espresso
                </button>
    
                <button class="coffeemachine-selection-coffee__type-coffee">
                  Double Espresso
                </button>
    
                <button class="coffeemachine-selection-coffee__type-coffee">
                  Macchiato
                </button>
    
                <button class="coffeemachine-selection-coffee__type-coffee">
                  Latte
                </button>
    
                <button class="coffeemachine-selection-coffee__type-coffee">
                  Americano
                </button>
              </div>
    
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
    
        parent.insertAdjacentHTML('beforeend', html);    
    }

    constructor(brand, coffeeTypes, waterVolume) {
        this.brand = brand;
        this.coffeeTypes = coffeeTypes;
        this.waterVolume = waterVolume;
    }

    on() {
        this._on = true;
        console.log('-= ON =-');
    }

    checkOn() {
        if (!this._on) {
          console.log('Coffee Machine is OFF !!!');
        }
        return this._on;
    }

    // showInfo() {
    //     console.log('---------- INFO ---------');
    //     console.log(`brand:       ${ this.brand }`);
    //     console.log(`coffeeTypes: ${ this.coffeeTypes.join(', ') }`);
    //     console.log(`waterVolume: ${ this.waterVolume }л`);
    //     console.log('===============');
    // }

    makeCoffee(coffeeType) {
        if (!this.checkOn()) {
            return;
        }

        if (!this.coffeeTypes.includes(coffeeType)) {
            console.log(`Помилка`);
            return;
        }

        console.log('Старт...');
        console.log(`Ваше ${coffeeType} готово!`);
    }
}

//MACHINE 1 --------------------------------------

const coffeeMach1 = new CoffeeMachine('Philips', ['капучіно', 'латте', 'еспресо'], 3);
const coffeeMach2 = new CoffeeMachine('Samsung', ['капучіно', 'латте'], 2);

coffeeMach1.renderCoffeeMachine()
// coffeeMach1.showInfo();
coffeeMach1.on();
// coffeeMach1.checkOn();
coffeeMach1.makeCoffee('капучіно');
coffeeMach1.makeCoffee('xbxfbfg');

//MACHINE 2 --------------------------------------

coffeeMach2.renderCoffeeMachine()
// coffeeMach2.showInfo();
coffeeMach2.on();
// coffeeMach2.checkOn();
coffeeMach2.makeCoffee('латте');







