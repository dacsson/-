import { create, all, random, forEach, matrix } from 'mathjs'

const config = { }
const math = create(all, config)

// - Алгоритм Кнута + генерация массива [1; n] 
function generateRandomArray(n, m) {

    let vertices = Array.from({ length: n }, (v, i) =>  i + 1)
    let array = new Array(m).fill(0)
    let randomIndex = Math.floor(random(0, n-1))
    let randomIndexes = []
    console.log('vertices', vertices, 'array', array)

    // - Генерим ранд индексы и берём на рандоме из списка вершин 
    for(let i = 0; i < m; i++) {
        randomIndexes.push(randomIndex)
        array[i] = vertices[randomIndex]
        randomIndex = Math.floor(random(0, n))
        //while(randomIndexes.includes(randomIndex)) randomIndex = Math.floor(random(0, n-1))
        console.log('GENERATING', array[i], 'RAND INDEXES', randomIndexes, 'ARRAY', array)
    }

    // - Добавить недостающие вершины
    for(let i = 0; i < n; i++) {
        if(!array.includes(vertices[i])) {
            array.push(vertices[i])
        }
    }


    for(let)

    // let currentIndex = n, randomIndex

    // while( currentIndex != 0 ) {
    //     randomIndex = Math.floor(Math.random() * currentIndex)
    //     currentIndex--
        
    //     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    // }

    return array
}

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

function splitPairedArray(array, index) {
    let newArray = []
    //console.log('index', index)
    for(let i = index; i < array.length; i++) {
        newArray.push(array[i])
        //console.log('pushing forward', array[i], 'i', i, 'index', index, 'to', array.length-index)
    }
    for(let i = 0; i < index; i++) {
        newArray.push(array[i])
        console.log('pushing backwards', array[i])
    }
    
    return newArray
}

function countUniqueElementsInArray(array) {
    var tmp = []
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < 2; j++) {
            tmp.push(array[i][j])
        }
    }
    var set = new Set(tmp)
    console.log('SET', set)
    return set.size
}

// - Обход графа одним элементом
function graphTraversal(array, el, index) {
    array = splitPairedArray(array, index)
    console.log('IN splitted arr', array)
    let foundVertices = []
    let firstEl = el
    //if(array[0][1] === el || array[array.length-1][1] === array[0][0]) foundVertices.push(array[0][0])
    for(let i = 0; i < array.length; i++) {
        console.log('checking', array[i], 'for', el)
        if((array[i][0] === el || array[i][1] === el)&& array[i][1] != firstEl) {
            foundVertices.push(array[i][1])
            el = array[i][1]    
        }
    }
    foundVertices.push(firstEl)
    console.log('found v', foundVertices)
    return foundVertices
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
function createMatrix(array, n) {
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
    //console.log('matrix', matrix)
    return array
}

export function generateGraph(n, m) {
    let array = sortArrayToLinkedGraph(generateRandomArray(n, m), n)
    while(!checkIfConnected(array, n)) array = sortArrayToLinkedGraph(generateRandomArray(n, m), n)
    console.log('final array', array)
    console.log('check if connected', checkIfConnected(array, n))
    // console.log('gnrtd arr', array, 'checkifconnected', checkIfConnected([[1, 2], [2, 3], [3, 4]]))
    return array
}
