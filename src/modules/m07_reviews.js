export const m07_reviews = () => {
  // console.log("m07_reviews");

  // + 1. При скроле до блока с отзывами добавить "preloader"
  // 2. Начало загрузки данных, формирование массива объектов
  // 3. Когда все готово убрать "preloader"
  // 4. Отрисовать первые 3 отзыва
  // 5. Интервально убирать 1ый и подгружать очередной отзыв

  function Preloader(id) {
    this.self = document.getElementById(id);
    this.on = () => {
      this.self.style.display = "flex";
    };
    this.off = () => {
      this.self.style.display = "none";
    };
  }

  const preloader = new Preloader("reviews-preloader");
  const reviews = document.getElementById("reviews");
  const commentsContainer = document.querySelector(".comments-container");

  let loadStarted = false;

  const getReviewsData = (url) => {
    return fetch(url).then((response) => response.json());
  };

  const renderReviews = (reviews) => {
    let type = 1;
    reviews.forEach((r) => {
      switch (true) {
        case type === 1:
          commentsContainer.insertAdjacentHTML(
            "beforeend",
            `
        <div class="review-margin-bottom row comment-item">
          <div class="col-xs-3 col-sm-2">
            <div class="review-user">
              <img src="./images/users/${
                r.image != "" ? r.image : "user_placeholder.jpg"
              }" alt="" class="img-responsive avatar" style="max-width: 121px;" />
            </div>
          </div>
          <div class="col-xs-9 col-sm-9">
            <div class="review-inner review-green review-arrow review-arrow-left">
              <p class="text-normal">${r.author}</p>
              <p>${r.comment}</p>
            </div>
          </div>
        </div>      
      `
          );
          break;
        case type === 2:
          commentsContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="review-margin-bottom row comment-item">
              <div class="col-xs-9 col-sm-9">
                <div class="review-inner review-gray review-arrow review-arrow-right">
                  <p class="text-normal">${r.author}</p>
                  <p>${r.comment}</p>
                </div>
              </div>
              <div class="col-xs-3 col-sm-2">
                <div class="review-user">
                  <img src="./images/users/${
                    r.image != "" ? r.image : "user_placeholder.jpg"
                  }" alt="" class="img-responsive avatar" style="max-width: 121px;" />
                </div>
              </div>
            </div>
            `
          );
          break;
        case type === 3:
          commentsContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="review-margin-bottom row comment-item">
              <div class="col-xs-3 col-sm-2">
                <div class="review-user">
                  <img src="./images/users/${
                    r.image != "" ? r.image : "user_placeholder.jpg"
                  }" alt="" class="img-responsive avatar" style="max-width: 121px;" />
                </div>
              </div>
              <div class="col-xs-9 col-sm-9">
                <div class="review-inner review-orange review-arrow review-arrow-left">
                  <p class="text-normal">${r.author}</p>
                  <p>${r.comment}</p>
                </div>
              </div>
            </div>     
      `
          );
          break;
      }

      type++;
      type = type > 3 ? 1 : type;
    });
  };

  const loadReviews = () => {
    if (commentsContainer.innerHTML === "" && !loadStarted) {
      if (
        window.scrollY >=
        reviews.offsetTop - window.innerHeight + reviews.clientHeight
      ) {
        loadStarted = true;
        preloader.on();
        getReviewsData("./comments.json").then((reviews) => {
          const comments = reviews.comments;
          console.log(comments);
          setTimeout(() => {
            preloader.off();

            renderReviews(comments);
          }, 1000);
        });
      }
    } else {
      return;
    }
  };

  const loadInit = () => {
    commentsContainer.innerHTML = "";
    loadReviews();
    document.addEventListener("scroll", (e) => {
      loadReviews();
    });
  };

  loadInit();
};
