document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(response => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(err => console.error("Header error:", err));

  fetch("footer.html")
    .then(response => {
      if (!response.ok) throw new Error("Footer not found");
      return response.text();
    })
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("Footer error:", err));
});