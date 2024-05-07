let buttons = document.querySelectorAll(".btn");
let forms = document.querySelectorAll("form");

let findBtn = buttons[0];
let addBtn = buttons[1];
let linkBtn = buttons[2];

const resetForm = (index) => {
    let form = forms[index];
    form.reset();
}