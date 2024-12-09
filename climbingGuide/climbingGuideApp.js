function getGuide() {
    fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=0&single=true&output=csv"
    )
        .then((response) => response.text())
        .then((csvText) => {
            const arrayFromInput = csvText.split("\n");
            const header = arrayFromInput.shift().split(",");
            const finalList = {};

            for (let row = 0; row < arrayFromInput.length; row++) {
                let quotationMarks = arrayFromInput[row].match(/"([^"]*)"/gm);

                let eventRow = arrayFromInput[row]
                    .replace(/"([^"]*)"/gm, "")
                    .split(",");

                while (true) {
                    const indexEmpty = eventRow.indexOf("");
                    if (quotationMarks === null) break;
                    if (indexEmpty !== -1 && quotationMarks.length !== 0) {
                        eventRow.splice(indexEmpty, 1, quotationMarks.shift());
                    } else {
                        break;
                    }
                }
                finalList[row + 1] = eventRow;
            }
        });

}
getGuide();
