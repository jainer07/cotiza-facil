import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { RoutesDashboard } from "./RoutesDashboard";

export const Dashboard = () => {
    const [starting, setStarting] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (starting) {
            navigate("/dashboard/cliente", { replace: true });
            setStarting(false);
        }
    }, [starting, navigate]);


    // 	useEffect(() => {
    // 		if (!clienteSeleccionado) return;

    // 		const productosMensaje = productos.map(p => {
    // 			const bonificacion = p.Bonificacion ? ` ${p.Bonificacion}` : '';
    // 			return `${p.Nombre} ${p.Precio}${bonificacion}`;
    // 		}).join('\n');

    // 		const saludo = `Hola ${clienteSeleccionado.Nombre},\n\n`;
    // 		setMensaje(saludo + productosMensaje);
    // 	}, [clienteSeleccionado, productos]);


    return (
        <div className='wrapper px-1 py-1'>

            <h1 className="h3 text-center">Crear mensaje WhatsApp</h1>
            <div className="page-wrapper">
                <RoutesDashboard />
                <Outlet />
            </div>
        </div>        
    )
}
