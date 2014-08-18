/*global $: false, jQuery: false */
(function () {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var score = 0;
    
    function increaseScore(){
        score++;
        $('.score').text("Score = " + score);
    }
    
    function moveButton(button){
        var X = random(0,800);
        var Y = random(0,300);
        var height = random(50,150);
        var width = random(50,150);
        button.style.height=height + "px";
        button.style.width=width + "px";
        button.style.marginTop=Y + "px";
        button.style.marginLeft=X + "px";
    }

    $(document).ready(function(){
        $('.game').click(function () {
            moveButton(this);
            increaseScore();
        });
    });
}());