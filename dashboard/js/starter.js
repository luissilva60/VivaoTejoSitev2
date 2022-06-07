$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/utilizador/count",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);

                var labels = result.map(function(e){
                    return e.roles_name;
                });
                var data = result.map(function(e){
                    return e.count;
                });


                console.log(labels);
                console.log(data);

                
                var pieChartCanvas = $('#pieChartUser').get(0).getContext('2d')
                var pieData        = {
                    labels: labels,
                    datasets: [
                    {
                        data: data,
                        backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef'],
                    }
                    ]
                }
                var pieOptions     = {
                    maintainAspectRatio : false,
                    responsive : true,
                }

                new Chart(pieChartCanvas, {
                    type: 'pie',
                    data: pieData,
                    options: pieOptions
                })
            }

        });
    }

);

$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais/boat/count",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);

                var labels = result.map(function(e){
                    return e.cais_name;
                });
                var data = result.map(function(e){
                    return e.count;
                });


                console.log(labels);
                console.log(data);

                
                var pieChartCanvas = $('#pieChartCais').get(0).getContext('2d')
                var pieData        = {
                    labels: labels,
                    datasets: [
                    {
                        data: data,
                        backgroundColor : ['#00c0ef', '#f39c12'],
                    }
                    ]
                }
                var pieOptions     = {
                    maintainAspectRatio : false,
                    responsive : true,
                }

                new Chart(pieChartCanvas, {
                    type: 'pie',
                    data: pieData,
                    options: pieOptions
                })
            }

        });
    }

);

$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos/count",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);

                var data = result.map(function(e){
                    return e.count;
                });

                var barChartCanvas = $('#barChartArtigos').get(0).getContext('2d')
                var barChartData = {
                labels  : ['Quantidade de Artigos'],
                datasets: [
                  {
                    label               : 'Notícias',
                    backgroundColor     : 'rgba(60,141,188,0.9)',
                    borderColor         : 'rgba(60,141,188,0.8)',
                    pointRadius          : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(60,141,188,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data                : data
                  },
                ]
              }

              var barChartOptions = {
                responsive              : true,
                maintainAspectRatio     : false,
                datasetFill             : false
              }

              new Chart(barChartCanvas, {
                type: 'bar',
                data: barChartData,
                options: barChartOptions
              })
                
            }

        });
    }

);

$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos/count/by/state",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);

                var labels = result.map(function(e){
                    return e.state_event;
                });
                var data = result.map(function(e){
                    return e.count;
                });


                console.log(labels);
                console.log(data);

                
                var pieChartCanvas = $('#pieChartEventos').get(0).getContext('2d')
                var pieData        = {
                    labels: labels,
                    datasets: [
                    {
                        data: data,
                        backgroundColor : ['#00c0ef', '#f39c12'],
                    }
                    ]
                }
                var pieOptions     = {
                    maintainAspectRatio : false,
                    responsive : true,
                }

                new Chart(pieChartCanvas, {
                    type: 'pie',
                    data: pieData,
                    options: pieOptions
                })
            }

        });
    }

);



