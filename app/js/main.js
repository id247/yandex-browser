;(function(){

  "use strict";



  var fancyBoxes = function(){

    var formName = false;
    var formId = false;
    var $fancybox = $('.js-fancybox');

    $fancybox.on('click', function(){
      formName = $(this).data('form-name');
      formId = $(this).data('form-id');
    });

    $fancybox.fancybox({
      padding: 0,
      scrolling: 'no',
      autoCenter : false,
      fitToView: false,
      arrows: false,
      helpers: {
          overlay: {
              locked: false // if true (default), the content will be locked into overlay
          }
      },
      afterLoad: function( current, previous ){
        
        var $current = $(current.content);

        var $form = $current.find('form');
        var $formName = $current.find('input[name="form"]');

        var originalName = $form.data('form-name');
        var originalId = $form.data('form-id');

        if ($formName.length === 1){

          //console.log('formName ' + formName );

          if ( formName ){
            $formName.val( formName );
          }else if( originalName ){
            $formName.val( originalName );
          }

        }

        if ($form.length === 1){

          //console.log('formId ' + formId );

          if ( formId ){
            $form.attr('action', 'thanks.php?formId=' + formId );
          }else if( originalId ){
            $form.attr('action', 'thanks.php?formId=' + originalId );
          }

        }

      }
    });
 
  };

  //smooth scroll
  var scrollMeTo = function(){
    var scrollToTopOfset = 0 ;//$( '#header' ).outerHeight() || 0;

    $('.js-goto').on('click', function(e){
      var $target = $(this.href.replace( /^.*\#/, '#' ));
      
      if ($target.length !== 1) return false;

        $('body,html').animate({ 
          scrollTop: $target.offset().top - scrollToTopOfset }, 
        500);
        return false;
    });

  };


  //alax forms
  var validateForms = function(){

    var alaxOptions = {
      timeout: 3000,
      datatype: 'json',
      success: function showResponse(responseText, statusText, xhr, $form)  { 
        var target = $form.data('popup') || 'success';
        $('a.modal-opener[href="#' + target + '"]').trigger('click');
      }       
    };
    
    var submitForm = function(form){
      $(form).ajaxSubmit( alaxOptions );
    }


    var validateMessages = {
      required: "Поле обязательно для заполнения",
      email: "Введите корректный e-mail",
    };

    $.extend($.validator.messages, validateMessages );

    $('form').each(function() {
      $(this).validate({
        //errorPlacement: function(error, element) {},
        submitHandler: function(form) {
          submitForm(form);
        }
      });
    });

  };

  //bxsliders
  var bxSliders = function(){

    $('#main-slider').bxSlider({
      pager: false
    });

  };

  $(document).ready(function() {
    
    fancyBoxes();
    validateForms();
    scrollMeTo();

  });
  
}());