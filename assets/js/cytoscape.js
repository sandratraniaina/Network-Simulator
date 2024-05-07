const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [], 
    layout: {
        name: 'grid' 
    },
    style: [
        {
            selector: 'node',
            style: {
                backgroundColor: '#66bbcc',
                shape: 'circle',
                label: 'data(id)', 
                color: 'black',
                fontSize: 16,
                padding: 10,
                textMargin: 4
            }
        },
        {
            selector: 'edge',
            style: {
                width: 2,
                lineColor: '#ccc',
                targetArrowShape: 'triangle'
            }
        },
        {
            selector: 'node:selected', 
            style: {
                "border-color": "grey",
                "border-width": 2
            }
        }, 
        {
            selector: 'node:unselected',
            style: {
                backgroundColor: '#66bbcc',
                shape: 'circle',
                label: 'data(id)', 
                color: 'black',
                fontSize: 16,
                padding: 10,
                textMargin: 4
            }
        }
    ]
});