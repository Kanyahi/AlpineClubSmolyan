function fetchData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vToaWgFh8hBVhDX0SMkym1JTs969uROK_gNPRlnQkHmOLdRszelbnFIH6v8rNKqbMZ_0vZQPT5_AqIN/pub?gid=445090768&single=true&output=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      let arrayFromInput = csvText.split("\n");
      let header = arrayFromInput.shift().split(",");

      let finalList = {};

      for (let row = 0; row < arrayFromInput.length; row++) {
        let quotationMarks = arrayFromInput[row].match(/"([^"]*)"/gm);

        let eventRow = arrayFromInput[row]
          .replace(/"([^"]*)"/gm, "")
          .split(",");

        while (true) {
          let indexEmpty = eventRow.indexOf("");
          if (quotationMarks === null) break;
          if (indexEmpty !== -1 && quotationMarks.length !== 0) {
            eventRow.splice(indexEmpty, 1, quotationMarks.shift());
          } else {
            break;
          }
        }
        finalList[row + 1] = eventRow;
      }

      const divForBtnEvent = document.getElementById("buttonsForEvent");
      const addToSection = document.getElementById("visibleInfo");

      for (let [key, array] of Object.entries(finalList)) {
        let buttonCreate = document.createElement("button");
  
        let status = `
        <section id="${key}"hidden>
        <title>dfgfdgfdgfdggdf</title>
        <p>${header[0]} ⇒ ${array[0]}</p>
        <p>${header[1]} ⇒ ${array[1]}</p>
        <p>${header[2]} ⇒ ${array[2]}</p>
        <p>${header[3]} ⇒ ${array[3]}</p>
        <p>${header[4]} ⇒ ${array[4]}</p>
        <p>${header[5]}</p>\n<p>${array[5]}</p>
        <p>${header[6]}</p>\n<p>${array[6]}</p>
        <p>${header[7]}</p>\n<p>${array[7]}</p>
        <p>${header[8]} ⇒ ${array[8]}</p>        
        </section>
        `;
addToSection.innerHTML += status;
      }
    })
    .catch((error) => console.error("Error fetching the data:", error));
}
fetchData();
