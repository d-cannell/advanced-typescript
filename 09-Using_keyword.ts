/*
TypeScript 5.2 has introduced a new keyword: using.

This keyword has been introduced to support the upcoming ECMAScript feature: Explicit Resource Management.

This keyword works basically the same as using declarations in C#.
*/

// This is what you may have had to do before:

class DBConnectionWithoutUsing {
  constructor() {
    console.log('DB Connection Created...');
  }

  public close() {
    console.log('DB Connection Closed...');
  }
}

function doSomethingWithoutUsing() {
  const connection = new DBConnectionWithoutUsing();

  // ...

  connection.close();
}

// But this can get messy if you have multiple code paths:

function doSomethingElseWithoutUsing() {
  const connection = new DBConnectionWithoutUsing();

  try {
    // ... do something with the connection

    connection.close();
  } catch (error) {
    connection.close();
  }
}

// this can be improved slightly with the use of finally:

function doSomethingElseWithFinallyWithoutUsing() {
  const connection = new DBConnectionWithoutUsing();

  try {
    // ... do something with the connection
  } catch (error) {
    // ... handle error
  } finally {
    connection.close();
  }
}

// This works as well for multiple return statements:

function doSomethingWithMultipleReturnsWithoutUsing() {
  const connection = new DBConnectionWithoutUsing();

  try {
    const result = Math.random() * 100;

    if (result > 50) {
      return result * 2;
    } else if (result > 25) {
      return result * 3;
    } else {
      return result * 4;
    }
  } finally {
    connection.close();
  }
}

// But this can get messy if you have multiple connections:

function doSomethingWithMultipleConnectionsWithoutUsing() {
  const connection1 = new DBConnectionWithoutUsing();
  const connection2 = new DBConnectionWithoutUsing();
  const connection3 = new DBConnectionWithoutUsing();

  try {
    // ... do something with the connections
  } finally {
    connection1.close();
    connection2.close();
    connection3.close();
  }
}

// So here's where the using keyword comes in:

class DBConnectionWithUsing {
  constructor() {
    console.log('DB Connection Created...');
  }

  public close() {
    console.log('DB Connection Closed...');
  }

  [Symbol.dispose]() {
    this.close();
  }
}

function doSomethingWithUsing() {
  using connection = new DBConnectionWithUsing();

  // ... do something with the connection

  // connection.close() is called automatically
}

// This works with multiple code paths:

function doSomethingElseWithUsing() {
  using connection = new DBConnectionWithUsing();

  try {
    // ... do something with the connection
  } catch (error) {
    // ... handle error
  }
}

// And multiple connections:

function doSomethingWithMultipleConnectionsWithUsing() {
  using connection1 = new DBConnectionWithUsing();
  using connection2 = new DBConnectionWithUsing();
  using connection3 = new DBConnectionWithUsing();

  // ... do something with the connections
}


