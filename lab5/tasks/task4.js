// Задача: Напишіть функцію findMax, яка приймає масив чисел і повертає найбільше число в масиві.

function findMax(numbers) {
  //Ваш код
    let max = numbers[0];
  
    for (let i = 1; i < numbers.length; i++) { 
      if (numbers[i] > max) {
        max = numbers[i]; 
      }
    }
  
    return max;
  }

// Приклади використання:
console.log(findMax([3, 5, 7, 2, 8])); // Виведе: 8
console.log(findMax([10, 20, 5, 30])); // Виведе: 30
console.log(findMax([10, 531, 5, 30])); // Виведе: 531


module.exports = findMax;
