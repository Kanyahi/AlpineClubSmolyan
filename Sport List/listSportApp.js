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
        let status = document.createElement("p");
        addToSection.innerHTML = `<p>${header[6]}</p>`;
        addToSection.innerHTML += `<p id="${key}">${array[6]}</p>`;
        status.textContent = array[0];
        divForBtnEvent.append(status);
        buttonCreate.textContent = key + ". " + array[5];
        divForBtnEvent.append(buttonCreate);
      }
    })
    .catch((error) => console.error("Error fetching the data:", error));
}
fetchData();
