class Person{
    constructor(name){
        this.name =name;
    }
    hello(){
        if(typeof this.name === 'string'){
            return`Yo, this is ${this.name}!!!`;
        }else{
            return 'Hello';
        }
    }
}

class Animal{
    constructor(animalType){
        this.animalType = animalType;
    }
    makeNoise(){
        if(typeof this.animalType === 'string'){
            return `<h1>Yo, this is a ${this.animalType}!!!</h1>`;
        }else{
            return `No animal here`;
        }
    }
}

class Plant{
    constructor(plantType){
        this.plantType = plantType;
    }
    be(){
        if(typeof this.plantType === 'string'){
            return `<h2>Yo, this is a ${this.plantType}</h2>`;
        }else{
            return `No plant here`;
        }
    }
}

let person = new Person('Morpheus');
let animal1 = new Animal('Lion');
let plant1 = new Plant('Cactus');


document.write(person.hello());
document.write(animal1.makeNoise());
document.write(plant1.be());
