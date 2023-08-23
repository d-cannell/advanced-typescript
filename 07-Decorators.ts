// Decorators

// Decorators are a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.
// Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

// Decorators are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript.

// Class decorators

type ClassContext = {
  kind: 'class',
  name: string | undefined,
  addInitializer(initializer: () => void): void
};

// This is a class decorator that logs to the console when the class is instantiated:

function logInit(_constructor: new (...args: any[]) => any, context: ClassContext) {
  if (context.kind !== "class") {
    throw new Error("This decorator is for classes only");
  }

  context.addInitializer(() => {
    console.log(`Initializing ${context.name}`);
  });
}

@logInit
class FooClass {
  constructor() {
    console.log('Constructor');
  }
}

// This class decorator adds a property to the class:

function addName(name: string) {
  return function (constructor: new (...args: any[]) => any, context: ClassContext) {
    if (context.kind !== "class") {
      throw new Error("This decorator is for classes only");
    }

    context.addInitializer(() => {
      constructor.prototype.name = name;
    });
  };
}

@addName("Foo")
class BarClass {
  baz: string = "Baz";
}

const bar = new BarClass();
// console.log(bar.name); // Errors as name is not a property of BarClass
// You have to cast bar to any to access the name property:
console.log((bar as any).name);


// This decorator identifies the class as a singleton (or, a service):

const services: Map<string, any> = new Map();

function Service(constructor: new (...args: any[]) => any, context: ClassContext) {
  if (context.kind !== "class") {
    throw new Error("This decorator is for classes only");
  }

  context.addInitializer(() => {
    if (services.has(constructor.name)) {
      return services.get(constructor.name);
    }

    const instance = new constructor();
    services.set(constructor.name, instance);

    return instance;
  });
}

@Service
class MyService {
  constructor() {
    console.log("MyService constructor");
  }
}


// Method decorators

type MethodContext = {
  kind: "method",
  name: string | symbol,
  access: { get(...args: any[]): any },
  static: boolean,
  private: boolean,
  addInitializer(initializer: () => void): void,
};

// This method decorator logs to the console when the method is called:

function logMethod(target: Function, context: MethodContext) {
  if (context.kind !== "method") {
    throw new Error("This decorator is for methods only");
  }

  return function (...args: any[]) {
    console.log(`Called ${String(context.name)} with args ${args}`);
    return target.apply(args);
  }
}

class FooTwo {
  @logMethod
  bar() {
    console.log('Bar');
  }
}


// Property decorators

type PropertyContext = {
  kind: "field",
  name: string | symbol,
  access: { get(...arhs: any[]): unknown, set(...args: any[]): void },
  static: boolean,
  private: boolean,
};

// This property decorator marks a property as deprecated, and will log a warning when the property is accessed:

function deprecated(target: any, context: PropertyContext) {
  if (context.kind !== "field") {
    throw new Error("This decorator is for properties only");
  }

  return function (initialValue: any) {
    console.warn(`Property ${String(context.name)} is deprecated`);
    return initialValue;
  }
}

class FooThree {
  @deprecated
  bar: string = "Bar";
}

