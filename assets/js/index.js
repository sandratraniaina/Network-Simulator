let container = document.getElementById("cy");

let servers = [];

const newServer = () => {
    let x = document.getElementById("x").value;
    let ipAdress = document.getElementById("ip_adress").value;
    let y = document.getElementById("y").value;
    let webSites = document.getElementById("webSites").value.split(";");
    if (x == null || y == null || webSites == null || ipAdress) {
        alert("Input all data");
        return;
    }
    let newServer = {
        group: "nodes",
        data: { id: `${ipAdress}` },
        position: {
            x: x,
            y: y
        },
        ipAdress: ipAdress,
        sites: webSites
    };
    cy.add(newServer);
    servers.push(newServer);
}

cy.on('tap', function (e) {
    var evtTarget = e.target;

    if (evtTarget !== cy) {
        // TODO : Handle when do not click on empty area
    } else {
        cy.elements().unselect();
        let newServer = {
            group: "nodes",
            data: { id: `node${servers.length}` },
            position: {
                x: e.position.x,
                y: e.position.y
            }
        }
        cy.add(newServer);
        servers.push(newServer);
    }
});
