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

      const headPageDiv = document.getElementById("headPage");
      const addToSection = document.getElementById("visibleInfo");

      for (let [key, array] of Object.entries(finalList)) {
        const colorList = {
          "Изпълнено": "#16e329",
          "Планувано": "#ecec10",
          "Отменено": "#ce0707",
          "Организиране": "#0fa8f5",
          "Отложено": "#eb9b05",
          "Няма места": "#fd6161",
        };

        const reg = /[А-Яа-я\s]+/gm;
        let chechEventStatus = array[0].match(reg).join().trim();

        const color = colorList[chechEventStatus];

        let status =
          `<button onclick="showOrHide(${key})" class="buttonEventStyle">${key}. ${array[5]}
            <button class="buttonEventStyleSub" style="background-color:${color}">${array[0]}</button>
            </button>` +
          `
        <section id="${key}sub" style="display: none">
        <div id="status">
        <p id="headerStyle">${header[1]} ⇒ ${array[1]}</p>
        <p id="headerStyle">${header[2]} ⇒ ${array[2]}</p>
        </div>
        <div id="status">
        <p id="headerStyle">${header[3]} ⇙</p><p id="pStyle">${array[3]}</p>
        </div>
        <div id="status">
        <p id="headerStyle">${header[4]} ⇙</p><p id="pStyle">${array[4]}</p>
        </div>
        <div id="status">
        <p id="headerStyle">${header[5]} ⇙</p>\n<p id="pStyle">${array[5]}</p>
        </div>
        <div id="status">
        <p id="headerStyle">${header[6]} ⇙</p>\n<p id="pStyle">${array[6]}</p>
        </div>
        <div id="status">
        <p id="headerStyle">${header[7]} ⇙</p>\n<p id="pStyle">${array[7]}</p>
        </div>
        <div id="status">
        <p id="headerStyle">${header[8]} ⇒ ${array[8]}</p> 
        </div> 
        </section>
        `;
        addToSection.innerHTML += status;
      }
    })
    .catch((error) => console.error("Error fetching the data:", error));
}

function showOrHide(value) {
  const sectionID = `${value}sub`;
  const thisSection = document.getElementById(sectionID).style.display;

  if (thisSection === "none") {
    document.getElementById(sectionID).style.display = "block";
  } else {
    document.getElementById(sectionID).style.display = "none";
  }
}
fetchData();
