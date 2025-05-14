// Задача: Напишіть функцію sumArray, яка приймає масив чисел і 
// повертає їхню суму. Використовуйте цикл для обчислення суми.

function sumArray(numbers) {
  // Ваш код тут
    let sum = 0; 
  
    for (let i = 0; i < numbers.length; i++) { 
      sum += numbers[i]; 
    }
  
    return sum; 
  }
   

console.log(sumArray([1, 2, 3, 4, 5])); // Виведе: 15
console.log(sumArray([10, 20, 30]));    // Виведе: 60
console.log(sumArray([473, 58, 0]));    // Виведе: 531

module.exports = sumArray;
