document.addEventListener("DOMContentLoaded", function() {
    console.log(recipes);

    let ingredientsArray = [];
    createIngredientsList(ingredientsArray);
    console.log("Liste des ingredients");
    console.log(ingredientsArray);

    let applianceArray = [];
    createAppliancesList(applianceArray);
    console.log("Liste des appareils");
    console.log(applianceArray);

    let ustensilsArray = [];
    createUstensilesList(ustensilsArray);
    console.log("Liste des ustensiles");
    console.log(ustensilsArray);

    let searchBarInput = document.getElementById("searchbar");
    searchBarInput.addEventListener("change", function(event) {
        let searchText = event.target.value;
        if(searchText !== "") {
            if(ingredientsArray.indexOf(searchText) > -1) {
                let indexOfIngredients = ingredientsArray.indexOf(searchText);
                let ingredient = ingredientsArray[indexOfIngredients];
                console.log("Ingredients visible dans notre tableau");
                console.log(ingredient);
                console.log("Recettes avec cet ingredient :");
                let recipesToShow = searchRecipeFromIngredients(ingredient);
                console.log(recipesToShow);
            }
        }
    });
});

function createIngredientsList(ingredientArrayToAgregate) {
    for(var i = 0; i < recipes.length; i++) {
        let ingredientList = recipes[i].ingredients;
        for(var j = 0; j < ingredientList.length; j++) {
            let ingredient = ingredientList[j].ingredient;
            if(!ingredientArrayToAgregate.includes(ingredient)) {
                ingredientArrayToAgregate.push(ingredient);
            }
        }
    }
}

function createAppliancesList(applianceToAggregate) {
    for(var i = 0; i < recipes.length; i++) {
        let appliance = recipes[i].appliance;
        if(!applianceToAggregate.includes(appliance)) {
            applianceToAggregate.push(appliance);
        }
    }
}

function createUstensilesList(ustensilsListToAggregate) {
    for(var i = 0; i < recipes.length; i++) {
        let ustensilsList = recipes[i].ustensils;
        for(var j = 0; j < ustensilsList.length; j++) {
            let ustensil = ustensilsList[j];
            if(!ustensilsListToAggregate.includes(ustensil)) {
                ustensilsListToAggregate.push(ustensil);
            }
        }
    }
}

function searchRecipeFromIngredients(ingredient) {
    let recipesResult = [];
    for(var i = 0; i < recipes.length; i++) {
        let ingredientList = recipes[i].ingredients;
        for(var j = 0; j < ingredientList.length; j++) {
            let ingredientInsideList = ingredientList[j].ingredient;
            if(ingredientInsideList === ingredient) {
                recipesResult.push(recipes[i]);
            }
        }
    }
    return recipesResult;
}