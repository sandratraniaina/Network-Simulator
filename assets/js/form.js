let btn = document.getElementById("menu_btn");

let isActive = false;

btn.onclick = () => {
    let forms = document.querySelectorAll(".form-container form");
    btn.classList.toggle("disabled");
    forms.forEach((form) => {
        if (isActive) {
            form.classList.add("disabled");
        } else {
            form.classList.remove("disabled");
        }
    });
    isActive = !isActive;
    btn.innerHTML = isActive ? `<i class="fa fa-x"></i>` : `<i class="fa fa-plus"></i>`;
};