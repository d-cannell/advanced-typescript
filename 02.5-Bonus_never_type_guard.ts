// Normal undefined handling:

interface InputParams {
  username: string;
  password: string;
  createdAt: Date;
}

{
  const validateInput = (input: Partial<InputParams>): InputParams => {
    if (!input.username) {
      throw new Error("'username' is required");
    }

    if (!input.password) {
      throw new Error("'password' is required");
    }

    if (!input.createdAt) {
      throw new Error("'createdAt' is required");
    }

    return input as InputParams;
  };

  console.log(validateInput({ username: "hello", password: "world", createdAt: new Date() }));
  // console.log(validateInput({ username: "hello", password: "world" }));
}

// `never` type guard:

const raise = (message: string): never => {
  throw new Error(message);
};

{
  const validateInput = (input: Partial<InputParams>): InputParams => {
    return {
      username: input.username ?? raise("'username' is required"),
      password: input.password ?? raise("'password' is required"),
      createdAt: input.createdAt ?? raise("'createdAt' is required"),
    };
  };

  console.log(validateInput({ username: "hello", password: "world", createdAt: new Date() }));
  // console.log(validateInput({ username: "hello", password: "world" }));
}
