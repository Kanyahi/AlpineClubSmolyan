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

            const addToSection = document.getElementById("visibleInfo");
            const eventMenuAddBtn = document.getElementById("menuEvents");

            for (let [key, array] of Object.entries(finalList)) {

                let status = `
          <section id="${key}" hidden>
          <div id="status">
          <h2>${key}</h2>
          </div>
          <div id="status">
          <p id="headerStyle">${header[0]} ⇙</p><p>${array[0]}</p>
          </div>
          <div id="status">
          <p id="headerStyle">${header[1]} ⇒ ${array[1]}</p>
          <p id="headerStyle">${header[2]} ⇒ ${array[2]}</p>
          </div>
          <div id="status">
          <p id="headerStyle">${header[3]} ⇙</p><p>${array[3]}</p>
          </div>
          <div id="status">
          <p id="headerStyle">${header[4]} ⇙</p><p>${array[4]}</p>
          </div>
          <div id="status">
          <p id="headerStyle">${header[5]} ⇙</p>\n<p>${array[5]}</p>
          </div>
          <div id="status">
          <p id="headerStyle">${header[6]} ⇙</p>\n<p>${array[6]}</p>
          </div>
          <div id="status">
          <p id="headerStyle">${header[7]} ⇙</p>\n<p>${array[7]}</p>
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

    function showOrHide() {

    }
}
fetchData();
