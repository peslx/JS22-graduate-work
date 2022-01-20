export const m01_callPopup = () => {
  // console.log("m01_callPopup");
  const headerMenu = document.getElementById("menu");
  const pageName = headerMenu.querySelector('li[class="active"]').dataset.page;

  const callPopupBtns = document.querySelectorAll("a[href='#callback']");
  const servicePopupBtns = document.querySelectorAll("a[href='#application']");

  const overlay = document.querySelector(".overlay");
  overlay.style.zIndex = 100;

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
    callPopupBtns.forEach((a) => {
      if (e.target === a) {
        e.preventDefault;
        const page = headerModal.querySelector("input[name='page']");
        page.value = pageName;
        reveal(headerModal);
      } else if (e.target === headerCloseBtn || e.target === overlay) {
        hide(headerModal);
      }
    });

    servicePopupBtns.forEach((a) => {
      if (e.target === a) {
        e.preventDefault;
        const page = servicesModal.querySelector("input[name='page']");
        const subj = servicesModal.querySelector("input[name='subject']");
        page.value = pageName;
        subj.value = a.dataset.subject;
        reveal(servicesModal);
      } else if (e.target === servicesCloseBtn || e.target === overlay) {
        hide(servicesModal);
      }
    });
  });

  //
};
