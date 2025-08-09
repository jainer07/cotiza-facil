import { useState } from "react";

export const useEnvioWhatsApp = (cliente, productosSeleccionados) => {
    const [partesMensaje, setPartesMensaje] = useState([]);
    const [parteActual, setParteActual] = useState(0);

    const prepararMensajes = () => {
        if (!productosSeleccionados.length) return;

        const partes = [];
        let mensajeActual = "";

        productosSeleccionados.forEach((p) => {
            const oferta = p.Oferta ? ` (${p.Oferta})` : "";
            const precio = Number(p.Precio).toLocaleString("es-CO", {
                minimumFractionDigits: 0
            });
            const linea = `${p.Producto} - ${p.Presentacion} - ${precio}${oferta}\n`;

            if (encodeURIComponent(mensajeActual + linea).length > 1800) {
                partes.push(mensajeActual.trim());
                mensajeActual = linea;
            } else {
                mensajeActual += linea;
            }
        });

        if (mensajeActual.trim() !== "") {
            partes.push(mensajeActual.trim());
        }

        setPartesMensaje(partes);
        setParteActual(0);

        if (partes.length > 0) {
            enviarParte(0, partes);
        }
    };

    const enviarParte = (indice, partes = partesMensaje) => {
        const texto = `Hola ${cliente.Nombre},\n\n(${indice + 1}/${partes.length})\n${partes[indice]}`;
        const url = `https://wa.me/57${cliente.Whatsapp}?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    };

    const enviarSiguiente = () => {
        if (parteActual + 1 < partesMensaje.length) {
            const siguiente = parteActual + 1;
            setParteActual(siguiente);
            enviarParte(siguiente);
        }
    };

    return { prepararMensajes, enviarSiguiente, parteActual, partesMensaje };
};
