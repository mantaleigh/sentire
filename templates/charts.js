// charts.js
// --- Render the charts on the #graphs page


// Needs to belong in the templates folder because we're loading it as a template
//  to use Jinja syntax. A little gross.

$SCRIPT_ROOT = {{ request.script_root|tojson|safe }};

// get the data using the /get_data endpoint, use the callback to render the graphs
$(function() {
  $SCRIPT_ROOT = {{ request.script_root|tojson|safe }};
  $.getJSON($SCRIPT_ROOT+"/get_data",
    function(bracelet_data) {
      $("#data").text(JSON.stringify(bracelet_data));

      google.charts.load('current', {'packages':['corechart', 'timeline', 'scatter']});

      google.charts.setOnLoadCallback(drawLineChart);
      google.charts.setOnLoadCallback(drawTimelineChart);
      google.charts.setOnLoadCallback(drawScatterChart);
      google.charts.setOnLoadCallback(drawMoodsChart);

      function drawLineChart() {
        var data = new google.visualization.DataTable();

        data.addColumn('timeofday', 'Time');
        data.addColumn('number', 'Light');
        data.addColumn('number', 'Temperature');
        data.addColumn('number', 'Noise');
        data.addRows([
              [[9, 0, 0], 130 , 72, 100],  
              [[10, 0, 0], 134 , 73, 112],   
              [[11, 0, 0], 111 , 71, 130],
              [[12, 0, 0], 103 , 71, 158]
        ]);

        // The following commented out code is close to what it would take to 
        // get the sensor info in data into the line graph appropriately.
        // ... There's a minor bug or two

        // var data_rows = []
        // for (var n = 0; n <= 10; n++) { 
        //   var inner_row = []

        //   var reg = /..:..:../g;

        //   if (bracelet_data["light_data"]["timestamps"].length > 0) {

        //     var time_str = reg.exec(bracelet_data["light_data"]["timestamps"][n]);
        //     time = time_str.split(":");
        //     for (var i = 0; i < time.length; i ++) { 
        //       time[i] = parseInt(time[i]);
        //     }

        //     inner_row.push(time);

        //     inner_row.push(bracelet_data["light_data"]["values"][n]);
        //     inner_row.push(bracelet_data["temp_data"]["values"][n]);
        //     inner_row.push(bracelet_data["sound_data"]["values"][n]);

        //     data_rows.push(inner_row);

        //   }

        // }
        // data.addRows(data_rows);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' },
          colors:['#9999ff','#ffb366','#94b8b8'],
          vAxis: {
            baselineColor: 'none',
            ticks: []
          }
        };

        var lineChart = new google.visualization.LineChart(document.getElementById('line_chart_div'));

        function resizeChart () {
          lineChart.draw(data, options);
        }
        if (document.addEventListener) {
            window.addEventListener('resize', resizeChart);
        }
        else if (document.attachEvent) {
            window.attachEvent('onresize', resizeChart);
        }
        else {
            window.resize = resizeChart;
        }

        lineChart.draw(data, options);
      } // close line chart

      function drawMoodsChart() {

        var data = google.visualization.arrayToDataTable([
          ['Mood', 'Number of Times Recorded'],
          ['Happy', 11],
          ['Sad',  1],
          ['Anxious',  2],
          ['Angry', 2],
          ['Frustrated', 7]
        ]);

        var options = {
          title: 'Your Daily Mood',
          pieHole: 0.1,
          height: 175
        };

        var moodChart = new google.visualization.PieChart(document.getElementById('mood_chart_div'));

        function resizeChart () {
          moodChart.draw(data, options);
        }
        if (document.addEventListener) {
            window.addEventListener('resize', resizeChart);
        }
        else if (document.attachEvent) {
            window.attachEvent('onresize', resizeChart);
        }
        else {
            window.resize = resizeChart;
        }

        moodChart.draw(data, options);
      } // close mood


      function drawScatterChart () {

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Day');
        data.addColumn('timeofday', 'Water');
        data.addColumn('timeofday', 'Food');

        data.addRows([
              [1, [9, 0, 0], [8, 30, 45]],  [1, [9, 0, 0], [10, 0, 0, 0]],   [2, [10, 0, 0, 0], [13, 45, 0]],
              [3, [12, 59, 0], [10, 45, 0, 0]]
        ]);

        var options = {
          width: 320,
          height: 500,
          hAxis: {title: 'Day'},
          vAxis: {title: 'Time'}
        };

        var chart = new google.charts.Scatter(document.getElementById('scatter_chart_div'));

        function resizeChart () {
          chart.draw(data, options);
        }
        if (document.addEventListener) {
            window.addEventListener('resize', resizeChart);
        }
        else if (document.attachEvent) {
            window.attachEvent('onresize', resizeChart);
        }
        else {
            window.resize = resizeChart;
        }

        chart.draw(data, google.charts.Scatter.convertOptions(options));
      }

      function drawTimelineChart() {
        var container = document.getElementById('timeline_chart_div');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Day' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([
          [ 'Day 1', new Date(0,0,0,22,0,0),  new Date(0,0,1,6,30,0)],
          [ 'Day 2', new Date(0,0,0,22,47,0),  new Date(0,0,1,7,0,0)],
          [ 'Day 3', new Date(0,0,0,21,55,0), new Date(0,0,1,5,53,0) ]]);

        function resizeChart () {
          chart.draw(data);
        }
        if (document.addEventListener) {
            window.addEventListener('resize', resizeChart);
        }
        else if (document.attachEvent) {
            window.attachEvent('onresize', resizeChart);
        }
        else {
            window.resize = resizeChart;
        }

        chart.draw(dataTable);
      }
    });
});