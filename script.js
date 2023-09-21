
document.getElementById("startButton").onclick = function () {
    localStorage.setItem("name", document.getElementById("nameInput").value);
    window.location.href = "/chat.html";
  };