// // Needs to belong in the templates folder because we're loading it as a template
// //  to use Jinja syntax. A little gross.

$(function() { 

  // get the data and temporarily dump it
  $SCRIPT_ROOT = {{ request.script_root|tojson|safe }};

    $(function() {
        $SCRIPT_ROOT = {{ request.script_root|tojson|safe }};
        $.getJSON($SCRIPT_ROOT+"/get_data",
            function(data) {
                $("#data").text(JSON.stringify(data));
            });
    });

  google.charts.load('current', {'packages':['corechart','calendar', 'timeline', 'scatter']});

  google.charts.setOnLoadCallback(drawCalendarChart);
  google.charts.setOnLoadCallback(drawLineChart);
  google.charts.setOnLoadCallback(drawMoodChart);
  google.charts.setOnLoadCallback(drawFoodChart);

  function drawLineChart() {
    var data = google.visualization.arrayToDataTable([
      ['Day', 'Mood', 'Diet'],
      ['Su',  08,      40],
      ['M',  50,      90],
      ['T',  50,      90],
      ['W',  60,       70],
      ['Th',  63,      60],
      ['F',  90,      70],
      ['Sa',  100,      30]
    ]);

    var options = {
      title: 'Mood and Diet',
      curveType: 'function',
      legend: { position: 'bottom' },
      colors:['#9999ff','#ffb366']
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

  function drawCalendarChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });

    //september cal
    for (i = 0; i < 31; i++) { 
      var random_int = Math.floor(Math.random() * 9);
      dataTable.addRows([[new Date(2016, 8, i+1), random_int]]);
    };

    //october cal
    for (i = 0; i < 31; i++) { 
      var random_int = Math.floor(Math.random() * 9);
      dataTable.addRows([[new Date(2016, 9, i+1), random_int]]);
    };

    //november cal
    for (i = 0; i < 30; i++) { 
      var random_int = Math.floor(Math.random() * 9);
      dataTable.addRows([[new Date(2016, 10, i+1), random_int]]);
    };

    var calendarChart = new google.visualization.Calendar(document.getElementById('calendar_chart_div'));

    var options = {
      title: "Your Bracelet Use"
    };

    function resizeChart () {
      calendarChart.draw(dataTable, options);
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

      calendarChart.draw(dataTable, options);
    } // close draw calendar

  function drawMoodChart() {

    var data = google.visualization.arrayToDataTable([
      ['Mood', 'Number of Times Recorded'],
      ['Happy', 11],
      ['Sad',  2],
      ['Anxious',  2],
      ['Angry', 2],
      ['Frustrated', 7]
    ]);

    var options = {
      title: 'Your Daily Mood',
      pieHole: 0.4,
    };

    var moodChart = new google.visualization.PieChart(document.getElementById('mood_chart_div'));
    moodChart.draw(data, options);

  } // close mood

  function drawFoodChart () {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Hours Studied');
    data.addColumn('number', 'Final');

    data.addRows([
      [0, 67], [1, 88], [2, 77],
      [3, 93], [4, 85], [5, 91],
      [6, 71], [7, 78], [8, 93],
      [9, 80], [10, 82],[0, 75],
      [5, 80], [3, 90], [1, 72],
      [5, 75], [6, 68], [7, 98],
      [3, 82], [9, 94], [2, 79],
      [2, 95], [2, 86], [3, 67],
      [4, 60], [2, 80], [6, 92],
      [2, 81], [8, 79], [9, 83],
      [3, 75], [1, 80], [3, 71],
      [3, 89], [4, 92], [5, 85],
      [6, 92], [7, 78], [6, 95],
      [3, 81], [0, 64], [4, 85],
      [2, 83], [3, 96], [4, 77],
      [5, 89], [4, 89], [7, 84],
      [4, 92], [9, 98]
    ]);

    var options = {
      width: 800,
      height: 500,
      chart: {
        title: 'Students\' Final Grades',
        subtitle: 'based on hours studied'
      },
      hAxis: {title: 'Hours Studied'},
      vAxis: {title: 'Grade'}
    };

    var chart = new google.charts.Scatter(document.getElementById('food_chart_div'));

    chart.draw(data, google.charts.Scatter.convertOptions(options));
  }


});