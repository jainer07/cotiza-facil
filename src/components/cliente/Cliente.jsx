import { Form, Button, Row, Col } from 'react-bootstrap';
import CustomSelect from '../select/ReactSelect';
import { useCliente } from './useCliente';

export const Cliente = () => {
	const { celularDisable, opcionesClientes, clienteSeleccionado, celular, chengeCelular, handleClienteChange, handleContinuar } = useCliente();

	return (
		<section className='page_cliente'>
			<Row className='mb-3 mt-3 w-100'>
				<Col md={{ span: 4, offset: 4 }} >
					<CustomSelect
						options={opcionesClientes}
						value={clienteSeleccionado}
						onChange={handleClienteChange}
						placeholder="Busca y selecciona un cliente..."
					/>
				</Col>
			</Row>
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
		</section>
	)
}
