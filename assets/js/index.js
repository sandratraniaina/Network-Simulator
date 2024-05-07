let container = document.getElementById("cy");

let servers = [];

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
