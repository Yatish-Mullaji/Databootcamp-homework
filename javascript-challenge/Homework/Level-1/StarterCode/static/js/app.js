// from data.js
var tableData = data;
console.log(tableData.length);
var tbody = d3.select("tbody");


tableData.forEach((ufoSightings) => {
  var row = tbody.append("tr");
  Object.entries(ufoSightings).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
    });
  });

  var button = d3.select("#filter-btn");
  button.on("click", function() {
    d3.event.preventDefault();

    // Filter by date
    var dateInput = d3.select("#datetime");
    var datetime = dateInput.property("value");

    var filterInputs = {};

    if (datetime !== "") {
        filterInputs.datetime = datetime;
    }

    var filtered = tableData.filter(obj => {
        var criteria = true;
        Object.entries(filterInputs).forEach(([key, value]) => {
            criteria = criteria && (obj[key] === value);
        });
        return criteria;
    });

    console.log(filtered);

    tbody.html("");

    filtered.forEach((ufoSightings) => {
      var row = tbody.append("tr");
      Object.entries(ufoSightings).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
      });
});

