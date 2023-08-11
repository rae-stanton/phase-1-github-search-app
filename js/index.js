document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("github-search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("github-search").value;
    const userEndpoint = `https://api.github.com/search/users?q=${searchTerm}`;

    fetch(userEndpoint, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
    .then(response => response.json())
    .then(data => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = "";

      if (data.items.length > 0) {
        const username = data.items[0].login;

        // Display the username
        const userLi = document.createElement("li");
        userLi.textContent = username;
        userList.appendChild(userLi);

        return fetch(`https://api.github.com/users/${username}/repos`, {
          method: "GET",
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });
      } else {
        throw new Error("No user found");
      }
    })
    .then(response => response.json())
    .then(repos => {
      const repoList = document.getElementById("repos-list");
      repoList.innerHTML = "";

      repos.slice(0, 10).forEach((repo) => {
        const li = document.createElement("li");
        li.textContent = repo.name;
        repoList.appendChild(li);
      });
    })
    .catch(error => {
      console.log("Error:", error.message);
    });
  });

});
