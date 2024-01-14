const doc = document;
const waterArr = [];
let id = 0;

class CoffeeMachine {
  _on = false;
  countStart = 0;

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
        
              <button class="coffeemachine-water__add-water">
                Add water
              </button>
            </div>
          </div>
        </div>

        <div class="coffeemachine-selection-preparation-coffee">
          <div class="coffeemachine-selection-coffee"></div>

          <div class="coffeemachine-preparation-coffee">
            <div class="coffeemachine-preparation-coffee__box-time">
              <div class="coffeemachine-preparation-coffee__timer">
                <p id="${ this.id }" class="coffeemachine-preparation-coffee__countdown">
                  
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
		const lsID = localStorage.getItem(this.id);
		this.waterVolumeH = lsID;
		if (lsID == 100) {
			this.btnWater = true;
		} else {
			this.btnWater = false;
		}
      }
      console.log(this.id, ' waterVolumeH:', this.waterVolumeH);
    }

    this.renderCoffeeMachine();
    this.renderTypeCoffee();
    this.buttonOnOff();
    this.makeCoffee();
    this.btnAddWaterOff();
    this.statusEkrana();
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
	  this.btnAddWaterOff(true);  

    if (this.countStart >= 0) {
      this.makeCoffee();
      this.countStart++;
    }

    this.statusEkrana();
  }

  off() {
    this._on = false;
	  this.btnAddWaterOff(false);
    this._element.querySelector('.coffeemachine-water__water').style.height = 0;
    const buttonTextOff = this._element.querySelector('.coffeemachine-button__info-on-off_text');
    buttonTextOff.innerHTML = 'Machine OFF';
    buttonTextOff.style.color = 'red';
    this.statusEkrana();
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
  
  checkStateWater() { //Перевірка рівня води в баку. Не використовується
	const lsID = localStorage.getItem(this.id);
	if (lsID == 100) { // || lsID == this.waterVolumeH
		return false;
	} else {
		return true;
	}
  }

  statusEkrana() {
    const contextEkran = this._element.querySelector('.coffeemachine-preparation-coffee__countdown');
    if (!this._on) {
      contextEkran.innerHTML = '';
    } else {
      contextEkran.innerHTML = '0:00';
    }
  }

  btnAddWaterOff(state) {
    const buttonAddWater = this._element.querySelector('.coffeemachine-water__add-water');
    if (!this._on || !state) {
		this.btnWater = state;
		buttonAddWater.disabled = true;
		buttonAddWater.style.opacity = 0.5;
		buttonAddWater.style.cursor = 'not-allowed';
	} else if (this._on && !state) {
		this.btnWater = state;
		buttonAddWater.disabled = true;
		buttonAddWater.style.opacity = 0.5;
		buttonAddWater.style.cursor = 'not-allowed';
	} else {
		this.btnWater = state;
		buttonAddWater.disabled = false;
		buttonAddWater.style.opacity = 1;
		buttonAddWater.style.cursor = 'pointer';
    }
  }

  buttonOnOff() {
    const buttonOn = this._element.querySelector('.button_on');
    const buttonOff = this._element.querySelector('.button_off');
    const buttonText = this._element.querySelector('.coffeemachine-button__info-on-off_text');
    const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
    const infoMakingCoffee = this._element.querySelector('.coffeemachine-preparation-coffee__message-done');
  
    buttonOn.onclick = () => {
      buttonText.innerHTML = 'Machine ON';
      buttonText.style.color = 'green';

      for (let item of buttonCoffee) {
        item.disabled = false;
        item.style.opacity = 1;
        item.style.cursor = 'pointer';
      }
      this.on();  
      //this.btnAddWaterOff(true);
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

      infoMakingCoffee.innerHTML = '';
      //this.btnAddWaterOff(false);
    };
  }

	makeCoffee() {
		const typeCoffeeButtons = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
		const water = this._element.querySelector('.coffeemachine-water__water');
		const infoMakingCoffee = this._element.querySelector('.coffeemachine-preparation-coffee__message-done');
		// const infoAddWater = this._element.querySelector ('.coffeemachine-water__volume-warning');

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
		  const resultMakeCoffeText = 'Your coffee. Delicious!';
		  infoMakingCoffee.innerHTML = resultMakeCoffeText;
		}

		function startCountdown(seconds, countdownElement) {
		  let remainingTime = seconds;
		
		  function updateCountdown() {
			const minutes = Math.floor(remainingTime / 60);
			const seconds = remainingTime % 60;
			countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		  }
		
		  const countdownInterval = setInterval(() => {
			updateCountdown();
			remainingTime--;
		
			if (remainingTime < 0) {
			  clearInterval(countdownInterval);
			  // Функція після завершення відліку
			  resultMakeCoffe();
			  return true;
			}
		  }, 1000);
		
		  // Викликайте updateCountdown для відображення часу на початку
		  updateCountdown();
		}
    
		const countdownElement = document.getElementById(this.id);

		for (let button of typeCoffeeButtons) {
			button.onclick = () => {
				//this.btnAddWaterOff(false);
				function blockBtn(state, buttonCoffeeL, buttonAddWaterL) {
					//const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
					for (let item of buttonCoffeeL) {
						if (!state) {
							item.disabled = true;
							item.style.opacity = 0.5;
							item.style.cursor = 'not-allowed';
						} else {
							item.disabled = false;
							item.style.opacity = 1;
							item.style.cursor = 'pointer';
						}
					}
					if (!state) {
						buttonAddWaterL.disabled = true;
						buttonAddWaterL.style.opacity = 0.5;
						buttonAddWaterL.style.cursor = 'not-allowed';
					} else {
						buttonAddWaterL.disabled = false;
						buttonAddWaterL.style.opacity = 1;
						buttonAddWaterL.style.cursor = 'pointer';
					}
				}
				
				const myFirstPromise = new Promise((resolve, reject) => {
				  setTimeout(() => {
					resolve(true);
				  }, 8000);
				});
				
				const lastWaterVolumeH = this.waterVolumeH - 100;
				if (lastWaterVolumeH >= 100) {
					water.style.height = `${ lastWaterVolumeH }px `;
					if (localStorageWaterVolume >= lastWaterVolumeH) {
						localStorage.setItem(`${ this.id }`, lastWaterVolumeH);
						this.waterVolumeH = lastWaterVolumeH;
					}
					infoMakingCoffee.innerHTML = 'Wait please. <br> Coffee is being prepared.'
					blockBtn(false, this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee'), this._element.querySelector('.coffeemachine-water__add-water'));
					startCountdown(7, countdownElement);
					myFirstPromise.then((successMessage) => {
						blockBtn(successMessage, this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee'), this._element.querySelector('.coffeemachine-water__add-water'));;
					});
					if (lastWaterVolumeH == 100){
						infoMakingCoffee.innerHTML = 'Wait please. <br> Coffee is being prepared. <br> The water is running out! Add water.';
						const buttonCoffee = this._element.querySelectorAll('.coffeemachine-selection-coffee__type-coffee');
						for (let item of buttonCoffee) {
						  item.disabled = true;
						  item.style.opacity = 0.5;
						  item.style.cursor = 'not-allowed';
						}
					}
				} else {
					infoMakingCoffee.innerHTML = 'The water is running out! Add water.'
					return;
				}
			
				localStorageWaterVolume = localStorage.getItem(this.id);
				console.log('localStorageWaterVolume: ', localStorageWaterVolume);
			};
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

			infoMakingCoffee.innerHTML = '';
			localStorageWaterVolume = localStorage.getItem(this.id);
        };
	}
}

const coffeeMach1 = new CoffeeMachine('Philips', ['Espresso', 'Double Espresso', 'Macchiato', 'Latte', 'Americano'], 3);
const coffeeMach2 = new CoffeeMachine('Samsung', ['Macchiato', 'Latte', 'Espresso'], 2);
const coffeeMach3 = new CoffeeMachine('Samsung', [], 2);
const coffeeMach4 = new CoffeeMachine('Simens', ['Espresso', 'Double Espresso'], 1);