let buttons = document.querySelectorAll(".btn");
let forms = document.querySelectorAll("form");

let findBtn = buttons[0];
let addBtn = buttons[1];
let linkBtn = buttons[2];

const resetForm = (index) => {
    let form = forms[index];
    form.reset();
}

const updateDropDown = (id, data) => {
    let dropDown = document.getElementById(id);

    dropDown.innerHTML = "";
    for (const value of data) {
        let newOption = document.createElement("option");

        newOption.setAttribute("value", value.value);

        newOption.textContent = value.text;

        dropDown.appendChild(newOption);
    }
}