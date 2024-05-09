let buttons = document.querySelectorAll(".btn");
let forms = document.querySelectorAll("form");

let findBtn = buttons[0], addBtn = buttons[2], linkBtn = buttons[3];
let deleteBtn = document.getElementById("delete_btn");

const updateNewServerForm = (position) => {
    document.getElementById("x").value = position.x;
    document.getElementById("y").value = position.y;
}

const resetForm = (index) => {
    let form = forms[index];
    form.reset();
}

const updateDropDown = (id, data) => {
    let dropDown = document.getElementById(id);

    dropDown.innerHTML = "";
    let newOption = document.createElement("option");

    dropDown.appendChild(newOption);
    for (const value of data) {
        let newOption = document.createElement("option");

        newOption.setAttribute("value", value.value);

        newOption.textContent = value.text;

        dropDown.appendChild(newOption);
    }
}

const checkForm = (id) => {
    let form = document.getElementById(id);
    let inputs = form.querySelectorAll("input");
    for (const input of inputs) {
        let value = input.value;
        if (value == "" || value == null) {
            return false;
        }
    }
    return true;
}
