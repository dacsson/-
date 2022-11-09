import React, { Component } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis} from "recharts";
import { create, all } from 'mathjs'
import { generateGraph, toReadableData } from "./Math";
import { useRef, useEffect } from "react";
import ForceGraph2D from 'react-force-graph-2d'

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

export const VisGraph = props => {
    let graph = props.graph
    let isOriented = props.isOriented
    let arrowWidth = isOriented ? 10 : 0
    const forceRef = useRef()
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-700);
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
            linkDirectionalArrowLength={arrowWidth}
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