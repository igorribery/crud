import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import UsersForm from './pages/Home/form';

const Rotas = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user_cadastro' element={<UsersForm />} />
            <Route path='/user_cadastro/:id' element={<UsersForm />} />
        </Routes>
    )
}

export default Rotas;