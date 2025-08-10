import { Button, Col, Row } from 'react-bootstrap';
import CustomSelect from '../select/ReactSelect';
import { useProducto } from './useProducto';
import { TableProducto } from './TableProducto';
import { useEnvioWhatsApp } from './useEnvioWhatsApp';

export const Producto = () => {
    const {
        cliente,
        opcionesProductos,
        productosSeleccionados,
        setProductosSeleccionados,
        handleProductoChange,
        handleEliminarProducto,
        handleRegresar
    } = useProducto();
    const { prepararMensajes, enviarSiguiente, parteActual, partesMensaje } = useEnvioWhatsApp(cliente, productosSeleccionados);

    return (
        <>
            <section className='cliente_seleccionado'>
                <h5>{cliente.Nombre} - {cliente.Whatsapp}</h5>
            </section>
            <section className='producto_seleccionado mb-2'>
                <Row>
                    <Col md={{ span: 6 }} >
                        <CustomSelect
                            options={opcionesProductos}
                            value={productosSeleccionados}
                            onChange={handleProductoChange}
                            placeholder="Busca y selecciona un producto..."
                        />
                    </Col>
                </Row>

                <TableProducto
                    productosSeleccionados={productosSeleccionados}
                    setProductosSeleccionados={setProductosSeleccionados}
                    handleEliminarProducto={handleEliminarProducto}
                />
            </section>

            <section className="producto_botones">
                <Button
                    variant="primary"
                    onClick={prepararMensajes}
                >
                    Enviar mensaje por WhatsApp
                </Button>

                {partesMensaje.length > 0 && parteActual + 1 < partesMensaje.length && (
                    <Button
                        variant="warning"
                        onClick={enviarSiguiente}
                        className="ms-2"
                    >
                        Enviar parte {parteActual + 2} de {partesMensaje.length}
                    </Button>
                )}

                <Button
                    variant="secondary"
                    onClick={handleRegresar}
                >
                    Atras
                </Button>
            </section>
        </>
    )
}
