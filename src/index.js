import "./styles.scss";

/* let myVar = "Test text";
let myVar_2 = "Test text 2";
console.log(myVar);
console.log(myVar_2); */

// Lecture ES6 modules
import str from './models/Search';
import {add, multiply} from './views/searchView';

console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3,5)}. ${str}`);
