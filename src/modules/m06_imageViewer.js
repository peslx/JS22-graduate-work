export const m06_imageViewer = () => {
  const documents = document.getElementById("documents");
  const serts = documents.querySelectorAll(".sertificate-document");
  const overlay = document.querySelector(".overlay");

  const show = (el) => {
    el.style.display = "flex";
    overlay.style.display = "block";
  };

  const hide = (el) => {
    el.style.display = "none";
    overlay.style.display = "none";
  };

  const modalBox = document.createElement("div");
  modalBox.style.cssText = `
      display: none;
      justify-content: center;
      align-items: center;
      height: auto;
      width: fit-content;
      max-width: 90%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      `;
  document.body.append(modalBox);

  serts.forEach((s) => {
    s.addEventListener("click", (e) => {
      e.preventDefault();

      const src = s.getAttribute("href");
      const image = document.createElement("img");

      image.setAttribute("src", src);
      image.style.cssText = `
      width: 100%;
      max-width: 500px;
      `;

      modalBox.append(image);
      show(modalBox);

      overlay.addEventListener("click", () => {
        hide(modalBox);
        modalBox.innerHTML = "";
      });
    });
  });
};
