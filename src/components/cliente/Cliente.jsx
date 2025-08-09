import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SHEET_ID = import.meta.env.VITE_APP_SHEET_ID;
const CLIENTES_URL = `https://opensheet.elk.sh/${SHEET_ID}/Clientes`;

export const Cliente = () => {
	const navigate = useNavigate();
	const [clientes, setClientes] = useState([]);
	const [celular, setCelular] = useState('');
	const [celularDisable, setCelularDisable] = useState(true);
	const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

	useEffect(() => {
		fetch(CLIENTES_URL)
			.then(res => res.json())
			.then(data => {
				setClientes(data);
			});
	}, []);

	const chengeCliente = (e) => {
		const cliente = clientes.find(c => c.IdCliente === e.target.value);
		if (cliente) {
			setCelularDisable(false);
			setClienteSeleccionado(cliente);
			setCelular(cliente.Whatsapp);
		}
		else {
			setCelularDisable(true);
			setClienteSeleccionado(null);
			setCelular('');
		}
	}

	const chengeCelular = (e) => {
		setCelular(e.target.value);
	}

	const handleContinuar = () => {
		if(clienteSeleccionado){
			navigate('/dashboard/producto', { state: { cliente: clienteSeleccionado } });
		}
	}

	return (
		<>
			<Form.Group className="mb-3" controlId="formCliente">
				<Form.Label>Selecciona un cliente</Form.Label>
				<Form.Select
					onChange={chengeCliente}
					defaultValue=""
				>
					<option value="" disabled>Selecciona un cliente</option>
					{clientes.map(c => (
						<option key={c.IdCliente} value={c.IdCliente}>{c.Nombre}</option>
					))}
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formCelular">
				<Form.Label>Número de celular</Form.Label>
				<Form.Control
					disabled={celularDisable}
					onChange={chengeCelular}
					value={celular}
				></Form.Control>
			</Form.Group>
			<Button
				variant="primary"
				onClick={handleContinuar}
			>
				Continuar
			</Button>
		</>
	)
}
