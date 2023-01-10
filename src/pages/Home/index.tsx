import { Button, Table } from "react-bootstrap";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import Iuser from "../../types/Itask";
import './index.css'

const Home = () => {

    const [user, setUser] = useState<Iuser[]>([]);
    const navigate = useNavigate();
    
 

    useEffect(() => {
        loadUsers()
    }, [])
    
    const loadUsers = async ()  => {
        try {
            const response = await api.get('/user');
            setUser(response.data)

        } catch(e) {
            alert(e);
        }
    }

    const newUser = () => {
        navigate("/user_cadastro")
    }

    const editUser = (id: number) => {
        navigate(`/user_cadastro/${id}`)
    }

    const handleDelete = async (id: number) => {
        await api.delete(`/user/${id}`)
        setUser(user.filter(user => user.id !== id))
    }


    return (
        <div className="container">
            <div className="task-header">
                <h1>Home Page</h1>
                <Button variant="dark" size="sm" onClick={newUser}>New Task</Button>
            </div>

            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        user.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button className="m-1" size="sm" onClick={() => editUser(user.id)}> Editar </Button>
                            <Button className="m-1" size="sm" variant="danger" onClick={() => handleDelete(user.id)}> Remover </Button>
                        </td>
                    </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Home;