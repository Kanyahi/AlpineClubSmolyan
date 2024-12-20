function createClimbingObject() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRjssefTJBXbLFPn3xgkScJgxwkhu2f71xtgNzBzKFUdWmQS8OXuzNNEPJUJFuKsxOj4a8LMFeD0vFZ/pub?gid=653308890&single=true&output=csv"
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

      const addDivSection = document.getElementById("addInfo");

      for (let [number, info] of Object.entries(finalList)) {
        const objectName = info.shift();
        const sectorNumber = info.shift();
        const routesCount = info.shift();
        const linkForBtn = info.shift();
        const minGrade = info.shift();
        const maxGrade = info.shift();
        const listSector = info.splice(0, sectorNumber);
        const functionActivate = info.pop();

        let sectorOrsectors = sectorNumber > 1 ? 'Сектора' : 'Сектор';
        let routeOrRoutes = routesCount > 1 ? 'Маршрута' : 'Маршрут';

        addDivSection.innerHTML += `
<div class="wrapper">
    <div class="clash-card barbarian">
        <div class="clash-card__image clash-card__image--barbarian">
    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2ukCxiGXEVhZ16x-GwxtvCu10pFAlIj67dDnaX8nKhK9U61ghTYAs9xHGo6sTqr8O5GCzzTGGoGBNHuW0vhmtfKzYYkJX2471zW5j13Ih7z9LvXsZuQ0Zasg_hfqyUhEkvc1YSYpY5kcMMR_v79Ib9lWzZxL6agHqQcKNLsPPX86bAsr4yMCw-_IwUZA/s778/hristo-hristov-transparent.png" alt="barbarian" />
        </div>
  <div class="clash-card__level clash-card__level--barbarian">👆👆👆</div>
  <div class="clash-card__unit-name">Обект ${objectName}</div>
  <div class="clash-card__unit-description" id="${number}">
    <h7 class="h7">Сектори</h7>
  </div>
  <a href="${linkForBtn}"><button class="btnOpen">към Обекта</button></a>
  <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
    <div class="one-third">
      <div class="stat">${sectorNumber}</div>
      <div class="stat-value">${sectorOrsectors}</div>  
    </div>

    <div class="one-third">
      <div class="stat">${routesCount}</div>
      <div class="stat-value">${routeOrRoutes}</div>
    </div>

    <div class="one-third no-border">
      <div class="stat">${minGrade} ⇒ ${maxGrade}</div>
      <div class="stat-value">категории</div>
    </div>

        </div>
    </div>
</div>
`;

        for (let x = 0; x < listSector.length; x++) {
          let addClimbingSection = document.getElementById(number);
          addClimbingSection.innerHTML += `
          <li>${listSector[x]}</li>`;
        }
      }
    });
}
createClimbingObject();
