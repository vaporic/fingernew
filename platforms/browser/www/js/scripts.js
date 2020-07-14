document.addEventListener("touchstart", function(){}, true);

$(function() {
    'use strict';

    var base_url = 'http://gps.somostusideas.info/api';

    var dataSplash = $('.page-content').attr('data-splash');
    var dataRedirect = $('.page-content').attr('data-redirect');
    var auth = window.localStorage.getItem("auth");   

    $("#lang").on("change", function(e){
        e.preventDefault();
        var value = $(this).val();

        if(value != ''){
            window.localStorage.setItem("lang", value);
        }

        if(value == 'es'){
            goToPage('login.html');
        }else{
            goToPage('login_en.html');
        }
    });

    $("#logout").on("click", function(e){
        e.preventDefault();
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("icem_customer");        
        goToPage('login.html');
    });

    if(dataSplash>0){
        $('.loading-mask').addClass('stop-loading');
        setTimeout(function(){
            if(auth == 'true'){
                goToPage('home.html');
            }else{
                goToPage(dataRedirect);
            }            
        },dataSplash);
    }
    $("#submit-form").submit(function(event) {
        event.preventDefault();

        var $this = $(this);

        //TMP
        //window.localStorage.setItem("auth", "true");

        //var dataRedirect = $this.attr('data-redirect');               
        //goToPage(dataRedirect);

        $.ajax({
            type: 'post',
            url: base_url+'/login_app',
            data: {
                'email' : $("#email-field").val(),
                'password' : $("#password-field").val(),
            },            
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                if(!err.success){                    
                    navigator.notification.alert(err.message, null, 'Error', 'Cerrar');    
                }
            },
            success: function(data) {
                if(data.success){

                    // Save Language
                    var lang = $("#lang").val();
                    if(lang != ''){
                        window.localStorage.setItem("lang", lang);
                    }

                    console.log(data.data.id);
                    // Save Token Login
                    window.localStorage.setItem("auth", "true");

                    window.localStorage.setItem("icem_customer", data.data.id);

                    var dataRedirect = $this.attr('data-redirect');               
                    goToPage(dataRedirect);
                }else{                    
                    navigator.notification.alert(data.message, null, 'Error', 'Cerrar');    
                }
            },
        });
        
        return false;
    });
    if (navigator.userAgent.match(/Mobi/)) {
        $('.mobile-wrapper').width('100%');
    }
    $('#grid-1-column').on('click', function(){
        $('.portfolio-gallery').find('.portfolio-item')
            .removeClass('grid-1-column grid-2-columns grid-3-columns')
            .addClass('grid-1-column');
        $('.options-new .small-button').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
    $('#grid-2-columns').on('click', function(){
        $('.portfolio-gallery').find('.portfolio-item')
            .removeClass('grid-1-column grid-2-columns grid-3-columns')
            .addClass('grid-2-columns');
        $('.options-new .small-button').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
    $('#grid-3-columns').on('click', function(){
        $('.portfolio-gallery').find('.portfolio-item')
            .removeClass('grid-1-column grid-2-columns grid-3-columns')
            .addClass('grid-3-columns');
        $('.options-new .small-button').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
    $('input:radio.radio-bullet', '.w-form').change( function(){
        var name = $(this).attr('name');
        $('input:radio[name="'+ name +'"]').each(function( index ) {
          $(this).prev('.radio-bullet-replacement').removeClass('checked');
        });
        if ($(this).is(':checked')) {
            $(this).prev('.radio-bullet-replacement').addClass('checked');
        }else{
            $(this).prev('.radio-bullet-replacement').removeClass('checked');
        }
    });
    $('input:checkbox.checkbox-input', '.w-form').change( function(){
        if ($(this).is(':checked')) {
            $(this).prev('.checkbox-handle').addClass('checked');
            $(this).next('.checkbox-label').addClass('checked');
        }else{
            $(this).prev('.checkbox-handle').removeClass('checked');
            $(this).next('.checkbox-label').removeClass('checked');
        }
    });
    // Loading Pages
    $('.loading-mask').addClass('stop-loading');
    $('[data-load="1"]').on('click',  function(e){
        $('.loading-mask').removeClass('stop-loading');
        //e.preventDefault();
        /*var hrefPage = $(this).attr('href');
        setTimeout(function(){
            goToPage(hrefPage);
        },10);
        return false;*/
    });
    var goToPage = function(hrefPage){
        document.location = hrefPage;
    };
    window.onpopstate = function(e){
        $('.loading-mask').addClass('stop-loading');
    };
    
});
