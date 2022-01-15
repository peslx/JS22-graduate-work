export const m01_callPopup = () => {
  // console.log("m01_callPopup");
  const callPopups = document.querySelectorAll("a[href='#callback']");
  const servicePopups = document.querySelectorAll("a[href='#application']");

  const overlay = document.querySelector(".overlay");

  const headerModal = document.querySelector(".header-modal");
  const headerCloseBtn = headerModal.querySelector(".header-modal__close");

  const servicesModal = document.querySelector(".services-modal");
  const servicesCloseBtn = servicesModal.querySelector(
    ".services-modal__close"
  );

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
      } else if (e.target === headerCloseBtn || e.target === overlay) {
        hide(headerModal);
      }
    });

    servicePopups.forEach((a) => {
      if (e.target === a) {
        e.preventDefault;
        reveal(servicesModal);
      } else if (e.target === servicesCloseBtn || e.target === overlay) {
        hide(servicesModal);
      }
    });
  });

  //
};
