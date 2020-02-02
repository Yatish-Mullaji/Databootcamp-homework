var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(Data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(Data, d => d[chosenXAxis]) * 0.8,
      d3.max(Data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

function yScale(Data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d[chosenYAxis])])
    .range([height, 0]);
  
    return yLinearScale;

  }

// function used for updating xAxis var upon click on axis label
function renderAxes1(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

function renderAxes2(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label = "In Poverty (%)";
  }
  else if (chosenXAxis === "age") {
    var label = "Age (Median)";
  }
  else {
    var label = "Household Income (Median)";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("/assets/data/data.csv").then(function(Data, err) {
  if (err) throw err;

  // parse data
  Data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(Data, chosenXAxis);
  var yLinearScale = yScale(Data, chosenYAxis);

  // Create y scale function
//    var yLinearScale = d3.scaleLinear()
//      .domain([0, d3.max(Data, d => d.chosenYAxis)])
//      .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 15)
    .attr("fill", "blue")
    .attr("opacity", ".3");

  // Create group for  3 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var poverty = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty(%)");
    console.log(poverty);

  var age = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");
    
  var income = labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 60)
  .attr("value", "income") // value to grab for event listener
  .classed("inactive", true)
  .text("Household Income (Median)");

  // append y axis
  //var chartGroup = chartGroup.append("text")
    
  var healthcare = labelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -440)
    .attr("x", 200)
    .attr("valueY", "healthcare")
    .classed("active", true)
    //.attr("dy", "1em")
    //.classed("axis-text", true)
    .text("Lacks Healthcare (%)");
   
  var smokes = labelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -465)
    .attr("x", 200)
    .attr("valueY", "smokes")
    .classed("inactive", true)
    //.attr("dy", "1em")
    //.classed("axis-text", true)
    .text("Smokes (%)");
       
  var obesity = labelsGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -490)
  .attr("x", 200)
  .attr("valueY", "obesity")
  .classed("inactive", true)
  //.attr("dy", "1em")
  //.classed("axis-text", true)
  .text("Obese (%)");
  console.log(obesity);
    

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(Data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes1(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        // if (chosenXAxis === "poverty") {
        //   poverty
        //     .classed("active", true)
        //     .classed("inactive", false);
        //   age
        //     .classed("active", false)
        //     .classed("inactive", true);
        //   income
        //     .classed("active", false)
        //     .classed("inactive", true);
        // }
        // else if (chosenXAxis === "age") {
        //      age
        //       .classed("active", true)
        //       .classed("inactive", false);
        //      poverty
        //       .classed("active", false)
        //       .classed("inactive", true);
        //      income
        //       .classed("active", false)
        //       .classed("inactive", true);              
        //   }
        // else {
        //   income
        //     .classed("active", true)
        //     .classed("inactive", false);
        //   age
        //     .classed("active", false)
        //     .classed("inactive", true);
        //   poverty
        //     .classed("active", false)
        //     .classed("inactive", true);            
        // }
      }

      var valueY = d3.select(this).attr("valueY");
      if (valueY !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = valueY;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(Data, chosenYAxis);

        // updates x axis with transition
        yAxis = renderAxes2(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        // if (chosenYAxis === "healthcare") {
        //   healthcare
        //     .classed("active", true)
        //     .classed("inactive", false);
        //   obesity
        //     .classed("active", false)
        //     .classed("inactive", true);
        //   smokes
        //     .classed("active", false)
        //     .classed("inactive", true);
        // }
        // else if (chosenYAxis === "smokes") {
        //      smokes
        //       .classed("active", true)
        //       .classed("inactive", false);
        //      healthcare
        //       .classed("active", false)
        //       .classed("inactive", true);
        //      obesity
        //       .classed("active", false)
        //       .classed("inactive", true);              
        //   }
        // else {
        //   obesity
        //     .classed("active", true)
        //     .classed("inactive", false);
        //   healthcare
        //     .classed("active", false)
        //     .classed("inactive", true);
        //   smokes
        //     .classed("active", false)
        //     .classed("inactive", true);            
        // }
      }
      if (chosenXAxis === "poverty") {
        poverty
          .classed("active", true)
          .classed("inactive", false);
        age
          .classed("active", false)
          .classed("inactive", true);
        income
          .classed("active", false)
          .classed("inactive", true);
    
       var chosenYAxis = "healthcare"
       
       switch(chosenYAxis){
    
        case "smokes":
            smokes
            .classed("active", true)
            .classed("inactive", false);
           healthcare
            .classed("active", false)
            .classed("inactive", true);
           obesity
            .classed("active", false)
            .classed("inactive", true);
            break;
    
        case "obesity":
            obesity
            .classed("active", true)
            .classed("inactive", false);
          healthcare
            .classed("active", false)
            .classed("inactive", true);
          smokes
            .classed("active", false)
            .classed("inactive", true); 
            break;  
        default:
          healthcare
            .classed("active", true)
            .classed("inactive", false);
          obesity
            .classed("active", false)
            .classed("inactive", true);
          smokes
            .classed("active", false)
            .classed("inactive", true);
        }
       
       healthcare
                .classed("active", true)
                .classed("inactive", false);
              obesity
                .classed("active", false)
                .classed("inactive", true);
              smokes
                .classed("active", false)
                .classed("inactive", true);
      }
      else if (chosenXAxis === "age") {
           age
            .classed("active", true)
            .classed("inactive", false);
           poverty
            .classed("active", false)
            .classed("inactive", true);
           income
            .classed("active", false)
            .classed("inactive", true); 
            
            var chosenYAxis = "healthcare"
       
            switch(chosenYAxis){
         
             case "smokes":
                 smokes
                 .classed("active", true)
                 .classed("inactive", false);
                healthcare
                 .classed("active", false)
                 .classed("inactive", true);
                obesity
                 .classed("active", false)
                 .classed("inactive", true);
                 break;
         
             case "obesity":
                 obesity
                 .classed("active", true)
                 .classed("inactive", false);
               healthcare
                 .classed("active", false)
                 .classed("inactive", true);
               smokes
                 .classed("active", false)
                 .classed("inactive", true); 
                 break;  
             default:
               healthcare
                 .classed("active", true)
                 .classed("inactive", false);
               obesity
                 .classed("active", false)
                 .classed("inactive", true);
               smokes
                 .classed("active", false)
                 .classed("inactive", true);
             }
        }
      else {
        income
          .classed("active", true)
          .classed("inactive", false);
        age
          .classed("active", false)
          .classed("inactive", true);
        poverty
          .classed("active", false)
          .classed("inactive", true);
          
          var chosenYAxis = "healthcare"
       
          switch(chosenYAxis){
       
           case "smokes":
               smokes
               .classed("active", true)
               .classed("inactive", false);
              healthcare
               .classed("active", false)
               .classed("inactive", true);
              obesity
               .classed("active", false)
               .classed("inactive", true);
               break;
       
           case "obesity":
               obesity
               .classed("active", true)
               .classed("inactive", false);
             healthcare
               .classed("active", false)
               .classed("inactive", true);
             smokes
               .classed("active", false)
               .classed("inactive", true); 
               break;  
           default:
             healthcare
               .classed("active", true)
               .classed("inactive", false);
             obesity
               .classed("active", false)
               .classed("inactive", true);
             smokes
               .classed("active", false)
               .classed("inactive", true);
           }
      };
    
    });
}).catch(function(error) {
  console.log(error);
});