/**
 * Created by Roman on 02.07.2016.
 */

function acceptTableName(name) {
    $("#tableName").html(name);
};

function acceptBoatNumber(number) {

    for (var j = 0; j < number; j++) {
        var tableRows = $("#table tr").length;
        var tableCells = $("#table td").length;
        var tableCols = tableCells / (tableRows - 1);

        var tableRowNumber = tableRows - 1;
        var tableBody = document.getElementById("tableBody");
        var tableTr = document.createElement("tr");
        tableTr.setAttribute("id", "tableRow" + tableRowNumber);

        for (var i = 0; i < tableCols; i++) {
            var tableTd = document.createElement("td");
            if (i < (tableCols - 2)) {
                tableTd.setAttribute("class", "editable");
            }
            if (i == tableCols - 2) {
                tableTd.setAttribute("id", "competitiveness");
            }
            if (i == tableCols - 1) {
                tableTd.setAttribute("id", "place");
            }
            tableTr.appendChild(tableTd);
        }

        var lastTableRow = document.getElementById('lastTableRow')
        tableBody.insertBefore(tableTr, lastTableRow);
    }
};

function calculateCompetitiveness() {

    var tableRows = $("#tableBody").find("tr");
    var tableCols = $(tableRows[1]).find("td.editable");
    var bestMark;
    var coefficient = [];
    var tdResult;

    for (var i = 1; i < tableRows.length - 1; i++) {
        tableCols = $(tableRows[i]).find("td.editable");
        var maxVal = $(tableCols[2]).html();
        var minVal = $(tableCols[2]).html();

        for (var j = 2; j < tableCols.length; j++) {
            var tableCells = $(tableRows[i]).find("td.editable");
            var cellValue = +$(tableCells[j]).html();
            if (cellValue > maxVal) {
                maxVal = cellValue
            }
            if (cellValue < minVal) {
                minVal = cellValue;
            }
        }

        var summa = 0;
        for (var j = 2; j < tableCols.length; j++) {
            bestMark = $("#tableRow1").find("td").eq(j).html();
            var tableCells = $(tableRows[i]).find("td.editable");
            var cellValue = +$(tableCells[j]).html();

            var x = 0;
            if (bestMark == "Да") {
                x = cellValue / maxVal;
            } else {
                x = minVal / cellValue;
            }

            if (!isNaN(x)) {
                summa += Math.pow((1 - x), 2);
            }
        }

        coefficient[i - 1] = 1 - Math.sqrt(summa);

        $(tableRows[i]).find("td#competitiveness").html(coefficient[i - 1]);
    }

    var sortedCoeff = coefficient.slice().sort( function (a,b) {
        return b - a;
    });

    var uniqueCoeff = getUnique(sortedCoeff);

    var place = 0;
    for (var i = 0; i < coefficient.length; i++) {
        var place = find(uniqueCoeff, coefficient[i]) + 1;
        $(tableRows[i + 1]).find("td#place").html(place);
    }

};

function find(array, value) {
    if (array.indexOf) { // если метод существует
        return array.indexOf(value);
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }

    return -1;
}

var getUnique = function (arr) {
    var current;
    var length = arr.length;
    var unique = [];
    for (var i = 0; i < length; i++) {
        current = arr[i];
        if (!~unique.indexOf(current)) {
            unique.push(current);
        }
    }
    return unique;
};

$("button").click(function () {
    var btn = $(this);
    var btnId = btn.attr("id");

    if (btnId == "acceptNameTableBtn") {
        var inputValue = $("#inputNameTable").val();
        acceptTableName(inputValue);
        return;
    }

    if (btnId == "acceptNumberBoatBtn") {
        var inputNumber = $("#inputNumberBoats").val();
        acceptBoatNumber(inputNumber);
        return;
    }

    if (btnId == "calculate") {
        calculateCompetitiveness();
        return;
    }
});

$(function () {
    $(document).on('click', '.editable', function (e) {
        var t = e.target || e.srcElement;

        var elmName = t.tagName.toLowerCase();

        if (elmName == 'input') {
            return false;
        }
        var val = $(this).html();
        var code = '<input type="text" id="edit" value="' + val + '" />';
        $(this).empty().append(code);
        console.log($(this).html());
        $('#edit').focus();
        $('#edit').blur(function () {
            var val = $(this).val();
            $(this).parent().empty().html(val);
        });
    });
});

$(window).keydown(function (event) {
    if (event.keyCode == 13) {
        $('#edit').blur();
    }
});