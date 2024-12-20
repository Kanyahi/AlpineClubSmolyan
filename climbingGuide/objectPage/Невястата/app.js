function nevyastataOBJ() {
    let csvLink = {
        turluka: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=0&single=true&output=csv",
        west: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=80427486&single=true&output=csv",
        south: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=1960000330&single=true&output=csv"
    }

  fetch(csvLink.turluka)
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
        finalList[eventRow.shift()] = eventRow;
      }
        
    });
}
nevyastataOBJ();