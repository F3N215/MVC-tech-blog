const logoutForm = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  document.location.replace("/");
  if (response.ok) {
    alert("You have logged out!");
  } else {
    alert("Failed to log out!");
  }
};
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("#logout").addEventListener("click", logoutForm);
});
// should run after page is done rendering (or else theres no logout button to click on)
