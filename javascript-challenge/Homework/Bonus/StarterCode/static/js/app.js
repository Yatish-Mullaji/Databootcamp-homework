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

  d3.selectAll("#selDataset").on("change", function(){
    
    var button = d3.select("button");

    button.on("click", function() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property ("value");

    console.log(inputValue);

    var filteredData = tableData.filter(sightings => sightings.datetime === inputValue);

    console.log(filteredData);

    var cities = filteredData.map(sightings => sightings.city);
    console.log(cities);

    var cityList = d3.select(".summary");

  
    cityList.append("li").text(`Cities:  ${cities}`);

  });
});