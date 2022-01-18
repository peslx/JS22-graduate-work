export const m05_validron = () => {
  class Validron {
    constructor() {
      this.forms = document.querySelectorAll("form");
    }
  }

  const forms = document.querySelectorAll("form");
  console.log(forms);
  document.addEventListener("submit", (e) => {
    forms.forEach((f) => {
      if (e.target === f) {
        e.preventDefault();
        console.dir(f);

        f.querySelectorAll("input").forEach((i) => {
          console.log(`${i.name}`);
        });

        const formData = new FormData(f);
        for (const [name, val] of formData) {
          console.log(name + " : " + val);
        }
      }
    });
  });
};
