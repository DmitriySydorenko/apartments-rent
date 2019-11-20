$('[data-scroll]').on('click', scrollToSection);
// sticky nav
$(document).ready(function() {
  $(window).scroll(function() {
    console.log('top');
    if ($(this).scrollTop() >= 800) {
      $(".header_top").addClass("header_top--fix");
    } else {
      $(".header_top").removeClass("header_top--fix");
    }
  });
});

// slide to 

function scrollToSection(event) {
  event.preventDefault();
  var $section = $($(this).attr('href')); 
  $('html, body').animate({
    scrollTop: $section.offset().top
  }, 500);
}

// slider

function createSlider() {
  let sliderWrapper = document.querySelector(".slider_slides");
  let sliderContainer = document.querySelector(".header_content-container");
  let sliderInterval = setInterval(startSlide, 3000);

  let leftButton = document.querySelector(".button-slider--left");
  let rightButton = document.querySelector(".button-slider--right");

  rightButton.addEventListener("click", function() {
    clearInterval(sliderInterval);
    let currentSlide = sliderContainer.querySelector(".slider_slides--show");
    currentSlide.classList.remove("slider_slides--show");
    if (currentSlide.nextElementSibling) {
      currentSlide.nextElementSibling.classList.add("slider_slides--show");
    } else {
      currentSlide.parentNode.children[0].classList.add("slider_slides--show");
    }
    sliderInterval = setInterval(startSlide, 3000);
  });

  leftButton.addEventListener("click", function() {
    clearInterval(sliderInterval);
    let currentSlide = sliderContainer.querySelector(".slider_slides--show");
    currentSlide.classList.remove("slider_slides--show");
    if (currentSlide.previousElementSibling) {
      currentSlide.previousElementSibling.classList.add("slider_slides--show");
    } else {
      currentSlide.parentNode.lastElementChild.classList.add(
        "slider_slides--show"
      );
    }
    sliderInterval = setInterval(startSlide, 3000);
  });
}

function startSlide() {
  let sliderContainer = document.querySelector(".header_content-container");
  let currentSlide = sliderContainer.querySelector(".slider_slides--show");
  currentSlide.classList.remove("slider_slides--show");

  if (currentSlide.nextElementSibling) {
    currentSlide.nextElementSibling.classList.add("slider_slides--show");
  } else {
    currentSlide.parentNode.children[0].classList.add("slider_slides--show");
  }
}

// ajax

function getAparatamentsInfoFromAjax() {
 fetch("assets/json/apartaments.json")
    .then(res => res.json())
    .then(apartamentsArr => createDefaultApartment(apartamentsArr));
  };

function createDefaultApartment(apartamentsArr){
    for(let i = 0; i < apartamentsArr.length; i++){
        let imageInCard = apartamentsArr[i].image;
        let linkInCard = apartamentsArr[i].link;
        let titleInCard = apartamentsArr[i].title;
        let textInCard = apartamentsArr[i].text;
        let priceInCard = apartamentsArr[i].price;
        let locationInCard = apartamentsArr[i].location;

        let apartamentsCardCreate = createApartamentsCard(imageInCard,linkInCard,titleInCard,textInCard,priceInCard,locationInCard);
        let wrapperApartaments = document.querySelector('.appartaments_wrapper');
        wrapperApartaments.appendChild(apartamentsCardCreate); 
      //  addListenersOnButtons(taskListItem,unfinishTaskButton); 
        };

}

// apartament card

function createApartamentsCard(image,link,title,text,price,location) {

    let apartamentsCardBlock = document.createElement('div');
    apartamentsCardBlock.classList.add('appartaments_container');

    let imageBlock = buildElement('div', {classes:['appartaments_image-block']},null,null,apartamentsCardBlock,true);
    let imageBlockInnerImage = buildElement('img', {classes:['appartaments_image'],'src':image, alt:'apartament'},null,null,imageBlock,true);
    let imageBlockInnerLink = buildElement('button', {classes:['button','appartaments_button'],type:'button'},link,{'click': apartmentCardClickHandler},imageBlock,true);

    let textBlock = buildElement('div', {classes:['appartaments_text-block']},null,null,apartamentsCardBlock,true);
    let textBlockInnerTitle = buildElement('h3', {classes:['appartaments_title']},title,null, textBlock,true);
    let textBlockInnerText = buildElement('p', {classes:['appartaments_text']},text,null, textBlock,true);

    let infoBlock = buildElement('div', {classes:['appartaments_info-block']},null,null,apartamentsCardBlock,true);
    let infoBlockInnerPrice = buildElement('p', {classes:['appartaments_price']},price,null, infoBlock,true);
    let locationBlock = buildElement('div', {classes:['appartaments_location-block']},null,null,infoBlock,true);
    let locationBlockContent = buildElement('p', {classes:['appartaments_location']},location,null,locationBlock,true);

    return apartamentsCardBlock;

};

//validation

function validationMainFormButton() {

let formUserName = document.querySelector('#nameInput');
let formUserSurname = document.querySelector('#surnameInput');
let formUserTelephone = document.querySelector('#telInput');
let formUserEmail = document.querySelector('#emailInput');
let formUserConfirmButton = document.querySelector('.button_form');

let validation = {
  userName: /([a-z]{2,9}|[а-я]{2,9})/g,
  userSurname: /([a-z]{2,9}|[а-я]{2,9})/g,
  userTelephone: /[0-9]{10}/,
  userEmail: /\w{1,}@\w{2,}\.\w{2,}/i,
};

formUserName.addEventListener('blur',function(){
  if (formUserName.value.match(validation.userName)) {
    formUserName.classList.remove('form-block_input--error');
  } else {
    formUserName.classList.add('form-block_input--error');

  }
});

formUserSurname.addEventListener('blur',function(){
  if (formUserName.value.match(validation.userSurname)) {
    formUserSurname.classList.remove('form-block_input--error');
  } else {
    formUserSurname.classList.add('form-block_input--error');
  }
});

formUserTelephone.addEventListener('blur',function(){
  if (formUserTelephone.value.match(validation.userTelephone)) {
    formUserTelephone.classList.remove('form-block_input--error');
  } else {
    formUserTelephone.classList.add('form-block_input--error');
  }
});

formUserEmail.addEventListener('blur',function(){
  if (formUserEmail.value.match(validation.userEmail)) {
    formUserEmail.classList.remove('form-block_input--error');
  } else {
    formUserEmail.classList.add('form-block_input--error');
  }
});

formUserConfirmButton.addEventListener('click',function(){

  let confirm = document.querySelector('.form-block_send');

  if(formUserName.value.match(validation.userName) &&
  formUserSurname.value.match(validation.userSurname) && 
  formUserTelephone.value.match(validation.userTelephone)&& formUserEmail.value.match(validation.userEmail)){
    confirm.innerHTML = 'form had been send';
    confirm.classList.toggle('form-block_send--show');
    setTimeout(() => confirm.classList.toggle('form-block_send--show'),2000);
  } else {
    confirm.innerHTML = 'fill the form correct';
    confirm.classList.toggle('form-block_send--show');
    setTimeout(() => confirm.classList.toggle('form-block_send--show'),2000);
  }
}); 

};

function validationSecondaryFormButton() {

let modalBlack = document.querySelector('.modal-black')
console.dir(modalBlack);
  let formUserName = modalBlack.querySelector('#nameInputForm');
  let formUserTelephone = modalBlack.querySelector('#telInputForm');
  let formUserConfirmButton = modalBlack.querySelector('#buttonConfirm');

 let validation = {
    userName: /([a-z]{2,9}|[а-я]{2,9})/g,
    userTelephone: /[0-9]{10}/,
  };
  
  formUserName.addEventListener('blur',function(){
    if (formUserName.value.match(validation.userName)) {
      formUserName.classList.remove('form-block_input--error');
    } else {
      formUserName.classList.add('form-block_input--error');
  
    }
  });
  
  formUserTelephone.addEventListener('blur',function(){
    if (formUserTelephone.value.match(validation.userTelephone)) {
      formUserTelephone.classList.remove('form-block_input--error');
    } else {
      formUserTelephone.classList.add('form-block_input--error');
    }
  });

  formUserConfirmButton.addEventListener('click',function(){
    
    if(formUserName.value.match(validation.userName) && 
    formUserTelephone.value.match(validation.userTelephone)){
      document.body.classList.toggle('no-scroll');
      document.body.removeChild(modalBlack); 
    } else {
      formUserConfirmButton.classList.toggle('button_form--alert');
      setTimeout(() => formUserConfirmButton.classList.toggle('button_form--alert'),300);
    }
  }); 
  };

function validationFooterForm() {
  let formUserEmail = document.querySelector('.mailing_form-input');
  console.log(formUserEmail);
  let validation = {
    userEmail: /\w{1,}@\w{2,}\.\w{2,}/i,
  };

  let test = document.querySelector('#checkData');
  console.dir(test);

  formUserEmail.addEventListener('blur',function(){
    if (formUserEmail.value.match(validation.userEmail)) {
      formUserEmail.classList.remove('form-block_input--error');
    } else {
      formUserEmail.classList.add('form-block_input--error');
    }
  });
  
        let buttonSend = document.querySelector('.button_footer');
        buttonSend.addEventListener('click', function() {
          if (formUserEmail.value.match(validation.userEmail) && test.checked) {
            console.dir(formUserEmail);
            formUserEmail.value = 'Successfully sent';
            setTimeout(()=> formUserEmail.value = '',1000);
            
          }
        });
        
}

// buildElement 

function buildElement(
  elementName,
  attributes,
  text,
  handlers,
  parent,
  assign = false
) {
  const element = document.createElement(elementName);

  for (let key in attributes) {
    if (key === "classes") {
      for (let i = 0; i < attributes[key].length; i++) {
        element.classList.add(attributes[key][i]);
      }
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }

  element.innerText = text;

  for (let key in handlers) {
    element.addEventListener(key, handlers[key]);
  }

  parent.appendChild(element);

  if (assign) {
    return element;
  }
}

// map

function showMap(){

let cityContainer = document.getElementById('map');

let cityLviv = document.getElementById('lviv');
let cityKyiv = document.querySelectorAll('.kyiv').forEach(index => {
  index.addEventListener('mouseover',function(){

    DG.then(function() {
      if(map) {map.remove();}
      map = DG.map('map', {
          center: [50.617,30.475],
          zoom: 15
      });
  
      DG.marker([50.617,30.475]).addTo(map).bindPopup('Вы кликнули по мне!');
  });
  });
});

let cityOdessa = document.getElementById('odessa');
let map;

cityOdessa.addEventListener('mouseover',function(){

  DG.then(function() {
    if(map) {map.remove();}
    map = DG.map('map', {
        center: [46.43, 30.76],
        zoom: 15
    });

    DG.marker([46.43, 30.76]).addTo(map).bindPopup('Вы кликнули по мне!');
});
});

cityLviv.addEventListener('mouseover',function(){

  DG.then(function() {
    if(map) {map.remove();}
    map = DG.map('map', {
        center: [49.832,24.019],
        zoom: 15
    });

    DG.marker([49.832,24.019]).addTo(map).bindPopup('Вы кликнули по мне!');
});
});

}

// tooltip

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


