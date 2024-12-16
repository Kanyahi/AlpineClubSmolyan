function popUpLoginBox() {
    let loginBox = document.getElementById("loginBox");
    loginBox.style.display = "block";
  }
  
  function closeBox() {
    document.getElementById("loginBox").style.display = "none";
  }
  
  function loginAccess() {
   
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUnlKvYhZHa7kgtL_apTIMAzlZ6BoNUqb6bXDJY1Z4LWgyPD-4AIUK7naRsqT8wwJLXiJyN9_acVZn/pub?gid=0&single=true&output=csv"
    )
      .then((response) => response.text())
      .then((csvText) => {
        const arrayFromInput = csvText.split("\n");
        arrayFromInput.shift().split(",");
  
        let inputID = document.getElementById("yourID").value.toLocaleLowerCase().trimEnd();
        let statusBox = document.getElementById("printStatus");
       
        let arrayName = Boolean;
  
        for (let check of arrayFromInput) {
          let arrayList = check.split(",");
          let onlyName = arrayList[1].toLocaleLowerCase().trimEnd();
  
          if(onlyName === inputID){
              arrayName = true;
              break;
          } else {
              arrayName = false;
          }
        }
        
        if (arrayName) {
          document.getElementById("yourID").value = "";
          document.getElementById("loginBox").style.display = "none";
          sessionStorage.setItem("check", "access");
          return (location.href = "/p/blog-page_42.html");
        } else {
          statusBox.textContent += "Няма такъв потребител!";
          document.getElementById("yourID").value = "";
          setTimeout(() => {
            statusBox.textContent = "";
          }, 2000);
        }
      });
  }