/*global $: false, jQuery: false */
(function () {

    function updateComments(data, status){
        if (status){
            comments = JSON.parse(data);
            draw(comments);
            $('button.getComments').unbind();
        }
    }
    
    var action = "";
    var person = "Jeremy";
    
    function getComments(){
        var password = $('input.password').val();
        person = action.split("/")[2];
        $.get( action + "/" + password,updateComments);
    }
    
    function drawComment(comment){
        var tbody = $('tbody.comments');
        var tr = $(document.createElement('tr'));
        var formTd = $(document.createElement('td')).attr({"width" : "20px"}).addClass("center");
        
        var form = $(document.createElement('form'));
        form.attr({"method" : "post", "action" : "/person/" + person + "/delete/" + comment.category});
        
        var input = $(document.createElement('input'));
        input.attr({"type" : "hidden", "value" : comment.id, "name" : "id"});
        
        var button = $(document.createElement('button'));
        button.attr({"type" : "submit"}).addClass("btn").addClass("btn-link");
        
        var itallics = $(document.createElement('i'));
        itallics.addClass("fa").addClass("fa-minus").addClass("text-danger");
        
        var factTd = $(document.createElement('td')).html(comment.fact);
        
        button.append(itallics);
        form.append(input);
        form.append(button);
        formTd.append(form);
        tr.append(formTd);
        tr.append(factTd);
        tbody.append(tr);
    }
    
    function draw(comments){
        var tbody = $('tbody.comments')
        tbody.html("");
        comments.forEach(drawComment);
    }

    $(document).ready(function(){
        $('button.getComments').click(function () {
            getComments();
        });
        action = $('form.newComment').attr("action");
        if (action.match("Barry")){
            $('input.password').val("a");
            $('button.getComments').click();
        }
    });
}());