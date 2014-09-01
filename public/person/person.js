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
        password = $('input.password').val();
        person = action.split("/")[2];
        $.get( action + "/" + password,updateComments);
    }
    
    var commentHtml = "";
    
    function drawComment(comment){
        commentHtml = commentHtml + "<tr><td width=\"20px\" class=\"center\">"
        commentHtml = commentHtml + "<form method=\"post\" action=\"/person/"+ person +"/delete/"+ comment.category +"\">"
        commentHtml = commentHtml + "<input type=\"hidden\" value=\""+ comment.id +"\" name=\"id\">"
        commentHtml = commentHtml + "<button type=\"submit\" class=\"btn btn-link\"><i class=\"fa fa-minus text-danger\"></i>"
        commentHtml = commentHtml + "</button></form></td>"
        commentHtml = commentHtml + "<td>" + comment.fact + "</td></tr>"
    }
    
    function draw(comments){
        tbody = $('tbody.comments')
        tbody.html("");
        comments.forEach(drawComment);
        tbody.append(commentHtml);
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