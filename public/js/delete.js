const delBtn = document.querySelector("#del-post-btn");
const postId = document.querySelector('input[name="post-id"]').value;

const deleteHandler = async () => {
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

if (delBtn != null) {
  delBtn.addEventListener("click", deleteHandler);
}
