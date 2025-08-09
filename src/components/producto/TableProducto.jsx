import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

export const TableProducto = ({ productosSeleccionados, setProductosSeleccionados, handleEliminarProducto }) => {
    useEffect(() => {
        const necesitaLimpieza = productosSeleccionados.some(
            p => typeof p.Precio === "string" && p.Precio.includes(",")
        );

        if (necesitaLimpieza) {
            setProductosSeleccionados(prev =>
                prev.map(p => ({
                    ...p,
                    Precio: Number(String(p.Precio).replace(/,/g, '')) || 0
                }))
            );
        }

    }, [setProductosSeleccionados, productosSeleccionados]);

    const handlePrecioChange = (id, valorFormateado) => {
        const soloNumeros = valorFormateado.replace(/\D/g, '');

        setProductosSeleccionados(prev =>
            prev.map(p =>
                p.IdProducto === id
                    ? { ...p, Precio: soloNumeros ? parseInt(soloNumeros, 10) : '' }
                    : p
            )
        );
    };

    const handlePrecioBlur = (id, valorFormateado, valorAnterior) => {
        const soloNumeros = valorFormateado.replace(/\D/g, '');
        const valorNum = parseInt(soloNumeros, 10);
        if (!valorNum || valorNum <= 0) {
            setProductosSeleccionados(prev =>
                prev.map(p =>
                    p.IdProducto === id
                        ? { ...p, Precio: valorAnterior }
                        : p
                )
            );
        }
    };

    const handleOfertaChange = (id, nuevoTexto) => {
        const textoLimpio = nuevoTexto.replace(/[^a-zA-Z0-9\s.,()\-]/g, '');
        if (textoLimpio.length <= 120) {
            setProductosSeleccionados(prev =>
                prev.map(p =>
                    p.IdProducto === id
                        ? { ...p, Oferta: textoLimpio }
                        : p
                )
            );
        }
    };

    return (
        <Table striped bordered hover className="tabla_productos">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Presentación</th>
                    <th>Precio</th>
                    <th>Oferta</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {productosSeleccionados.map(prod => {
                    const precioNum = Number(prod.Precio) || 0;
                    const precioFormateado = precioNum.toLocaleString('es-CO');

                    return (
                        <tr key={prod.IdProducto}>
                            <td data-label="Producto">{prod.Producto}</td>
                            <td data-label="Presentación">{prod.Presentacion}</td>
                            <td data-label="Precio">
                                <input
                                    type="number"
                                    value={precioFormateado}
                                    min="1"
                                    onChange={(e) => handlePrecioChange(prod.IdProducto, e.target.value)}
                                    onBlur={(e) => handlePrecioBlur(prod.IdProducto, e.target.value, precioNum)}
                                    style={{ width: "100%", padding: "4px" }}
                                />
                            </td>
                            <td data-label="Oferta">
                                <input
                                    type="text"
                                    value={prod.Oferta || ''}
                                    maxLength={120}
                                    onChange={(e) => handleOfertaChange(prod.IdProducto, e.target.value)}
                                    style={{ width: "100%", padding: "4px" }}
                                    placeholder="Escribe la oferta"
                                />
                            </td>
                            <td data-label="Acciones">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleEliminarProducto(prod.IdProducto)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
