const newpostForm = async (event) => {
  console.log("YOU FUCKING ADDED A POST");
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Something wrong!");
  }
};
document.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector("#newpost-form")
    .addEventListener("submit", newpostForm);
});
