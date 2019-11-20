// modal-window

function apartmentCardClickHandler(event) {
    let modalBlock = createModal();
    event.preventDefault();
    let image = this.offsetParent.querySelector('img').getAttribute('src');
    let title = this.offsetParent.querySelector('.appartaments_title').textContent;
    let price = this.offsetParent.querySelector('.appartaments_price').textContent;
    let text = this.offsetParent.querySelector('.appartaments_text').textContent;
  
    let content = insertApartamentBlockIntoModal(image, title, price,text);
    modalBlock.appendChild(content);
  
  }
  
  function sliderModal(){
  let sliderButton = document.querySelector('.button_header');
  console.log(sliderButton);
  sliderButton.addEventListener('click',function(){
    let modalBlock = createModal();
    let modalMain = document.querySelector('.modal-main');
    modalMain.classList.toggle('modal-main--min-width');
  
    let modalTitle = buildElement('h2',{classes:['modal-title']},'Fill the form and we will call you in 1 minute',null,modalBlock,true);
    let modalForm = modalFormInnerMin(modalBlock);
  
    });
  }
  
  function modalFormInnerMin(modalBlock) {
  
    let modalForm = buildElement('div',{classes:['form-block','form-block--no-border'],action:'GET'},null,null,modalBlock,true);
    let modalFormBlock = buildElement('div',{classes:['form-block_part']},null,null,modalForm,true);
    let modalFormLabel = buildElement('label',{classes:['form-block_label'],for:'nameInputForm'},'Your name',null,modalFormBlock,true);
    let modalFormInput = buildElement('input',{classes:['form-block_input'],id:'nameInputForm'},null,null,modalFormBlock,true);
    modalFormBlock = buildElement('div',{classes:['form-block_part']},null,null,modalForm,true);
    modalFormLabel = buildElement('label',{classes:['form-block_label'],for:'telInputForm'},'Your telephone',null,modalFormBlock,true);
    modalFormInput = buildElement('input',{classes:['form-block_input'],id:'telInputForm'},null,null,modalFormBlock,true);
    modalFormBlock = buildElement('div',{classes:['form-block_part']},null,null,modalForm,true);
    let modalCancelButton = buildElement('button',{classes:['button','button_form','button_form--cancel'],type:'button'},'Cancel',null,modalFormBlock,true);
    let modalConfirmButton = buildElement('button',{classes:['button','button_form'],type:'button',id:'buttonConfirm'},'Confirm',null,modalFormBlock,true);
  
    

    let modalBlack = document.querySelector('.modal-black');
  
    let validation = validationSecondaryFormButton();

      modalCancelButton.addEventListener('click', () => {
      document.body.classList.toggle('no-scroll');
      document.body.removeChild(modalBlack); 
    });
  
/*     modalConfirmButton.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
    document.body.removeChild(modalBlack); 
  }); */
  
  return modalForm;
  }
  
  function createModal(event){
  
      let modalBlack=  buildElement('div', {classes:['modal-black']},null,null,document.body,true);
      let modalMain = buildElement('div', {classes:['modal-main']},null,null,modalBlack,true);
      document.body.classList.toggle('no-scroll');
      let closeButtonImg = buildElement('img', {classes:['modal-close'], src:'assets/images/icons/times-solid.svg',alt:'exit button'},null,null,modalMain,true);
      closeButtonImg.addEventListener('click', () => {
        document.body.classList.toggle('no-scroll');
        document.body.removeChild(modalBlack);
      });
      return modalMain;
  }
  
  function insertApartamentBlockIntoModal(image, title, price,text) {
    let modalBlock = document.createElement('div');
    modalBlock.classList.add('modal-block');
    let modalBlockImage = buildElement('img',{classes:['modal-image'],src:image,alt:'apartament'},null,null,modalBlock,true);
    let modalBlockPrice = buildElement('p',{classes:['modal-price']},price,null,modalBlock,true);
    let modalBlockLocation = buildElement('h3',{classes:['modal-title']},title,null,modalBlock,true);
    let modalBlockText = buildElement('div',{classes:['modal-text']},null,null,modalBlock,true);
    let modalBlockTextNewline = buildElement('p',{classes:['modal-text--newline']},text,null,modalBlockText,true);
    modalBlockTextNewline = buildElement('p',{classes:['modal-text--newline']},'If you want to order this apartament please fill out the form at the bottom of the page and our operator will call you back within 10 minutes.',null,modalBlockText,true);
    let modalOrderButton = buildElement('button',{classes:['button','button_form'],id:'buttonOrder'},'Order this apartament',null,modalBlock,true);
  
    modalOrderButton.addEventListener('click',function(){
      modalBlock.innerHTML = '';
      let modalMain = document.querySelector('.modal-main');
      modalMain.classList.toggle('modal-main--min-width');
      let modalTitle = buildElement('h2',{classes:['modal-title']},'Fill the form to order this apartament',null,modalBlock,true);
      let modalForm = modalFormInnerMin(modalBlock);
    });
    return modalBlock;
  }