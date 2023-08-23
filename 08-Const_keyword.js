// Const modifier
// The const keyword, when used with types, creates a type where all properties are readonly.
// This is useful when you want to create a type that can't be modified.
// For example, you can use it to create a type that represents a configuration object.
var normalConfigObject = {
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
// The NormalConfig type is the same as the constConfigObject type.
// The only difference is that the properties of NormalConfig are not readonly.
var isProd = true;
var constConfigObject = {
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
};
// The ConstConfig type is the same as the constConfigObject type.
// This is useful when you have values that you know are not going to change.
// Routes example
var routes = {
    home: '/',
    about: '/about',
    contact: '/contact',
    login: '/login',
    account: '/account',
};
var routeTo = function (route) {
    //...
};
routeTo(routes.home);
// Const enums
// This can also be used to make more intuitive enums.
// The Direction enum below actually uses numbers to represent the values.
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
// This means that you can do this:
function move(direction) {
    console.log(direction);
}
move(Direction.Up);
move(0);
// Notice that the Compass enum values are strings.
// This does not work the same way as the Direction enum.
// You cannot pass in a string to the moveCompass function, even if it's a valid value.
function moveCompass(direction) {
    console.log(direction);
}
moveCompass("North" /* Compass.North */);
// moveCompass('North');
// Unless you cast the type to Compass, but this defeats the point of type safety.
moveCompass('North');
// Declaring objects as const is a good alternative to enums.
var Arrow = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right',
};
// This is a bit more verbose, but it's more flexible.
// However, the Arrow object and Arrow type are now interchangeable.
// As the Arrow type is a union of all the values of the Arrow object, it's more obvious what the expected values are.
// And, as the Arrow object is a const object, it's not possible to modify it.
// You can use the Arrow object properties as valid values that satisfy the Arrow type.
function moveArrow(direction) {
    console.log(direction);
}
moveArrow(Arrow.Up);
moveArrow('Up');
// This is a good alternative to enums, but it's not a replacement.
// Const arrays
// You can also use the const keyword with arrays.
// This creates a readonly array.
var normalArray = [1, 2, 3, 4, 5];
var constArray = [1, 2, 3, 4, 5];
// NormalArray is simply the same as number[], but ConstArray is different.
// ConstArray is a tuple type, which means that it has a fixed length and each element has a specific type.
// In this case, the length is 5 and each element is a number. However, in this example the numbers are actually fixed values.
// If we want to create a tuple type not with fixed values, we can use implicit typing.
var constArray2 = [Math.random(), Math.random(), Math.random(), Math.random()];
// This is just an example, but if you didn't know what the values are going to be, you can still get a strict type that you can use.
// Const arrays are useful when you want to create a type that represents a fixed array of values.
// For example, you can use it to create a type that represents a list of valid HTTP methods.
var validHttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
// The ValidHttpMethod type is the same as 'GET' | 'POST' | 'PUT' | 'DELETE'.
// This is useful when you want to create a type that represents a list of valid values.
function makeRequest(method) {
    console.log(method);
}
// We can use validHttpMethods as a normal array, and call the makeRequest function with any of the valid values.
makeRequest(validHttpMethods[0]);
// or
validHttpMethods.forEach(makeRequest);
// Let's look at what this would look like without the const keyword.
var validHttpMethods2 = ['GET', 'POST', 'PUT', 'DELETE'];
