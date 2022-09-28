import React, { Component } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis} from "recharts";
import { create, all } from 'mathjs'
import { generateGraph, onlyUnique } from "./Math";
import { useRef, useEffect } from "react";
import ForceGraph2D from 'react-force-graph-2d';

import '../App.css'

const config = { }
const math = create(all, config)

export class Graph {
    constructor(n, m) {
        this.empty = false
        this.vertices = n
        this.ribs = m
        this.nodes = generateGraph(n, m)
    }
}

var dataOG = {
    nodes: [
        { id: 'A'},
        { id: 'B' },
        { id: 'C' }
    ],
    links: [
        { source: 'A', target: 'B', value: 6 },
        { source: 'A', target: 'C', value: 6 }
    ]
}

function toReadableData(graph) {
    let unpairedArray = []
    for(let i = 0; i < graph.nodes.length; i++) {
        unpairedArray.push(graph.nodes[i][0])
        unpairedArray.push(graph.nodes[i][1])
    }

    let data = [], nodes = [], links = [], vertices = Array.from({ length: graph.vertices }, (v, i) =>  i + 1)
    
    for(let i = 0; i < graph.vertices; i++) {
        nodes.push(
            { id:  JSON.stringify(vertices[i]), name: JSON.stringify(vertices[i])}
        )
    }

    for(let i = 0; i < graph.nodes.length; i++) {
        links.push(
            { source: JSON.stringify(graph.nodes[i][0]), target: JSON.stringify(graph.nodes[i][1]) }
        )
    }

    data = {
        nodes: nodes,
        links: links
    }

    console.log('INCOMING DATA', data, 'ORIGINAL DATA', dataOG)

    return data
}

export const VisGraph = props => {
    let graph = props.graph
    let width, height
    const forceRef = useRef()
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-200);
    });

    console.log(toReadableData(graph))

    return(
        <ForceGraph2D
            width={750}
            height={500}
            graphData={toReadableData(graph)}
            backgroundColor="none"
            linkAutoColorBy='group'
            linkColor='white'
            nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                ctx.fillStyle = 'white'
                let x = node.x
                let y = node.y
                ctx.fillText(label, node.x, node.y)
            }}
            ref={forceRef}
        />
    )
}