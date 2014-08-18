/*global $: false, jQuery: false */
(function () {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var money = 1000;
    var stocks = [];

    var i = 9;
    while (i--) {
        stocks.push({ 
            price: random(60, 160), 
            tendency: random(0, 100) / 100, 
            held: 0 
        });
    }

    function update() {
        stocks.forEach(function (stock, idx) {
            var ran = random(0, 100);
            if (ran < (stock.tendency * 100)){
                stock.price++;
            } else if (stock.price > 1){
                stock.price--;
            }

            ran = random(-5, 5) / 100;
            stock.tendency += ran;
            if (stock.tendency < 0.05){
                stock.tendency = 0.05;
            } else if (stock.tendency > 0.95) {
                stock.tendency = 0.95;
            }
        });

        redraw();
    }

    function redraw() {
        $('#money').text(money);
        stocks.forEach(function (stock, idx) {
            var row = $('#'+idx);
            row.find('#price').text(stock.price);
            row.find('#tendency').text(stock.tendency.toFixed(2));
            row.find('#held').text(stock.held);
        });
    }

    function buy(company){
        var stock = stocks[company];
        if (money >= stock.price){
            money -= stock.price;
            stock.held++;
            redraw();
        }
    }

    function sell(company){
        var stock = stocks[company];
        if (stock.held > 0) {
            money += stock.price;
            stock.held--;
            redraw();
        }
    }

    $(document).ready(function(){
        $('.buy-button').click(function () {
            var idx = $(this).data('index');
            buy(+idx);
        });

        $('.sell-button').click(function () {
            var idx = $(this).data('index');
            sell(+idx);
        });

        window.setInterval(update, 1000);
        redraw();
    });
}());
