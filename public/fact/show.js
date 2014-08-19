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
    
    
    var factHtml = ""
    function drawFact(fact){
        var row = document.createElement("tr");
        factHtml = factHtml + "<tr><td>" + fact.fact + "</td>";
        factHtml = factHtml + "<td>" + fact.source + "</td><td>";
        factHtml = factHtml + "<form method=\"post\" action=\"/fact/delete\">"
        factHtml = factHtml + "<input type=\"hidden\" value=\"" + fact.id + "\" name=\"id\">"
        factHtml = factHtml + "<button class=\"btn btn-link\" type=\"submit\">"
        factHtml = factHtml + "<i class=\"fa fa-minus text-danger\"></i>"
        factHtml = factHtml + "</button></form></tr>"
    }
    
    function redraw(){
        factArea = $('.factArea')
        factArea.html("");
        factHtml = "";
        factHtml = factHtml + "<table class=\"table\"><thead><tr><td><strong>Fact</strong></td>";
        factHtml = factHtml + "<td><strong>Source</strong></td><td></td><tbody>";
        facts.forEach(drawFact);
        factHtml = factHtml + "</tbody></table>";
        factArea.append(factHtml);
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