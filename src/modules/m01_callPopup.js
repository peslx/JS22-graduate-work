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

  const order = document.getElementById("order");
  const orderBtn = document.querySelector("a[href='#order']");

  const responseMessage = document.getElementById("responseMessage");
  const okBtn = responseMessage.querySelector("a[href='#']");

  const calcTotal = calc.querySelector("#calc-total");

  const reveal = (elem) => {
    elem.style.display = "block";
    overlay.style.display = "block";
  };

  const hide = (elem) => {
    elem.style.display = "none";
    overlay.style.display = "none";
  };

  const initCalculator = () => {
    const calc = document.getElementById("calc");
    const calcType = calc.querySelector("#calc-type");
    const calcMat = calc.querySelector("#calc-type-material");
    const calcInput = calc.querySelector("#calc-input");

    calc.addEventListener("input", (e) => {
      if (e.target === calcInput) {
        if (calcInput.value < 0) {
          calcInput.value = 0;
        }
      }

      if (
        calcType.selectedIndex !== 0 &&
        calcMat.selectedIndex !== 0 &&
        calcInput.value !== "" &&
        calcInput.value > 0
      ) {
        let res =
          calcType[calcType.selectedIndex].value *
          calcMat[calcMat.selectedIndex].value *
          calcInput.value;
        res = Math.ceil(res * 10) / 10;
        calcTotal.value = res;
      } else {
        calcTotal.value = "";
      }
    });
  };

  const addCalcInput = (form) => {
    if (pageName === "Балконы") {
      if (calcTotal.value !== "") {
        if (!form.querySelector("input[name='calcTotal']")) {
          form.insertAdjacentHTML(
            "beforeend",
            `<input type="hidden" name="calcTotal" value="${calcTotal.value}"></input>`
          );
        } else {
          form.querySelector("input[name='calcTotal']").value = calcTotal.value;
        }
      }
    }
  };

  const callResponseMsg = (text) => {
    responseMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        `;
    responseMessage.querySelector(".modal-content").textContent = text;
    reveal(responseMessage);
  };

  const responseHandler = (response) => {
    if (response) {
      // alert("Ваша заявка принята!");
      callResponseMsg("Ваша заявка принята!");
    } else {
      callResponseMsg("При отправке формы произошла ошибка!");
    }
  };

  const validrone = new Validrone(responseHandler);
  validrone.init();

  initCalculator();

  document.addEventListener("click", (e) => {
    if (e.target === okBtn || e.target === overlay) {
      e.preventDefault();
      hide(responseMessage);
    }

    if (e.target === orderBtn) {
      e.preventDefault();
      order.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      `;
      addCalcInput(order.querySelector("form"));
      reveal(order);
      order.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;

        order
          .querySelector("form")
          .querySelectorAll("input")
          .forEach((i) => {
            if (i.value == "") {
              i.classList.add("validError");
              valid = false;
            } else if (i.classList.contains("validError")) {
              valid = false;
            }
          });

        if (valid) {
          hide(order);
        } else {
          return;
        }
      });
    } else if (e.target === overlay) {
      hide(order);
    }

    callPopupBtns.forEach((a) => {
      if (e.target === a || e.target.closest("a[href='#callback']")) {
        e.preventDefault();
        const page = headerModal.querySelector("input[name='page']");
        page.value = pageName;

        addCalcInput(headerModal.querySelector("form"));
        reveal(headerModal);

        headerModal.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          let valid = true;

          headerModal.querySelectorAll("input").forEach((i) => {
            if (i.value == "") {
              i.classList.add("validError");
              valid = false;
            } else if (i.classList.contains("validError")) {
              valid = false;
            }
          });

          if (valid) {
            hide(headerModal);
          } else {
            return;
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

        addCalcInput(servicesModal.querySelector("form"));
        reveal(servicesModal);
        servicesModal.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          let valid = true;

          servicesModal.querySelectorAll("input").forEach((i) => {
            if (i.value == "") {
              i.classList.add("validError");
              valid = false;
            } else if (i.classList.contains("validError")) {
              valid = false;
            }
          });

          if (valid) {
            hide(servicesModal);
          } else {
            return;
          }
        });
      } else if (e.target === servicesCloseBtn || e.target === overlay) {
        hide(servicesModal);
      }
    });
  });

  //
};
