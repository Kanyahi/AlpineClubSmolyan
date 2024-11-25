// Fetch the CSV data
function fetchData() {
    fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vToaWgFh8hBVhDX0SMkym1JTs969uROK_gNPRlnQkHmOLdRszelbnFIH6v8rNKqbMZ_0vZQPT5_AqIN/pub?gid=445090768&single=true&output=csv"
    )
        .then((response) => response.text())
        .then((csvText) => {
            let arrayFromInput = csvText.split('\n');
            let header = arrayFromInput.shift().split(',');
            let countEvent = 0
            let rowSort = {};

            for (let row of arrayFromInput) {
                countEvent++;
                rowSort[countEvent] = {};
                let quotationMarks = row.match(/"([^"]*)"/gm);
                let reduceWithComma = row.replace(/"([^"]*)"/gm, "").split(',').filter((el) => el.length > 0);
                console.table(quotationMarks);
                console.table(reduceWithComma);

                if (quotationMarks.length < 3) {
                    rowSort[countEvent]['status'] = reduceWithComma[0];
                    rowSort[countEvent]['fromDate'] = reduceWithComma[1];
                    rowSort[countEvent]['toDate'] = reduceWithComma[2];
                    rowSort[countEvent]['description'] = reduceWithComma[3];
                    rowSort[countEvent]['typeOfActivity'] = reduceWithComma[4];
                    rowSort[countEvent]['difficulty'] = reduceWithComma[5];
                    rowSort[countEvent]['numberOfParticipants'] = reduceWithComma[6].match(/\d+/gm).join();
                    rowSort[countEvent]['organizers'] = quotationMarks[0];
                    rowSort[countEvent]['participants'] = quotationMarks[1];
                } else {
                    rowSort[countEvent]['status'] = reduceWithComma[0];
                    rowSort[countEvent]['fromDate'] = reduceWithComma[1];
                    rowSort[countEvent]['toDate'] = reduceWithComma[2];
                    rowSort[countEvent]['description'] = quotationMarks[0];
                    rowSort[countEvent]['typeOfActivity'] = reduceWithComma[3];
                    rowSort[countEvent]['difficulty'] = reduceWithComma[4];
                    rowSort[countEvent]['numberOfParticipants'] = reduceWithComma[5].match(/\d+/gm).join();
                    rowSort[countEvent]['organizers'] = quotationMarks[1];
                    rowSort[countEvent]['participants'] = reduceWithComma[2];
                }
                debugger
            }
        })
        .catch((error) => console.error("Error fetching the CSV data:", error));
}
fetchData();
