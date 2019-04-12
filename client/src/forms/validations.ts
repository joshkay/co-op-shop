export const required = (value: string): string | undefined =>
(
  value === undefined ||
  value === null ||
  value === ""
    ? "Required" : undefined
);
 
export const isEmail = (value: string): string | undefined =>
(
  value && value.search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "Not a valid email!" : undefined
);

export const doPasswordsMatch = (value: string, 
  allValues: { passwordConfirmation: string }): string | undefined => 
(
  value !== allValues.passwordConfirmation ? "Passwords must match!" : undefined
);