let container = document.getElementById("cy");

let startServer = document.getElementById("start");

let servers = [];

let selected;

const updateServerInformation = () => {
    let container = document.querySelector(".server__info");
    container.innerHTML = "";
    if (selected == null) {
        container.innerHTML = "<p> No Server selected</p>";
    } else {
        let ip = `<p>Ip: <strong>${selected.ipAdress}</strong></p> <p>Websites: </p>`;
        let sites = document.createElement("ul");
        for (const site of selected.sites) {
            let temp = document.createElement("li");
            temp.textContent = site;
            sites.appendChild(temp);
        }
        container.innerHTML = ip;
        container.appendChild(sites);
    }
}

const newLink = () => {
    let startServer = document.getElementById("start").value;
    let endServer = document.getElementById("end").value;
    let ping = document.getElementById("ping").value;
    

}

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
        selected = servers.filter((server) => server.ipAdress == evtTarget.id())[0];
        console.log(servers);
        console.log(selected);
        updateServerInformation();
    } else {
        cy.elements().unselect();
        selected = null;
        updateNewServerForm(e.position);
        updateServerInformation();
    }
});

addBtn.addEventListener("click", () => {
    newServer();
});

startServer.addEventListener("change", (e) => {
    let dropDown = e.target;
    if (dropDown.value != null) {
        
    } 
});