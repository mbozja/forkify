import "./styles.scss";
// Lecture ES6 modules
//import str from './js/models/Search';
//import { add as a, multiply as m, ID } from './js/views/searchView';
//import * as searchView from './js/views/searchView';

// Project imports:
import Search from './js/models/Search';
import Recipe from './js/models/Recipe';
import List from './js/models/List';
import Likes from "./js/models/Likes";
import * as searchView from './js/views/searchView';
import * as recipeView from './js/views/recipeView';
import * as listView from './js/views/listView';
import * as likesView from './js/views/likesView';
import { elements, renderLoader, clearLoader } from './js/views/base';

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

/** 
 * SEARCH ONTROLLER 
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes. Method "getResults" will store recepies into property "recipes".
            await state.search.getResults();
            

            // 5) Render results on UI. Pass property "recepies" that is stored in the object "state.search".  
            //console.log("search objekt query (tist kar si vpisala): ", state.search.query); 
            //console.log("search objekt recipies (tist kar vrne api in more bit zrisan na strani): ", state.search.recipes);  
            clearLoader();
            searchView.renderResults(state.search.recipes);
        } catch(err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



/*
const search = new Search('pizza');
console.log(search); // lej tuki si izpisala search objekt, poglej v consolo kaj vse vsebuje ta objekt (hint: ne vsebuje result ampak ?____?) 
search.getResults();
*/

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});


/** 
 * RECIPE ONTROLLER 
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch(err) {
            console.log("error: ", err);
            alert('Error processing recipe!');
        }
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
 
/** 
 * LIST CONTROLLER 
 */
const controlList = () => {
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handle the count update 
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/** 
 * LIKE CONTROLLER 
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked()) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like ti UI list
        console.log(state.likes);

    // User HAS liked current recipe
    } else {
        // Add like to the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(falses);

        // Add like ti UI list
        console.log(state.likes);
    }
}


 // Handling recipe button clicks
 elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shoping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
 });

 window.l  = new List();
