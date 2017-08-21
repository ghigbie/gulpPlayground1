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

let person = new Person('Morpheus');


document.write(person.hello());
