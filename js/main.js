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
  return `<div class="col-md-3 p-3">
    <div onclick="getDetails(${data.idMeal})" class="mealBox position-relative rounded-2 cursor">
      <img
        class="w-100"
        src="${data.strMealThumb}"
        alt=""
      />
      <div class="layer d-flex align-items-center" id="layer">
        <h2 class='text-black'>${data.strMeal}</h2>
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
randomData();
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

// details
function detailsTemplate(data) {
  let ingredients = ``;
  for (let i = 1; i < 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients += `<li class="my-3 mx-1 p-1 alert-success alert rounded nav-link">${
        data[`strMeasure${i}`]
      } ${data[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = data.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1 nav-link">${tags[i]}</li>`;
  }
  return `  <div class="col-md-4">
            <div>
              <img
                class="w-100"
                src="${data.strMealThumb}"
                alt=""
              />
            </div>
            <h3 class="text-white">${data.strMeal}</h3>
          </div>
          <div class="col-md-8 text-start">
            <h3 class="text-white">Instructions</h3>
            <p class="text-white">
            ${data.strInstructions}
            </p>
            <p>Area : <span>${data.strArea}</span></p>
            <p>Category : <span>${data.strCategory}</span></p>
            <h4>Recipes :</h4>
            <div class="d-flex flex-wrap">${ingredients}</div>
            <h4>Tags :</h4>
            <div class='d-flex'>${tagsStr}</div>
              <a class="btn btn-success" target="_blank" href="${data.strSource}">Source</a>
              <a class="btn btn-danger" target="_blank" href="${data.strYoutube}">Youtub</a>
          </div>`;
}
async function getDetails(id) {
  let detailsApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  data = await getData(detailsApi);
  displayData(data, detailsTemplate);
}
// details
// Categories
function catogoryTemplate(data) {
  return `<div class="col-md-3 cursor">
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
  return `<div onclick="areaFilter('${data.strArea}')" class="col-md-3 text-center area my-3 cursor">
                  <i class="fa-solid fa-city"></i>
                  <h2>${data.strArea}</h2>
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
  return `<div class="col-md-3 cursor">
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
  mainRow.innerHTML = `<div class="contact text-center">
  <h2 class="text-white mt-5">ContacUs...</h2>
  <div class="container w-75">
    <div class="row">
      <div class="col-md-6 my-2">
        <div class="form-group">
          <input onkeyup="inputsValidation()" id="nameInput" class="form-control shadow-lg bg-transparent text-center border-bottom border-0 text-white" id="name" placeholder="Enter Your Name">
          <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
            Special Characters and Numbers not allowed
          </div>
        </div>
      </div>
      <div class="col-md-6 my-2">
        <div class="form-group">
          <input onkeyup="inputsValidation()" id="emailInput"  class="form-control shadow-lg bg-transparent text-center border-bottom border-0 text-white" id="email" placeholder="Enter Email">
          <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
            Enter valid email. *Ex: xxx@yyy.zzz
          </div>
        </div>
      </div>
      <div class="col-md-6 my-2">
        <div class="form-group">
          <input onkeyup="inputsValidation()" id="phoneInput"  class="form-control shadow-lg bg-transparent text-center border-bottom border-0 text-white" id="phone" placeholder="Enter phone">
          <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
            Enter valid Phone Number
          </div>
        </div>
      </div>
      <div class="col-md-6 my-2">
        <div class="form-group">
          <input onkeyup="inputsValidation()" id="ageInput" class="form-control shadow-lg bg-transparent text-center border-bottom border-0 text-white" id="age" placeholder="Enter Age">
          <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
            Enter valid Age
          </div>
        </div>
      </div>
      <div class="col-md-6 my-2">
        <div class="form-group">
          <input onkeyup="inputsValidation()" id="passwordInput" class="form-control shadow-lg bg-transparent text-center border-bottom border-0 text-white" type="password" id="password" placeholder="Enter Password">
          <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
        </div>
      </div>
      <div class="col-md-6 my-2">
        <div class="form-group">
          <input onkeyup="inputsValidation()" id="repasswordInput" class="form-control shadow-lg bg-transparent text-center border-bottom border-0 text-white" type="password" id="rePassword" placeholder="Enter RePassword">
          <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
            Enter valid Repassword
          </div>
        </div>
      </div>
    </div>
  </div>
  <button id="submitBtn" disabled class="btn btn-outline-danger px2 mt-3">submit</button>
</div>`;
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
  submitBtn = document.getElementById("submitBtn");
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
function inputsValidation() {
  if (nameInputTouched) {
    document.getElementById("nameInput").classList.add("is-invalid");
    if (nameValidation()) {
      document
        .getElementById("nameInput")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("namealert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameInput")
        .classList.replace("is-valid", "is-invalid");
      document
        .getElementById("namealert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    document.getElementById("emailInput").classList.add("is-invalid");
    if (emailValidation()) {
      document
        .getElementById("emailInput")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("emailalert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailInput")
        .classList.replace("is-valid", "is-invalid");
      document
        .getElementById("emailalert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    document.getElementById("phoneInput").classList.add("is-invalid");
    if (phoneValidation()) {
      document
        .getElementById("phoneInput")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("phonealert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneInput")
        .classList.replace("is-valid", "is-invalid");
      document
        .getElementById("phonealert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    document.getElementById("ageInput").classList.add("is-invalid");
    if (ageValidation()) {
      document
        .getElementById("ageInput")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("agealert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageInput")
        .classList.replace("is-valid", "is-invalid");
      document
        .getElementById("agealert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    document.getElementById("passwordInput").classList.add("is-invalid");
    if (passwordValidation()) {
      document
        .getElementById("passwordInput")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("passwordalert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordInput")
        .classList.replace("is-valid", "is-invalid");
      document
        .getElementById("passwordalert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    document.getElementById("repasswordInput").classList.add("is-invalid");
    if (repasswordValidation()) {
      document
        .getElementById("repasswordInput")
        .classList.replace("is-invalid", "is-valid");
      document
        .getElementById("repasswordalert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordInput")
        .classList.replace("is-valid", "is-invalid");
      document
        .getElementById("repasswordalert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
// Contac
