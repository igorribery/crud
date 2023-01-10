import { BrowserRouter } from 'react-router-dom';

import Rotas from './routes';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Rotas />
    </BrowserRouter>
  )
}

export default App;
