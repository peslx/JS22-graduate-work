export const m01_callPopup = () => {
  // console.log("m01_callPopup");
  const callPopups = document.querySelectorAll("a[href='#callback']");
  const overlay = document.querySelector(".overlay");
  const headerModal = document.querySelector(".header-modal");
  const closeBtn = headerModal.querySelector(".header-modal__close");

  const reveal = (elem) => {
    elem.style.display = "block";
    overlay.style.display = "block";
  };

  const hide = (elem) => {
    elem.style.display = "none";
    overlay.style.display = "none";
  };

  document.addEventListener("click", (e) => {
    callPopups.forEach((a) => {
      if (e.target === a) {
        e.preventDefault;
        reveal(headerModal);
      } else if (e.target === closeBtn || e.target === overlay) {
        hide(headerModal);
      }
    });
  });

  //
};
