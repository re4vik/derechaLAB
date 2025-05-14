// Задача: Написати функцію, яка приймає рядок і замінює всі голосні (a, e, i, o, u) 
// на певний символ, наприклад *.

function replaceVowels(str) { 
  // Ваш код тут
  let result = "";
  for (let i = 0; i < str.length; i++) {
  let char = str[i];
  if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u' ||
    char === 'A' || char === 'E' || char === 'I' || char === 'O' || char === 'U') {
  result += '*';
} else {
  result += char;
}
  }
  return result;
}

console.log(replaceVowels("hello world")); // Виведе: "h*ll* w*rld"
console.log(replaceVowels("Javascript"));  // Виведе: "J*v*scr*pt"
console.log(replaceVowels("Balls"));  // Виведе: "Balls"

module.exports = replaceVowels;
