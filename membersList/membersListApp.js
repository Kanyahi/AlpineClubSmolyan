function getMemberList() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUnlKvYhZHa7kgtL_apTIMAzlZ6BoNUqb6bXDJY1Z4LWgyPD-4AIUK7naRsqT8wwJLXiJyN9_acVZn/pub?gid=0&single=true&output=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      const arrayFromInput = csvText.split("\n");
      const header = arrayFromInput.shift().split(",");

      const finalList = {};

      for (let row = 0; row < arrayFromInput.length; row++) {

        let eventRow = arrayFromInput[row].split(",");

        eventRow.shift();

        finalList[row + 1] = eventRow;
      }
      debugger;
    });
}
getMemberList();
