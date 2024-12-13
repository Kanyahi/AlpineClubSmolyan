function eventProjectFetchData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vScepK9sTQsZs4mV73NZF1StMlDYIOXpAcHH5UuwKVESIP49uThc8PL9ACznZHIQrY2BxfTzqh06gWY/pub?gid=0&single=true&output=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      const arrayFromInput = csvText.split("\n").reverse();
      arrayFromInput.pop();
      let sortedArrayEvent = [];

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
        sortedArrayEvent.push(eventRow);
      }
      const boxToAddInfo = document.getElementById("timelineBox");
      let currentYear = '';
      let countevent = 1;

      for (let check of sortedArrayEvent) {
        if (currentYear === check[0]) {
          countevent++;
          boxToAddInfo.innerHTML += `<div class="entry">
    <div class="title">
      <p>№ ${countevent}</p>
    </div>
    <div class="body">
      <p>Описание:</p>
              <p>${check[1]}</p>
              <p>Участници:</p>
              <p>${check[2]}</p>
              <p>Работни дни:</p>
              <p>${check[3]}</p>
    </div>
  </div>`;
        } else {
          currentYear = check[0];
          countevent = 1;
          boxToAddInfo.innerHTML += `<div class="entry">
            <div class="title">
            <h3>${currentYear} година</h3>
              <p>№ ${countevent}</p>
            </div>
            <div class="body">
              <p>Описание:</p>
              <p>${check[1]}</p>
              <p>Участници:</p>
              <p>${check[2]}</p>
              <p>Работни дни:</p>
              <p>${check[3]}</p>
            </div>
          </div>`;
        }
      }
    });
}
eventProjectFetchData();
