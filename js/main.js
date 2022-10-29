// api
let mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
async function getData(api) {
  let response = await fetch(api);
  let finalResponse = await response.json();
  if (finalResponse.meals && finalResponse.meals.length > 0) {
    return finalResponse.meals;
  } else if (finalResponse.categories && finalResponse.categories.length > 0) {
    return finalResponse.categories;
  }
}
// api
// function to get the html content
function template(data) {
  return `<div class="mealBox col-md-3">
    <div class="position-relative">
      <img
        class="w-100"
        src="${data.strMealThumb}"
        alt=""
      />
      <div class="layer" id="layer">
        <h2>${data.strMeal}</h2>
      </div>
    </div>
    </div>`;
}
// function to display any data in any id
async function displayData(array, div, id) {
  // console.log(array,div,id)
  // let data = await getData(mainApi);
  let temp = ``;
  for (let i = 0; i < array.length; i++) {
    temp += div(array[i]);
  }
  document.getElementById(id).innerHTML = temp;
}

// displayData()
// first page data
async function randomData() {
  let data = await getData(mainApi);
  displayData(data, template, "randomMeals");
}
randomData();
// nav animate
let contentWidth = $(".nav-content").innerWidth();
$("nav").animate({ left: `-${contentWidth}px` }, 500);

$(".mainptn").click(function () {
  if ($("nav").css("left") == "0px") {
    $("nav").animate({ left: `-${contentWidth}px` }, 1000);
  } else {
    $("nav").animate({ left: `0px` }, 1000);
  }
});

// nav animate

// search

document.getElementById("Search").addEventListener("click", () => {
  let temp = `<div class="col-md-6">
  <input id={searchByName} type="text" placeholder="Search By Name" class="form-control mb-3" />
</div>
<div class="col-md-6">
  <input type="text" placeholder="search By First Letter..." class="form-control mb-3" />
</div> 
<div class="row" id="displaySearch">

      </div>`;
  document.getElementById("randomMeals").innerHTML = temp;
});
function searchByName(){
  document.getElementById('searchByName').addEventListener('keyup', async function(){
    
  })
}

// search

// Categories
function catogoryTemplate(data) {
  return `<div class="mealBox col-md-3">
  <div class="position-relative">
    <img
      class="w-100"
      src="${data.strCategoryThumb}"
      alt=""
    />
    <div class="layer catogory-layer d-flex flex-column justify-content-center align-items-center" id="layer">
      <h2 class="meal-name">${data.strCategory}</h2>
      <p>${data.strCategoryDescription}</p>
    </div>
  </div>
  </div>`;
}
document
  .getElementById("Categories")
  .addEventListener("click", async function () {
    let categoryAPI = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    let data = await getData(categoryAPI);
    displayData(data, catogoryTemplate, "randomMeals");
  });

function categoriesFilterTemplat(data) {
  return `<div class="mealBox col-md-3">
      <div class="position-relative">
        <img
          class="w-100"
          src="${data.strMealThumb}"
          alt=""
        />
        <div class="layer" id="layer">
          <h2>${data.strMeal}</h2>
        </div>
      </div>
      </div>`;
}

async function categoriesFilter() {
  let mealName = document.querySelector(".meal-name");
  mealName = mealName.textContent;
  let categoryAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`;
  let data = await getData(categoryAPI);
  displayData(data, categoriesFilterTemplat, "randomMeals");
}

// Categories
// Area
function areaTemplate(data) {
  return `<div class="col-md-3 text-center area mt-5">
  <i class="fa-solid fa-city"></i>
  <h2>${data.strArea}</h2>
</div>`;
}
document.getElementById("Area").addEventListener("click", async function () {
  let areaAPI = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let data = await getData(areaAPI);
  displayData(data, areaTemplate, "randomMeals");
});
// Area

// ingredients
function ingredientsTemplate(data) {
  return `<div class="col-md-3 mt-5">
  <div class="ingredients d-flex flex-column justify-content-center align-items-center">>
  <i class="fa-solid fa-bowl-food"></i>
  <h class ="text-white">${data.strIngredient}</h>
  <p class ="text-white">${data.strDescription}</p>
</div>
</div>`;
}
document
  .getElementById("Ingredients")
  .addEventListener("click", async function () {
    let IngredientsAPI = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    let data = await getData(IngredientsAPI);
    displayData(data, ingredientsTemplate, "randomMeals");
  });
// ingredients

// Contac
document.getElementById("Contac").addEventListener("click", () => {
  temp = `
  <h2 class="text-white mt-5">ContacUs...</h2>
  <div class="col-md-6">
  <div class="form-group">
    <input class="form-control shadow id="name" placeholder="Enter Your Name">
    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
      Special Characters and Numbers not allowed
    </div>
  </div>
</div>
<div class="col-md-6">
  <div class="form-group">
    <input  class="form-control" id="email" placeholder="Enter Email">
    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
      Enter valid email. *Ex: xxx@yyy.zzz
    </div>
  </div>
</div>
<div class="col-md-6">
  <div class="form-group">
    <input  class="form-control" id="phone" placeholder="Enter phone">
    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
      Enter valid Phone Number
    </div>
  </div>
</div>
<div class="col-md-6">
  <div class="form-group">
    <input  class="form-control" id="age" placeholder="Enter Age">
    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
      Enter valid Age
    </div>
  </div>
</div>
<div class="col-md-6">
  <div class="form-group">
    <input  class="form-control" type="password" id="password" placeholder="Enter Password">
    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
      Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
  </div>
</div>
<div class="col-md-6">
  <div class="form-group">
    <input  class="form-control" type="password" id="rePassword" placeholder="Enter RePassword">
    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
      Enter valid Repassword
    </div>
  </div>
</div>`;
  document.getElementById("randomMeals").innerHTML = temp;
});

// Contac
