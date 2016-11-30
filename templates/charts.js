// Needs to belong in the templates folder because we're loading it as a template
//  to use Jinja syntax. A little gross.


// get the data and temporarily dump it
$SCRIPT_ROOT = {{ request.script_root|tojson|safe }};

  $(function() {
      $SCRIPT_ROOT = {{ request.script_root|tojson|safe }};
      $.getJSON($SCRIPT_ROOT+"/get_data",
          function(data) {
              $("#data").text(JSON.stringify(data));
          });
  });

google.charts.load('current', {'packages':['corechart','calendar']});

google.charts.setOnLoadCallback(drawCalendarChart);
google.charts.setOnLoadCallback(drawLineChart);

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
}

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
    title: "Your Bracelet Use",
    height: 350,
  };

  function resizeChart () {
    calendarChart.draw(data, options);
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
  }
