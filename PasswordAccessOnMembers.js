function passwordInput() {
    const template = 22;
    let password = 0;

    let passwordImportType = prompt('Въведете вашата парола!');

    for (let x = 0; x < passwordImportType.length; x++) {
        let numberAdd = Number(passwordImportType[x]);

        if (typeof (numberAdd) === 'number' && numberAdd !== 0 && !isNaN(numberAdd)) {
            password += numberAdd;
        }
    }

    if (password === (template / 2)) {
        location.href = '/p/blog-page_42.html';
        sessionStorage.setItem("check", "access");
    } else {
        alert('Грешна парола');
        return location.href = '/';
    }
}
