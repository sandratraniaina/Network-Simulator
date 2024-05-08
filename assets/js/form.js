let buttons = document.querySelectorAll(".btn");
let forms = document.querySelectorAll("form");

let findBtn = buttons[0];
let addBtn = buttons[1];
let linkBtn = buttons[2];

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