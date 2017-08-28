function sneakersSorted() {
  this.displaySneakers = function () {

    $("#tableau").empty();
     var i = 0;
for (var x in Sneakers.sneakers) {
$('#tableau').append("<tr><td>" + Sneakers.sneakers[x].id +
"</th><td>" + Sneakers.sneakers[x].brand +
"</td><td>" + Sneakers.sneakers[x].model +
"</td ><td>" + Sneakers.sneakers[x].category +
"</td ><td>" + Sneakers.sneakers[x].size +
"</td ><td>" + Sneakers.sneakers[x].price +
"</td ><td>" + Sneakers.sneakers[x].sold +
"</td ><td>" + Sneakers.sneakers[x].turnover + " €" +
"</td ><td>" + Sneakers.sneakers[x].percentage + " %" +
"</td ><td>" + Sneakers.sneakers[x].percentagePlus + " %" +


"</td></tr>"
)
i++;console.log(i);
if (i%2 === 0) {
$("tbody tr:last-child").css('background-color', 'grey');
$("tbody tr:last-child").css('color', 'white');
$("tbody tr:last-child").css('font-weight', 'bold');

}
}

}

  this.calculateTurnoverOfOneSneaker = function () {
    for(x in Sneakers.sneakers) {
    Sneakers.sneakers[x].turnover = Sneakers.sneakers[x].price * Sneakers.sneakers[x].sold;
  }
 }

 this.calculateSoldPercentage = function() {
   for (x in Sneakers.sneakers) {
     Sneakers.sneakers[x].percentage = Math.round(((Sneakers.sneakers[x].sold / $('#totalSoldOut').text()) * 100));
   }
 }

 this.calculateTurnOVerPercentage = function() {
   for (x in Sneakers.sneakers) {
     Sneakers.sneakers[x].percentagePlus = Math.round(((Sneakers.sneakers[x].turnover / $('#totalTurnOver').text()) * 100));
   }
 }

this.calculateSoldSneakers = function () {
  var i = 0;
  for (x in Sneakers.sneakers) {
// Sneakers.sneakers[i].sold = Sneakers.sneakers[i].sold + Sneakers.sneakers[i].sold;
  i += Sneakers.sneakers[x].sold;
  }
  $("#totalSoldOut").html(i);
}

this.calculateTotalTurnOver = function () {
  var i = 0;
  for (x in Sneakers.sneakers) {
    i+= Sneakers.sneakers[x].turnover;
  }
  $("#totalTurnOver").html(i);
}



// sort methode
 this.sortingSneakers = function(tab, key) {


  tab.sort(function(a, b) {
     var keyA = a[key];
     var keyB = b[key];
     if (keyA < keyB) return -1;
     if (keyA > keyB) return 1;
     return 0;
   });

  // Adds content sort
       this.displaySneakers();

}
}




// ajax request
var objetSneakers = new sneakersSorted();
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    Sneakers = JSON.parse(this.responseText);
    objetSneakers.calculateTurnoverOfOneSneaker();
    objetSneakers.calculateSoldSneakers();
    objetSneakers.calculateTotalTurnOver();
    objetSneakers.calculateSoldPercentage();
    objetSneakers.calculateTurnOVerPercentage();
    objetSneakers.displaySneakers();

   $('#selecteur').change(function() {
      objetSneakers.sortingSneakers(Sneakers.sneakers, $('#selecteur').val());


   })

 }
};
xhttp.open("GET", "list.json", true);
xhttp.send();
