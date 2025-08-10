import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SHEET_ID = import.meta.env.VITE_APP_SHEET_ID;
const CLIENTES_URL = `https://opensheet.elk.sh/${SHEET_ID}/Clientes`;

export const useCliente = () => {
    const navigate = useNavigate();
    const [celular, setCelular] = useState('');
    const [celularDisable, setCelularDisable] = useState(true);
    const [clientesData, setClientesData] = useState([]);
    const [opcionesClientes, setOpcionesClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    useEffect(() => {
        fetch(CLIENTES_URL)
            .then(res => res.json())
            .then(data => {
                setClientesData(data);

                const opciones = data.map(item => ({
                    value: `${item.IdCliente}`,
                    label: `${item.Nombre}`
                }));

                setOpcionesClientes(opciones);
            });
    }, []);

    const handleClienteChange = (opcion) => {
        setClienteSeleccionado(opcion);

        const client = clientesData.find(item => item.IdCliente === opcion.value);


        if (client && !opcionesClientes.some(c => c.IdCliente === client.IdCliente)) {
            setCelularDisable(false);
            setCelular(client.Whatsapp);
        }
        else {
            setCelularDisable(true);
            setCelular('');
        }
    }

    const chengeCelular = (e) => {
        setCelular(e.target.value);
    }

    const handleContinuar = () => {
        if (clienteSeleccionado) {
            const client = clientesData.find(item => item.IdCliente === clienteSeleccionado.value);
            navigate('/dashboard/producto', { state: { cliente: client } });
        }
    }

    return {
        celularDisable, opcionesClientes, clienteSeleccionado, celular, chengeCelular, handleClienteChange, handleContinuar
    }
}
