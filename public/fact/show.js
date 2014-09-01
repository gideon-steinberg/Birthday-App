/*global $: false, jQuery: false */
(function () {

    var facts = [];

    function updateFacts(data, status){
        if (status){
            facts = JSON.parse(data);
            redraw();
        }
    }
    
    function updateAll(){
        $.get("/fact/all",updateFacts);
    }
    
    function searchFact(){
        searchText = $('input.searchFactText').val();
        if (searchText == ""){
            updateAll();
        } else {
            $.get("/fact/search/fact/" + searchText,updateFacts);
        }
    }
    
    function searchSource(){
        searchText = $('input.searchSourceText').val();
        if (searchText == ""){
            updateAll();
        } else {
            $.get("/fact/search/source/" + searchText,updateFacts);
        }
    }

    var tbody = "";
    
    function drawFact(fact){
        var tr = $(document.createElement("tr"));
        
        tr.append($(document.createElement("td")).html(fact.fact));
        tr.append($(document.createElement("td")).html(fact.source));
        
        var td = $(document.createElement("td"));
        
        var form = $(document.createElement("form"));
        form.attr({"method" : "post", "action" : "/fact/delete"});
        
        var input = $(document.createElement("input"));
        input.attr({"type" : "hidden", "value" : fact.id, "name" : "id"});
        form.append(input);
        
        var button = $(document.createElement("button"));
        button.attr({"type" : "submit"});
        button.addClass("btn").addClass("btn-link");
        form.append(button);
        
        var itallics = $($(document.createElement('i')));
        itallics.addClass("fa").addClass("fa-minus").addClass("text-danger");
        form.append(itallics);
        
        td.append(form);
        tr.append(td);
        tbody.append(tr);
    }
    
    function redraw(){
        factArea = $('.factArea')
        factArea.html("");
        
        var table = $(document.createElement("table"));
        table.addClass("table");
        
        var thead = $(document.createElement("thead"));
        
        var tr = $(document.createElement("tr"));
        
        var td = $(document.createElement("td"));
        td.append($(document.createElement("strong")).html("Fact"));
        tr.append(td);
        
        td = $(document.createElement("td"));
        td.append($(document.createElement("strong")).html("Source"));
        tr.append(td);
        
        thead.append(tr);
        table.append(thead);
        
        tbody = $(document.createElement("tbody"));
        
        facts.forEach(drawFact);
        table.append(tbody);
        factArea.append(table);
    }

    $(document).ready(function(){
        $('input.searchFactText').val("");
        $('input.searchSourceText').val("");
        $('button.searchSourceButton').click(function () {
            searchSource();
        });
        
        $('button.searchFactButton').click(function () {
            searchFact();
        });
        
        $('button.allButton').click(function () {
            updateAll();
        });
        updateAll();
    });
}());