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

  function downloadLinks(){


    //disable for mobiles
    if( ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) ){
      return;
    }


    function isIETest () {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    function appendCss(css, parentDoc){
      var head = parentDoc.head || parentDoc.getElementsByTagName('head')[0];
      var style = parentDoc.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(parentDoc.createTextNode(css));
      }
      head.appendChild(style);    
    }

    function getBrowser(){

      if ( (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 ){
        return 'opera';
      }

      if ( typeof InstallTrigger !== 'undefined' ){
        return 'firefox';
      }

      if ( Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ){
        return 'safari';
      }
      
      if (navigator.userAgent.toLowerCase().match('yabrowser')){
        return 'yandex';
      }

      if ( !!window.chrome && !!window.chrome.webstore ){
        return 'chrome';        
      }

      var isIE = /*@cc_on!@*/false || !!document.documentMode

      if ( isIE && (isIETest() == 8) ){
        //return 'ie8';
        return false; //fuck it;
      } else if ( !isIE && !!window.StyleMedia ){
        return 'edge';
      } else {
        return 'ie';
      }
      return false;
    }


    var css = '' +
    '.prnj { font-family: arial, sans-serif; opacity: 0; z-index: 1000; position: fixed; top: 0; left: 0; right:0; bottom: 0; background: url("https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/bg.png"); background: rgba(0,0,0,.9); color: #fff; transition: opacity .8s; }' +
    '.prnj__close { position: absolute; right: 25px; top: 25px; cursor: pointer; }' +
    '.prnj__content { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }' +
    '.prnj__text-placeholder { text-align: center; position: absolute; left: 10px; right: 10px; bottom: 0px; top: 0; margin: auto; width: 745px; height: 350px; }' +
    '.prnj__logo { margin: 0 0 15px; }' +
    '.prnj__title { color: #fff; font-size: 34px; line-height: 1.5; margin: 0 0 15px; }' +
    '.prnj__text { color: #fff; font-size: 20px; line-height: 1.5; }' +
    '.prnj__arrow { position: absolute; }' +

    '.prnj__content--chrome .prnj__arrow { left: 30px; bottom: 30px; }' +

    '.prnj__content--opera .prnj__close { top: auto; bottom: 25px; }' +
    '.prnj__content--opera .prnj__arrow { right: 25px; top: 60px; }' +

    '.prnj__content--yandex .prnj__close { top: auto; bottom: 25px; }' +
    '.prnj__content--yandex .prnj__arrow { right: 25px; top: 60px; }' +

    '.prnj__content--ff .prnj__close { top: auto; bottom: 25px; }' +
    '.prnj__content--ff .prnj__arrow { right: 105px; top: 30px; }' +

    '.prnj__content--ie .prnj__arrow { right: 50%; bottom: 80px; margin: 0 -200px 0 0; }' +
    
    '.prnj__content--ie8 .prnj__text-placeholder { top: auto; bottom: 50px; width: 930px; text-align: left; height: auto; }' +
    '.prnj__content--ie8 .prnj__logo { float: left; }' +
    '.prnj__content--ie8 .prnj__title { margin-left: 170px; }' +
    '.prnj__content--ie8 .prnj__text { margin-left: 170px; }' +
    '.prnj__content--ie8 .prnj__arrow { left: 50%; top: 50%; margin: 20px 0 0 -390px; }' +

    '.prnj__content--edge .prnj__arrow { right: 50%; bottom: 80px; margin: 0 -390px 0 0; }' +

    '.prnj__content--safari .prnj__text-placeholder { height: auto; top: 30px; }' +
    '.prnj__content--safari .prnj__close { top: auto; bottom: 25px; }' +
    '.prnj__content--safari .prnj__arrow { right: 70px; top: 100px; }' +
    '' +
    '';

    //templates
    
    var templates = {
      chrome:       '<div class="prnj__content prnj__content--chrome">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow"  src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-chrome.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt=""  />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '     Чтобы установить его, нажмите кнопку, на которую указывает стрелка, <br />' +
                '     а затем запустите установщик и следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',
                    

      yandex:       '<div class="prnj__content prnj__content--yandex">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-opera.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '   Для того, чтобы установить его,<br />' +
                '   нажмите на появившуюся иконку браузера' +
                '   <img src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/yandex-download-2.png?2" alt="" style="vertical-align: middle;" />' +
                '   справа от адресной строки, и&nbsp;следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',
                    

      opera:        '<div class="prnj__content prnj__content--opera">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-opera.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '   Для того, чтобы установить его,<br />' +
                '   нажмите кнопку' +
                '   <img src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/opera-download.png" alt="" style="vertical-align: middle;" />' +
                '   справа от адресной строки,' + 
                '     а&nbsp;затем дважды нажмите значок установочного файла &laquo;Yandex&raquo; и&nbsp;следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',

      firefox:        '<div class="prnj__content prnj__content--ff">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-ff.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '   Для того, чтобы установить его,<br />' +
                '   нажмите кнопку' +
                '   <img src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/ff-download.png" alt="" style="vertical-align: middle;" />' +
                '   справа от адресной строки,' + 
                '     а&nbsp;затем нажмите значок установочного файла &laquo;Yandex&raquo; и&nbsp;следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',

      ie:         '<div class="prnj__content prnj__content--ie">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-ie.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '     Чтобы установить его, нажмите на кнопку &laquo;Выполнить&raquo; на панели уведомлений в нижней части окна браузера, <br />' +
                '     а затем запустите установщик и следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',


      ie8:        '<div class="prnj__content prnj__content--ie">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-ie.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '     Чтобы установить его, нажмите на кнопку &laquo;Выполнить&raquo; на панели уведомлений в нижней части окна браузера, <br />' +
                '     а затем запустите установщик и следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',


      edge:         '<div class="prnj__content prnj__content--ie">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-ie.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '     Чтобы установить его, нажмите на кнопку &laquo;Выполнить&raquo; на панели уведомлений в нижней части окна браузера, <br />' +
                '     а затем запустите установщик и следуйте инструкциям' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                '',


      safari:       '<div class="prnj__content prnj__content--safari">' +
                ' <img class="prnj__close" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/close.png" alt="" />' +
                ' <img class="prnj__arrow" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/arrow-up-right.png" alt="" />' +
                ' <div class="prnj__text-placeholder">' +
                '   <img class="prnj__logo" src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/logo.png" alt="" />' +
                '   <div class="prnj__title">' +
                '     Спасибо, что скачали Яндекс.Браузер' +
                '   </div>' +
                '   <div class="prnj__text">' +
                '     Чтобы установить его, ' +
                '     дважды нажмите значок &laquo;Yandex.dmg&raquo; <br />' +
                '     в появившемся окне &laquo;Загрузки&raquo; <br />' +
                '     <img src="https://ad.csdnevnik.ru/special/staging/adfox/yandex/files/safari-download.png?1" alt="" style="vertical-align: middle;" />' +
                '     <br /> В открывшемся окне перетащите значок браузера в папку &laquo;Программы&raquo;.' +
                '   </div>' +
                ' </div>' +
                '</div>' +
                ''  
    };
    
    //who we are
    var browser = getBrowser();

    if (!browser) return; //no paranjas for unknown browsers

    //parent window
    var parentDoc = window.document;
    //paranja
    var paranja = document.createElement('div');
    //get banner link   
    var link = document.querySelectorAll('.yab-button--download');
    if (link.length == 0) return; // no liks - no fun


    //css append
    appendCss(css, parentDoc);

    //paranja append
    paranja.className = 'prnj';
    paranja.innerHTML = templates[browser];

    //events

    //open paranja
    for (var i = 0; i < link.length ; i++){

      link[i].setAttribute('target', '_parent'); //hotfix - set same window for download target

      link[i].addEventListener('click', function(e){
        //e.preventDefault();
        parentDoc.body.appendChild(paranja);
        
        setTimeout( function(){
          paranja.style.opacity = 1;
        }, 500);
      });
    }

    //close by click
    paranja.addEventListener('click', function(e){
      if (e.target.tagName.toLowerCase() !== 'a'){
        e.preventDefault();
        paranja.style.opacity = 0;
        setTimeout( function(){
          parentDoc.body.removeChild(paranja);
        }, 800);
      }
    });


  }

    
  //start the magic
  document.addEventListener("DOMContentLoaded", function() {

    modal.init();
    downloadLinks();

  });    
  
}());