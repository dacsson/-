import '../App.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return(
        <div class='container'>
            <div class='canvas' style={{
                top: '10%',
                left: '15%',
                padding: '15px',
                width: '20%',
                textAlign: 'center'
            }}>
                <h1>Алгоритмы на графах</h1>
                <h2>Лабораторные работы</h2>
                <div style={{
                    marginTop: "15px",
                    marginBottom: "20px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    textAlign: "center",
                    borderBottom: '5px solid var(--gray)',
                    borderRadius: '15px'
                }}></div>
                <button onClick={() => navigate('/1') }>Лабораторная работа 1</button>
                <button onClick={() => navigate('/2') }>Лабораторная работа 2</button>
                <button onClick={() => navigate('/3') } style={{ marginLeft: '0px', marginTop: '5%' }}>Лабораторная работа 3</button>
                <button onClick={() => navigate('/4') }>Лабораторная работа 4</button>
            </div>
        </div>
    )
}

export default Home