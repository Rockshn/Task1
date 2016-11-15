/**
 * Created by Roman on 14.11.2016.
 */

$('#calculate').on('click', function () {
    var tableRows = $('#main-table-body').find('tr');
    var rowCellsNumber = $('#main-table-body').find('td').length / tableRows.length;

    var upgradeCost = +$('#upgrade-cost').val();
    var discountRate = +$('#discount-rate').val();
    var deadweightBeforeUpgrade = +$('#deadweight-before-upgrade').val();
    var deadweightAfterUpgrade = +$('#deadweight-after-upgrade').val();
    var levelOfcompetitivenessBeforeUpgrade = +$('#level-of-competitiveness-before-upgrade').val();
    var levelOfcompetitivenessAfterUpgrade = +$('#level-of-competitiveness-after-upgrade').val();
    var effectiveGrossIncome = +$('#effective-gross-income').val();
    var repairCosts = +$('#repair-costs').val();
    var operatingCosts = +$('#operating-costs').val();

    for (var i = 3; i < (rowCellsNumber - 1); i++) {

        var result = +$(tableRows[0]).find('td:eq(' + i + ')').html()
            - +$(tableRows[1]).find('td:eq(' + i + ')').html()
            - +$(tableRows[2]).find('td:eq(' + i + ')').html();

        $(tableRows[3]).find('td:eq(' + i + ')').html(result.toFixed(1));


        result = +$(tableRows[0]).find('td:eq(' + i + ')').html()
            - +$(tableRows[2]).find('td:eq(' + i + ')').html();

        $(tableRows[4]).find('td:eq(' + i + ')').html(result.toFixed(1));


        if(discountRate) {
            result = +$(tableRows[4]).find('td:eq(' + i + ')').html() / Math.pow((1 + discountRate), i - 2);
            $(tableRows[5]).find('td:eq(' + i + ')').html(result.toFixed(1));
        }


        if(deadweightBeforeUpgrade) {
            result = +$(tableRows[4]).find('td:eq(' + i + ')').html() / deadweightBeforeUpgrade;
            if (isFinite(result)) {
                $(tableRows[6]).find('td:eq(' + i + ')').html(result.toFixed(2));
            }
        }


        if(levelOfcompetitivenessAfterUpgrade && levelOfcompetitivenessBeforeUpgrade) {
            result = +$(tableRows[6]).find('td:eq(' + i + ')').html() +
                ( (-43.3 + 151.3 * levelOfcompetitivenessAfterUpgrade) - (-43.3 + 151.3 * levelOfcompetitivenessBeforeUpgrade)  );
            $(tableRows[7]).find('td:eq(' + i + ')').html(result.toFixed(1));
        }


        if(deadweightAfterUpgrade) {
            result = +$(tableRows[7]).find('td:eq(' + i + ')').html() * deadweightAfterUpgrade;
            $(tableRows[8]).find('td:eq(' + i + ')').html(result.toFixed(1));
        }


        if(discountRate) {
            result = +$(tableRows[8]).find('td:eq(' + i + ')').html() / Math.pow((1 + discountRate), i - 2);
            $(tableRows[9]).find('td:eq(' + i + ')').html(result.toFixed(1));
        }

        if(upgradeCost) {
            if (i === 3) {
                result = upgradeCost + +$(tableRows[9]).find('td:eq(' + i + ')').html();
                $(tableRows[10]).find('td:eq(' + i + ')').html(result.toFixed(1));
            } else {
                result = +$(tableRows[9]).find('td:eq(' + i + ')').html() + +$(tableRows[10]).find('td:eq(' + (i - 1) + ')').html();
                $(tableRows[10]).find('td:eq(' + i + ')').html(result.toFixed(1));
            }
        }
    }

    var sum=0;
    var counter = 0;
    $('table tr').each(function(){
        $(this).find('td:last').empty();
        $(this)
            .find('td')
            .each(function(){
                var result = 0;
                result = +($(this).html());
                if(!isNaN(result)) {
                    sum+=result;
                }
                console.log(counter++);
                console.log(sum);
            });
        $(this).find('td:last').html(sum.toFixed(1));
        sum=0;
    });

});

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            $('#calculate').click();
            return false;
        }
    });
});