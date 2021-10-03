
let totalTaxAmount = document.querySelector(".tax-total-amount");
let totalBillAmount = document.querySelector(".total-bill-amount");
let error = document.querySelectorAll(".error");
let resetBtn = document.querySelector(".reset-btn");
let amountInputBox = document.getElementById("bill-amount");
let profitInputBox = document.getElementById("number-of-profit");
let customInputBox = document.querySelector(".custom");
let taxBtn = document.querySelectorAll(".tax");

let amount = 0,
  profit = 1,
  tax = 0;

//  tax section //
taxBtn.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.classList.contains("selected")) {
      e.classList.remove("selected");
      e.classList.add("unselected");
    } else {
      taxBtn.forEach((btn) => {
        btn.classList.add("unselected");
        btn.classList.remove("selected");
      });
      e.classList.remove("unselected");
      e.classList.add("selected");

      tax = parseFloat(e.value);
    }
    customInputBox.value = "";
    results();
  });
});

customInputBox.addEventListener("input", () => {
  if (customInputBox.value <= -1) {
    customInputBox.value = "";
  }
  tax = parseFloat(customInputBox.value);
  results();

  taxBtn.forEach((e) => {
    e.classList.remove("selected");
    e.classList.add("unselected");
  });
});

//  tax amount  //
amountInputBox.addEventListener("input", () => {
  if (amountInputBox.value <= -1) {
    amountInputBox.classList.add("error-input");
    error[0].style.visibility = "visible";
  } else {
    amountInputBox.classList.remove("error-input");
    error[0].style.visibility = "hidden";
    amount = parseFloat(amountInputBox.value);
  }
  results();
});

profitInputBox.addEventListener("input", () => {
  if (profitInputBox.value <= 0 || profitInputBox.value.includes("-")) {
    profitInputBox.classList.add("error-input");
    error[1].style.visibility = "visible";
  } else {
    error[1].style.visibility = "hidden";
    profitInputBox.classList.remove("error-input");
    profit = parseFloat(profitInputBox.value);
  }
  results();
});

//  reset section//
resetBtn.addEventListener("click", () => {
  amount = 0;
  profit = 1;
  tax = 0;

  profitInputBox.value = 1;
  amountInputBox.value = "";
  customInputBox.value = "";

  totalTaxAmount.innerText = "₹0.00";
  totalBillAmount.innerText = "₹0.00";
  document.getElementById("CGST").innerText=`₹${(0)}`;
  document.getElementById("SGST").innerText=`₹${(0)}`;

  taxBtn.forEach((e) => {
    if (e.classList.contains("selected")) e.classList.remove("selected");
    e.classList.add("unselected");
  });
});

// calculating GST results  //
function results() {
  if (amount >= 0 && profit >= 1 && tax >= 0) {
    let totalTax = (tax * amount) / 100;
    totalTaxAmount.innerText = `₹${totalTax.toFixed(2)}`;
    let profitAmount = (profit * amount) / 100;
    let Sp = amount + profitAmount + totalTax;
    totalBillAmount.innerText = `₹${Sp.toFixed(2)}`;
    document.getElementById("CGST").innerText = `₹${(totalTax / 2).toFixed(2)}`;
    document.getElementById("SGST").innerText = `₹${(totalTax / 2).toFixed(2)}`;
  }
}
