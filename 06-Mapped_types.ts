// Mapped types

// Mapped types are a way to transform an existing type into a new type.

// The syntax for mapped types is similar to the syntax for index signatures.

// The syntax for mapped types is as follows:

// { [Key in Keys]: NewType }

// The type of the property Key in the new type will be NewType.

type Human = {
  name: string;
  age: number;
  location: string;
};

type ConvertPropertiesToMethods<Object> = {
  [Key in keyof Object]: () => Object[Key];
};

type HumanMethods = ConvertPropertiesToMethods<Human>;


// You can add and remove modifiers such as readonly or optional.

type MakeReadonly<Object> = {
  readonly [Key in keyof Object]: Object[Key];
};

type MakeOptional<Object> = {
  [Key in keyof Object]?: Object[Key];
};

type ReadonlyHuman = MakeReadonly<Human>;
type OptionalHuman = MakeOptional<Human>;

// To remove modifiers, you use the '-' character.
type MakeMutable<Object> = {
  -readonly [Key in keyof Object]: Object[Key];
};

type MakeRequired<Object> = {
  [Key in keyof Object]-?: Object[Key];
};

type MutableHuman = MakeMutable<ReadonlyHuman>;
type RequiredHuman = MakeRequired<OptionalHuman>;

// You can also use mapped types to create new types from existing types.
{
  type Getters<Object> = {
    [Key in keyof Object as `get${Capitalize<string & Key>}`]: () => Object[Key];
  };

  type Setters<Object> = {
    [Key in keyof Object as `set${Capitalize<string & Key>}`]: (value: Object[Key]) => void;
  };

  type HumanGetters = Getters<Human>;
  type HumanSetters = Setters<Human>;
}

// Quick explanation of square bracket notation

// The square bracket notation is used to access properties on a type or interface.

// For example, with the Human type, you can access the name property like this:

type Name = Human['name'];

// You can also use square bracket notation to access properties on a type that are themselves types.

type HumanArray = Human[];
type HumanAgain = HumanArray[number];



// Immediately indexed mapped types

type Colours = 'red' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple';

type ColourInfo = {
  [Colour in Colours]: {
    thisColour: Colour;
    otherColours: Omit<Colours, Colour>;
  };
}[Colours];

// You can do the same with unions
type Instrument =
  | {
    type: 'guitar';
    strings: 6;
  }
  | {
    type: 'piano';
    keys: 88;
  }
  | {
    type: 'drums';
    pieces: 5;
  };

type PrefixInstrumentType<I extends { type: string }> = {
  type: `instrument-${I['type']}`;
} & Omit<I, 'type'>;

type PrefixedInstrument = {
  [K in Instrument as K['type']]: PrefixInstrumentType<K>;
}[Instrument['type']];

const guitar: PrefixedInstrument = {
  type: 'instrument-guitar',
  strings: 6,
};

// Can include conditional types too

type SuccessResponseCode = 200;
type ErrorResponseCode = 400 | 500;
type ResponseCode =
  | SuccessResponseCode
  | ErrorResponseCode;

type ResponseObject = {
  [C in ResponseCode]: {
    code: C;
    body: C extends SuccessResponseCode
    ? { success: true; data: unknown }
    : { success: false; error: string };
  };
}[ResponseCode];


function handleResponse(response: ResponseObject) {
  if (response.code === 200) {
    console.log(response.body.data);
  } else {
    console.error(response.body.error);
  }
}
