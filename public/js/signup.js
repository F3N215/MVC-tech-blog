const signupForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    alert("You smell");
    document.location.replace("/dashboard");
  } else {
    alert("Something wrong!");
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("#signup-form").addEventListener("submit", signupForm);
});
