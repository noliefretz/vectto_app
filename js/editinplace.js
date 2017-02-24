//edit in place

$('.editinplace').on('focus', function(){
    var thisParent = $(this).parents('li.vectto-editInPlace');
    var thisDrop = thisParent.find('div.drop');

    thisDrop.addClass('show');            
    $(this).attr('placeholder','');

    thisDrop.mouseenter(function(){
        thisDrop.addClass('onfocus');
    }).mouseleave(function(){
        thisDrop.removeClass('onfocus');
    });


}).on('blur', function(){
    var defaultText = $(this).attr('data-default');
    var thisValue = $(this).val();
    var thisParent = $(this).parents('li.vectto-editInPlace');
    var thisDrop = thisParent.find('div.drop');

    if( thisDrop.hasClass('onfocus') ){

    }
    else{
        if( thisValue == '' ){
            $(this).attr('placeholder', defaultText);
        }
        thisDrop.removeClass('show');
    }


}).on('keyup paste', function(){
    var thisValue = $(this).val();
    var thisParent = $(this).parents('li.vectto-editInPlace');
    var thisDrop = thisParent.find('div.drop');
    var addNew = thisDrop.find('div.addnew');
    if( thisValue != '' ){
        addNew.addClass('show');
        addNew.find('input[type="hidden"]').val(thisValue);
        addNew.find('.form-control').html('"'+thisValue+'"');
    }
    else{
        addNew.removeClass('show');
        addNew.find('input[type="hidden"]').val('');
        addNew.find('.form-control').html('');
    }
});        

// when edit icon is click
$(document).on('click', '.icon-edit', function(e){

    e.preventDefault();
    e.stopPropagation();

    var thisParent = $(this).parents('li.drop-item');
    var textHolder = $(this).parent('span');
    var defaultValue = thisParent.find('input[type="hidden"]').val();
    //var appendArea = thisParent.find('.edit-area');

    var templateEdit  ='<div class="editold">';
        templateEdit +='<div class="input-group">';
        templateEdit +='<input type="text" name="" class="form-control" value="'+ defaultValue +'">';
        templateEdit +='<span class="input-group-btn">';
        templateEdit +='<button class="btn btn-default saveEdit" type="button">save</button>';
        templateEdit +='</span>';
        templateEdit +='</div>';
        templateEdit +='</div>';

    thisParent.addClass('editable');
    thisParent.append(templateEdit);

});

// save update
$(document).on('click', '.saveEdit', function(e){

    e.preventDefault();
    e.stopPropagation();

    var thisParent = $(this).parents('.editold');
    var newValue = thisParent.find('input[type="text"]').val();
    var thisTopParent = $(this).parents('.drop-item.editable');
    var iconEdit = '<i class="icon-sprite icon-edit"></i>';
    var textHolder = thisTopParent.find('.textHolder');
    var defaultValueHolder = thisTopParent.find('.default-data');
    var newString = newValue + iconEdit;

    defaultValueHolder.val(newValue);
    textHolder.html(newString);
    thisTopParent.removeClass('editable');
    thisParent.remove();
});

// add new
$(document).on('click', '.addnewBtn', function(){
    var thisParent = $(this).parents('.input-group');
    var thisValue = thisParent.find('input[type="hidden"]').val();
    var thisTopParent = $(this).parents('.vectto-editInPlace');
    var appendArea = thisTopParent.find('.dropWrap');                

    var appendTemplate  = '<li class="drop-item">';
        appendTemplate += '<input value="'+thisValue+'" class="default-data" type="hidden">';
        appendTemplate += '<div class="edit-area">';
        appendTemplate += '<span class="textHolder">'+ thisValue +' <i class="icon-sprite icon-edit"></i></span> ';
        appendTemplate += '<div class="badge badge-default">0</div>';
        appendTemplate += '</div>';
        appendTemplate += '</li>';

    appendArea.append(appendTemplate);
    $(this).parents('.addnew').removeClass('show');
});

// select value{
$(document).on('click', '.edit-area', function(){
    var thisTopParent = $(this).parents('li.vectto-editInPlace');
    var inputField = thisTopParent.find('.editinplace');
    var thisParent = $(this).parents('.drop-item');
    var thisValue = thisParent.find('.default-data').val();

    inputField.val(thisValue);
    thisTopParent.find('.drop').removeClass('show').removeClass('onfocus');

}); 