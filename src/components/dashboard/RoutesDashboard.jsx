import { Routes, Route } from "react-router-dom";
import { Cliente } from '../cliente/Cliente';
import { Producto } from '../producto/Producto';

export const RoutesDashboard = () => {
    return (
        <Routes>
            <Route path="cliente" element={<Cliente />} />
            <Route path="producto" element={<Producto />} />
        </Routes>
    )
}