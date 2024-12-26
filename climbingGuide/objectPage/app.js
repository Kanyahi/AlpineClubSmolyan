function nevyastataOBJ() {
  let sectors = {
    Турлука: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=0&single=true&output=csv",
    Юг: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=1960000330&single=true&output=csv",
    Запад: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWACRhhHBPoN8V2Tklw2MNjgGg9cQRWN0cTxb9ZukVfpNjnmAJoA1BdI7VLuVKpOaHPlL_qYutqwcC/pub?gid=80427486&single=true&output=csv",
  }

  for (let [name, link] of Object.entries(sectors)) {

    fetch(link)
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

        let printHeaderIsTrue = false;

        const boxToAddTable = document.getElementById('boxToAdd');
        const boxToAddButton = document.getElementById('btnShow');
        const boxToAddCloseBtn = document.getElementById('closeBtnSection');

        for (let [number, info] of Object.entries(finalList)) {
          let routeName = info.shift();
          let lengthRoute = info.shift();
          let typeRoute = info.shift();
          let routeRopes = info.shift();
          let gradeUIAA = info.shift();
          let gradeFR = info.shift();
          let prospectRoute = info.shift();
          let equipment = info.shift();
          let creatorRoute = info.shift();
          let notes = info.shift();
          let photoOfRoute = info.shift();

          if (!printHeaderIsTrue) {

            boxToAddButton.innerHTML += `
            <div class="container">
    <div class="card">
      <div class="contentBx">
        <h2>сектор ${name}</h2>
        <div class="size">
          <h3>Маршрути: ${arrayFromInput.length}</h3>
        </div>
        <a href="#closeBtnSection" onclick="showOrNot('${name}')">Отвори</a>
      </div>
    </div>
  </div>
            `;

            boxToAddCloseBtn.innerHTML = `<button href="#" id="closeSector" onclick="checkShow()">❌ затвори сектора</button>`;

            boxToAddTable.innerHTML += `
            <div id="${name}box" style="display: none">
        <table>
        <thead>
  <tr>
    <th>сектор ${name}</th>
  </tr>
</thead>
      <thead>
        <tr>
          <th>№</th>
          <th>Маршрут</th>
          <th>Въжета</th>
          <th>Дължина</th>
          <th>Вид</th>
          <th>Категория<br>UIAA / FR</th>
          <th>Прочети ⇙</th>
        </tr>
      </thead>
      <tbody id="${name}add">
        <tr>
          <td data-title='№'>${number}</td>
          <td data-title='Маршрут'>${routeName}</td>
          <td data-title='Въжета'>${routeRopes}</td>
          <td data-title='Дължина'>${lengthRoute} метра</td>
          <td data-title='Вид'>${typeRoute}</td>
          <td data-title='Категория'>${gradeUIAA} / ${gradeFR}</td>
          <td class='select'><a class='button' onclick="more('${routeName}')">Още</a></td>
        </tr>
      </tbody>
    </table>
    <div id="${routeName}" class='detail'>
      <div class='detail-container'>
        <dl>
          <dt>Изложение</dt>
          <dd>${prospectRoute}</dd>
          <dt>Инвентар</dt>
          <dd>${equipment}</dd>
          <dt>Бележка</dt>
          <dd>${notes}</dd>
          <dt>Снимки</dt>
          <dd>
            <img src=${photoOfRoute}/>
          </dd>
          <dt>Автор:</dt>
          <dd>
            ${creatorRoute}
          </dd>
        </dl>
      </div>
      <div class='detail-nav'>
        <button class='close' onclick="more('${routeName}')">
          Затвори
        </button>
      </div>
    </div>
    </div>
        `
            printHeaderIsTrue = true;
          } else {
            let addRow = document.getElementById(`${name}add`);

            addRow.innerHTML += `
          <tr>
          <td data-title='№'>${number}</td>
          <td data-title='Маршрут'>${routeName}</td>
          <td data-title='Въжета'>${routeRopes}</td>
          <td data-title='Дължина'>${lengthRoute} метра</td>
          <td data-title='Вид'>${typeRoute}</td>
          <td data-title='Категория'>${gradeUIAA} / ${gradeFR}</td>
          <td class='select'><a class='button' onclick="more('${routeName}')">Още</a></td>
        </tr>
          `
            boxToAddTable.innerHTML += `
    <div id="${routeName}" class='detail'>
      <div class='detail-container'>
        <dl>
          <dt>Изложение</dt>
          <dd>${prospectRoute}</dd>
          <dt>Инвентар</dt>
          <dd>${equipment}</dd>
          <dt>Бележка</dt>
          <dd>${notes}</dd>
          <dt>Снимки</dt>
          <dd>
            <img src="${photoOfRoute}"/>
          </dd>
          <dt>Автор:</dt>
          <dd>
            ${creatorRoute}
          </dd>
        </dl>
      </div>
      <div class='detail-nav'>
        <button class='close' onclick="more('${routeName}')">
          Затвори
        </button>
      </div>
    </div>
          `
          }
        }
      });
  }
}
nevyastataOBJ();

function showOrNot(value) {
  const sectionID = `${value}box`;

  document.getElementById('closeSector').style.display = 'block';

  document.getElementById(sectionID).style.display = "block";

  document.getElementById('btnShow').style.display = 'none';
}

function checkShow() {
  let section1 = document.getElementById('Турлукаbox');
  let section2 = document.getElementById('Югbox');
  let section3 = document.getElementById('Западbox');
  let closeBtn = document.getElementById('closeSector');

  section1.style.display = 'none';
  section2.style.display = 'none';
  section3.style.display = 'none';
  closeBtn.style.display = 'none';
  
  document.getElementById('btnShow').style.display = 'block';
}

function more(value) {
  let itemID = document.getElementById(value);
  if (itemID.classList.contains("open")) {
    itemID.classList.remove("open");
  } else {
    itemID.classList.add("open");
  }
};