// Conditional types

// Conditional types allow for the use of logic that can be used to determine the type of a generic at compile time.

type NotNullish<T> = T extends null | undefined ? never : T;
type EndsUpWithNever = NotNullish<null | undefined>;
type NotUndefined = NotNullish<string | number | undefined>;

// Conditional types use the ternary operator the same way you would normally, but with the extends keyword as the condition

type IsString<T> = T extends string ? true : false;
type NotString = IsString<number>;
type YeahThatIsAString = IsString<string>;

// You can nest and even recurse conditional types

type GetStringOrNumber<T> = T extends string ? string : T extends number ? number : never;

type StringOrNumber = GetStringOrNumber<string | number | boolean>;
type NeverAStringOrNumber = GetStringOrNumber<boolean>;

type GetFlattenedType<T> = T extends Array<infer U> ? GetFlattenedType<U> : T;
type Flattened = GetFlattenedType<number[][][][] | boolean>;


// The infer keyword is used to infer the type of a generic. In the above example, the type of U is inferred from the type of the array elements.

// Another example is inferring the return type of a function

type GetReturnType<T> = T extends (...args: any[]) => infer U ? U : never;
type ReturnsNumber = GetReturnType<() => number>;
type ReturnsNever = GetReturnType<string>;


// This type flattens an object and dot-joins the keys

type FlattenedObject<Object extends object> = object extends Object
  ? never
  : {
    [Key in keyof Object]-?: (
      x: NonNullable<Object[Key]> extends infer PropertyType
        ? PropertyType extends object
        ? PropertyType extends readonly any[]
        ? Pick<Object, Key>
        : FlattenedObject<PropertyType> extends infer FlattenedPropertyType
        ? {
          [FlattenedPropertyTypeKey in keyof FlattenedPropertyType as `${Extract<Key, string | number>}.${Extract<FlattenedPropertyTypeKey, string | number>}`]: FlattenedPropertyType[FlattenedPropertyTypeKey];
        }
        : never
        : Pick<Object, Key>
        : never
    ) => void;
  } extends Record<keyof Object & string, (y: infer ObjectWithDottedKey) => void>
  ? ObjectWithDottedKey extends infer _
  ? { [Key in keyof ObjectWithDottedKey]: ObjectWithDottedKey[Key] }
  : never
  : never;

type Foo = {
  a: number;
  b: string;
  c: {
    d?: boolean;
    e: {
      f: number[];
    };
    g: {
      readonly h: string;
      i: {
        j: boolean;
        k: symbol;
      };
    };
  };
};

type Bar = FlattenedObject<Foo>;
type BarKeys = keyof Bar;

type NotCleverOfYou = FlattenedObject<object>;
