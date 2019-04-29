// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var fiends = require("../data/fiends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/fiends", function(req, res) {
    res.json(fiends);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/fiends", function(req, res) {
  
    var match = {
        name: "",
        photo: "",
        fiendDifference: Infinity
    }
    
 var userData = req.body
 var userScores = userData.scores;

var totalDifference;

for (var i = 0; i <fiends.length; i++) {
    var currentFiend = fiends[i];
    totalDifference = 0;

    console.log (currentFiend.name);

    for (var j = 0; j < currentFiend.name; j++) {
        var currentFiendScore = currentFiend.scores[j];
        var currentUserScore = userScores[j];
    totalDifference = totalDifference + Math.abs(parseInt(currentUserScore) - parseInt(currentFiendScore));

    }

    if (totalDifference <= match.fiendDifference)  {

        match.name = currentFiend.name;
        match.photo = currentFiend.photo;
        match.fiendDifference = totalDifference;        
    }

}

      fiends.push(req.body);
      console.log ("match" + match);
      res.json(match);
   
    }
  );



};
