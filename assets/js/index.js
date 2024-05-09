let container = document.getElementById("cy");

let startServer = document.getElementById("start");

let servers = [];
let edges = [];

let selected;

const getServer = (ip) => {
    return servers.filter((server) => {
        return server.ip == ip;
    })[0];
};

const updateServerInformation = (node = selected) => {
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

    let newLink = {
        group: 'edges',
        data: { id: edges.length, source: source, target: target, weight: ping }
    };

    let sourceNode = getServer(source);
    let targetNode = getServer(target);

    sourceNode.connections.push({
        node: targetNode,
        latency: parseInt(ping)
    });
    targetNode.connections.push({
        node: sourceNode,
        latency: parseInt(ping)
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

const newServer = (x, y, ip, webSites) => {
    let newServer = {
        group: "nodes",
        data: { id: `${ip}` },
        position: {
            x: parseInt(x),
            y: parseInt(y)
        },
        ip: ip,
        websites: webSites,
        connections: []
    };
    cy.add(newServer);
    servers.push(newServer);
    resetForm(1);
    let serversInfo = basicServerInfo();
    updateDropDown("start", serversInfo);
    updateDropDown("end", serversInfo);
}

const deleteNode = () => {
    if (selected != null) {
        cy.remove(`node[id = "${selected.ip}"]`);
        servers = servers.filter((server) => {
            return server.ip != selected.ip
        });
        selected = {
            ip: "No selected server",
            websites: []
        };
        updateServerInformation();
        updateDropDown("start", basicServerInfo());
        updateDropDown("end", basicServerInfo());
    }
}

try {
    cy.on('tap', function (e) {
        var evtTarget = e.target;

        if (evtTarget !== cy) {
            // TODO : Handle when do not click on empty area
            selected = servers.filter((server) => server.ip == evtTarget.id())[0];
            console.log(servers);
            console.log(selected);
            updateServerInformation();
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

        newServer(x, y, ip, webSites);
    });

    startServer.addEventListener("change", (e) => {
        let dropDown = e.target;
        if (dropDown.value != null) {

        }
    });

    linkBtn.addEventListener("click", () => {
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
    })
} catch (error) {
    alert(error);
}
