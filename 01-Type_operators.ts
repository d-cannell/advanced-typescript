// Type operators

// 1. typeof

const myString = "hello";
const myNumber = 123;

const dog = {
  species: "dog",
  isGoodBoy: true,
};

// typeof can be used to check the type of a variable
console.log(typeof myString);
console.log(typeof myNumber === 'number');

// typeof can also be used to check the type of a property of an object
console.log(typeof dog.species);

// typeof can also be used to get the shape of an object (at compile time)
type Dog = typeof dog;

// typeof can also be used to get the shape of a const object
const cat = {
  species: "cat",
  isGoodBoy: false,
  age: Math.random() > 0.5 ? 1 : 2,
  dob: new Date(),
} as const;

type Cat = typeof cat;


// 2. keyof

// keyof can be used to get the keys of an object
type DogKeys = keyof typeof dog;

// keyof can also be used to get the keys of an object type
type CatKeys = keyof Cat;

// keyof is an older operator that does not follow the new pattern, so we can adapt it to the new pattern
type Keyof<T> = keyof T;
type CatKeys2 = Keyof<Cat>;


// 3. in

// in can be used to evaluate the presence of a key in an object
const hasSpecies = "species" in dog;
console.log(hasSpecies);

// in is often best used in type guards, which we will cover in the next file

// 4. instanceof

// instanceof can be used to check the type of a class at runtime
class Snake {
  constructor(public length: number) { }
}

const mySnake = new Snake(5);

console.log(mySnake instanceof Snake);

// this can be most useful in type guards, or in type narrowing
{
  class Bird {
    constructor(public wingspan: number) { }
  }

  type Animal = Snake | Bird;

  function moveAnimal(animal: Animal) {
    if (animal instanceof Snake) {
      return "slithering";
    } else {
      return "flying";
    }
  }

  console.log(moveAnimal(mySnake));
}

// 5. Utility types

// Utility types are types that are built into TypeScript that can be used to manipulate types

// 5a. Partial

// Partial can be used to make all properties on an object optional
type PartialDog = Partial<Dog>;

// 5b. Required

// Required can be used to make all properties on an object required

type RequiredDog = Required<PartialDog>;

// 5c. Readonly

// Readonly can be used to make all properties on an object readonly

type ReadonlyDog = Readonly<Dog>;

// 5d. Record

// Record can be used to create a new object type with a given shape

type DogRecord = Record<"species" | "isGoodBoy", boolean>;
type CatProps = Record<keyof Cat, boolean>;
type NewObject = Record<string, number>;

const dogRecord: DogRecord = {
  species: true,
  isGoodBoy: true,
};

// 5e. Pick

// Pick can be used to create a new object type with a subset of properties from another object type

type DogProps = Pick<Dog, "species" | "isGoodBoy">;

// 5f. Omit

// Omit can be used to create a new object type with a subset of properties from another object type

type CatProps2 = Omit<Cat, "age" | "dob">;

// 5g. Exclude

// Exclude can be used to exclude a type from another type

type CatProps3 = Exclude<Cat[keyof Cat], string>;
type NotAString = Exclude<string | number | boolean, string>;

// 5h. Extract

// Extract can be used to extract a type from another type

type CatProps4 = Extract<Cat[keyof Cat], string>;
type OnlyStrings = Extract<string | number | boolean, string>;

// 5i. NonNullable

// NonNullable can be used to remove null and undefined from a type

type QueryInput = string | number | null | undefined;
type QueryProps = NonNullable<QueryInput>;

// 5j. Parameters

// Parameters can be used to get the parameters of a function type

type MyFunction = (a: string, b: number) => void;
type MyFunctionParams = Parameters<MyFunction>;
type MyFunctionParamsTypes = MyFunctionParams[number];

// 5k. ConstructorParameters

// ConstructorParameters can be used to get the parameters of a constructor function type

type MyConstructor = new (a: string, b: number) => Dog;
type MyConstructorParams = ConstructorParameters<MyConstructor>;

// 5l. ReturnType

// ReturnType can be used to get the return type of a function type

type MyFunctionReturn = ReturnType<MyFunction>;

// 5m. InstanceType

// InstanceType can be used to get the instance type of a constructor function type

type MyConstructorInstance = InstanceType<MyConstructor>;


// Bonus: satisfies operator

// The satisfies operator is used to check that a type satisfies another type
// This is useful because it does not change the type in doing so, unlike the 'as' keyword

type FetchParams = {
  url: string;
  method: "GET" | "POST";
  body?: string;
};

function fetchSomething(fetchParams: FetchParams) {
  // ...
}

const paramBuilder = {
  url: "https://example.com",
  method: "GET",
} satisfies FetchParams;

fetchSomething(paramBuilder);
