// ============================================
// ESSENTIAL JAVASCRIPT CONCEPTS REFERENCE
// ============================================

// 1. VARIABLES & DATA TYPES
// ========================
let name = "John";           // String
const age = 25;              // Number
var isActive = true;         // Boolean (avoid var, use let/const)
let items = null;            // Null
let data;                    // Undefined
const colors = ["red", "blue"]; // Array
const person = { name: "Alice", age: 30 }; // Object

// Variable declarations
let x;          // Can be reassigned
const PI = 3.14; // Cannot be reassigned
// var y;       // Function-scoped (avoid in modern JS)

// 2. FUNCTIONS
// ============
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow functions
const multiply = (a, b) => a * b;
const square = x => x * x;  // Single parameter, no parentheses needed
const sayHello = () => "Hello!"; // No parameters

// 3. ARRAYS & ARRAY METHODS
// ==========================
const numbers = [1, 2, 3, 4, 5];

// Essential array methods
numbers.push(6);           // Add to end
numbers.pop();             // Remove from end
numbers.unshift(0);        // Add to beginning
numbers.shift();           // Remove from beginning

// Higher-order array methods (VERY IMPORTANT)
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
numbers.forEach(n => console.log(n));

// Find methods
const found = numbers.find(n => n > 3);
const foundIndex = numbers.findIndex(n => n > 3);
const exists = numbers.includes(3);

// 4. OBJECTS & OBJECT METHODS
// ============================
const user = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    
    // Method inside object
    greet() {
        return `Hi, I'm ${this.name}`;
    }
};

// Accessing properties
console.log(user.name);        // Dot notation
console.log(user["email"]);    // Bracket notation

// Object methods
const keys = Object.keys(user);
const values = Object.values(user);
const entries = Object.entries(user);

// Destructuring
const { name: userName, age: userAge } = user;

// 5. CONDITIONALS
// ===============
const score = 85;

if (score >= 90) {
    console.log("A grade");
} else if (score >= 80) {
    console.log("B grade");
} else {
    console.log("C grade or below");
}

// Ternary operator
const result = score >= 80 ? "Pass" : "Fail";

// Switch statement
const day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    default:
        console.log("Regular day");
}

// 6. LOOPS
// ========
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For...of (arrays)
for (const item of colors) {
    console.log(item);
}

// For...in (objects)
for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}

// While loop
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// 7. PROMISES & ASYNC/AWAIT
// =========================
// Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
};

// Using promises
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/await (modern approach)
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// 8. DOM MANIPULATION (Browser)
// =============================
// Selecting elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");
const firstDiv = document.querySelector("div");

// Modifying elements
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";
element.style.color = "red";
element.classList.add("active");
element.classList.remove("inactive");
element.classList.toggle("visible");

// Event listeners
element.addEventListener("click", (e) => {
    console.log("Element clicked!");
    e.preventDefault(); // Prevent default behavior
});

// 9. ERROR HANDLING
// =================
try {
    // Code that might throw an error
    const result = JSON.parse(invalidJSON);
} catch (error) {
    console.error("Error occurred:", error.message);
} finally {
    console.log("This always runs");
}

// 10. ES6+ FEATURES
// =================
// Template literals
const message = `Hello, ${name}! You are ${age} years old.`;

// Spread operator
const newNumbers = [...numbers, 6, 7, 8];
const userCopy = { ...user, city: "New York" };

// Rest parameters
function sum(...args) {
    return args.reduce((total, num) => total + num, 0);
}

// Default parameters
function greetUser(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// 11. COMMON PATTERNS & UTILITIES
// ===============================
// Type checking
const isString = value => typeof value === "string";
const isArray = value => Array.isArray(value);
const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);

// Array utilities
const removeDuplicates = arr => [...new Set(arr)];
const flatten = arr => arr.flat();
const chunk = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

// String utilities
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const slugify = str => str.toLowerCase().replace(/\s+/g, "-");

// 12. COMMON INTERVIEW CONCEPTS
// =============================
// Closures
function outerFunction(x) {
    return function innerFunction(y) {
        return x + y; // Inner function has access to outer function's variables
    };
}
const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Hoisting example
console.log(hoistedVar); // undefined (not error)
var hoistedVar = "I'm hoisted";

// this keyword
const obj = {
    name: "Object",
    regularFunction() {
        console.log(this.name); // "Object"
    },
    arrowFunction: () => {
        console.log(this.name); // undefined (arrow functions don't bind this)
    }
};

// Event loop understanding
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// API call example
async function fetchUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

// Form validation
function validateForm(formData) {
    const errors = {};
    
    if (!formData.email || !formData.email.includes("@")) {
        errors.email = "Valid email is required";
    }
    
    if (!formData.password || formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Local storage (browser)
// localStorage.setItem("user", JSON.stringify(user));
// const savedUser = JSON.parse(localStorage.getItem("user"));

// Debounce function (common in interviews)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Example usage of debounce
const debouncedSearch = debounce((query) => {
    console.log(`Searching for: ${query}`);
}, 300);

console.log("JavaScript Essentials Reference Loaded!");
console.log("You should be confident with all these concepts!");