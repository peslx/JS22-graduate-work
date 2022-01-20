export const m02_slider = () => {
  const benefitsSlider = {
    benefitsSliderBlock: document.getElementById("benefits-slider"),

    fixSliderWidth() {
      if (window.outerWidth >= 576) {
        this.benefitsSliderBlock.style.width = "560px";
      } else if (window.outerWidth < 576) {
        this.benefitsSliderBlock.style.width = "180px";
      }
    },

    init() {
      this.fixSliderWidth();
      window.addEventListener("resize", (e) => {
        // console.log(window.outerWidth);
        this.fixSliderWidth();
      });

      const benefitsSlider = new Swiper("#benefits-slider", {
        direction: "horizontal",
        loop: true,
        centeredSlides: true,
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
    },
  };

  benefitsSlider.init();

  const servicesSlider = {
    init() {
      const servicesSlider = new Swiper("#services-slider", {
        direction: "horizontal",
        slidesPerView: 2,
        spaceBetween: 30,

        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
            grid: {
              rows: 1,
              fill: "row",
            },
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 30,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 30,
            grid: {
              rows: 1,
              fill: "row",
            },
          },
        },

        // Navigation arrows
        navigation: {
          nextEl: ".services__arrow--right",
          prevEl: ".services__arrow--left",
        },
      });
    },
  };

  servicesSlider.init();
};
