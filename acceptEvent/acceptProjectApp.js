function eventProjectFetchData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vScepK9sTQsZs4mV73NZF1StMlDYIOXpAcHH5UuwKVESIP49uThc8PL9ACznZHIQrY2BxfTzqh06gWY/pub?gid=0&single=true&output=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      const arrayFromInput = csvText.split("\n").reverse();
      arrayFromInput.pop();
      const finalList = {};

      for (let row = 0; row < arrayFromInput.length; row++) {
        let cutSpace = arrayFromInput[row].trim();
        let quotationMarks = cutSpace.match(/"([^"]*)"/gm);

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

        let year = eventRow.shift();
        let sizeFinalList = Object.keys(finalList).length;

        if (sizeFinalList !== 0) {
          console.log("yes");
        } else {
            
        }
      }
    });
}
eventProjectFetchData();
