// Задача: Напишіть функцію countOccurrences, яка приймає рядок і символ,
//  і повертає кількість входжень цього символу в рядку.


function countOccurrences(str, char) {
  //Ваш код
  let count = 0; 

  for (let i = 0; i < str.length; i++) { 
    if (str[i] === char) {
      count++; 
    }
  }

  return count; 
}

// Приклади використання:
console.log(countOccurrences("hello world", 'o')); // Виведе: 2
console.log(countOccurrences("banana", 'a'));       // Виведе: 3
console.log(countOccurrences("please", 'e'));       // Виведе: 2

module.exports = countOccurrences;
