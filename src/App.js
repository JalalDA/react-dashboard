import LayoutDashboard from './layouts/LayoutDashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Warehouse from './components/Warehouse';
import WarehouseDetail from './components/WarehouseDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <LayoutDashboard>
            <Warehouse/>
          </LayoutDashboard>
        }/>
        <Route path='/warehouse/:id' element={
          <LayoutDashboard>
            <WarehouseDetail/>
          </LayoutDashboard>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
