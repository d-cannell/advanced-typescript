// Union type

type Input = string | number;

function handleInput(input: Input) {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return `${input}`;
  }
}

console.log(handleInput("hello"));
console.log(handleInput(123));

class ListItem {
  constructor(public id: string, public text: string) { }
}

class ListItemCollection {
  constructor(public items: ListItem[]) { }
}

const processListItems = (items: ListItem | ListItemCollection) => {
  //... 
}

// --------------------------------------------
// Intersection type

type Admin = {
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// Equivalent to:
interface ElevatedEmployee2 extends Admin, Employee { }

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// --------------------------------------------
// Discriminated unions
{
  interface Bird {
    type: "bird";
    flyingSpeed: number;
  }

  interface Horse {
    type: "horse";
    runningSpeed: number;
  }

  type Animal = Bird | Horse;

  function moveAnimal(animal: Animal) {
    switch (animal.type) {
      case "bird":
        return `The bird flies at: ${animal.flyingSpeed}mph`;
      case "horse":
        return `The horse runs as: ${animal.runningSpeed}mph`;
      default:
        throw new Error("Unknown animal type");
    }
  }

  console.log(moveAnimal({ type: "bird", flyingSpeed: 30 }));
  console.log(moveAnimal({ type: "horse", runningSpeed: 20 }));
}

// --------------------------------------------
// Branded types

declare const brand: unique symbol;

type Brand<T, BrandName extends string> = {
  [brand]: BrandName,
} & T;

{
  type EmailAddress = Brand<string, "email">;
  type Password = Brand<string, "password">;

  function validateEmail(email: string): EmailAddress {
    // Demo on how to best handle this later
    return email as EmailAddress;
  }

  function validatePassword(password: string): Password {
    // Demo on how to best handle this later
    return password as Password;
  }

  function login(email: EmailAddress, password: Password) {
    // ...
  }

  validateEmail("hello");
  validatePassword("world");

  // login(validateEmail("hello"), "world"); // Error
}
