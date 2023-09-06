// Const modifier

// The const keyword, when used with types, creates a type where all properties are readonly.
// This is useful when you want to create a type that can't be modified.
// For example, you can use it to create a type that represents a configuration object.

const normalConfigObject = {
  version: 1,
  name: 'My App',
  settings: {
    theme: 'dark',
    admin: false,
  },
  env: {
    databaseUrl: 'http://localhost:3000',
    port: 3000,
  },
};

type NormalConfig = typeof normalConfigObject;

// The NormalConfig type is the same as the constConfigObject type.
// The only difference is that the properties of NormalConfig are not readonly.

const isProd = true;

const constConfigObject = {
  version: 1,
  name: 'My App',
  settings: {
    theme: normalConfigObject.settings.theme === 'dark' ? 'dark' : 'light',
    admin: false,
  },
  env: {
    databaseUrl: isProd ? 'some.other.url' : 'http://localhost:3000',
    port: 3000,
  },
} as const;

type ConstConfig = typeof constConfigObject;

// The ConstConfig type is the same as the constConfigObject type.

// This is useful when you have values that you know are not going to change.

// Routes example

const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  login: '/login',
  account: '/account',
} as const;

type Routes = typeof routes[keyof typeof routes];

const routeTo = (route: Routes) => {
  //...
};

routeTo(routes.home);

// Const enums

// This can also be used to make enums.

// The Direction enum below actually uses numbers to represent the values.

enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right,  // 3
}

// This means that you can do this:

function move(direction: Direction) {
  console.log(direction);
}

move(Direction.Up);
move(0);

// This works as of TypeScript 5.1. It even disallows incorrect numbers.
// move(4);

// Small bonus: const enums:
// Const enums are enums that are inlined at compile time.
// This means that they don't exist at runtime.
// This is slightly more efficient for package size, but it's not a big difference.
// This can mean that you might have slightly less run-time type safety.

const enum Compass {
  North = 'North',
  South = 'South',
  East = 'East',
  West = 'West',
}

// Notice that the Compass enum values are strings.
// This does not work the same way as the Direction enum.
// You cannot pass in a string to the moveCompass function, even if it's a valid value.

function moveCompass(direction: Compass) {
  console.log(direction);
}

moveCompass(Compass.North);

// Unless you cast the type to Compass, but this defeats the point of type safety.

moveCompass('North' as Compass);


// Declaring objects as const is a fairly good alternative to enums.

const Arrow = {
  Up: 'Up',
  Down: 'Downwards',
  Left: 'Left',
  Right: 'Right',
} as const;

type Arrow = typeof Arrow[keyof typeof Arrow];

// This is a bit more verbose, but it's more flexible.
// However, the Arrow object and Arrow type are now interchangeable.
// As the Arrow type is a union of all the values of the Arrow object, it's more obvious what the expected values are.
// And, as the Arrow object is a const object, it's not possible to modify it.
// You can use the Arrow object properties as valid values that satisfy the Arrow type.

function moveArrow(direction: Arrow) {
  console.log(direction);
}

moveArrow(Arrow.Up);
moveArrow('Up');

// This is a good alternative to enums, but it's not a full replacement.

// Const arrays

// You can also use the const keyword with arrays.
// This creates a readonly array.

const normalArray = [1, 2, 3, 4, 5];

type NormalArray = typeof normalArray;

const constArray = [1, 2, 3, 4, 5] as const;

type ConstArray = typeof constArray;

// NormalArray is simply the same as number[], but ConstArray is different.
// ConstArray is a tuple type, which means that it has a fixed length and each element has a specific type.
// In this case, the length is 5 and each element is a number. However, in this example the numbers are actually fixed values.
// If we want to create a tuple type not with fixed values, we would have to use implicit typing.

const constArray2 = [Math.random(), Math.random(), Math.random(), Math.random()] as const;

type ConstArray2 = typeof constArray2;

// This is just an example, but if you didn't know what the values are going to be, you can still get a strict type that you can use.

// Const arrays are useful when you want to create a type that represents a fixed array of values.
// For example, you can use it to create a type that represents a list of valid HTTP methods.

const validHttpMethods = ['GET', 'POST', 'PUT', 'DELETE'] as const;

type Methods = typeof validHttpMethods;

type ValidHttpMethod = Methods[number]; // Indexed with the number type, as an array is an object that is indexed with numbers.

// We can also access any particular value of the array.

type HttpGetMethod = typeof validHttpMethods[0]; // 'GET'

// The ValidHttpMethod type is the same as 'GET' | 'POST' | 'PUT' | 'DELETE'.
// This is useful when you want to create a type that represents a list of valid values.

function makeRequest(method: ValidHttpMethod) {
  console.log(method);
}

// We can use validHttpMethods as a normal array, and call the makeRequest function with any of the valid values.

makeRequest(validHttpMethods[0]);

// or

validHttpMethods.forEach(makeRequest);

// and we can also just manually enter the string values.

makeRequest('GET');

// If the array was not denoted as const, we would not be able to do this.

// ['GET', 'POST', 'PUT', 'DELETE'].forEach(makeRequest);
