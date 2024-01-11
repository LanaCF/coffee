class CoffeeMachine {
    _on = false;

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

    showInfo() {
        console.log('---------- INFO ---------');
        console.log(`brand:       ${ this.brand }`);
        console.log(`coffeeTypes: ${ this.coffeeTypes.join(', ') }`);
        console.log(`waterVolume: ${ this.waterVolume }л`);
        console.log('===============');
    }

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

coffeeMach1.showInfo();
coffeeMach1.on();
// coffeeMach1.checkOn();
coffeeMach1.makeCoffee('капучіно');
coffeeMach1.makeCoffee('xbxfbfg');

//MACHINE 2 --------------------------------------

coffeeMach2.showInfo();
coffeeMach2.on();
// coffeeMach2.checkOn();
coffeeMach2.makeCoffee('латте');







