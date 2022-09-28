import { create, all, random, forEach, matrix } from 'mathjs'

const config = { }
const math = create(all, config)

// - Алгоритм Кнута + генерация массива [1; n] 
function generateRandomArray(n) {
    let array = Array.from({ length: n }, (v, i) =>  i + 1)

    let currentIndex = n, randomIndex

    while( currentIndex != 0 ) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    
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

export function generateGraph(n) {
    let array = sortArrayToLinkedGraph(generateRandomArray(n), n)
    console.log('check if connected', checkIfConnected([[1, 2], [2, 3], [4, 5]], 5))
    // console.log('gnrtd arr', array, 'checkifconnected', checkIfConnected([[1, 2], [2, 3], [3, 4]]))
    return array
}
