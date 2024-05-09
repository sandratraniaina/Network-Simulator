let searchBtn = document.getElementById("search_btn");
let refreshBtn = document.getElementById("refresh_btn");

const refreshUI = () => {
    let nodes = cy.elements("node");

    nodes.forEach((node) => {
        node.removeClass("path");
    });

    let edges = cy.elements("edge");

    edges.forEach((edge) => {
        edge.removeClass("path");
    });
}

const getEdgeId = (path) => {
    let ids = [];
    path.forEach((way) => {
        ids.push(way.connections.map((connection) => connection.id));
    });
    return Array.from(new Set(ids.flat()));
};

const getOnServer = (nodes = servers) => {
    return nodes.filter((node) => {
        return node.isOn;
    })
}

const search = (website) => {
    refreshUI();
    if (selected != null) {
        let onNode = getOnServer(servers);

        let path = findShortestPath(selected, website, onNode);
        let edges = getEdgeId(path);

        path.forEach((server) => {
            cy.getElementById(server.ip).addClass("path");
        });

        edges.forEach((edge) => {
            let temp = cy.getElementById(edge);
            temp.addClass("path");
        })
    } else {
        alert("Please, choose one starting point");
        return;
    }
}

searchBtn.addEventListener("click", () => {
    let url = document.getElementById("url").value;
    if (url != "" && url != null) {
        search(url);
    } else {
        alert("Fill up search bar");
    }
})

refreshBtn.addEventListener("click", () => {
    refreshUI();
});
 
const findShortestPath = (startNode, website, servers) => {
    let distances = {};
    let previousNodes = {};
    let unvisitedNodes = new Set();

    for (let node of servers) {
        distances[node.ip] = Infinity;
        previousNodes[node.ip] = null;
        unvisitedNodes.add(node);
    }
    distances[startNode.ip] = 0;

    while (unvisitedNodes.size > 0) {
        let currentNode = Array.from(unvisitedNodes).reduce((a, b) => distances[a.ip] < distances[b.ip] ? a : b);

        if (currentNode.websites.includes(website)) {
            let path = [];
            while (currentNode !== null) {
                path.unshift(currentNode);
                currentNode = previousNodes[currentNode.ip];
            }
            return path;
        }

        unvisitedNodes.delete(currentNode);

        for (let connection of currentNode.connections) {
            let altDistance = distances[currentNode.ip] + connection.latency;
            if (altDistance < distances[connection.node.ip]) {
                distances[connection.node.ip] = altDistance;
                previousNodes[connection.node.ip] = currentNode;
            }
        }
    }

    return null;
}
