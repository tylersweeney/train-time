// Initialize Firebase
var config = {
  apiKey: "AIzaSyAPqQjpWxW2RD2Yaf1D_bsbP28wAxYuU9U",
  authDomain: "train-time-9ec8e.firebaseapp.com",
  databaseURL: "https://train-time-9ec8e.firebaseio.com",
  projectId: "train-time-9ec8e",
  storageBucket: "",
  messagingSenderId: "97732188055"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event){
  event.preventDefault();

  //Retreive user's input
  var trainName = $("#train-name-input").val()
  var destination = $("#destination-input").val()
  var firstTrain = $("#first-train-input").val()
  var frequency = $("#frequency-input").val()

  //Create local "temporary" object for holding added train data
  var newTrain = {
    name: trainName,
    destination: destination,
    first: firstTrain,
    frequency: frequency,
  };

  //Upload train data to database
  database.ref().push(newTrain);

  //Log data to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  //Alert
  alert("New Train successfully added");

  //clears forms
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

//Create Firebase event
database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  //Store input to variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().frequency;

  //Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var trainTimePretty = moment.unix(firstTrain).format("HH:mm");

  var nextArrival =moment().diff(moment.unix(firstTrain, "X"), "HH:mm");
  console.log(nextArrival)

  var minutesAway = moment(nextArrival).fromNow();

  //Add each train into table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + 
    "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" + nextArrival +
     "</td><td>" + minutesAway + "</td></tr>");
});


