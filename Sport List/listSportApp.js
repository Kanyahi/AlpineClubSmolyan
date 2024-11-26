// Fetch the CSV data
function fetchData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vToaWgFh8hBVhDX0SMkym1JTs969uROK_gNPRlnQkHmOLdRszelbnFIH6v8rNKqbMZ_0vZQPT5_AqIN/pub?gid=445090768&single=true&output=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      let arrayFromInput = csvText.split("\n");
      let headerRow = {};
      let header = arrayFromInput.shift().split(",");


      for (let row = 0; row < arrayFromInput.length; row++) {

        let quotationMarks = arrayFromInput[row].match(/"([^"]*)"/gm);
        let reduceWithComma = arrayFromInput[row]
          .replace(/"([^"]*)"/gm, "")
          .split(",");
        console.log("quotationMarks");
        console.table(quotationMarks);
        console.log("reduceWithComma");
        console.table(reduceWithComma);
      }
    })
    .catch((error) => console.error("Error fetching the data:", error));
}
fetchData();
