document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("github-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const searchTerm = document.getElementById("search").value;

      const endpoint = `https://api.github.com/search/users?q=${searchTerm}`;

      fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const userList = document.getElementById("user-list");
          userList.innerHTML = ""; // Clear any previous results

          data.items.forEach((user) => {
            const li = document.createElement("li");
            li.textContent = user.login;
            userList.appendChild(li);
          });
        })
        .catch((error) => {
          console.log(
            "There was a problem with the fetch operation:",
            error.message
          );
        });
    });
});
