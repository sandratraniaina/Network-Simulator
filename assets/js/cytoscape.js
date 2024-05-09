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
                width: 5,
                lineColor: '#ccc',
                targetArrowShape: 'triangle',
                label: 'data(weight)'
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
            selector: '.path',
            style: {
                "background-color": "green",
            }
        }
    ]
});
