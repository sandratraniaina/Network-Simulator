let container = document.getElementById("cy");

let startServer = document.getElementById("start");

let edges = [];
let servers = [];

let selected;

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

const isLinked = (sourceNode, targetNode) => {
    var edges = cy.edges("[source='" + sourceNode + "'][target='" + targetNode + "']")
        .union(cy.edges("[source='" + targetNode + "'][target='" + sourceNode + "']"));
    return edges.length > 0;
}

const newLink = (source, target, ping) => {
    if (isLinked(source, target)) {
        alert("Those nodes are already linked");
        return;
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

    console.log(servers);

    edges.push(newLink);
    cy.add(newLink);
}

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
        selected = null;
        updateServerInformation(selected);
        updateDropDown("start", basicServerInfo());
        updateDropDown("end", basicServerInfo());
    }
}

const loadData = (data) => {
    for (const value of data) {
        let temp = getServerObject(value.positions.x, value.positions.y, value.ip, value.websites);
        console.log(temp);
        newServer(temp);
    }
}

cy.on('tap', function (e) {
    var evtTarget = e.target;

    if (evtTarget !== cy) {
        // TODO : Handle when do not click on empty area
        selected = servers.filter((server) => server.ip == evtTarget.id())[0];
        console.log(servers);
        console.log(selected);
        updateServerInformation(selected);
    } else {
        cy.elements().unselect();
        selected = {
            ip: "No selected server",
            websites: []
        };
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
    deleteNode();
});

powerOffBtn.addEventListener("click" , (e) => {
    e.preventDefault();

    if (selected != null && selected != undefined) {
        cy.getElementById(selected.ip).toggleClass("off");
        powerOffBtn.classList.toggle("disabled");
        selected.isOn = !selected.isOn;
    }
});