$(document).ready(function(){
  i = 1; 
  window.setInterval(function() {
   $("#price").text(i);
   i = i + 1
  }, 1000);

});