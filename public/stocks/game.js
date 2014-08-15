$(document).ready(function(){
  i = 1; 
  window.setInterval(function() {
   company_number = parseInt($("#company_number").attr("value"));
   for (i = 0; i < company_number; i++){
     row = $("#" + i);
     ran = Math.floor(Math.random()*100);
     tendency = row.find("#tendency");
     tendencyVal = parseFloat(tendency.text());
     price = row.find("#price");
     if (ran < (tendencyVal * 100)){
       price.text(parseInt(price.text()) + 1);
     } else if ( parseInt(price.text()) > 1){
       price.text(parseInt(price.text()) - 1);
     }
     ran = (Math.floor(Math.random()*20) - 10) / 100;
     newTendency = tendencyVal + ran;
     if (newTendency < 0.05){
       newTendency = 0.05;
     } else if (newTendency > 0.95) {
       newTendency = 0.95;
     }
     newTendency = ("" + newTendency).substring(0,4);
     tendency.text(newTendency);
   }  
  }, 1000);

});

function Buy(company){
  row = $("#" + company);
  price = parseInt(row.find("#price").text());
  held = row.find("#held");
  money = parseInt($("#money").text());
  if (money >= price){
    $("#money").text(money - price);
    held.text(parseInt(held.text()) + 1);
  }
}

function Sell(company){
  row = $("#" + company);
  price = parseInt(row.find("#price").text());
  held = row.find("#held");
  heldAmount = parseInt(held.text());
  money = parseInt($("#money").text());
  if (heldAmount > 0){
    $("#money").text(money + price);
    held.text(heldAmount - 1);
  }
}