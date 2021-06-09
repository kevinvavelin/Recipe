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
                showRecipes(recipesToShow);
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

function showRecipes(recipeArray) {
    let recipeBlock = document.getElementById("recettes-list");
    let recipesCard = '';
    for(var i = 0; i < recipeArray.length; i++) {
        let recipe = recipeArray[i];
        recipesCard += '<div class="card"><img src="./img/logo.png" class="card-img-top" alt="Placeholder Image"><div class="card-body"><div class="row"><div class="col"><h3>' + recipe.name + '</h3></div><div class="col"><i class="far fa-clock"></i> ' + recipe.time + 'min</div></div><div class="row"><div class="col">' + createListOfIngredients(recipe.ingredients) + '</div><div class="col"><p>' + recipe.description + '</p></div></div></div></div>';
    }
    recipeBlock.innerHTML = recipesCard;
}

function createListOfIngredients(ingredientFromRecipe) {
    let recipeString = '<ul class="list-unstyled">';
    for(var i = 0; i < ingredientFromRecipe.length; i++) {
        let ingredientInsideRecipe = ingredientFromRecipe[i];

        let ingredientQuantity;
        if(ingredientInsideRecipe.quantity) {
            ingredientQuantity = ingredientInsideRecipe.quantity;
        } else if(ingredientInsideRecipe.quantite) {
            ingredientQuantity = ingredientInsideRecipe.quantite;
        } else {
            ingredientQuantity = '';
        }


        let ingredientUnit;
        if(ingredientInsideRecipe.unit) {
            ingredientUnit = ingredientInsideRecipe.unit;
        } else {
            ingredientUnit = '';
        }

        let ingredientString = '<li><strong>' + ingredientInsideRecipe.ingredient + '</strong> '+ ingredientQuantity + '  ' + ingredientUnit + '</li>';
        recipeString += ingredientString;
    }
    recipeString += '</ul>';
    return recipeString;
}