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

  function scrollTo(e){
    e.preventDefault();

    var id = e.target.getAttribute('href').substring(1);
    var block = document.getElementById(id);
    var blockTop = block.getBoundingClientRect().top;

    var timerId = setInterval(function(){
      if( blockTop > 0 ){
        var sign = ">";
        scollToElem(sign);
      } else {
        var sign = "<";
        scollToElem(sign);
      }
    }, 10);

    function scollToElem(sign){
      if( sign == ">"  ) {

        if( window.pageYOffset < blockTop ){
          window.scrollBy(0, 10);
        } else {
          clearInterval(timerId);
        }

      } else {

        if( block.getBoundingClientRect().top < 0 ){
          window.scrollBy(0, -10);
        } else {
          clearInterval(timerId);
        }

      }

    } // end function scollToElem;

  }

  this.links = document.querySelectorAll(link);

  this.addListeners = function(){
    for( var i = 0, num = this.links.length; i < num; i++ ){
      this.links[i].addEventListener('click', scrollTo);
    }
  }
}

window.onload = function(){

  /* Add listeners on click for open popup */
  var startProject = new StartProject('.js-scrollToStart');
  startProject.addListeners();

  /* Scroll from header */
  var addScrollHeader = new AddScroll('.navigation__link');
  addScrollHeader.addListeners();

  /* Scroll from footer */
  var addScrollFooter = new AddScroll('.footer__nav a');
  addScrollFooter.addListeners();

}
