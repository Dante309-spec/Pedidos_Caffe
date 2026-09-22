import { useState } from "react";
import "./App.css";

function App() {
    
  // Variables de la cafetería
  const nombreCafe = "Café Latte";
  const precioBase = 60;
  const porcentajeImpuesto = 0.16;
  const porcentajeDescuento = 0.10;

  // Estados
  const [nombreCliente, setNombreCliente] = useState("");
  const [cantidadCafes, setCantidadCafes] = useState("");
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  // Convertimos la cantidad a número
  const cantidad = Number(cantidadCafes) || 0;

  // Cálculos
  const subtotal = precioBase * cantidad;
  const impuesto = subtotal * porcentajeImpuesto;

  // El descuento se aplica solamente si compra más de 5 cafés
  const descuento =
    cantidad > 5 ? subtotal * porcentajeDescuento : 0;

  const totalFinal = subtotal + impuesto - descuento;

  // Realizar pedido
  const realizarPedido = () => {
    if (nombreCliente.trim() === "" || cantidad <= 0) {
      alert("Por favor, ingresa tu nombre y una cantidad válida de cafés.");
      return;
    }

    setPedidoRealizado(true);
  };

  // Mostrar resumen
  const mostrarResumenCompra = () => {
    if (nombreCliente.trim() === "" || cantidad <= 0) {
      alert("Primero debes ingresar los datos del pedido.");
      return;
    }

    setMostrarResumen(true);
  };

  // Reiniciar pedido
  const reiniciarPedido = () => {
    setNombreCliente("");
    setCantidadCafes("");
    setPedidoRealizado(false);
    setMostrarResumen(false);
  };

  return (
    <div className="container">

      {/* Título principal */}
      <h1 className="title">
        Sistema de Pedidos - Cafetería
      </h1>

      {/* Sección 1: Información del cliente */}
      <div className="section">
        <h2>Información del cliente</h2>

        <label>Nombre del cliente:</label>

        <input
          className="input"
          type="text"
          placeholder="Escribe tu nombre"
          value={nombreCliente}
          onChange={(evento) =>
            setNombreCliente(evento.target.value)
          }
        />
      </div>

      {/* Sección 2: Información del pedido */}
      <div className="section">
        <h2>Información del pedido</h2>

        <p>
          <strong>Café:</strong> {nombreCafe}
        </p>

        <p>
          <strong>Precio por café:</strong> ${precioBase.toFixed(2)}
        </p>

        <p>
          <strong>Impuesto:</strong>{" "}
          {(porcentajeImpuesto * 100).toFixed(0)}%
        </p>

        <p>
          <strong>Descuento:</strong>{" "}
          {(porcentajeDescuento * 100).toFixed(0)}%
        </p>

        <label>Cantidad de cafés:</label>

        <input
          className="input"
          type="number"
          min="1"
          placeholder="Cantidad"
          value={cantidadCafes}
          onChange={(evento) =>
            setCantidadCafes(evento.target.value)
          }
        />

        {/* Renderizado condicional */}
        <div className="tipo-pedido">
          {cantidad > 5 ? (
            <p className="descuento">
              Descuento por compra mayorista aplicado
            </p>
          ) : (
            <p className="regular">
              Pedido regular
            </p>
          )}
        </div>

        <div className="buttons">

          <button
            className="button"
            onClick={realizarPedido}
          >
            Realizar pedido
          </button>

          <button
            className="button secondary"
            onClick={mostrarResumenCompra}
          >
            Mostrar resumen
          </button>

          <button
            className="button danger"
            onClick={reiniciarPedido}
          >
            Reiniciar pedido
          </button>

        </div>

        {/* Mensaje de confirmación */}
        {pedidoRealizado && (
          <div className="confirmation">
            <h3>Pedido realizado con éxito</h3>

            <p>
              Gracias por realizar tu pedido,{" "}
              <strong>{nombreCliente}</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Sección 3: Resumen de compra */}
      <div className="section summary">
        <h2>Resumen de compra</h2>
        {mostrarResumen ? (
          <div>

            <p>
              Gracias por tu compra,{" "}
              <strong>{nombreCliente}</strong>
            </p>

            <p>
              <strong>Café:</strong> {nombreCafe}
            </p>

            <p>
              <strong>Cantidad:</strong> {cantidad}
            </p>

            <hr />

            <p>
              <strong>Subtotal:</strong>{" "}
              ${subtotal.toFixed(2)}
            </p>

            <p>
              <strong>Impuesto:</strong>{" "}
              ${impuesto.toFixed(2)}
            </p>

            <p>
              <strong>Descuento:</strong>{" "}
              ${descuento.toFixed(2)}
            </p>

            <h3 className="total">
              Total final: ${totalFinal.toFixed(2)}
            </h3>

          </div>
        ) : (
          <p>
            Presiona "Mostrar resumen" para visualizar
            los detalles de tu compra.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;