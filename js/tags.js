// for tags
var tagsArray = new Array();

$('.forTags').on('focus', function(){
    var thisParent = $(this).parents('li.vectto-editInPlace,.tag-section');
    var thisDrop = thisParent.find('div.drop');
    var thisValue = $(this).val();
    var tagContainer = thisParent.find('.tag-container');
    var tagContainerCount = thisParent.find('.tagItem').length;

    $(this).css('width','auto');

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
    var thisParent = $(this).parents('li.vectto-editInPlace,.tag-section');
    var thisDrop = thisParent.find('div.drop');
    var tagContainer = thisParent.find('.tag-container');
    var tagContainerCount = tagContainer.children().length;

    if( thisDrop.hasClass('onfocus') ){

    }
    else{
        if( thisValue == '' && tagContainerCount > 0 ){
            $(this).attr('placeholder', '');
            $(this).css('width','auto');
        }
        else{
            $(this).attr('placeholder', defaultText);
            $(this).css('width','95%');
        }
        thisDrop.removeClass('show');
    }

    console.log(tagContainerCount);

}).on('keyup paste', function(e){
    var thisValue = $(this).val();
    var thisParent = $(this).parents('li.vectto-editInPlace,.tag-section');
    var thisDrop = thisParent.find('div.drop');
    var addNew = thisDrop.find('div.addnew');
    var tagContainer = thisParent.find('.tag-container');
    var tagContainerCount = tagContainer.children().length;

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

}).on('keypress', function(e){
    var thisValue = $(this).val();
    var thisParent = $(this).parent('label');
    var tagContainer = thisParent.find('.tag-container');
    var tagContainer = thisParent.find('.tag-container');
    var tagContainerCount = tagContainer.children().length;

    var tagTemplate  = '<span class="tag-item new-tag">';
        tagTemplate += '<input type="hidden" name="tagValue[]" value="'+ thisValue +'"> '+ thisValue +' <a href="#" class="removeTag"><i class="icon-sprite icon-circle-close"></i></a>';
        tagTemplate += '</span>';

    if( e.which == 13 ){
        if( thisValue != '' ){
            tagsArray.push(thisValue);
            tagContainer.append(tagTemplate);
            $(this).val('');
        }
    }            

});

// remove tags
$(document).on('click', '.removeTag', function(e){
    e.preventDefault();
    e.stopPropagation();

    var thisParent = $(this).parent('.tag-item');
    var thisValue = thisParent.find('input[type="hidden"]').val();
    var thisMainParent = $(this).parents('li.vectto-editInPlace');
    var thisInput = thisMainParent.find('input.forTags');
    var thisInputDefaultText = thisInput.attr('data-default');
    var tagContainer = thisMainParent.find('.tag-container');
    var tagContainerCount = tagContainer.children().length;
    var theCount = tagContainerCount - 1;

    tagsArray = jQuery.grep(tagsArray, function(value){
        return value != thisValue;
    });

    thisParent.hide().remove();

    if( theCount <= 0 ){
       thisInput.attr('placeholder',thisInputDefaultText);
    }
    else{
        thisInput.attr('placeholder','');
    }

});

// select tags
$(document).on('click', '.vectto-tag .edit-area', function(){
    var thisTopParent = $(this).parents('li.vectto-editInPlace');
    var inputField = thisTopParent.find('.editinplace');
    var tagContainer = thisTopParent.find('.tag-container');
    var thisParent = $(this).parents('.drop-item');
    var thisValue = thisParent.find('.default-data').val();

    var tagTemplate  = '<span class="tag-item existing-tag">';
        tagTemplate += '<input type="hidden" name="tagValue[]" value="'+ thisValue +'"> '+ thisValue +' <a href="#" class="removeTag"><a href="#" class="removeTag"><i class="icon-sprite icon-circle-close"></i></a>';
        tagTemplate += '</span>';

    tagsArray.push(thisValue);
    tagContainer.append(tagTemplate);
    thisTopParent.find('.drop').removeClass('show').removeClass('onfocus');

});