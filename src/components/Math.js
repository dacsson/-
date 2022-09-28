import { create, all, random, forEach, matrix, max, min, e } from 'mathjs'

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

    console.log('vertices', vertices, 'array', array)

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
            console.log('   index', i, array[i], array[i - 1])
        }

    }

    // - Удаляем повторения
    for(let i = 0; i < m*2; i+=2) {
        let fpair = [math.max([array[i], array[i+1]]), math.min([array[i], array[i+1]])]
        let spair = []
        for(let j = 0; j < m*2; j+=2) {
            spair = [math.max([array[j], array[j+1]]), math.min([array[j], array[j+1]])]
            console.log('   PAIRS EQ In', fpair, spair)
            while( (fpair[0] === spair[0] && fpair[1] === spair[1] && i != j) || (array[i] === array[i + 1] && typeof array[i] != undefined)) {
                console.log(' FOUND EQUAL PAIR', fpair[0] === spair[0], fpair[1] === spair[1], array[i] === array[i + 1], array[i], array[i+1])
                array[i] = vertices[Math.floor(random(0, n))]
                array[i+1] = vertices[Math.floor(random(0, n))]
                spair = [math.max([array[i], array[i+1]]), math.min([array[i], array[i+1]])]
                i-=2
                break
            }            
        }
        console.log('   PAIRS EQ OUT', fpair, spair)
        console.log('ARRAY FOR NOW', array, 'PAIRS FOR NOW', pair)
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

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}