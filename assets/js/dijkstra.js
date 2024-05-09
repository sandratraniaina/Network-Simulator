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

const search = (website) => {
    if (selected.websites.length > 0) {
        let path = findShortestPath(selected, website);

        path.forEach((server) => {
            cy.getElementById(server.ip).addClass("path");
        });
    }
}

searchBtn.addEventListener("click", () => {
    let url = document.getElementById("url").value;
    if (url != "" && url != null) {
        search(url);
    }
})

refreshBtn.addEventListener("click", () => {
    refreshUI();
});
 
const findShortestPath = (startNode, website) => {
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
