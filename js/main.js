// api
let mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
let mainRow = document.getElementById("randomMeals");
let search = document.getElementById("search");
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
  return `<div class="col-md-3">
    <div class="mealBox position-relative rounded-2">
      <img
        class="w-100"
        src="${data.strMealThumb}"
        alt=""
      />
      <div class="layer d-flex align-items-center" id="layer">
        <h2>${data.strMeal}</h2>
      </div>
    </div>
    </div>`;
}
// function to display any data in any id
async function displayData(array, div) {
  // console.log(array,div,id)
  // let data = await getData(mainApi);
  let temp = ``;
  for (let i = 0; i < array.length; i++) {
    temp += div(array[i]);
  }
  mainRow.innerHTML = temp;
}

// displayData()
// first page data
async function randomData() {
  search.innerHTML = "";
  let data = await getData(mainApi);
  displayData(data, template);
}
// randomData();
// nav animate
function closeMenu() {
  let contentWidth = $(".nav-content").innerWidth();
  $("nav").animate({ left: `-${contentWidth}px` }, 500);
  $(".mainptn").removeClass("fa-x");
  $(".mainptn").addClass("fa-align-justify");
  $(".links-animation li").animate({ top: 300 }, 500);
}
closeMenu();
$(".mainptn").click(function () {
  if ($("nav").css("left") == "0px") {
    closeMenu();
  } else {
    $("nav").animate({ left: `0px` }, 500, () => {
      for (let i = 0; i < 5; i++) {
        $(".links-animation li")
          .eq(i)
          .animate({ top: 0 }, (i + 6) * 100);
      }
    });
    $(".mainptn").addClass("fa-x");
    $(".mainptn").removeClass("fa-align-justify");
  }
});

// nav animate

// search

function getSearch() {
  search.innerHTML = `<div class='row py-4'>
                      <div class="col-md-6">
              <input onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control bg-transparent" />
                      </div>
                      <div class="col-md-6">
              <input onkeyup="searchByFirstLetter(this.value)" maxlength='1' type="text" placeholder="search By First Letter..." class="form-control bg-transparent" />
                      </div> 
                    </div>`;
  mainRow.innerHTML = "";
}
async function searchByName(name) {
  let searchApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  let data = await getData(searchApi);
  data ? displayData(data, template) : displayData([], template);
}
async function searchByFirstLetter(letter) {
  letter == "" ? (letter = "a") : "";
  let searchApi = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  let data = await getData(searchApi);
  data ? displayData(data, template) : displayData([], template);
}

// search

// Categories
function catogoryTemplate(data) {
  return `<div class="col-md-3">
  <div onclick="categoriesFilter('${
    data.strCategory
  }')" class="mealBox position-relative rounded-2">
    <img
      class="w-100"
      src="${data.strCategoryThumb}"
      alt=""
    />
    <div class="layer text-center" id="layer">
      <h3 class="meal-name">${data.strCategory}</h3>
      <p>${data.strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
    </div>
  </div>
  </div>`;
}
async function displayCategories() {
  search.innerHTML = "";
  let categoryAPI = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  let data = await getData(categoryAPI);
  displayData(data, catogoryTemplate);
}
async function categoriesFilter(meal) {
  let categoryAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`;
  let data = await getData(categoryAPI);
  displayData(data, template);
}

// Categories
// Area
function areaTemplate(data) {
  return `<div class="col-md-3">
              <div onclick="areaFilter('${data.strArea}')" class="col-md-3 text-center area mt-5 rounded-2">
                  <i class="fa-solid fa-city"></i>
                  <h2>${data.strArea}</h2>
              </div>
          </div>`;
}
async function displayArea() {
  search.innerHTML = "";
  let areaAPI = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let data = await getData(areaAPI);
  displayData(data, areaTemplate);
}
async function areaFilter(area) {
  let areaFilterAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  let data = await getData(areaFilterAPI);
  displayData(data, template);
}
// Area

// ingredients
function ingredientsTemplate(data) {
  return `<div class="col-md-3 mt-5">
            <div onclick="displayCategories('${
              data.strIngredient
            }')" class="ingredients text-center">
              <i class="fa-solid fa-bowl-food d-block fs-2 text-info"></i>
              <h3 class ="text-white">${data.strIngredient}</h3>
              <p class ="text-white">${data.strDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>`;
}
async function displayIngredients() {
  search.innerHTML = "";
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let finalResponse = await response.json();
  let data = await finalResponse.meals.slice(0, 20);
  displayData(data, ingredientsTemplate);
}
async function ingredientsFilter(ingredient) {
  let ingredientFilterAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  let data = await getData(ingredientFilterAPI);
  displayData(data, template);
}
// ingredients

// ContactUs
function getContact() {
  search.innerHTML = "";
  temp = `
  <h2 class="text-white mt-5">ContacUs...</h2>
  <div class="col-md-6">
  <div class="form-group">
    <input onclick="nameValidation()" class="form-control shadow id="name" placeholder="Enter Your Name">
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
}
document.getElementById("Contac").addEventListener("click", () => {
  let userName = document.getElementById("name");
  let userEmail = document.getElementById("email");
  let userPhone = document.getElementById("phone");
  let userAge = document.getElementById("age");
  let userPassword = document.getElementById("password");
  let userRepassword = document.getElementById("rePassword");
});

// Contac

function nameValidation() {
  var rgex = /^[a-zA-Z ]+$/;
  if (rgex.test(userName.value) == true && userName.value != "") {
    userName.classlist.add("is-valid");
  }
}
