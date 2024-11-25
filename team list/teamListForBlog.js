<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='/AlpineClub/teamListPrint/teamStyle.css' rel='stylesheet'/>

</head>
<body>

    <div id="tableBox">
    <table id="csvTable" border="3">
        <thead>
            <tr>
                <th>№</th>
                <th>Име и Фамилия</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
    <script>
        // URL of the CSV API
        const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRUnlKvYhZHa7kgtL_apTIMAzlZ6BoNUqb6bXDJY1Z4LWgyPD-4AIUK7naRsqT8wwJLXiJyN9_acVZn/pub?gid=0&single=true&output=csv';

        // Fetch the CSV data
        fetch(csvUrl)
            .then(response => response.text())
            .then(csvText => {
                // Parse the CSV data using PapaParse
                Papa.parse(csvText, {
                    header: true,  // If the first row contains column headers
                    complete: function(results) {
                        const data = results.data;
                        const tableBody = document.querySelector("#csvTable tbody");

                        // Loop through the data and create table rows
                        data.forEach(row => {
                            const tr = document.createElement('tr');
                            Object.values(row).forEach(cell => {
                                const td = document.createElement('td');
                                td.textContent = cell;
                                tr.appendChild(td);
                            });
                            tableBody.appendChild(tr);
                        });
                    }
                });
            })
            .catch(error => console.error('Error fetching the CSV data:', error));
    </script>
<style>
    #tableBox {
    position: relative;
      left: 20%;
}

table {
    font-size: 18px;
    width: 400px;
      border-color: blue;

}

#csvTable th {
    background-color: #05afa1;
    color: aliceblue;
    text-align: center;
}

#csvTable td {
    text-align: center;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif

}
  
  @media only screen and (max-width: 485px) {
  #tableBox {
    position: relative;
    left: 5%;
}

table {
    font-size: 18px;
    width: 300px;
      border-color: blue;

}

#csvTable th {
    background-color: #05afa1;
    color: aliceblue;
    text-align: center;
}

#csvTable td {
    text-align: center;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif

}
  }
</style>
</body>
</html>
