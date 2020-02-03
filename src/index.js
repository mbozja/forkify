import "./styles.scss";
// Lecture ES6 modules
//import str from './js/models/Search';
//import { add as a, multiply as m, ID } from './js/views/searchView';
//import * as searchView from './js/views/searchView';

// Project imports:
import Search from './js/models/Search';

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
/*
let myVar = "Test text";
let myVar_2 = "Test text 2";
console.log(myVar);
console.log(myVar_2); 
*/

// Lecture ES6 modules
//console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3,5)}. ${str}`); ali pa:
//console.log(`Using imported functions! ${a(ID, 2)} and ${m(3,5)}. ${str}`);
//console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

//console.log("a dela? : ", str);


// Project code:

/* Global state of the app
  - Search object
  - Current recipe object
  - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza' //TODO

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
console.log(search);
search.getResults();




















