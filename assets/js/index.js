let container = document.getElementById("cy");
let startServer = document.getElementById("start");

let edges = [];
let servers = [];

let selected, selectedEdge = null;

//Node and server functions
const basicServerInfo = () => {
    return servers.map((server, index) => {
        return {
            value: server.ip,
            text: server.ip
        }
    });
}

const getServerObject = (x, y, ip, webSites) => {
    return {
        group: "nodes",
        data: { id: `${ip}` },
        position: {
            x: parseInt(x),
            y: parseInt(y)
        },
        ip: ip,
        websites: webSites,
        connections: [],
        isOn: true
    };
}

const newServer = (server) => {
    cy.add(server);
    servers.push(server);
    resetForm(1);
    let serversInfo = basicServerInfo();
    updateDropDown("start", serversInfo);
    updateDropDown("end", serversInfo);
}

const deleteNode = (node = selected) => {
    if (node != null) {
        cy.remove(`node[id = "${node.ip}"]`);

        servers = servers.filter((server) => {
            return server.ip != node.ip
        });

        servers.forEach((server) => {
            server.connections = server.connections.filter((connection) => {
                return connection.node.ip != node.ip;
            });
        })

        selected = null;
        updateServerInformation(selected);
        updateDropDown("start", basicServerInfo());
        updateDropDown("end", basicServerInfo());
    }
}

const getServer = (ip) => {
    return servers.filter((server) => {
        return server.ip == ip;
    })[0];
};

const updateServerInformation = (node = selected) => {
    if (node == null) {
        node = {
            ip: "No node server",
            websites: []
        };
    }
    let ip = document.querySelector(".info__ip-adress");
    let site = document.querySelector(".info_websites");

    ip.innerHTML = "";
    site.innerHTML = "";

    ip.textContent = node.ip;

    for (const s of node.websites) {
        let li = document.createElement("li");
        li.textContent = s;
        site.appendChild(li);
    }
    if ((selected != null && selected != undefined && selected.isOn) || selected == null) {
        powerOffBtn.classList.add("disabled");
    } else {
        powerOffBtn.classList.remove("disabled");
    }
}

// Edges and server link functions
const getEdge = (id) => {
    return edges.filter((edge) => {
        return edge.data.id == id;
    })[0];
}

const isLinked = (sourceNode, targetNode) => {
    var edges = cy.edges("[source='" + sourceNode + "'][target='" + targetNode + "']")
        .union(cy.edges("[source='" + targetNode + "'][target='" + sourceNode + "']"));
    return edges.length > 0;
}

const newLink = (source, target, ping) => {
    if (isLinked(source, target)) {
        let prompt = confirm("Do you want to update?");
        if (prompt) {
            removeLink(source, target);
        } else {
            alert("Those nodes are already linked");
            return;
        }

    } else if (source == target) {
        alert("Cannot link to itsself");
        return;
    }

    let linkId = edges.length;
    let newLink = {
        group: 'edges',
        data: { id: linkId, source: source, target: target, weight: ping }
    };

    let sourceNode = getServer(source);
    let targetNode = getServer(target);

    sourceNode.connections.push({
        node: targetNode,
        latency: parseInt(ping),
        id: linkId
    });
    targetNode.connections.push({
        node: sourceNode,
        latency: parseInt(ping),
        id: linkId
    });

    edges.push(newLink);
    cy.add(newLink);
    console.log(newLink);
}

const removeLink = (source, target) => {
    let edgeNode = cy.$(`edge[source="${source}"][target="${target}"]`);
    cy.remove(edgeNode);

    let sourceNode = getServer(source);
    let targetNode = getServer(target);

    sourceNode.connections = sourceNode.connections.filter((connection) => {
        connection.node.ip != target;
    });
    targetNode.connections = targetNode.connections.filter((connection) => {
        connection.node.ip != source;
    });

    edges = edges.filter((edge) => {
        edge.data.id != edgeNode.id();
    });
}

const handleEdge = (e) => {
    let edge = e.target;
    if (selectedEdge != null && edge.id() == selectedEdge.data.id) {
        let conf = confirm("Do you want to delete this edge");
        if (conf) {
            removeLink(selectedEdge.data.source, selectedEdge.data.target);
            selectedEdge = null;
        }
    } else {
        selectedEdge = getEdge(edge.id());
    }
};

//Load default data
const loadData = (data) => {
    for (const value of data) {
        let temp = getServerObject(value.positions.x, value.positions.y, value.ip, value.websites);
        newServer(temp);
    }
}

// Listener
cy.on('tap', function (e) {
    var evtTarget = e.target;

    if (evtTarget !== cy) {
        if (evtTarget.isEdge()) {
            console.log("Its an edge");
            handleEdge(e);
        } else {
            selected = servers.filter((server) => server.ip == evtTarget.id())[0];
            updateServerInformation(selected);
        }
    } else {
        cy.elements().unselect();
        selected = null;
        updateNewServerForm(e.position);
        updateServerInformation(selected);
    }
});

addBtn.addEventListener("click", () => {
    let x = document.getElementById("x").value;
    let ip = document.getElementById("ip_adress").value;
    let y = document.getElementById("y").value;
    let webSites = document.getElementById("websites").value.split(";");
    if (x == null || y == null || webSites == null || ip == "") {
        alert("Input all data");
        return;
    }

    let server = getServerObject(x, y, ip, webSites);

    newServer(server);
});

linkBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!checkForm("link_form")) {
        alert("Fill up all data");
        return;
    }

    let source = document.getElementById("start").value;
    let target = document.getElementById("end").value;
    let ping = document.getElementById("ping").value;

    newLink(source, target, ping);
});

deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteNode(selected);
});

powerOffBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (selected != null && selected != undefined) {
        cy.getElementById(selected.ip).toggleClass("off");
        powerOffBtn.classList.toggle("disabled");
        selected.isOn = !selected.isOn;
    }
});