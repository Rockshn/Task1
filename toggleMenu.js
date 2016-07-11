/**
 * Created by Roman on 08.06.2016.
 */
//Navi hover


    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();

    }, function () {

        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();

    });

//});