import '../App.css'
import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPen, faFile, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import Graph from '../components/Graph';
import { create, all } from 'mathjs'
import Draggable from 'react-draggable'

const Task1 = () => {

    const config = { }
    const math = create(all, config)

    const [backendData, setBackendData] = useState([{}])

    const [widgetList, setWidgetList] = useState([

    ])

    const [showFWindow, setShowFWindow] = useState([{}])
    const [showSWindow, setShowSWindow] = useState([{}])

    const [H, setH] = useState([])
    const [scheme, setScheme] = useState([])
    const [N, setN] = useState([])
    const [graph, setGraph] = useState([])

    const showFrist = (index) => {
        const list = [...widgetList]
        list.pop()
        list.push({widget: "first"})
        setWidgetList(list)
    }
    
    const showSecond = (index) => {
        const list = [...widgetList]
        list.pop()
        list.push({widget: "second"})
        setWidgetList(list)
    }
    
    const showThird = (index) => {
        const list = [...widgetList]
        list.pop()
        list.push({widget: "third"})
        setWidgetList(list)    
    }

    const showWindow = (index, signal) => {
        switch (index) {
            case 0:
                var list = [...showFWindow]
                list.pop()
                if(signal) list.push({state: 'show'})
                else list.push({state: 'hide'})
                setShowFWindow(list)
                break;
            case 1:
                var list = [...showSWindow]
                list.pop()
                if(signal) list.push({state: 'show'})
                else list.push({state: 'hide'})
                setShowSWindow(list)
                break;
        }

    }

    useEffect(() => {
        const list = []
        list.push({
            first: 'Генерируется случайный связный неориентированный граф без петель и кратных рёбер в одном из четырёх представлений. Сгенерировать связный граф, представив его как список рёбер, затем: 1. Преобразовать в список смежных вершин 2. Преобразовать в матрицу инцидентности. Вычисляются степени вершин. ', 
            second: 'Событие А в каждом из независимых испытаний происходит с вероятностью р. Найти энтропию числа испытаний до первого появления события А. Составить соответствующую вероятностную схему. Выяснить характер изменения энтропии в зависимости от изменения р на промежутке (0;1], построив график соответствующей функции H(р). Определить её наименьшее и наибольшее значение.', 
            third: 'third task'})
        setBackendData(list)
        
        var G = new Graph(5, 5)
        console.log('graph genering', G)
        setGraph(G)
        console.log('graph generated', graph.nodes)

        const stateList = [{ state: 'hide' }]
        setShowFWindow(stateList)
        setShowSWindow(stateList)
    }, [])

    function changeData(value) {

    }

    return(
        <div class='container'>
            <div class="sidebar">
                <div class="profile">
                    <input type='number' onChange={(e) => changeData(e.target.value)}/>
                </div>

                <div class="menu">
                <button onClick={() => showFrist(0)}>
                    <FontAwesomeIcon icon={faPen} size='sm'></FontAwesomeIcon>
                    <a>Задание 1</a>
                </button>
                <button onClick={() => showSecond(1)}>
                    <FontAwesomeIcon icon={faPen} size='sm'></FontAwesomeIcon>
                    <a>Задание 2</a>
                </button>
                <button onClick={() => showThird(2)}>
                    <FontAwesomeIcon icon={faPen} size='sm'></FontAwesomeIcon>
                    <a>Задание 3</a>
                </button>
                </div>
                
                { widgetList.map((singleWidget, index) => (
                    <div class="wrapper" key={index}>
                        {(singleWidget.widget === 'first') ? (
                            backendData.map((task, i) => (
                                <div class="match-result" key={i}>
                                    {task.first}
                                </div>
                            ))  
                        ): (
                        (singleWidget.widget === 'second') ? (
                            backendData.map((task, i) => (
                                <div class="match-result" key={i}>
                                    {task.second}
                                </div>
                            ))                              
                        ): (
                            backendData.map((task, i) => (
                                <div class="match-result" key={i}>
                                    {task.third}
                                </div>
                            ))                              
                        )
                        )} 
                    </div>
                )) }
                {console.log(widgetList)}
                {console.log(backendData)}

                <div class="footer">
                V1.0 25.08.2022
                </div>
                
            </div>

            { showFWindow.map((object, index) => (
                <div>
                { object.state === 'show' && 
                <Draggable defaultClassName='canvas' handle='#handle'>
                <div class='canvas' id='canv' key={index}>
                    <div class='handle' id='handle'>
                        <button onClick={() => showWindow(0, 0)}><FontAwesomeIcon icon={faWindowMinimize} size='sm'></FontAwesomeIcon></button>
                        <a>Представление</a>
                    </div>
                    {N.length > 0 &&
                    <div class='tables'>
                        <div class='scheme'>
                            {N.map((i, index) => (
                                <div class='rowN' key={index}>
                                    <div class='el'>{i}</div>
                                </div>
                            ))}
                            <br></br>            
                            {scheme.map((i, index) => (
                                <div>
                                {i.map((item, k) => (
                                    <div class='rowP' key={k}>
                                        <div class='el'>{math.round(item, 6)}</div>
                                    </div>
                                ))}
                                </div>                                        
                            ))}
                        </div>  
                        <div class='tableH'>
                        {H.map((i, index) => (
                                <div class='rowP' key={index}>
                                        <div class='el'>{math.round(i, 6)}</div>
                                </div>                                       
                            ))}  
                        </div>
                    </div>} 
                </div>
                </Draggable> }
                </div>
            ))}

            { showSWindow.map((object, index) => (
                <div>
                { object.state === 'show' && 
                <Draggable defaultClassName='canvas-graph' handle='#handle'>
                    <div class='canvas-graph' key={index}>
                        <div class='handle' id='handle'>
                            <button onClick={() => showWindow(1, 0)}><FontAwesomeIcon icon={faWindowMinimize} size='sm'></FontAwesomeIcon></button>
                            <a>Граф</a>
                        </div>              
                        <div class='graph-wrapper'>
                            {/* <React.Fragment>
                                <Graph/>   
                            </React.Fragment> */}
                            {  }
                        </div>   
                        </div> 
                </Draggable> }
                </div>
            ))}

            <div class='panel'>
                <button onClick={() => showWindow(0, 1)}><FontAwesomeIcon icon={faFile} size='lg'></FontAwesomeIcon></button>
                <button onClick={() => showWindow(1, 1)}><FontAwesomeIcon icon={faFile} size='lg'></FontAwesomeIcon></button>
            </div>
        </div>
    )
}

export default Task1