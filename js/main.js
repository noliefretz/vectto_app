$(function() {
    
    function debounce(b,d,a){var c;return function(){var h=this,g=arguments;var f=function(){c=null;if(!a){b.apply(h,g)}};var e=a&&!c;clearTimeout(c);c=setTimeout(f,d);if(e){b.apply(h,g)}}};
    
    function adjustHeight($elem){
        
        var topSearchBar = $('#topSearchBar');
        var ads = $('#top-ads');
        var footer = $('#footer');
        
        var topSearcBarHeight = topSearchBar.outerHeight();
        var adsHeight = ads.outerHeight();
        var footerHeight = footer.outerHeight();
        var wHeight = $(window).height();
        var totalHeight = 0;
        
        if(ads.is(':hidden') || ads.length == 0){
            totalHeight = topSearcBarHeight + footerHeight;
        }
        else{
            totalHeight = topSearcBarHeight + adsHeight + footerHeight;
        }
        
        $elem.css('height', wHeight - totalHeight+'px');
        
    }
    
    // set height to scrollable div
    adjustHeight($('#content-holder, .toolbar-action'));
    
    // set height to srollable div on resize
    $(window).resize(debounce(function(e){
        adjustHeight($('#content-holder, .toolbar-action'));
    },200)).resize();
    
    
    $(document).on('click', 'a[href*=#]', function(e){
        e.preventDefault();
        e.stopPropagation();
    });

    $("#size-slider").slider({
        range: "min",
        min: 1,
        max: 200,
        slide: function( event, ui ) {
                $("#size").val( ui.value + "px" );
         }
    });
    
    $( "#size" ).val($( "#size-slider" ).slider( "value" ) + "px" );

    $(document).ready(function(){
        
        $("#main_sidebar > li > a").click(function(){
            $("#main_sidebar > li > a.selected").removeClass("selected");   
            $(this).addClass("selected");

            if($(this).hasClass('active')){
                $("#main_sidebar > li > a.active").removeClass("active");
            }
            else{
                $("#main_sidebar > li > a.active").removeClass("active");
                $(this).addClass('active');
            }

            //slide up all the link lists
            $("#main_sidebar li .inner-list").slideUp();
            //slide down the link list below the h3 clicked - only if its closed
            if(!$(this).next().is(":visible"))
            {
                $(this).next().slideDown('slow');
            }
        })
        
        $('#main_sidebar .nav.nav-stacked li').each(function(){
            
            if( $(this).hasClass('active') ){
                var parent = $(this).parents('li');
                var parentClass = parent.attr('class');
                
                $('.'+parentClass+' > a').addClass('selected active');
                $('.'+parentClass+' > .inner-list').css('display','block');
            }
            
        });

        // colorpicker
    //    $('#color-preview, #background-preview').colorpicker().on('changeColor', function(e){
    //        $(this)[0].style.backgroundColor = e.color.toString('rgba');
    //    });

          $('#color-preview, #background-preview').colorpicker({
              color: '#000',
              format: 'rgba'
          }).on('changeColor', function(e){
              var rgba = e.color.toString('rgba');
              $(this)[0].style.backgroundColor = rgba;
              $('.icon-item span').css('background-color', rgba);
          });;

        // right-icon-toolbar

        $('.right-icon-toolbar li a.tooltips').on('click', function(){
            var thisParent = $(this).parents('li');
            var thisHash = $(this).attr('href');
            var showBox = $('.toolbar-action');

            if( thisParent.hasClass('active') ){
                $('.right-icon-toolbar li').removeClass('active');
                showBox.removeClass('show');
            }
            else{
                $('.right-icon-toolbar li').removeClass('active');
                thisParent.addClass('active');
                showBox.addClass('show');
            }

            $('.toolbar-tabs').removeClass('show');
            $(thisHash).addClass('show');

        });

        // show filter field
        $('#show-filter a').on('click', function(e){
            $('#filterField').toggleClass('show');
            $(this).parent('li').toggleClass('active');
        });
        
        //show dotted menu content
        $('#dottedBtn a').on('click', function(){
            $('.dottedMenuWrap').toggleClass('show');
            $(this).parent('li').toggleClass('active');
        });

        // user profile menu when click
        $('#user-profile a').on('click', function(e){
            var thisParent = $(this).parents('li');
            if( thisParent.hasClass('active') ){
                thisParent.removeClass('active');
            }
            else{
                thisParent.addClass('active');
            }
        });          

    });
    
    $('.icon-item').on('click', function(){
        var rightBar = $('.right-icon-toolbar');
        rightBar.addClass('show');
    });
    
    $('.scrollable').perfectScrollbar();    

});
