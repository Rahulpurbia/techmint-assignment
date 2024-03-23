export const  makeAtLeastThreeDigits=(number)=> {
  let numberString = String(number);
  while (numberString.length < 3) {
    numberString = '0' + numberString;
  }
  return numberString;
}
