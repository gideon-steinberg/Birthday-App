$(document).ready(function(){
  i = 1; 
  window.setInterval(function() {
   //$("#price").text(i);
   //i = i + 1;
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