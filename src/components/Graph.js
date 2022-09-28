import React, { Component } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis} from "recharts";
import { create, all } from 'mathjs'
import { generateGraph } from "./Math ";
import '../App.css'

const config = { }
const math = create(all, config)

export default class Graph {
    constructor(n, m) {
        this.empty = false
        this.size = n
        this.nodes = generateGraph(n, m)
    }
}