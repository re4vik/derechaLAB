// Задача: Написати функцію, яка приймає рядок і повертає його у зворотному порядку,
//  при цьому пропускаючи всі цифри.

function reverseWithoutNumbers(str) {
  // Ваш код тут
  let result = "";
  let letters = ""; 
  for (let i = 0; i < str.length; i++) {
    if (!(str[i] >= '0' && str[i] <= '9')) {
      letters += str[i];
    }
  }
//Поворот наоборот (Magic Emoji)
  for (let i = letters.length - 1; i >= 0; i--) {
    result += letters[i];
  }

  return result;

}

console.log(reverseWithoutNumbers("hello123world456")); // Виведе: "dlrowolleh"
console.log(reverseWithoutNumbers("abc123xyz"));       // Виведе: "zyxabc"
console.log(reverseWithoutNumbers("531NyzhyN531"));       // Виведе: "NyzhyN"

module.exports = reverseWithoutNumbers;
