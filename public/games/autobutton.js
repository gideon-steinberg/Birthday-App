/*global $: false, jQuery: false */
(function () {

    function clickButton(){
        $('button.game').click();
    }

    $(document).ready(function(){
        setInterval(clickButton, 400);
    });
}());