// Type guards and predicates

// Type guards help us narrow down the type of a variable within a conditional block.
// They are often used in conjunction with the typeof and instanceof operators.
// They can also be used with the in operator, but this is less common.
// They can also be used with predicates, which we will cover later.

function printIfNumber(input: unknown) {
  if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return "Not a number!";
  }
}

console.log(printIfNumber(123.456));
console.log(printIfNumber("hello"));

// We can also use type guards with the instanceof operator
{
  class Cat {
    constructor(public name: string, public age: number) { }
  }

  class Dog {
    constructor(public name: string) { }
  }

  function printPetNameAndType(input: Cat | Dog) {
    if (input instanceof Cat) {
      console.log(`Cat: ${input.name}, age: ${input.age}`);
    } else {
      console.log(`Dog: ${input.name}`);
    }
  }

  // We can also use type guards with the in operator
  function printPetAge(input: Cat | Dog) {
    if ("age" in input) {
      console.log(`Age: ${input.age}`);
    } else {
      console.log("No age!");
    }
  }
}

// Type predicates

// Type predicates are functions that return a boolean
// They are often used in conjunction with type guards

interface Car {
  make: string;
  model: string;
  year: number;
  horsepower: number;
}

interface Bike {
  gears: number;
}

// The key element is that the return type of the function is `input is Car`
function isCar(input: Car | Bike): input is Car {
  return (input as Car).horsepower !== undefined;
}

function printVehicle(input: Car | Bike) {
  if (isCar(input)) {
    return `Car: ${input.make} ${input.model}. Horsepower: ${input.horsepower}`;
  } else {
    return `Bike: ${input.gears} gears`;
  }
}

console.log(printVehicle({ make: "Honda", model: "Civic", year: 2000, horsepower: 200 }));
console.log(printVehicle({ gears: 5 }));

// Type predicates can be used to assist with branded types, and validating them

type Username = Brand<string, "username">;
type Password = Brand<string, "password">;

function isUsername(input: string): input is Username {
  return input.length >= 3 && input.length <= 20;
}

function isPassword(input: string): input is Password {
  return input.length >= 8 &&
    input.length <= 20 &&
    RegExp(/[A-Z]/).exec(input) !== null &&
    RegExp(/[a-z]/).exec(input) !== null &&
    RegExp(/\d/).exec(input) !== null;
}

function validateInput(username: string, password: string) {
  if (isUsername(username) && isPassword(password)) {
    return {
      username,
      password,
    };
  } else {
    return 'Invalid input!';
  }
}

console.log(validateInput("hello", "world"));
console.log(validateInput("hello", "World123"));

// Bonus: asserts

function isString(input: unknown): asserts input is string {
  if (typeof input !== "string") {
    throw new Error("Not a string!");
  }
}

function testAString(input: unknown) {
  isString(input);

  return input.toUpperCase();
}

console.log(testAString("hello"));
// console.log(testAString(123));

function invariant(input: boolean, message?: string): asserts input {
  if (!input) {
    throw new Error("Invariant violation!" + (message ? ` ${message}!` : ""));
  }
}

function printIfNumber2(input: unknown) {
  invariant(typeof input === "number", 'This is not a number');

  return input.toFixed(2);
}

function printIfStringIsDefined(input?: string) {
  invariant(input !== undefined, 'This string is not defined');

  return input.toUpperCase();
}

console.log(printIfNumber2(123.456));
console.log(printIfStringIsDefined("hello"));
// console.log(printIfStringIsDefined());
