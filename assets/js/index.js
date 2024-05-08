let container = document.getElementById("cy");

let servers = [];

let selected;

const newServer = () => {
    let x = document.getElementById("x").value;
    let ipAdress = document.getElementById("ip_adress").value;
    let y = document.getElementById("y").value;
    let webSites = document.getElementById("websites").value.split(";");
    if (x == null || y == null || webSites == null || ipAdress == "") {
        alert("Input all data");
        return;
    }
    let newServer = {
        group: "nodes",
        data: { id: `${ipAdress}` },
        position: {
            x: parseInt(x),
            y: parseInt(y)
        },
        ipAdress: ipAdress,
        sites: webSites,
        linkedSites: []
    };
    cy.add(newServer);
    servers.push(newServer);
    resetForm(1);
    updateDropDown("start", servers.map((server, index) => {
        return {
            value: index,
            text: server.ipAdress
        }
    }));
}

cy.on('tap', function (e) {
    var evtTarget = e.target;

    if (evtTarget !== cy) {
        // TODO : Handle when do not click on empty area
        let selected = servers.filter((server) => server.id == evtTarget.id())[0];
        console.log(selected);
    } else {
        cy.elements().unselect();
        updateNewServerForm(e.position);
    }
});

addBtn.addEventListener("click", () => {
    newServer();
});