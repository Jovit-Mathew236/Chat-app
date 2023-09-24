document.getElementById("startButton").onclick = function () {
  //validation
  if (document.getElementById("nameInput").value === "") {
    alert("Please enter a name");
    return;
  }
  localStorage.setItem("name", document.getElementById("nameInput").value);
  window.location.href = "./chat.html";
};
