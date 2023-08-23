// Generics

// Generics are a way to make functions, classes, interfaces, and types more reusable and "generic"

// 1. Generics with functions

// Let's say we have a function that takes in a string, and returns a string

function printAndReturn(input: string): string {
  console.log(input);

  return input;
}

// We can use generics to make this function more reusable

function printAndReturnGeneric<T>(input: T): T {
  console.log(`${input}`);

  return input;
}

// We can now call this function with any type

printAndReturnGeneric<string>("hello");
printAndReturnGeneric<number>(123);
printAndReturnGeneric<boolean>(true);

// We can also let TypeScript infer the type for us

printAndReturnGeneric("hello");
printAndReturnGeneric(123);
printAndReturnGeneric(true);

// This also works with object types that have inherited properties
{
  interface Animal {
    species: string;
  }

  interface Dog extends Animal {
    isGoodBoy: boolean;
  }

  const isDog = (input: Animal): input is Dog => ('isGoodBoy' satisfies keyof Dog) in input;

  interface Cat extends Animal {
    isGrumpy: boolean;
  }

  const isCat = (input: Animal): input is Cat => ('isGrumpy' satisfies keyof Cat) in input;

  function evalAnimal<T extends Animal>(input: T): T {
    if (isDog(input)) return { ...input, isGoodBoy: true };

    if (isCat(input)) return { ...input, isGrumpy: true };
    
    throw new Error('Unknown animal');
  }

  const myDog: Dog = { species: 'dog', isGoodBoy: false };
  console.log(evalAnimal(myDog));

  const myCat: Cat = { species: 'cat', isGrumpy: false };
  console.log(evalAnimal(myCat));
}
