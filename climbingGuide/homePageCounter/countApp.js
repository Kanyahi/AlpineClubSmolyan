function createCounter() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRjssefTJBXbLFPn3xgkScJgxwkhu2f71xtgNzBzKFUdWmQS8OXuzNNEPJUJFuKsxOj4a8LMFeD0vFZ/pub?gid=584858054&single=true&output=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      const separateByN = csvText.split("\n");
      const arrayOfInputNumber = [];

      for (let el of separateByN) {
        const element = el.split(",");
        arrayOfInputNumber.push(element[1]);
      }

      let numberFromHTMLH3 = document.querySelectorAll(".counter-text");
      let getNumber = Array.from(numberFromHTMLH3);

      for (let row of getNumber) {
        row.dataset.number = arrayOfInputNumber.shift();
      }

      getNumber.map((viewNumber) => {
        console.log(viewNumber.dataset.number);
        let startCount = 0;
        let counterUP = () => {
          startCount++;
          viewNumber.innerHTML = `${startCount}`;
          if (startCount == viewNumber.dataset.number) {
            clearInterval(countStop);
          }
        };
        let countStop = setInterval(() => {
          counterUP();
        }, 13);
      });
    });
}
createCounter();
