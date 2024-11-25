// Fetch the CSV data
function fetchData() {
    fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vToaWgFh8hBVhDX0SMkym1JTs969uROK_gNPRlnQkHmOLdRszelbnFIH6v8rNKqbMZ_0vZQPT5_AqIN/pub?gid=445090768&single=true&output=csv"
    )
        .then((response) => response.text())
        .then((csvText) => {
            let arrayFromInput = csvText.split('\n');
            let header = arrayFromInput.shift().split(',');

            for (let row of arrayFromInput) {
                let column = row.split(',');
                let status = column.shift();
                let fromDate = column.shift();
                let toDate = column.shift();
                let description = column.shift();
                let typeOfActivity = column.shift();
                let difficulty = column.shift();
                let numberOfParticipants = column.pop()

                let names = column.join().split('"').filter((name) => name.length > 2);
                let organizers = names[0];
                let participants = names[1];

                console.log(status);
                console.log(fromDate);
                console.log(toDate);
                console.log(description);
                console.log(typeOfActivity);
                console.log(difficulty);
                console.log(organizers);
                console.log(participants);
                console.log(numberOfParticipants);
            }
        })
        .catch((error) => console.error("Error fetching the CSV data:", error));
}
fetchData();
