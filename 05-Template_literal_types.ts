// Template literal types

// Template literal types allow you to construct types from template literal strings.

// Template literal types are enclosed in backticks (`) instead of single quotes (') or double quotes (").

// Template literal types can be used to create union types, intersection types, and even mapped types.

type ScreenSizes = 600 | 800 | 1100 | 1400 | 1600;
type Breakpoints = `${ScreenSizes}px`;


// The unions get fully expanded, and you can actually combine any number of unions to come up with all possible combinations.
// However, too many will cause an error.

type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Tens = `${Digits}${Digits}`;
type Hundreds = `${Digits}${Digits}${Digits}`;

type Decimals = `${Digits}.${Digits}${Digits}${Digits}`;

type BoardFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ChessboardSquare = `${BoardFile}${BoardRank}`;
type ChessPiece = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type Chessboard = Record<ChessboardSquare, ChessPiece>;


// They can also be used as a way to type signed IDs.

type SignedID<Prefix extends string> = `${Prefix}-${string}`;

type UserSignedID = SignedID<'user'>;
const userId: UserSignedID = 'user-1234';


// You can also use template literal types to create mapped types.

type Getters<Object> = {
  [Key in keyof Object as `get${Capitalize<string & Key>}`]: () => Object[Key];
};

type Setters<Object> = {
  [Key in keyof Object as `set${Capitalize<string & Key>}`]: (value: Object[Key]) => void;
};

type Person = {
  name: string;
  age: number;
  location: string;
};

type PersonGetters = Getters<Person>;
type PersonSetters = Setters<Person>;

// We'll cover mapped types in more detail in the next file.
