/**
 * Created by Roman on 11.06.2016.
 */

$('#baseVariant').click(function(){
    $.ajax({
        url: "baseVariant.html",
        cache: false,
        success: function(html){
            $("#undoMenu").html(html);
        }
    });
});

$('#registerClass').click(function(){
    $.ajax({
        url: "registerClass.html",
        cache: false,
        success: function(html){
            $("#undoMenu").html(html);
        }
    });
});

$('#boatModernization').click(function(){
    $.ajax({
        url: "boatModernization.html",
        cache: false,
        success: function(html){
            $("#undoMenu").html(html);
        }
    });
});

