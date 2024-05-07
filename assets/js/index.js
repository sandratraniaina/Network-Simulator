let container = document.getElementById("cy");

let servers = [];

// Event handling in Cytoscape
cy.on("click", (e) => {
    console.log(e.target);
});

window.addEventListener("click", (e) => {
    let newServer = {
        group: "nodes",
        data:{ id: `node${servers.length}`},
        position: {
            x: e.clientX,
            y: e.clientY
        }
    }
    cy.add(newServer);
    servers.push(newServer);
});