// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDwvsVawH7cCm1gKJsYNsGvvyXheQtqL9c",
    authDomain: "land-slide-pre-warning-system2.firebaseapp.com",
    databaseURL: "https://land-slide-pre-warning-system2.firebaseio.com",
    projectId: "land-slide-pre-warning-system2",
    storageBucket: "land-slide-pre-warning-system2.appspot.com",
    messagingSenderId: "56395025463",
    appId: "1:56395025463:web:9d0171da87ccf7a691c3b2",
    measurementId: "G-VCEBTH6P0D",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
  var leadsRef = database.ref("data");
  
  leadsRef.on("value", function (snapshot) {
    var rows = [];
    var rows2 = [];
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot.val());
      console.log(childSnapshot.key);
  
      var childData = childSnapshot.val();
      var time = childSnapshot.key;
      // var fourPoints = childData.split(" ").map((point) => {
      //   return parseInt(point.slice(3));
      // });
      console.log(childData.split(" "));
      var fourPoints = [
        childData.split(" ")[9],
        childData.split(" ")[11],
        childData.split(" ")[13],
      ];
  
      var twoPoints = [
        parseInt(
          childData.split(" ")[7].slice(0, childData.split(" ")[7].length - 2)
        ),
      ];
  
      fourPoints = fourPoints.map((point) => {
        return parseInt(point.slice(3));
      });
  
      console.log(fourPoints);
  
      fourPoints.unshift(time);
      twoPoints.unshift(time);
      console.log(twoPoints);
  
      rows.push(fourPoints);
      rows2.push(twoPoints);
      console.log({ row2: rows2 });
    });
    drawTheGxGyGz(rows);
    drawRainfall(rows2);
  });
  
  let drawTheGxGyGz = (rows) => {
    google.charts.load("current", { packages: ["corechart", "line"] });
    google.charts.setOnLoadCallback(drawCrosshairs);
  
    function drawCrosshairs() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "X");
      data.addColumn("number", "GX");
      data.addColumn("number", "GY");
      data.addColumn("number", "GZ");
  
      data.addRows(rows);
      console.log(rows);
  
      var options = {
        hAxis: {
          title: "Time",
        },
        vAxis: {
          title: "Value",
        },
        colors: ["#a52714", "#097138", "#ffff00"],
        crosshair: {
          color: "#000",
          trigger: "selection",
        },
      };
  
      var chart = new google.visualization.LineChart(
        document.getElementById("chart_div")
      );
  
      chart.draw(data, options);
    }
  };
  
  let drawRainfall = (rows) => {
    google.charts.load("current", { packages: ["corechart", "line"] });
    google.charts.setOnLoadCallback(drawCrosshairs);
  
    function drawCrosshairs() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "X");
      data.addColumn("number", "Rainfall");
  
      data.addRows(rows);
      console.log(rows);
  
      var options = {
        hAxis: {
          title: "Time",
        },
        vAxis: {
          title: "MM",
        },
        colors: ["#a52714"],
        crosshair: {
          color: "#000",
          trigger: "selection",
        },
      };
  
      var chart = new google.visualization.LineChart(
        document.getElementById("chart_div2")
      );
  
      chart.draw(data, options);
    }
  };
  