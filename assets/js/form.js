let buttons = document.querySelectorAll(".menu_btn");
let forms = document.querySelectorAll(".form-container form");

let isActive = false;

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        button.classList.toggle("disabled");
        forms[index].classList.toggle("disabled");
    });
});