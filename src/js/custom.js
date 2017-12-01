/* Add click on button start a project */
function StartProject(link) {

  function closePopup(){
    var popup = document.querySelector('.popup');
    popup.classList.remove('popup--open');

    var closeBtn = document.querySelector('.popup__close');
    closeBtn.removeEventListener('click', closePopup, false);
  }

  function keyListener(e){
    var key = e.keyCode;
    if( key === 27 ) {
      closePopup();
    }
  }

  function openPopup() {
    var popup = document.querySelector('.popup');
    popup.classList.add('popup--open');

    var closeBtn = document.querySelector('.popup__close');
    closeBtn.addEventListener('click', closePopup);

    var body = document.body;
    body.addEventListener('keydown', keyListener);
  }

  this.links = document.querySelectorAll(link);

  this.addListeners = function (){
    for( var i = 0; i < this.links.length; i++ ){
      this.links[i].addEventListener('click', function(e){
        e.preventDefault();

        openPopup();
      });
    }
  }

}

/* Add a scroll by click on the link in menu */
function AddScroll(link){

}

window.onload = function(){

  /* Add listeners on click for open popup */
  var startProject = new StartProject('.js-scrollToStart');
  startProject.addListeners();

  /*  */
  var addScroll = new AddScroll('.navigation__link');

}
