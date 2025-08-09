import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SHEET_ID = import.meta.env.VITE_APP_SHEET_ID;
const PRODUCTOS_URL = `https://opensheet.elk.sh/${SHEET_ID}/Productos`;

export const useProducto = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { cliente } = location.state;
	const [productosData, setProductosData] = useState([]);
	const [opcionesProductos, setOpcionesProductos] = useState([]);
	const [productosSeleccionados, setProductosSeleccionados] = useState([]);

	useEffect(() => {
		fetch(PRODUCTOS_URL)
			.then(res => res.json())
			.then(data => {
				setProductosData(data);

				const opciones = data.map(item => ({
					value: `${item.IdProducto}`,
					label: `${item.Producto} - ${item.Presentacion} - ${item.Precio}`
				}));

				setOpcionesProductos(opciones);
			});
	}, []);

	const handleProductoChange = (opcion) => {
		const prod = productosData.find(item => item.IdProducto === opcion.value)
		if (prod && !productosSeleccionados.some(p => p.IdProducto === prod.IdProducto)) {
			setProductosSeleccionados(prev => [...prev, prod]);
		}
	};
	const handleEliminarProducto = (id) => {
		setProductosSeleccionados(prev => prev.filter(p => p.IdProducto !== id));
	};
	const handleRegresar = () => {
		navigate('/dashboard/cliente', { replace: true });
	}
	const handleEnviar = () => {
		if (!productosSeleccionados.length) return;

		const partesMensaje = [];
		let mensajeActual = "";

		productosSeleccionados.forEach((p) => {
			const oferta = p.Oferta ? ` (${p.Oferta})` : "";
			const precio = Number(p.Precio).toLocaleString("es-CO", {
				minimumFractionDigits: 0
			});
			const linea = `${p.Producto} - ${p.Presentacion} - ${precio}${oferta}\n`;

			// Probar si al agregar esta línea supera el límite seguro
			const mensajePrueba = mensajeActual + linea;
			if (encodeURIComponent(mensajePrueba).length > 1800) {
				partesMensaje.push(mensajeActual.trim());
				mensajeActual = linea; // empezar nueva parte
			} else {
				mensajeActual = mensajePrueba;
			}
		});

		if (mensajeActual.trim() !== "") {
			partesMensaje.push(mensajeActual.trim());
		}

		partesMensaje.forEach((parte, i) => {
			const texto = `Hola ${cliente.Nombre},\n\n(${i + 1}/${partesMensaje.length})\n${parte}`;
			const url = `https://wa.me/57${cliente.Whatsapp}?text=${encodeURIComponent(texto)}`;
			setTimeout(() => {
				window.open(url, "_blank");
			}, i * 1000); // retraso para evitar choques entre aperturas
		});
	};

	return {
		cliente,
		opcionesProductos,
		productosSeleccionados,
		setProductosSeleccionados,
		handleProductoChange,
		handleEliminarProducto,
		handleRegresar,
		handleEnviar
	}
}
