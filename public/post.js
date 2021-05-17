console.log("POST js on click file loadeddd!!");

const post = async (e) => {
  e.preventDefault();
  console.log("u got clicked1");
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;

  const response = await fetch("/api/post/create", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#addpost").addEventListener("click", post);

// do on click and save stuff
