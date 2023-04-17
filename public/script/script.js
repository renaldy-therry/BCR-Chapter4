const menu = document.getElementById("label-menu");
const sidebar = document.getElementsByClassName("sidebar")[0];

menu.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-hide");
});
