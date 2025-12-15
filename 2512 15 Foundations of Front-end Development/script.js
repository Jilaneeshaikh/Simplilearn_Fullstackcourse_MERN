function loadMenu() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "menu-data.html", true);

  xhr.onload = function () {
    if (this.status === 200) {
      document.getElementById("menuItems").innerHTML = this.responseText;
    }
  };

  xhr.send();
}

loadMenu();
function logout() {
  alert("Logged out successfully (demo)");
}
