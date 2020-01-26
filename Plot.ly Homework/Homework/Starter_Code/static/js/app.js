var jsonFile = "./samples.json"


  function buildPlot() {
        d3.json(jsonFile).then(function(data) {
        var person = (data.names);
        console.log(person);
        var idNameObj = (data.samples);
        // console.log(idNameObj);
        var ids = idNameObj.map(id => id.id);
        console.log(ids);
        var otu_ids = idNameObj.map(id => id.otu_ids);
        console.log(otu_ids);
        var sampleValues = idNameObj.map(id => id.sample_values );
        console.log(sampleValues);
        var sampleId = idNameObj.map(id => id.id );
        console.log(sampleId);
        var otuLabels = idNameObj.map(id => id.otu_labels);
        console.log(otuLabels);
        var demographicInfo = (data.metadata);
        console.log(demographicInfo);




     var select = document.getElementById("selDataset");
    for (i in person) {   
        select.add(new Option(person[i]));  
    }; 


     d3.selectAll("#selDataset").on("change", updatePlotly);

 
    function updatePlotly() {
 // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
 // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);

    var indexNum = (sampleId.indexOf(dataset));
    console.log(indexNum);

    var otu_idsName = String(otu_ids[indexNum].slice(0,10))
    console.log(otu_idsName);
    console.log(otu_ids[indexNum]);
    console.log(sampleValues[indexNum]);

    var size = (sampleValues[indexNum]);
    console.log(size);
    var sizeInt = size.map(d=>parseInt(d*10));
    console.log(sizeInt);

    var text = otuLabels[indexNum];
    console.log(text);

 //console.log(sampleValues[indexNum].slice(0,10).reverse());


    //GRAPHS:


    var trace1 = {
         x: sampleValues[indexNum].slice(0,10).reverse(),
         y:otu_idsName,
        
         name: "Greek",
         type: "bar",
         orientation:'h',
        };

    var data = [trace1]    
        Plotly.newPlot("bar", data);


    
        var trace2 = {
            x: otu_ids[indexNum],
            y: sampleValues[indexNum],
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(240, 164, 114)', 'rgb(205, 104, 114)',  'rgb(124, 60, 201)', 'rgb(50, 165, 054)','rgb(193, 214, 114)', 'rgb(125, 244, 214)',  'rgb(114, 60, 201)', 'rgb(205, 165, 154)'],
                opacity: [0.4],
                text: ['text'],
                size: sizeInt,
                //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
                //sizeref:  50000 * Math.max(sizeInt),
              sizemode: 'area'
            }
           
          };
    
          var data2 = [trace2];
          
          var layout = {
            title: 'Bubble Chart Size Scaling',
            showlegend: false,
            height: 600,
            width: 1000,
            options: {
                scales: {
                    xAxes: [{
                        type: 'OTU ID',
                        position: 'bottom'
                    }]
                }
            }
          };
          
          Plotly.newPlot('bubble', data2, layout);


          // Demographic info:

          var metaData = (demographicInfo[indexNum]);
          console.log(metaData);

//          var metadata=data.metadata;
//          console.log(metadata);
          var x=document.getElementById("sample-metadata");
          x.innerHTML=`ID: ${metaData.id}
          <br>Ethnicity: ${metaData.ethnicity}
          <br>Gender: ${metaData.gender}
          <br>Age: ${metaData.age}
          <br>Location: ${metaData.location}
          <br>bbtype: ${metaData.bbtype}
          <br>wfreq: ${metaData.wfreq}`;




    } 

     





    

//     var trace1 = {
//         x: otu_ids,
//         y: sampleValues,
        
//         name: "Greek",
//         type: "bar",
//         orientation:'h'
//       };  
// //       var stock = data.dataset.dataset_code;
// //       var startDate = data.dataset.start_date;
// //       var endDate = data.dataset.end_date;
// //       var dates = unpack(data.dataset.data, 0);
// //       var closingPrices = unpack(data.dataset.data, 4);
  
// //       var trace1 = {
// //         type: "scatter",
// //         mode: "lines",
// //         name: name,
// //         x: dates,
// //         y: closingPrices,
// //         line: {
// //           color: "#17BECF"
// //         }
// //       };
  
//        var data = [trace1];
  
//     //    var layout = {
//     //      //title: `${stock} closing prices`,
//     //      xaxis: {
//     //        range: [startDate, endDate],
//     //        type: "date"
//     //      },
//     //      yaxis: {
//     //        autorange: true,
//     //        type: "linear"
//     //      }
//     //    };
  
//        Plotly.newPlot("plot", data);
  
      });
   }
  
    buildPlot();
  