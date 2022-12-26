import { create, all, random, forEach, matrix, max, min, e, exp, randomInt } from 'mathjs'

const config = { }
const math = create(all, config)

// - Алгоритм Кнута + генерация массива [1; n] 
function generateRandomArray(n, m) {

    // - Массив вершин
    let vertices = Array.from({ length: n }, (v, i) =>  i + 1)

    // - Массив на выход
    let array = new Array(m*2) //fill(0)

    // - Массив для сбора пар, чтобы исключить петли/повторения
    let pair = []

    // // console.log('vertices', vertices, 'array', array)

    // - Генерим ранд индексы и берём на рандоме из списка вершин 
    for(let i = 0; i < m*2; i++) {
        let changedFlag = false
        array[i] = vertices[Math.floor(random(0, n))]
        
        // - Исключаем петли
        if(i > 0 && (((i+1) % 2 === 0))) {
            while( array[i] === array[i - 1] ) {
                array[i] = vertices[Math.floor(random(0, n))]
                array[i-1] = vertices[Math.floor(random(0, n))]
            }
            //pair.push([math.max([array[i], array[i-1]]), math.min([array[i], array[i-1]])])
            // // console.log('   index', i, array[i], array[i - 1])
        }

    }

    // - Удаляем повторения
    for(let i = 0; i < m*2; i+=2) {
        let fpair = [math.max([array[i], array[i+1]]), math.min([array[i], array[i+1]])]
        let spair = []
        for(let j = 0; j < m*2; j+=2) {
            spair = [math.max([array[j], array[j+1]]), math.min([array[j], array[j+1]])]
            // // console.log('   PAIRS EQ In', fpair, spair)
            while( (fpair[0] === spair[0] && fpair[1] === spair[1] && i != j) || (array[i] === array[i + 1] && typeof array[i] != undefined)) {
                // // console.log(' FOUND EQUAL PAIR', fpair[0] === spair[0], fpair[1] === spair[1], array[i] === array[i + 1], array[i], array[i+1])
                array[i] = vertices[Math.floor(random(0, n))]
                array[i+1] = vertices[Math.floor(random(0, n))]
                spair = [math.max([array[i], array[i+1]]), math.min([array[i], array[i+1]])]
                i-=2
                break
            }            
        }
        // // console.log('   PAIRS EQ OUT', fpair, spair)
        // // console.log('ARRAY FOR NOW', array, 'PAIRS FOR NOW', pair)
    }

    return array
}

// - Сделать из массива в массив пар вершин (=рёбра)
function makePairaFromArray(array) {
    let newArray = []
    if( array.length % 2 != 0 ) array.push(array[0])
    for(let i = 0; i < array.length; i+=2) {
        let pair = []
        pair.push(array[i])
        pair.push(array[i+1])
        newArray.push(pair)
    }
    return newArray
}

// - Возводим матрицу смежности в степень -> если матрица единичная то граф связный
function checkIfConnected(array, n) {
    let matrix = createMatrix(array, n)

    let newMatrix = math.pow(matrix, n)
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if( newMatrix._data[i][j] > 1 ) newMatrix._data[i][j] = 1
        }  
    }

    let onesMatrix = math.ones(n, n)

    // - Возвращает матрицу булевых значений 
    let eqMatrices = math.equal(newMatrix, onesMatrix)
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if( !eqMatrices._data[i][j] ) return false
        }  
    }

    return true
}

// - Сделать матрицу смежности -> array = [ [x, y], [y, z], ... ]
export function createMatrix(array, n) {
    // let matrix = []

    // // - Заполнить матрицу 0
    // for(let i = 0; i < n; i++) {
    //     matrix[i] = new Array(n).fill(0)
    // }

    // for(let i = 0; i < array.length; i++) {
    //     matrix[array[i][0]-1][array[i][1]-1] = 1
    //     matrix[array[i][1]-1][array[i][0]-1] = 1  
    // }
    let matrix = math.zeros(n, n)

    for(let i = 0; i < array.length; i++) {
        matrix._data[array[i][0]-1][array[i][1]-1] = 1
        matrix._data[array[i][1]-1][array[i][0]-1] = 1
    }

    for(let i = 0; i < n; i++) {
        matrix._data[i][i] = 1
    }

    return matrix
}

// - Сделать из последовательного массива чисел массив пар рёбер
function sortArrayToLinkedGraph(array, n) {
    array = makePairaFromArray(array)
    //// // console.log('matrix', matrix)
    return array
}

export function generateGraph(n, m) {
    let array = sortArrayToLinkedGraph(generateRandomArray(n, m), n)
    while(!checkIfConnected(array, n)) array = sortArrayToLinkedGraph(generateRandomArray(n, m), n)
    // // console.log('final array', array)
    // // console.log('check if connected', checkIfConnected(array, n))
    // // // console.log('gnrtd arr', array, 'checkifconnected', checkIfConnected([[1, 2], [2, 3], [3, 4]]))
    return array
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//- Найти все смежне вершины с данной
export function findNextNodes(array, n) {
    let nextNodes = []
    let nextNodesItem = []

    let matrix = createMatrix(array, n)
    //// // console.log(' get matrix', matrix)

    let vertices = Array.from({ length: n }, (v, i) =>  i + 1)

    for(let i = 0; i < matrix._data.length; i++) {
        nextNodesItem = new Array()
        // // console.log('   ROW', matrix._data[i])
        for(let j = 0; j < matrix._data[i].length; j++) {
            // // console.log('   EL', matrix._data[i][j])
            if(matrix._data[i][j] === 1 && i != j) {
                nextNodesItem.push(vertices[j])
            } 
        }
        // // console.log(' tmp array for', i,  nextNodesItem)
        nextNodes.push(nextNodesItem)
        // // console.log(' NEXT NODES IN MATH', nextNodes)
    }
    return nextNodes
}

// - Создать матрциу инцидентности
export function createNextMatrix(array, n) {
    let vertices = Array.from({ length: n }, (v, i) =>  i + 1)

    let matrix = math.zeros(n, array.length)

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < array.length; j++) {
            if(array[j][0] === vertices[i] || array[j][1] === vertices[i]) matrix._data[i][j] = 1
            else matrix._data[i][j] = 0
        }
    }

    return matrix._data
}

// - Вычислить степень вершины -> nextMatrix - матрица инцидентности
export function findNodeDegree(nextMatrix) {
    let degrees = []

    for(let i = 0; i < nextMatrix.length; i++) {
        let count = 0
        // // console.log('   TO MAGRIX XXX', nextMatrix[i])
        for(let j = 0; j < nextMatrix[i].length; j++) {
            if( nextMatrix[i][j] === 1 ) count++
        }
        degrees.push(count)
    }

    console.log(' node degress', degrees)

    return degrees
}

// - Обход графа в глубину по матрице смежности
export function deepSearch(matrix) {
    let visited = []
    let notVisited = []
    let i = 0
    // console.log('   DEEP SEARCH IN', matrix)

    visited.push(1) 
    while(visited.length != matrix.length) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(matrix[i][j] === 1 && !visited.includes(j+1)) {
                visited.push(j+1)
                // console.log('looking for', i)
                // console.log('where', matrix[i])
                i = j
            }
        }
        for(let i = 0; i < matrix.length; i++) {
            if(!visited.includes(i+1)) visited.push(i+1)
        }
    }

    return visited
}

// - Обход графа в ширину по списку смежных вершин
export function widthSearch(array) {
    // console.log('   WIDTH SEARCH IN', array)
    let visited = [], temp, found = false

    // visited.push(1) 
    for(let i = 0; i < array.length; i++) {
        temp = new Array
        for(let j = 0; j < array[i].length; j++) {
            found = false
            for(let z = 0; z < visited.length; z++) {
                if(visited[z].includes(array[i][j])) found = true
            }
            if(!found) temp.push(array[i][j])
        }
        if(temp.length) visited.push(temp)
    }
    for(let i = 0; i < array.length; i++) {

    }

    return visited
}

export function toReadableData(graph) {
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

    return data
}

// - Создать матрицу смежности для ориентированного графа
export function createMatrixOriented(graph, n) {
    let links = toReadableData(graph).links
    let matrix = math.zeros(n, n)

    console.log('links', links)

    for(let i = 0; i < links.length; i++) {
        matrix._data[links[i]['source']-1][links[i]['target']-1] = 1
    }

    return matrix
}

// - Создать матрицу достижимости 
export function createAlignMatrix(nodes, matrix) {
    let resMatrix = matrix 
    let tempMatrix

    for(let i = 2; i < nodes; i++) {
        tempMatrix = math.pow(matrix, i)
        console.log('matrix', matrix, 'in', i, 'is', tempMatrix)
        resMatrix = math.add(tempMatrix, resMatrix)
    }

    return resMatrix
}

// - Транспонировать матрицу 
export function transportMatrix(matrix) {
    let resMatrix = math.zeros(matrix._data.length, matrix._data.length)

    for(let i = 0; i < matrix._data.length; i++) {
        for(let j = 0; j < matrix._data[0].length; j++) {
            resMatrix._data[j][i] = matrix._data[i][j] > 0 ? 1 : 0
        }
    }

    return resMatrix
}

// - Алгоритм Дейкстры
export function AlgorithmDejkstra(matrix, v) {
    let start = v
    // - Расстояния от данной вершины до другой
    var distances = [];
    // - Заполняем массив расстояний макс числами
    for (var i = 0; i < matrix.length; i++) distances[i] = Number.MAX_VALUE;
    // - Начинаем с нуля
    distances[start] = 0;

    // - Прошли ли мы через вершину
    var visited = [];

    while (true) {
        // Найти вершину с кратчашим расстоянием к данной
        var shortestDistance = Number.MAX_VALUE;
        var shortestIndex = -1;
        for (var i = 0; i < matrix.length; i++) {
            // - Через все вершины которые не посетили
            if (distances[i] < shortestDistance && !visited[i]) {
                shortestDistance = distances[i];
                shortestIndex = i;
            }
        }

        if (shortestIndex === -1) {
            // - Если кончились вершины
            console.log(`\tDISTANCE -> ${distances}`)
            return distances;
        }

        // - Для соседних вершин
        for (var i = 0; i < matrix[shortestIndex].length; i++) {
            // - Если через эту вершину ближе
            if (matrix[shortestIndex][i] !== 0 && distances[i] > distances[shortestIndex] + matrix[shortestIndex][i]) {
                // - Сделать её новой кратчайшей
                distances[i] = distances[shortestIndex] + matrix[shortestIndex][i];
            }
        }
        // Lastly, note that we are finished with this node.
        visited[shortestIndex] = true;
    }
}

export function LoopDejkstra(matrix, n) {
    let allDistances = []
    let vertices = Array.from({ length: n }, (v, i) =>  i + 1)

    for(let i = 0; i < vertices.length; i++) {
        allDistances[i] = AlgorithmDejkstra(matrix, i)
    }

    return allDistances
}

export function AlgorithmBellmanFord(matrix, src) {
    // - Массив расстояний 
    var current_lengths = Array(matrix.length).fill(0);
 
    // Relax all edges |V| - 1 times. A simple
    // shortest path from src to any other
    // vertex can have at-most |V| - 1 edges
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let left_index = 0; left_index < matrix.length; left_index++) {
            for (let right_index = 0; right_index < matrix.length; right_index++) {
                if (matrix[left_index][right_index] != 0) {
                    if (((current_lengths[right_index] > current_lengths[left_index] + matrix[left_index][right_index]) && (current_lengths[left_index] != 0)) || 
                        ((current_lengths[right_index] == 0) && (right_index != src) && (current_lengths[left_index] != 0)) || (left_index == src)) {
                        current_lengths[right_index] = current_lengths[left_index] + matrix[left_index][right_index];
                    }
                }       
            }
        }
    }

    console.log(`\n DISTANCE for ${src} - ${current_lengths}`)
    return current_lengths
}

export function LoopBellmanFord(matrix, n) {
    let allDistances = []
    let vertices = Array.from({ length: n }, (v, i) =>  i + 1)

    for(let i = 0; i < vertices.length; i++) {
        allDistances[i] = AlgorithmBellmanFord(matrix, i)
    }

    return allDistances
}