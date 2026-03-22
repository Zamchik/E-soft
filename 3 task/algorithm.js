function isValid(str) {
    if (str.length === 0) {
        return true
    }; // Проверка на пустую строку
    if (str.length % 2 !== 0) {
        return false;
    } // Проверка на нечетность

    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    // Проверка каждого символа строки
    for (let char of str) {
        if (char === "(" || char === "[" || char === "{") {
            stack.push(char);
        }
        
        else if (char === ")" || char === "]" || char === "}") {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// Тесты
console.log("1.", isValid(""), "// true (пустая строка)");
console.log("2.", isValid("("), "// false (нечётная длина)");
console.log("3.", isValid(")"), "// false (нечётная длина)");
console.log("4.", isValid("()"), "// true");
console.log("5.", isValid("()[]{}"), "// true");
console.log("6.", isValid("(]"), "// false");
console.log("7.", isValid("([)]"), "// false");
console.log("8.", isValid("{[]}"), "// true");
console.log("9.", isValid("([{}])"), "// true");
console.log("10.", isValid("((()))"), "// true");
console.log("11.", isValid("((())"), "// false (нечётная длина)");
console.log("12.", isValid("(()"), "// false (нечётная длина)");
console.log("13.", isValid("())"), "// false (чётная, но неверный порядок)");
console.log("14.", isValid("{[}]"), "// false");
console.log("15.", isValid("((()))[]{}"), "// true");
console.log("16.", isValid("((()]"), "// false");
console.log("17.", isValid("(((((((((())))))))))"), "// true");
console.log("18.", isValid("(((((((((()))))))))"), "// false (нечётная длина)");
console.log("19.", isValid("{[()]}"), "// true");
console.log("20.", isValid("{[()]}{}[]"), "// true");
console.log("21.", isValid(")("), "// false");
console.log("22.", isValid("([)]"), "// false");
console.log("23.", isValid("((()))("), "// false (нечётная длина)");
console.log("24.", isValid("((())))))"), "// false (нечётная длина)");
console.log("25.", isValid("((()[]{}))"), "// true");