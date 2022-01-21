// export const m05_validrone = (userCallbackFunc) => {
// class Validrone {
export class Validrone {
  constructor(userCallbackFunc) {
    this.userCallbackFunc = userCallbackFunc;
    this.forms = document.querySelectorAll("form");
    this.validate = {
      words: {
        cyr: (str) => str.replace(/[^а-яА-Я\- ]/g, ""),
        lat: (str) => str.replace(/[^a-zA-Z\- ]/g, ""),
        any: (str) => str.replace(/[^а-яА-Яa-zA-Z\- ]/g, ""),
      },
      digits: (str) => str.replace(/\D/g, ""),
      mail: (str) => str.replace(/[^a-zA-Z0-9\-@_.~!'*]/g, ""),
      phone: (str) => str.replace(/[^\d\(\)\+\-]/g, ""),
      onInput: (i) => {
        if (i.type == "text") {
          if (i.name == "phone") {
            i.value = this.validate.phone(i.value);
            i.value = i.value.substring(0, 16);
          } else if (i.name == "email") {
            i.value = this.validate.mail(i.value);
          } else {
            i.value = i.value.replace(/^\s+/, "");
            i.value = this.validate.words.any(i.value);
          }
        } else if (i.type == "email") {
          i.value = this.validate.mail(i.value);
        } else if (i.type == "tel" || i.name == "phone") {
          i.value = this.validate.phone(i.value);
          i.value = i.value.substring(0, 16);
        }
      },
      onBlur: (i) => {
        i.value = i.value.trim();
        i.value = i.value.replace(/\s+\b/g, " ");
        i.value = i.value.replace(/\b\s+/g, " ");
        i.value = i.value.replace(/\s+/g, " ");
        i.value = i.value.replace(/\-+/g, "-");
        i.value = i.value.replace(/(^-)|(-$)/g, "");
        i.value = i.value.replace(/(^ +)|( +$)/g, "");
        if (i.type === "text" && i.value !== "") {
          i.value = i.value
            .split(/\s/)
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
        }
      },
    };
  }
  setValid(input) {
    input.classList.remove("validError");
    input.classList.add("validOk");
    input.style.borderBottom = "2px solid green";
    input.style.color = "green";
    input.style.backgroundColor = "#88ff88";
  }

  setInvalid(input) {
    input.classList.remove("validOk");
    input.classList.add("validError");
    input.style.borderBottom = "2px solid red";
    input.style.color = "red";
    input.style.backgroundColor = "#ff8888";
  }

  addInvalidListener(input, log = false) {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      this.setInvalid(input);
      if (log) {
        console.error(`${input.name}: 'пустое значение'`);
      }
    });
  }

  checkValidity(input, log = false) {
    if (input.value !== "") {
      // this.setValid(input);
      if (input.type === "text") {
        if (input.value.length < 2) {
          this.setInvalid(input);
        } else if (input.name === "phone" && input.value.length < 11) {
          this.setInvalid(input);
        } else {
          this.setValid(input);
        }
      }
    } else {
      this.setInvalid(input);

      if (log) {
        console.error(`${input.name}: 'пустое значение'`);
      }
    }
  }

  removeValidClass(input) {
    input.classList.remove("validOk");
    input.classList.remove("validError");
    input.style.borderBottom = "";
    input.style.color = "";
    input.style.backgroundColor = "";
    if (input.type !== "hidden") {
      input.value = "";
    }
  }

  sendForm(data, url = "https://jsonplaceholder.typicode.com/posts") {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // console.log(response.ok);
      response.json();
      this.userCallbackFunc ? this.userCallbackFunc(response.ok) : null;
    });
  }

  onSubmit(form, isValid, log = false) {
    if (isValid) {
      let data = {};
      form.querySelectorAll("input").forEach((i) => {
        data[i.name] = i.value;
        this.removeValidClass(i);
      });

      this.sendForm(data).then((res) => {
        log ? console.log("Ответ от сервера: " + JSON.stringify(res)) : null;
      });
    } else {
      if (log) {
        console.error(
          `Ошибка в форме (${
            form.id ? "id:" + form.id : "name:" + form.name
          }): "Форма не заполнена"`
        );
      }
    }
  }

  init(log = false) {
    if (log) {
      console.log(this);
    }

    this.forms.forEach((f) => {
      f.querySelectorAll("input").forEach((i) => {
        // this.addInvalidListener(i, log);

        i.addEventListener("input", () => {
          this.validate.onInput(i);
          this.checkValidity(i, log);
        });

        i.addEventListener("blur", (e) => {
          this.validate.onBlur(i);
        });
      });
    });

    document.addEventListener("submit", (e) => {
      this.forms.forEach((f) => {
        if (e.target == f) {
          e.preventDefault();

          let isValid = true;

          f.querySelectorAll("input").forEach((i) => {
            this.checkValidity(i, log);

            i.addEventListener("change", () => {
              this.checkValidity(i);
            });

            if (i.classList.contains("validError")) {
              isValid = false;
            }
          });

          this.onSubmit(f, isValid, log);
        }
      });
    });
  }
}

//   const validrone = new Validrone(userCallbackFunc);
//   // validrone.init(true); // передача аргумента log = boolean [true: включает логи, false: отключает]
//   validrone.init(); // по умолчанию log=false
// };
