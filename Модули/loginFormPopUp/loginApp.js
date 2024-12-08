function popUpLoginBox(){
   let loginBox = document.getElementById("loginBox");
   loginBox.style.display = "block"
}

function loginAccess(){
    let inputID = document.getElementById('yourID').value;
    let check = ['yes', 'христо чилов'];

    if (check.includes(inputID)) {
        alert("You are logged in");
        document.getElementById('yourID').value = "";
        document.getElementById("loginBox").style.display = "none";
        } else {
            alert("Incorrect ID");
            }
}
