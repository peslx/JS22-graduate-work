export const m02_slider = () => {
  const benefitsSliderBlock = document.getElementById("benefits-slider");

  const fixSliderWidth = () => {
    if (window.outerWidth >= 576) {
      benefitsSliderBlock.style.width = "560px";
    } else if (window.outerWidth < 576) {
      benefitsSliderBlock.style.width = "180px";
    }
  };

  fixSliderWidth();
  window.addEventListener("resize", (e) => {
    console.log(window.outerWidth);
    fixSliderWidth();
  });

  const benefitsSlider = new Swiper("#benefits-slider", {
    direction: "horizontal",
    loop: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      566: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".benefits__arrow--right",
      prevEl: ".benefits__arrow--left",
    },
  });
};
