/*global $: false, jQuery: false */
(function () {
    
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var buttons = ["top", "left", "bottom", "right"];
    var pattern = [random(0,3)];
    
    var patternIntervalId;
    var positionInPattern = -1;
    var isOn = false;
    
    function show(button){
        button.addClass("hover");
    }

    function hide(button){
        button.removeClass("hover");
    }

    function getButton(i){
        return $('button.' + buttons[i])
    }
    
    function validateInput(button){
        patternButton = getButton(pattern[positionInPattern]);
        if (button.attr('class') == patternButton.attr('class')){
            positionInPattern++;
            if (positionInPattern >= pattern.length){
                removeClicksFromButtons();
                var ran = random(0,3);
                pattern.push(ran);
                positionInPattern = -1;
                patternIntervalId = window.setInterval(showPattern, 1000);
                $('td.middleText').text("Showing Pattern");
                return;
            }
        } else {
          $('p.endtext').text("You Lose, your score is " + (pattern.length -1));
          removeClicksFromButtons();
        }
    }
    
    function addClicksToButtons(){
        var i = buttons.length;
        while (i--){
            hide(getButton(i))
            getButton(i).click(function () {
                validateInput($(this));
            });
        }
    }
    
    function removeClicksFromButtons(){
        var i = buttons.length;
        while (i--){
            hide(getButton(i))
            getButton(i).unbind('click');
        }
    }

    function showPattern(){
        $('td.middleText').text("Showing Pattern");
        if (isOn){
            isOn = false;
            var i = pattern[positionInPattern];
            hide(getButton(i));
            return;
        }
        if (positionInPattern >= (pattern.length - 1)){
            addClicksToButtons();
            clearInterval(patternIntervalId);
            positionInPattern = 0;
            $('td.middleText').text("Your Turn");
            return;
        }
        var i = pattern[positionInPattern];
        if (positionInPattern != -1){
            hide(getButton(i));
        }
        positionInPattern++;
        i = pattern[positionInPattern];
        show(getButton(i));
        isOn = true;
    }
        
    $(document).ready(function(){
        patternIntervalId = setInterval(showPattern, 1000);
    });
}());