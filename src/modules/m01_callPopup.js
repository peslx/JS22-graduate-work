import { Validrone } from "./m05_validrone";
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

  const responseMessage = document.getElementById("responseMessage");
  const okBtn = responseMessage.querySelector("a[href='#']");

  const reveal = (elem) => {
    elem.style.display = "block";
    overlay.style.display = "block";
  };

  const hide = (elem) => {
    elem.style.display = "none";
    overlay.style.display = "none";
  };

  const responseHandler = (response) => {
    if (response) {
      // alert("Ваша заявка принята!");
      responseMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        `;
      responseMessage.querySelector(".modal-content").textContent =
        "Ваша заявка принята!";
      reveal(responseMessage);
    } else {
      alert("!Error!");
    }
  };

  const validrone = new Validrone(responseHandler);
  validrone.init();

  document.addEventListener("click", (e) => {
    if (e.target === okBtn || e.target === overlay) {
      e.preventDefault();
      hide(responseMessage);
    }

    callPopupBtns.forEach((a) => {
      if (e.target === a || e.target.closest("a[href='#callback']")) {
        e.preventDefault();
        const page = headerModal.querySelector("input[name='page']");
        page.value = pageName;
        reveal(headerModal);

        headerModal.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          let valid = true;
          headerModal.querySelectorAll("input").forEach((i) => {
            if (i.classList.contains("validError")) {
              valid = false;
            }
          });
          if (valid) {
            hide(headerModal);
          }
        });
      } else if (e.target === headerCloseBtn || e.target === overlay) {
        hide(headerModal);
      }
    });

    servicePopupBtns.forEach((a) => {
      if (e.target === a || e.target.closest("a[href='#application']")) {
        e.preventDefault();
        const page = servicesModal.querySelector("input[name='page']");
        const subj = servicesModal.querySelector("input[name='subject']");
        page.value = pageName;
        subj.value = a.dataset.subject;
        reveal(servicesModal);
        servicesModal.addEventListener("submit", () => {
          hide(servicesModal);
        });
      } else if (e.target === servicesCloseBtn || e.target === overlay) {
        hide(servicesModal);
      }
    });
  });

  //
};
