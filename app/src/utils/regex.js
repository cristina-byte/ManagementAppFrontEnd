
//check if the string has at least one special character
export const hasSpecialCharacter=(string)=>/\W/.test(string) || "Must have at least one special character"

//check if the string has at least one numeric character
export const hasNumericCharacter=(string)=>/[0-9]/.test(string) || "Must have at least one numeric character"

//checks if the string has at least one capital letter
export const hasCapitalLetter=(string)=>/[A-Z]/.test(string) || "Must have at least one capital letter"