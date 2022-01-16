export const m02_slider = () => {
  // console.log("m02_slider");
  const servicesSlider = () => {
    const slider = document.getElementById("services").querySelector(".row");
    const left = slider.querySelector(".services__arrow--left");
    const right = slider.querySelector(".services__arrow--right");
    let slidesToShow;
    const wrapSlides = () => {
      const storage = [];
      const container = document.createElement("div");
      container.classList.add("slider-container");
      slider.prepend(container);

      slider.querySelectorAll(".col-md-12.col-lg-6").forEach((element) => {
        const clone = element.cloneNode(true);
        storage.push(clone);
        slider.removeChild(element);
      });

      storage.forEach((s) => {
        container.append(s);
      });
    };

    const setSlidesCount = () => {
      if (document.documentElement.clientWidth <= 576) {
        slidesToShow = 1;
      } else {
        slidesToShow = 2;
      }
    };

    const showSlides = () => {
      const slides = slider.querySelectorAll(".col-md-12.col-lg-6");
      slides.forEach((s) => {
        s.style.display = "none";
      });
      for (let i = 0; i < slidesToShow; i++) {
        slides[i].style.display = "";
      }
    };

    const next = () => {
      const container = slider.querySelector(".slider-container");
      for (let i = 0; i < slidesToShow; i++) {
        const temp = container.removeChild(container.firstChild);
        container.append(temp);
      }
      showSlides();
    };

    const prev = () => {
      const container = slider.querySelector(".slider-container");
      for (let i = 0; i < slidesToShow; i++) {
        const temp = container.removeChild(container.lastChild);
        container.prepend(temp);
      }
      showSlides();
    };

    setSlidesCount();
    wrapSlides();
    showSlides();

    window.addEventListener("resize", () => {
      setSlidesCount();
      showSlides();
    });

    slider.addEventListener("click", (e) => {
      if (e.target.closest(".services__arrow--right")) {
        next();
      } else if (e.target.closest(".services__arrow--left")) {
        prev();
      }
    });
  };

  servicesSlider();
};
