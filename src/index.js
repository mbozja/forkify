import "./styles.scss";
// Lecture ES6 modules
import str from './js/models/Search';
import { add as a, multiply as m, ID } from './js/views/searchView';

/*

Absolutna pot: 
c:/Mojca/Projekt/datoteka.txt

Relativna (se gleda iz trenutnega direktorija v katermu si):
Trenutno je ta file v src mapi.
in trenutni direktorij se oznaci z ./
en nivo visi gres pa z ../ , dva nivoja visje pa ../../ in tko naprej
sepravi ce hoces it v js/models napises:
./js/models

*/ 

let myVar = "Test text";
let myVar_2 = "Test text 2";
console.log(myVar);
console.log(myVar_2); 

// Lecture ES6 modules
//console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3,5)}. ${str}`); ali pa:
console.log(`Using imported functions! ${a(ID, 2)} and ${m(3,5)}. ${str}`);

//console.log("a dela? : ", str);


