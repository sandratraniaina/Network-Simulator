let container = document.getElementById("cy");

let startServer = document.getElementById("start");

let servers = [];
let edges = [];
let links = [];

let selected;

const updateServerInformation = () => {
    let ip = document.querySelector(".info__ip-adress");
    let site = document.querySelector(".info_websites");

    ip.innerHTML = "";
    site.innerHTML = "";

    ip.textContent = selected.ipAdress;

    for (const s of selected.sites) {
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


const newLink = () => {
    let startServer = document.getElementById("start").value;
    let endServer = document.getElementById("end").value;
    let ping = document.getElementById("ping").value;

    if (isLinked(startServer, endServer)) {
        alert("Those nodes are already linked");
        return;
    } else if (startServer == endServer) {
        alert("Cannot link to itsself");
        return;
    }

    let newLink = {
        group: 'edges',
        data: { id: edges.length, source: startServer, target: endServer, weight: ping }
    };

    edges.push(newLink);
    cy.add(newLink);
}

const basicServerInfo = () => {
    return servers.map((server, index) => {
        return {
            value: server.ipAdress,
            text: server.ipAdress
        }
    });
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
        sites: webSites
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
        cy.remove(`node[id = "${selected.ipAdress}"]`);
        servers = servers.filter((server) => {
            return server.ipAdress != selected.ipAdress
        });
        selected = {
            ipAdress: "No selected server",
            sites: []
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
            selected = servers.filter((server) => server.ipAdress == evtTarget.id())[0];
            console.log(servers);
            console.log(selected);
            updateServerInformation();
        } else {
            cy.elements().unselect();
            selected = {
                ipAdress: "No selected server",
                sites: []
            };
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
    
    linkBtn.addEventListener("click", () => {
        newLink();
    });
    
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteNode();
    })
} catch (error) {
    alert(error);
}
