$(document).ready(function(){
    
    // login trigger
    $('#loginBtn a').on('click', function(){
        $('#loginModal').modal({
            backdrop: 'static',
            keyboard: false        
        });
    });



    $('#topSignup, .signupBtn').on('click', function(){
        $('#signupModal').modal({
            backdrop: 'static',
            keyboard: false        
        }); 
    });
    
    $(".modal").on('shown.bs.modal', function() {
        $(this).find("input").first().focus();
    });

    // sign up modal    
//           $('#signupModal').modal({
//               backdrop: 'static',
//               keyboard: false   
//           });       
    
    //login & singup simple validation
    $('#loginEmail').on('blur', function(){
        var thisValue = $(this).val();
        var loginPassValue = $('#loginPassword').val();
        var thisParent = $(this).parents('form');
        var thisButton = thisParent.find('button.btn-disabled');
        
        if( thisValue == "" ){
            $(this).css('border-bottom-color','red');
        }
        else{
            $(this).css('border-bottom-color','#ddd');
        }

        if( thisValue != "" && loginPassValue != "" ){
            thisButton.removeClass('btn-disabled').removeAttr('disabled');
        }    
    });

    $('#loginPassword').on('blur', function(){
        var thisValue = $(this).val();
        var loginEmail = $('#loginEmail').val();
        var thisParent = $(this).parents('form');
        var thisButton = thisParent.find('button.btn-disabled');
        
        if( thisValue == "" ){
            $(this).css('border-bottom-color','red');
            $(this).next().css('border-bottom-color','red');
        }
        else{
            $(this).css('border-bottom-color','#ddd');
            $(this).next().css('border-bottom-color','#ddd');
        }

        if( thisValue != "" && loginEmail != "" ){
            thisButton.removeClass('btn-disabled').removeAttr('disabled');
        }

    });

    var errorCount = 1;
    var checked = false;
    $('#signup .form-control').on('blur', function(){
        var thisParent = $(this).parents('form');
        var btnParent = thisParent.find('.signup-btn');
        var btn = btnParent.find('button');
        var thisValue = $(this).val();
        var thisId = $(this).attr('id');
        
        if( thisValue == "" ){
            $(this).css('border-bottom','1px solid red');
            $(this).next().css('border-bottom','1px solid red');
        }
        else{
            if( thisId == 'signupPassword' ){
                $(this).css('border-bottom',0);
                $(this).next().css('border-bottom',0);
            }
            else{
                $(this).css('border-bottom','1px solid #ddd');
                $(this).next().css('border-bottom','1px solid #ddd');
            }
        }
        
        $('#signup .form-control').each(function(){

            var thisVal = $(this).val();

            if( thisVal == "" ){
                errorCount = 1;
            }
            else{
                errorCount = 0;
            }

        });

    });
    
    $('#agreeTerms').on('click', function(){
        var thisParent = $(this).parents('form');
        var btnParent = thisParent.find('.signup-btn');
        var btn = btnParent.find('button');

        if($(this).is(':checked')){
            checked = true;
            if( errorCount == 0 ){
                btn.removeClass('btn-disabled').removeAttr('disabled');
            }
            else{
                btn.addClass('btn-disabled').attr('disabled','disabled');
            }
        }
        else{
            checked = false;
            btn.addClass('btn-disabled').attr('disabled','disabled');
        }
    });
    
    // show password
    $('.revealPass').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        var showIcon = '<i class="icon-sprite icon-pass-show"></i>';
        var hideIcon = '<i class="icon-sprite icon-pass-hidden"></i>'; 
        var iconSet = $(this).find('.icon-sprite');
        var thisParent = $(this).parents('.input-group');

        if( iconSet.hasClass('icon-pass-show') ){
            $(this).html(hideIcon);
            thisParent.find('input').attr('type','password');
        }
        else{
            $(this).html(showIcon);
            thisParent.find('input').attr('type','text');
        }

    }); 
    
});