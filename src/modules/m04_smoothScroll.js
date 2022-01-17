export const m04_smoothScroll = () => {
  const scrollBtn = document.querySelector(".smooth-scroll");
  const offer = document.getElementById("offer");

  const hideScrollBtn = () => {
    scrollBtn.style.display = "none";
    scrollBtn.style.opacity = 0;
  };

  const showScrollBtn = () => {
    scrollBtn.style.display = "";
    scrollBtn.style.opacity = "";
  };

  hideScrollBtn();

  document.addEventListener("scroll", () => {
    if (window.scrollY >= offer.offsetTop + offer.offsetHeight) {
      showScrollBtn();
    } else if (window.scrollY <= offer.offsetHeight - offer.offsetTop) {
      hideScrollBtn();
    }
  });

  scrollBtn.addEventListener("click", (e) => {
    console.dir(benefits);
    e.preventDefault();
    window.scrollBy({
      top: -window.scrollY,
      behavior: "smooth",
    });
  });
};
