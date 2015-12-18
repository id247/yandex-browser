;(function(){

  "use strict";


  var modal = (function(){

    var currentModal = false;

    var modalOverlay = document.getElementById('yab-modal-overlay');
    var modals = document.querySelectorAll('.yab-modal');

    var doc = document.documentElement || document.body;

    var scrollTo = function (to) {

      to = parseInt(to) - 50;

      var from = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

      var time = 300;
      var unit = '';
      
      var start = new Date().getTime();
      var timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);

            //firefox fix
            if (document.body.scrollTop > 0){
              document.body.scrollTop = (from+step*(to-from))+unit;
            }else if (document.documentElement.scrollTop > 0){
              document.documentElement.scrollTop = (from+step*(to-from))+unit;
            }

            if( step == 1) clearInterval(timer);
      },25);

      doc.scrollTop = from;

    }

    var overlayShow = function(){
      modalOverlay.classList.add('yab-modal-overlay--visible');
    }

    var overlayHide = function(){
      modalOverlay.classList.remove('yab-modal-overlay--visible');
    }

    var modalShow = function(modal, top){
      modal.style.top = ( top.indexOf('px') > -1 ) ? top : top + 'px';
      modal.classList.add('yab-modal--visible');
    }

    var modalHide = function(modal){
      modal.style.top = '';
      modal.classList.remove('yab-modal--visible');
    }

    var modalOpen = function(modalId){
      
      var top = 0;

      [].forEach.call(modals, function(modal){
        if (modal.id === modalId){

          //if modal already opened 
          if (currentModal){

            top = currentModal.style.top;

            modalHide(currentModal);

            modalShow(modal, top);             
            
            scrollTo(top);

          }else{
            
            top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            
            overlayShow();
             
            modalShow(modal, top + 'px');            

          }

          currentModal = modal;

        }        
      
      });
    
    }

    var modalClose = function(){
      
      overlayHide();

      [].forEach.call(modals, function(modal){
        modalHide(modal);
      });

      currentModal = false;
    
    }

    var modalOpenClick = function(){

      document.addEventListener('click', function(event){
            
        event = event || window.event;
        var el = event.target || event.srcElement;

        while (el && el.tagName && el.tagName.toLowerCase() !== 'body') {

          if (el.classList.contains('js-yab-modal')){

            event.preventDefault();
          
            var modalId = el.getAttribute('href').slice(1);

            modalOpen(modalId);

            el = false;

          }else{
            el = el.parentNode;
          }

        }

      });

    }

    var modalCloseClick = function(){

      document.addEventListener('click', function(event){
            
        event = event || window.event;
        var el = event.target || event.srcElement;

        while (el && el.tagName && el.tagName.toLowerCase() !== 'body') {

          if (el.classList.contains('js-yab-modal-close')){

            event.preventDefault();
          
            modalClose();

            el = false;

          }else{
            el = el.parentNode;
          }

        }

      });

    }

    var init = function(){
      modalOpenClick();
      modalCloseClick();
    }

    return{
      init: init
    }
  
  })();

    
  //start the magic
  document.addEventListener("DOMContentLoaded", function() {

    modal.init();

  });    
  
}());