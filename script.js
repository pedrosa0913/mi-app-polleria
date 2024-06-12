let pedido = [];

function agregarProducto(nombre, precio) {
    const productoExistente = pedido.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        pedido.push({ nombre, precio, cantidad: 1 });
    }
    
    mostrarProductosSeleccionados();
    calcularTotal();
}

function mostrarProductosSeleccionados() {
    const listaProductos = document.getElementById('productosSeleccionados');
    listaProductos.innerHTML = '';
    
    pedido.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x ${item.cantidad}`;
        listaProductos.appendChild(li);
    });
}

function calcularTotal() {
    const total = pedido.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.getElementById('total').value = `$${total.toFixed(2)}`;
}

document.getElementById('formulario-pedido').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombreCliente = document.getElementById('nombreCliente').value;
    
    // Validación básica de que haya productos en el pedido
    if (pedido.length === 0) {
        alert('Agregue productos al pedido antes de finalizar.');
        return;
    }
    
    // Generar la boleta de venta
    const boleta = `
        <h1>Boleta de Venta</h1>
        <p><strong>Cliente:</strong> ${nombreCliente}</p>
        <p><strong>Productos:</strong></p>
        <ul>
            ${pedido.map(item => `<li>${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> $${calcularTotal()}</p>
    `;
    
    // Mostrar la boleta en el HTML
    const boletaContainer = document.getElementById('boleta-container');
    boletaContainer.innerHTML = boleta;
    
    // Mostrar la sección de la boleta
    const boletaSection = document.getElementById('boleta');
    boletaSection.style.display = 'block';
    
    // Ocultar otras secciones
    document.getElementById('menu').style.display = 'none';
    document.getElementById('pedido').style.display = 'none';
});

function imprimirBoleta() {
    // Ocultar botón de impresión
    document.getElementById('imprimirBtn').style.display = 'none';
    // Mostrar solo la boleta para impresión
    window.print();
    // Volver a mostrar el botón de impresión después de imprimir
    document.getElementById('imprimirBtn').style.display = 'block';
}
