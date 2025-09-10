document.querySelectorAll(".scroll_button").forEach((item, index) => {
  item.addEventListener("click", function (event) {
    document.querySelector(".heading" + index).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  });
}); у