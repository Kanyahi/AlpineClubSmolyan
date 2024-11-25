//! Проверява паролата на потребителя и 
//! добавя ключ в хранилището на сесията за проверка ако се зареди страницата директно от линка.
function passwordInput() {
    const template = 22;
    let passwrd = 0;

    let passwordImportType = prompt('Въведете вашата парола!');

    for (let x = 0; x < passwordImportType.length; x++) {
        let numberAdd = Number(passwordImportType[x]);

        if (typeof (numberAdd) === 'number' && numberAdd !== 0 && !isNaN(numberAdd)) {
            passwrd += numberAdd;
        }
    }

    if (passwrd === (template / 2)) {
        location.href = '/p/blog-page_92.html';
        sessionStorage.setItem("check", "access");
    } else {
        alert('Грешна парола');
        return location.href = '/';
    }
}
passwordInput();

//! скрипт във всяка страница от админ панела за проверка на потребителя дали е влезнал през бутона или с директен линк!
//! Ако е влязал през линк не с парола ще бъде пренасочен към началната страница!
function checkUser() {
    let isKey = sessionStorage.getItem("check");

    if(isKey === null){
        location.href = '/';
    }
}

//! Автоматично изтрива хранилището на сесията и премахва кода за достъп!
function myClick() {
    setTimeout(
      function() {
        sessionStorage.clear();
      }, 180000);
  }
