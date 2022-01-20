export const m06_calculator = () => {
  // console.log("m06_calculator");

  const costCalc = (baseCost = 1000) => {
    const calc = document.getElementById("calc");
    const calcType = document.getElementById("calc-type");
    const calcMat = document.getElementById("calc-type-material");
    const calcInput = document.getElementById("calc-input");
    const calcTotal = document.getElementById("calc-total");

    let calcTypeValue = calcType.options[calcType.selectedIndex].value;
    let calcMatValue = calcMat.options[calcMat.selectedIndex].value;
    let calcInputValue = calcInput.value;
    let calcTotalValue = calcTotal.value;

    // calcInputs.forEach((i) => {
    //   i.addEventListener('change', () => {
    //     console.log(calcTypeValue);
    //     console.log(calcMatValue);
    //     console.log(calcInputValue);
    //   });
    // }
  };

  // console.log(window.location.pathname);
  // console.log(window.location.toString());
  // console.log(window.location == "kuhni.html");

  // costCalc();
};
