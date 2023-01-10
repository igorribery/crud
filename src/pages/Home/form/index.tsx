import { Button, Form } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Iform from "../../../types/Iform";
import './index.css'



const UsersForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [model, setModel] = useState<Iform>({
        name: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
      if (id !== undefined) {
        findUser(id)
      }
      
    }, [id]);


    const updatedModel = (e: ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (id !== undefined) {
        
            await api.put(`/user/${id}`, model)
            
            
        } else {

            
            await api.post('/user', model)
            
        }
        goBack();          
    }

    async function findUser (id?: string) {
        let response = await api.get(`/user/${id}`)
        setModel({
            name: response.data.name,
            lastName: response.data.lastName,
            email: response.data.email
        })
    }

     const goBack = () => {
        navigate("/")
    }

    
    

    return (
        <div className="container">
            <div className="task-header">
                <h3> New User </h3>
                <Button variant="dark" size="lg" onClick={goBack}>Voltar</Button>
            </div>
            <div className="container">
            <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3 form-control-lg" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control size="lg" type="text" name="name" value={model.name} placeholder="Enter name" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3 form-control-lg"  >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size="lg" type="text" name="lastName" value={model.lastName} placeholder="Enter last name" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} required/>
                    </Form.Group>

                    <Form.Group className="mb-3 form-control-lg" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control size="lg" type="email" placeholder="your@email.com" name="email" value={model.email} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} required />
                    </Form.Group>
                    <Button variant="dark" size="lg" type="submit"> Submit </Button>
            </Form>
            </div>

            
        </div>
    )
}

export default UsersForm;