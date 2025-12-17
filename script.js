// Menu toggle functionality
document.getElementById('menu-toggle').addEventListener('click', function() {
    const sidePanel = document.getElementById('side-panel');
    sidePanel.classList.toggle('open');
});

// Close panel when clicking outside (optional)
document.addEventListener('click', function(event) {
    const sidePanel = document.getElementById('side-panel');
    const menuToggle = document.getElementById('menu-toggle');
    if (!sidePanel.contains(event.target) && !menuToggle.contains(event.target)) {
        sidePanel.classList.remove('open');
    }
});

// Employee data storage
let empleados = [
    {
        prioridad: 1,
        nombre: 'Barbero 1',
        dni: '12345678',
        comision: 10,
        estado: 'activo'
    }
];

// Client data storage
let clientes = [];

// Services data storage
let servicios = [];

// Inventory data storage
let inventario = [
    {
        nombre: 'Champú Profesional',
        categoria: 'Cuidado del cabello',
        cantidad: 25,
        precioCompra: 15.50,
        precioVenta: 25.00,
        stockMinimo: 10,
        fechaActualizacion: '2024-01-15'
    },
    {
        nombre: 'Tinte Rubio',
        categoria: 'Coloración',
        cantidad: 8,
        precioCompra: 35.00,
        precioVenta: 55.00,
        stockMinimo: 5,
        fechaActualizacion: '2024-01-14'
    },
    {
        nombre: 'Gel para cabello',
        categoria: 'Estilizado',
        cantidad: 0,
        precioCompra: 8.50,
        precioVenta: 15.00,
        stockMinimo: 3,
        fechaActualizacion: '2024-01-10'
    }
];

// Ventas data storage
let ventas = [
    {
        id: 1,
        tipo: 'venta',
        fecha: '2024-01-15',
        hora: '10:30',
        cliente: 'Juan Pérez',
        servicio: 'Corte de cabello',
        barbero: 'Barbero 1',
        monto: 25.00,
        metodoPago: 'efectivo',
        notas: 'Cliente regular'
    },
    {
        id: 2,
        tipo: 'venta',
        fecha: '2024-01-15',
        hora: '11:00',
        cliente: 'María García',
        servicio: 'Tinte',
        barbero: 'Barbero 1',
        monto: 45.00,
        metodoPago: 'tarjeta',
        notas: ''
    },
    {
        id: 3,
        tipo: 'gasto',
        fecha: '2024-01-14',
        hora: '09:00',
        cliente: '',
        servicio: 'Compra de productos',
        barbero: '',
        monto: 150.00,
        metodoPago: 'transferencia',
        notas: 'Productos para tintes'
    }
];

// Turnos data storage
let turnos = [];

let currentPage = 1;
let itemsPerPage = 10;
let currentTab = 'venta';
let currentSort = { column: 'fecha', direction: 'desc' };

// Menu item click functionality
document.querySelectorAll('.menu-list li').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.textContent.trim();
        const welcomeSection = document.getElementById('welcome-section');
        const dashboardModules = document.getElementById('dashboard-modules');
        const turnosSection = document.getElementById('turnos-section');
        const empleadosSection = document.getElementById('empleados-section');
        const clientesSection = document.getElementById('clientes-section');
        const serviciosSection = document.getElementById('servicios-section');
        const ventasSection = document.getElementById('ventas-section');
        const inventarioSection = document.getElementById('inventario-section');

        // Hide all sections
        welcomeSection.style.display = 'none';
        dashboardModules.style.display = 'none';
        turnosSection.style.display = 'none';
        empleadosSection.style.display = 'none';
        clientesSection.style.display = 'none';
        serviciosSection.style.display = 'none';
        if (ventasSection) ventasSection.style.display = 'none';
        if (inventarioSection) inventarioSection.style.display = 'none';

        // Show the selected section
        if (text === 'Panel General') {
            welcomeSection.style.display = 'flex';
            dashboardModules.style.display = 'grid';
        } else if (text === 'Turnos') {
            turnosSection.style.display = 'block';
            updateTurnosTable();
        } else if (text === 'Empleados') {
            empleadosSection.style.display = 'block';
            updateEmpleadosTable();
        } else if (text === 'Clientes') {
            clientesSection.style.display = 'block';
            updateClientesTable();
        } else if (text === 'Servicios') {
            serviciosSection.style.display = 'block';
            updateServiciosTable();
        } else if (text.includes('Ventas')) {
            if (ventasSection) {
                ventasSection.style.display = 'block';
                updateVentasTable();
                updateVentasSummary();
            }
        } else if (text === 'Existencias') {
            if (inventarioSection) {
                inventarioSection.style.display = 'block';
                updateInventarioTable();
            }
        } else {
            // For other options, show welcome or handle accordingly
            welcomeSection.style.display = 'flex';
            dashboardModules.style.display = 'grid';
        }

        // Close the side panel
        document.getElementById('side-panel').classList.remove('open');
    });
});

// Modal functionality
const modal = document.getElementById('empleado-modal');
const addEmpleadoBtn = document.getElementById('add-empleado-btn');
const modalClose = document.querySelector('.modal-close');
const cancelBtn = document.querySelector('.btn-secondary');
const createBtn = document.querySelector('.btn-primary');

// Open modal
addEmpleadoBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    generatePassword();
});

// Close modal functions
modalClose.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
}

// Close modal when clicking outside
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Generate random password
function generatePassword() {
    const password = 'Admin' + Math.floor(Math.random() * 10000);
    document.getElementById('password-display').textContent = password;
}

// Form validation and submission
createBtn.addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const comision = parseFloat(document.getElementById('comision').value);
    const prioridad = parseInt(document.getElementById('prioridad').value);
    const activo = document.getElementById('activo').checked;

    // Validation
    let isValid = true;
    let errors = [];

    if (!nombre) {
        errors.push('El nombre es obligatorio');
        isValid = false;
    }

    if (!dni) {
        errors.push('El DNI es obligatorio');
        isValid = false;
    } else if (empleados.some(emp => emp.dni === dni)) {
        errors.push('El DNI ya existe');
        isValid = false;
    }

    if (isNaN(comision) || comision < 0 || comision > 100) {
        errors.push('La comisión debe estar entre 0 y 100');
        isValid = false;
    }

    if (isNaN(prioridad) || prioridad < 1) {
        errors.push('La prioridad debe ser un número entero mayor o igual a 1');
        isValid = false;
    }

    if (!isValid) {
        alert('Errores de validación:\n' + errors.join('\n'));
        return;
    }

    // Create new employee
    const newEmpleado = {
        prioridad: prioridad,
        nombre: nombre,
        dni: dni,
        comision: comision,
        estado: activo ? 'activo' : 'inactivo'
    };

    empleados.push(newEmpleado);
    empleados.sort((a, b) => a.prioridad - b.prioridad);

    updateEmpleadosTable();
    closeModal();

    // Show success message
    showSuccessMessage('Empleado creado exitosamente');
});

// Update employees table
function updateEmpleadosTable() {
    const tbody = document.getElementById('empleados-tbody');
    tbody.innerHTML = '';

    empleados.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.prioridad}</td>
            <td>${emp.nombre}</td>
            <td>${emp.dni}</td>
            <td>${emp.comision}%</td>
            <td><span class="status-badge ${emp.estado}">${emp.estado === 'activo' ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editEmpleado(${index})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" onclick="deleteEmpleado(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update employee count
    document.getElementById('empleados-count').textContent = `Empleados registrados: ${empleados.length}`;
}

// Delete employee
function deleteEmpleado(index) {
    if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
        empleados.splice(index, 1);
        updateEmpleadosTable();
        showSuccessMessage('Empleado eliminado exitosamente');
    }
}

// Edit employee (placeholder function)
function editEmpleado(index) {
    alert('Funcionalidad de edición próximamente disponible');
}

// Sort employees
document.querySelector('.sort-btn').addEventListener('click', function() {
    empleados.sort((a, b) => a.prioridad - b.prioridad);
    updateEmpleadosTable();
    showSuccessMessage('Empleados ordenados por prioridad');
});

// Reset form
function resetForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('dni').value = '';
    document.getElementById('comision').value = '';
    document.getElementById('prioridad').value = '';
    document.getElementById('activo').checked = true;
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

// Show error message
function showErrorMessage(message) {
    // Create a simple toast notification for errors
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f8d7da;
        color: #721c24;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Client modal functionality
const clienteModal = document.getElementById('cliente-modal');
const addClienteBtn = document.getElementById('add-cliente-btn');
const clienteModalClose = clienteModal.querySelector('.modal-close');
const clienteCancelBtn = clienteModal.querySelector('.btn-secondary');
const clienteCreateBtn = clienteModal.querySelector('.btn-primary');

// Open client modal
addClienteBtn.addEventListener('click', function() {
    clienteModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close client modal functions
clienteModalClose.addEventListener('click', closeClienteModal);
clienteCancelBtn.addEventListener('click', closeClienteModal);

function closeClienteModal() {
    clienteModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetClienteForm();
}

// Close client modal when clicking outside
clienteModal.addEventListener('click', function(event) {
    if (event.target === clienteModal) {
        closeClienteModal();
    }
});

// Client form validation and submission
clienteCreateBtn.addEventListener('click', function() {
    const nombre = document.getElementById('cliente-nombre').value.trim();
    const telefono = document.getElementById('cliente-telefono').value.trim();
    const email = document.getElementById('cliente-email').value.trim();
    const notas = document.getElementById('cliente-notas').value.trim();

    // Validation
    let isValid = true;
    let errors = [];

    if (!nombre) {
        errors.push('El nombre es obligatorio');
        isValid = false;
    }

    if (!telefono) {
        errors.push('El teléfono es obligatorio');
        isValid = false;
    } else if (!/^\d{9,}$/.test(telefono)) {
        errors.push('El teléfono debe tener al menos 9 dígitos');
        isValid = false;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('El email no tiene un formato válido');
        isValid = false;
    }

    if (!isValid) {
        alert('Errores de validación:\n' + errors.join('\n'));
        return;
    }

    // Create new client
    const newCliente = {
        nombre: nombre,
        telefono: telefono,
        email: email || '',
        notas: notas || '',
        fechaRegistro: new Date().toLocaleDateString('es-ES')
    };

    clientes.push(newCliente);

    updateClientesTable();
    closeClienteModal();

    // Show success message
    showSuccessMessage('Cliente creado exitosamente');
});

// Update clients table
function updateClientesTable() {
    const clientesContent = document.querySelector('.clientes-content');
    const emptyState = document.querySelector('.empty-state');
    const clientesTableContainer = document.querySelector('.clientes-table-container');
    const tbody = document.getElementById('clientes-tbody');

    if (clientes.length === 0) {
        emptyState.style.display = 'block';
        clientesTableContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        clientesTableContainer.style.display = 'block';

        tbody.innerHTML = '';

        clientes.forEach((cliente, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.nombre}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.email || '-'}</td>
                <td>${cliente.notas || '-'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editCliente(${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteCliente(${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Update client count
    document.getElementById('clientes-count').textContent = `Clientes registrados: ${clientes.length}`;

    // Update dashboard client count
    const clientesModuleValue = document.querySelector('.module-card h3');
    if (clientesModuleValue && clientesModuleValue.textContent.includes('Clientes')) {
        const clientesModuleValueSpan = clientesModuleValue.nextElementSibling;
        if (clientesModuleValueSpan && clientesModuleValueSpan.classList.contains('module-value')) {
            clientesModuleValueSpan.textContent = clientes.length;
        }
    }
}

// Delete client
function deleteCliente(index) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
        clientes.splice(index, 1);
        updateClientesTable();
        showSuccessMessage('Cliente eliminado exitosamente');
    }
}

// Edit client (placeholder function)
function editCliente(index) {
    alert('Funcionalidad de edición próximamente disponible');
}

// Search clients
document.querySelector('.search-input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredClientes = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(searchTerm) ||
        cliente.telefono.includes(searchTerm) ||
        cliente.email.toLowerCase().includes(searchTerm)
    );

    updateClientesTableWithFilter(filteredClientes);
});

// Update clients table with filter
function updateClientesTableWithFilter(filteredClientes) {
    const clientesContent = document.querySelector('.clientes-content');
    const emptyState = document.querySelector('.empty-state');
    const clientesTableContainer = document.querySelector('.clientes-table-container');
    const tbody = document.getElementById('clientes-tbody');

    if (filteredClientes.length === 0 && clientes.length > 0) {
        // Show "no results" message
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #6c757d;">No se encontraron clientes que coincidan con la búsqueda</td></tr>';
        clientesTableContainer.style.display = 'block';
        emptyState.style.display = 'none';
    } else if (filteredClientes.length === 0) {
        emptyState.style.display = 'block';
        clientesTableContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        clientesTableContainer.style.display = 'block';

        tbody.innerHTML = '';

        filteredClientes.forEach((cliente, index) => {
            const originalIndex = clientes.indexOf(cliente);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.nombre}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.email || '-'}</td>
                <td>${cliente.fechaRegistro}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editCliente(${originalIndex})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteCliente(${originalIndex})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Reset client form
function resetClienteForm() {
    document.getElementById('cliente-nombre').value = '';
    document.getElementById('cliente-telefono').value = '';
    document.getElementById('cliente-email').value = '';
    document.getElementById('cliente-notas').value = '';
}

// Service modal functionality
const servicioModal = document.getElementById('servicio-modal');
const addServicioBtn = document.getElementById('add-servicio-btn');
const servicioModalClose = servicioModal.querySelector('.modal-close');
const servicioCancelBtn = servicioModal.querySelector('.btn-secondary');
const servicioSaveBtn = document.getElementById('servicio-save-btn');

// Open service modal
addServicioBtn.addEventListener('click', function() {
    servicioModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('servicio-nombre').focus();
});

// Open service modal from empty state
document.getElementById('create-first-servicio-btn').addEventListener('click', function() {
    servicioModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('servicio-nombre').focus();
});

// Close service modal functions
servicioModalClose.addEventListener('click', closeServicioModal);
servicioCancelBtn.addEventListener('click', closeServicioModal);

function closeServicioModal() {
    servicioModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetServicioForm();
}

// Close service modal when clicking outside
servicioModal.addEventListener('click', function(event) {
    if (event.target === servicioModal) {
        closeServicioModal();
    }
});

// Service form validation and submission
servicioSaveBtn.addEventListener('click', function() {
    const nombre = document.getElementById('servicio-nombre').value.trim();
    const precio = parseFloat(document.getElementById('servicio-precio').value);

    // Validation
    let isValid = true;
    let errors = [];

    if (!nombre) {
        errors.push('El nombre del servicio es obligatorio');
        isValid = false;
    }

    if (isNaN(precio) || precio < 0) {
        errors.push('El precio debe ser un número mayor o igual a 0');
        isValid = false;
    }

    if (!isValid) {
        alert('Errores de validación:\n' + errors.join('\n'));
        return;
    }

    // Create new service
    const newServicio = {
        nombre: nombre,
        precio: precio,
        fechaCreacion: new Date().toLocaleDateString('es-ES')
    };

    servicios.push(newServicio);

    updateServiciosTable();
    closeServicioModal();

    // Show success message
    showSuccessMessage('Servicio creado exitosamente');
});

// Update services table
function updateServiciosTable() {
    const serviciosContent = document.querySelector('.servicios-content');
    const emptyState = document.querySelector('.empty-state');
    const serviciosTableContainer = document.querySelector('.servicios-table-container');
    const tbody = document.getElementById('servicios-tbody');

    if (servicios.length === 0) {
        emptyState.style.display = 'block';
        serviciosTableContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        serviciosTableContainer.style.display = 'block';

        tbody.innerHTML = '';

        servicios.forEach((servicio, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${servicio.nombre}</td>
                <td>$${servicio.precio.toFixed(2)}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editServicio(${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteServicio(${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Delete service
function deleteServicio(index) {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
        servicios.splice(index, 1);
        updateServiciosTable();
        showSuccessMessage('Servicio eliminado exitosamente');
    }
}

// Edit service (placeholder function)
function editServicio(index) {
    alert('Funcionalidad de edición próximamente disponible');
}

// Reset service form
function resetServicioForm() {
    document.getElementById('servicio-nombre').value = '';
    document.getElementById('servicio-precio').value = '';
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Ventas functionality

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchTab(tab);
        });
    });

    // Filter functionality
    const filterInputs = document.querySelectorAll('.filter-input');
    filterInputs.forEach(input => {
        input.addEventListener('input', applyFilters);
    });

    // Sort functionality
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            sortTable(column);
        });
    });

    // Pagination
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));


});

function switchTab(tab) {
    currentTab = tab;
    currentPage = 1;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    // Update summary card titles based on current tab
    const summaryTitles = document.querySelectorAll('.summary-card h4');
    if (summaryTitles.length >= 2) {
        if (tab === 'venta') {
            summaryTitles[0].textContent = 'Total Ventas';
            summaryTitles[1].textContent = 'Número de Ventas';
        } else {
            summaryTitles[0].textContent = 'Total Gastos';
            summaryTitles[1].textContent = 'Número de Gastos';
        }
    }

    updateVentasTable();
    updateVentasSummary();
}

function applyFilters() {
    currentPage = 1;
    updateVentasTable();
}

function sortTable(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    // Update sort indicators
    document.querySelectorAll('.sortable').forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });
    const activeHeader = document.querySelector(`[data-sort="${column}"]`);
    if (activeHeader) {
        activeHeader.classList.add(`sort-${currentSort.direction}`);
    }

    updateVentasTable();
}

function changePage(direction) {
    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    updateVentasTable();
}

function getFilteredData() {
    let filtered = ventas.filter(item => item.tipo === currentTab);

    // Date range filter
    const startDate = document.getElementById('start-date')?.value;
    const endDate = document.getElementById('end-date')?.value;
    if (startDate) {
        filtered = filtered.filter(item => item.fecha >= startDate);
    }
    if (endDate) {
        filtered = filtered.filter(item => item.fecha <= endDate);
    }

    // Barber filter
    const barberFilter = document.getElementById('barber-filter')?.value;
    if (barberFilter) {
        filtered = filtered.filter(item => item.barbero === barberFilter);
    }

    // Payment method filter
    const paymentFilter = document.getElementById('payment-filter')?.value;
    if (paymentFilter) {
        filtered = filtered.filter(item => item.metodoPago === paymentFilter);
    }

    // Search filter
    const searchTerm = document.getElementById('search-ventas')?.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(item =>
            item.cliente.toLowerCase().includes(searchTerm) ||
            item.servicio.toLowerCase().includes(searchTerm) ||
            item.notas.toLowerCase().includes(searchTerm)
        );
    }

    // Sort
    filtered.sort((a, b) => {
        let aVal = a[currentSort.column];
        let bVal = b[currentSort.column];

        if (currentSort.column === 'monto') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }

        if (currentSort.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    return filtered;
}

function updateVentasTable() {
    const tbody = document.getElementById('ventas-tbody');
    if (!tbody) return;

    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #6c757d;">No se encontraron registros</td></tr>';
    } else {
        pageData.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(item.fecha)}</td>
                <td>${item.hora}</td>
                <td>${item.cliente || '-'}</td>
                <td>${item.servicio}</td>
                <td>${item.barbero || '-'}</td>
                <td>$${item.monto.toFixed(2)}</td>
                <td><span class="payment-method ${item.metodoPago}">${getPaymentMethodLabel(item.metodoPago)}</span></td>
                <td>
                    <button class="action-btn edit-btn" onclick="editVenta(${ventas.indexOf(item)})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteVenta(${ventas.indexOf(item)})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updatePagination(filteredData.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (pageInfo) {
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    }

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

function updateVentasSummary() {
    const filteredData = getFilteredData();
    const totalAmount = filteredData.reduce((sum, item) => sum + item.monto, 0);
    const totalCount = filteredData.length;

    // Update summary cards
    const totalElement = document.getElementById('total-ventas');
    const countElement = document.getElementById('count-ventas');

    if (totalElement) {
        totalElement.textContent = `$${totalAmount.toFixed(2)}`;
    }

    if (countElement) {
        countElement.textContent = totalCount;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

function getPaymentMethodLabel(method) {
    const labels = {
        'efectivo': 'Efectivo',
        'tarjeta': 'Tarjeta',
        'transferencia': 'Transferencia'
    };
    return labels[method] || method;
}

function closeQuickSaleModal() {
    const modal = document.getElementById('quick-sale-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetQuickSaleForm();
    }
}

function resetQuickSaleForm() {
    document.getElementById('quick-sale-cliente').value = '';
    document.getElementById('quick-sale-servicio').value = '';
    document.getElementById('quick-sale-monto').value = '';
    document.getElementById('quick-sale-metodo').value = 'efectivo';
    document.getElementById('quick-sale-notas').value = '';
}

function saveQuickSale() {
    const cliente = document.getElementById('quick-sale-cliente').value.trim();
    const servicio = document.getElementById('quick-sale-servicio').value.trim();
    const monto = parseFloat(document.getElementById('quick-sale-monto').value);
    const metodoPago = document.getElementById('quick-sale-metodo').value;
    const notas = document.getElementById('quick-sale-notas').value.trim();

    // Validation
    let isValid = true;
    let errors = [];

    if (!cliente) {
        errors.push('El cliente es obligatorio');
        isValid = false;
    }

    if (!servicio) {
        errors.push('El servicio es obligatorio');
        isValid = false;
    }

    if (isNaN(monto) || monto <= 0) {
        errors.push('El monto debe ser un número mayor a 0');
        isValid = false;
    }

    if (!isValid) {
        alert('Errores de validación:\n' + errors.join('\n'));
        return;
    }

    // Create new sale
    const newVenta = {
        id: Date.now(),
        tipo: 'venta',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().slice(0, 5),
        cliente: cliente,
        servicio: servicio,
        barbero: empleados.length > 0 ? empleados[0].nombre : '',
        monto: monto,
        metodoPago: metodoPago,
        notas: notas
    };

    ventas.push(newVenta);
    updateVentasTable();
    updateVentasSummary();
    closeQuickSaleModal();

    showSuccessMessage('Venta registrada exitosamente');
}

function editVenta(index) {
    alert('Funcionalidad de edición próximamente disponible');
}

function deleteVenta(index) {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
        ventas.splice(index, 1);
        updateVentasTable();
        updateVentasSummary();
        showSuccessMessage('Registro eliminado exitosamente');
    }
}

// Inventory functionality

// Inventory modal functionality
const inventarioModal = document.getElementById('inventario-modal');
const addInventarioBtn = document.getElementById('add-inventario-btn');
const inventarioModalClose = inventarioModal ? inventarioModal.querySelector('.modal-close') : null;
const inventarioCancelBtn = inventarioModal ? inventarioModal.querySelector('.btn-secondary') : null;
const inventarioSaveBtn = document.getElementById('inventario-save-btn');

// Open inventory modal
if (addInventarioBtn) {
    addInventarioBtn.addEventListener('click', function() {
        if (inventarioModal) {
            inventarioModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.getElementById('inventario-nombre').focus();
        }
    });
}

// Open inventory modal from empty state
const createFirstInventarioBtn = document.getElementById('create-first-inventario-btn');
if (createFirstInventarioBtn) {
    createFirstInventarioBtn.addEventListener('click', function() {
        if (inventarioModal) {
            inventarioModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.getElementById('inventario-nombre').focus();
        }
    });
}

// Close inventory modal functions
if (inventarioModalClose) {
    inventarioModalClose.addEventListener('click', closeInventarioModal);
}
if (inventarioCancelBtn) {
    inventarioCancelBtn.addEventListener('click', closeInventarioModal);
}

function closeInventarioModal() {
    if (inventarioModal) {
        inventarioModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetInventarioForm();
    }
}

// Close inventory modal when clicking outside
if (inventarioModal) {
    inventarioModal.addEventListener('click', function(event) {
        if (event.target === inventarioModal) {
            closeInventarioModal();
        }
    });
}

// Inventory form validation and submission
if (inventarioSaveBtn) {
    inventarioSaveBtn.addEventListener('click', function() {
        const nombre = document.getElementById('inventario-nombre').value.trim();
        const categoria = document.getElementById('inventario-categoria').value.trim();
        const cantidad = parseInt(document.getElementById('inventario-cantidad').value);
        const precioCompra = parseFloat(document.getElementById('inventario-precio-compra').value);
        const precioVenta = parseFloat(document.getElementById('inventario-precio-venta').value);
        const stockMinimo = parseInt(document.getElementById('inventario-stock-minimo').value);

        // Validation
        let isValid = true;
        let errors = [];

        if (!nombre) {
            errors.push('El nombre del producto es obligatorio');
            isValid = false;
        }

        if (!categoria) {
            errors.push('La categoría es obligatoria');
            isValid = false;
        }

        if (isNaN(cantidad) || cantidad < 0) {
            errors.push('La cantidad debe ser un número mayor o igual a 0');
            isValid = false;
        }

        if (isNaN(precioCompra) || precioCompra < 0) {
            errors.push('El precio de compra debe ser un número mayor o igual a 0');
            isValid = false;
        }

        if (isNaN(precioVenta) || precioVenta < 0) {
            errors.push('El precio de venta debe ser un número mayor o igual a 0');
            isValid = false;
        }

        if (isNaN(stockMinimo) || stockMinimo < 0) {
            errors.push('El stock mínimo debe ser un número mayor o igual a 0');
            isValid = false;
        }

        if (!isValid) {
            alert('Errores de validación:\n' + errors.join('\n'));
            return;
        }

        // Create new inventory item
        const newInventario = {
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            stockMinimo: stockMinimo,
            fechaActualizacion: new Date().toISOString().split('T')[0]
        };

        inventario.push(newInventario);

        updateInventarioTable();
        closeInventarioModal();

        // Show success message
        showSuccessMessage('Producto agregado exitosamente');
    });
}

// Update inventory table
function updateInventarioTable() {
    const inventarioContent = document.querySelector('.inventario-content');
    const emptyState = document.querySelector('.inventario-content .empty-state');
    const inventarioTableContainer = document.querySelector('.inventario-table-container');
    const tbody = document.getElementById('inventario-tbody');

    if (!tbody) return;

    if (inventario.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (inventarioTableContainer) inventarioTableContainer.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        if (inventarioTableContainer) inventarioTableContainer.style.display = 'block';

        tbody.innerHTML = '';

        inventario.forEach((item, index) => {
            const stockStatus = item.cantidad <= item.stockMinimo ? 'low-stock' : 'in-stock';
            const stockText = item.cantidad <= item.stockMinimo ? 'Stock bajo' : 'En stock';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.categoria}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precioCompra.toFixed(2)}</td>
                <td>$${item.precioVenta.toFixed(2)}</td>
                <td><span class="stock-status ${stockStatus}">${stockText}</span></td>
                <td>
                    <button class="action-btn edit-btn" onclick="editInventario(${index})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteInventario(${index})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Update inventory count
    const inventarioCount = document.getElementById('inventario-count');
    if (inventarioCount) {
        inventarioCount.textContent = `Productos registrados: ${inventario.length}`;
    }

    // Update dashboard inventory count
    const inventarioModuleValue = document.querySelector('.module-card h3');
    if (inventarioModuleValue && inventarioModuleValue.textContent.includes('Inventario')) {
        const inventarioModuleValueSpan = inventarioModuleValue.nextElementSibling;
        if (inventarioModuleValueSpan && inventarioModuleValueSpan.classList.contains('module-value')) {
            inventarioModuleValueSpan.textContent = inventario.length;
        }
    }
}

// Delete inventory item
function deleteInventario(index) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        inventario.splice(index, 1);
        updateInventarioTable();
        showSuccessMessage('Producto eliminado exitosamente');
    }
}

// Edit inventory item (placeholder function)
function editInventario(index) {
    alert('Funcionalidad de edición próximamente disponible');
}

// Reset inventory form
function resetInventarioForm() {
    document.getElementById('inventario-nombre').value = '';
    document.getElementById('inventario-categoria').value = '';
    document.getElementById('inventario-cantidad').value = '';
    document.getElementById('inventario-precio-compra').value = '';
    document.getElementById('inventario-precio-venta').value = '';
    document.getElementById('inventario-stock-minimo').value = '';
}

// Venta Rápida Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const ventaRapidaBtn = document.getElementById('quick-sale-btn');
    const quickSaleWelcomeBtn = document.getElementById('quick-sale-welcome-btn');
    const ventaRapidaModal = document.getElementById('venta-modal');
    const ventaRapidaClose = ventaRapidaModal ? ventaRapidaModal.querySelector('.modal-close') : null;
    const ventaRapidaCancel = document.getElementById('venta-cancel-btn');
    const ventaRapidaSave = document.getElementById('venta-save-btn');

    // Open modal from ventas section
    if (ventaRapidaBtn) {
        ventaRapidaBtn.addEventListener('click', function() {
            if (ventaRapidaModal) {
                ventaRapidaModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                initializeVentaRapidaModal();
            }
        });
    }

    // Open modal from welcome section
    if (quickSaleWelcomeBtn) {
        quickSaleWelcomeBtn.addEventListener('click', function() {
            if (ventaRapidaModal) {
                ventaRapidaModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                initializeVentaRapidaModal();
            }
        });
    }

    // Close modal functions
    if (ventaRapidaClose) {
        ventaRapidaClose.addEventListener('click', closeVentaRapidaModal);
    }

    if (ventaRapidaCancel) {
        ventaRapidaCancel.addEventListener('click', closeVentaRapidaModal);
    }

    if (ventaRapidaModal) {
        ventaRapidaModal.addEventListener('click', function(event) {
            if (event.target === ventaRapidaModal) {
                closeVentaRapidaModal();
            }
        });
    }

    // Save functionality
    if (ventaRapidaSave) {
        ventaRapidaSave.addEventListener('click', saveVentaRapida);
    }

    // Type selection
    const tipoBtns = document.querySelectorAll('.tipo-btn');
    tipoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tipoBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const tipo = this.dataset.tipo;
            const ingresoFields = document.querySelector('.ingreso-fields');

            if (tipo === 'ingreso') {
                ingresoFields.classList.remove('hidden');
            } else {
                ingresoFields.classList.add('hidden');
            }
        });
    });

    // Origin selection
    const origenBtns = document.querySelectorAll('.origen-btn');
    origenBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            origenBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // New client button
    const nuevoClienteBtn = document.querySelector('.nuevo-cliente-btn');
    if (nuevoClienteBtn) {
        nuevoClienteBtn.addEventListener('click', function() {
            const clienteInput = document.getElementById('cliente-nombre');
            if (clienteInput) {
                clienteInput.focus();
            }
        });
    }

    // Client input validation
    const clienteInput = document.getElementById('cliente-nombre');
    if (clienteInput) {
        clienteInput.addEventListener('input', function() {
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = '';
            }
        });
    }

    // Amount input validation
    const montoInput = document.getElementById('monto');
    if (montoInput) {
        montoInput.addEventListener('input', function() {
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = '';
            }
        });
    }
});

function initializeVentaRapidaModal() {
    // Reset form
    resetVentaRapidaForm();

    // Set default type to ingreso
    const ingresoBtn = document.querySelector('.tipo-btn.ingreso-btn');
    if (ingresoBtn) {
        ingresoBtn.click();
    }

    // Populate client dropdown
    populateClientesDropdown();

    // Populate services dropdown
    populateServiciosDropdown();

    // Focus on first input
    const clienteInput = document.getElementById('cliente-nombre');
    if (clienteInput) {
        setTimeout(() => clienteInput.focus(), 100);
    }
}

function populateClientesDropdown() {
    const clienteSelect = document.getElementById('cliente-select');
    if (!clienteSelect) return;

    clienteSelect.innerHTML = '<option value="">Seleccionar cliente existente</option>';

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nombre;
        option.textContent = cliente.nombre;
        clienteSelect.appendChild(option);
    });
}

function populateServiciosDropdown() {
    const servicioSelect = document.getElementById('servicio');
    if (!servicioSelect) return;

    servicioSelect.innerHTML = '<option value="">Seleccionar servicio</option>';

    servicios.forEach(servicio => {
        const option = document.createElement('option');
        option.value = servicio.nombre;
        option.textContent = `${servicio.nombre} - $${servicio.precio.toFixed(2)}`;
        servicioSelect.appendChild(option);
    });
}

function closeVentaRapidaModal() {
    const modal = document.getElementById('venta-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetVentaRapidaForm();
    }
}

function resetVentaRapidaForm() {
    // Reset type buttons
    const tipoBtns = document.querySelectorAll('.tipo-btn');
    tipoBtns.forEach(btn => btn.classList.remove('active'));

    // Reset origin buttons
    const origenBtns = document.querySelectorAll('.origen-btn');
    origenBtns.forEach(btn => btn.classList.remove('active'));

    // Reset form inputs
    const inputs = ['cliente-nombre', 'cliente-select', 'servicio', 'monto', 'notas'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });

    // Reset payment method
    const metodoPago = document.getElementById('metodo-pago');
    if (metodoPago) metodoPago.value = 'efectivo';

    // Hide ingreso fields
    const ingresoFields = document.querySelector('.ingreso-fields');
    if (ingresoFields) ingresoFields.classList.add('hidden');

    // Clear error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
}

function saveVentaRapida() {
    // Get form values
    const tipo = document.querySelector('.tipo-btn.active')?.dataset.tipo || 'ingreso';
    const clienteNombre = document.getElementById('venta-cliente').value.trim();
    const barbero = document.getElementById('venta-barbero').value;
    const monto = parseFloat(document.getElementById('venta-monto').value);
    const metodoPago = document.getElementById('venta-metodo').value;
    const fecha = document.getElementById('venta-fecha').value;
    const descripcion = document.getElementById('venta-descripcion').value.trim();

    // Validation
    let isValid = true;
    let errors = [];

    // For ingreso, barbero is required
    if (tipo === 'ingreso' && !barbero) {
        errors.push('El barbero es obligatorio para ingresos');
        showFieldError('venta-barbero', 'Barbero es obligatorio');
        isValid = false;
    }

    // Client validation for ingreso
    if (tipo === 'ingreso' && !clienteNombre) {
        errors.push('El cliente es obligatorio para ingresos');
        showFieldError('venta-cliente', 'Cliente es obligatorio');
        isValid = false;
    }

    // Amount validation
    if (isNaN(monto) || monto <= 0) {
        errors.push('El monto debe ser un número mayor a 0');
        showFieldError('venta-monto', 'Monto inválido');
        isValid = false;
    }

    // Date validation
    if (!fecha) {
        errors.push('La fecha es obligatoria');
        showFieldError('venta-fecha', 'Fecha es obligatoria');
        isValid = false;
    }

    if (!isValid) {
        showErrorMessage('Por favor, corrija los errores en el formulario');
        return;
    }

    // Create new client if it's a new one and tipo is ingreso
    if (tipo === 'ingreso' && clienteNombre && !clientes.some(c => c.nombre === clienteNombre)) {
        const newCliente = {
            nombre: clienteNombre,
            telefono: '',
            email: '',
            notas: '',
            fechaRegistro: new Date().toLocaleDateString('es-ES')
        };
        clientes.push(newCliente);
        updateClientesTable();
    }

    // Confirmation for gasto
    if (tipo === 'gasto') {
        const confirmMessage = `¿Está seguro de que desea registrar este gasto de $${monto.toFixed(2)} por "${descripcion}"?`;
        if (!confirm(confirmMessage)) {
            return;
        }
    }

    // Create new transaction
    const newVenta = {
        id: Date.now(),
        tipo: tipo === 'ingreso' ? 'venta' : 'gasto',
        fecha: fecha,
        hora: new Date().toTimeString().slice(0, 5),
        cliente: tipo === 'ingreso' ? clienteNombre : '',
        servicio: tipo === 'ingreso' ? 'Venta rápida' : 'Gasto',
        barbero: tipo === 'ingreso' ? barbero : '',
        monto: monto,
        metodoPago: metodoPago,
        notas: descripcion
    };

    ventas.push(newVenta);
    updateVentasTable();
    updateVentasSummary();

    // Show success message
    showSuccessMessage(`${tipo === 'ingreso' ? 'Ingreso' : 'Gasto'} ingresado exitosamente`);

    // Close modal after a delay to show the message
    setTimeout(() => {
        closeVentaRapidaModal();
        // Switch to the appropriate tab to show the newly saved transaction
        switchTab(tipo === 'ingreso' ? 'venta' : 'gasto');
    }, 2000);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }
}

// Turnos functionality

// Update turnos table
function updateTurnosTable() {
    const turnosContainer = document.getElementById('turnos-container');
    if (!turnosContainer) return;

    // Generate time slots from 09:00 to 22:00 with 40-minute intervals
    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(9, 0, 0, 0); // Start at 09:00

    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // End at 22:00

    while (currentTime <= endTime) {
        timeSlots.push(currentTime.toTimeString().slice(0, 5)); // HH:MM format
        currentTime.setMinutes(currentTime.getMinutes() + 40);
    }

    // Create table HTML
    let tableHTML = '<table class="turnos-table"><thead><tr><th>Hora</th>';

    // Add barber columns
    empleados.forEach(empleado => {
        tableHTML += `<th>${empleado.nombre}</th>`;
    });

    tableHTML += '</tr></thead><tbody>';

    // Add time rows
    timeSlots.forEach(time => {
        tableHTML += `<tr><td class="time-slot">${time}</td>`;

        // Add cells for each barber
        empleados.forEach((empleado, barberIndex) => {
            // Check if there's an existing turno for this time and barber
            const existingTurno = turnos.find(turno =>
                turno.hora === time && turno.barbero === empleado.nombre
            );

            let cellContent = '';
            if (existingTurno) {
                cellContent = `<div class="turno-occupied">
                    <div class="turno-info">
                        <strong>${existingTurno.cliente}</strong><br>
                        <small>${existingTurno.servicio}</small>
                    </div>
                    <button class="action-btn edit-btn" onclick="editTurno('${existingTurno.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>`;
            } else {
                cellContent = `<button class="add-turno-btn" onclick="openNuevoTurnoModal('${time}', '${empleado.nombre}')">
                    <i class="fas fa-plus"></i>
                </button>`;
            }

            tableHTML += `<td class="turno-cell ${existingTurno ? 'occupied' : 'available'}">${cellContent}</td>`;
        });

        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    turnosContainer.innerHTML = tableHTML;
}

// Open new turno modal
function openNuevoTurnoModal(time, barbero) {
    const modal = document.getElementById('turno-modal');
    if (!modal) return;

    // Reset form
    resetTurnoForm();

    // Set default values
    document.getElementById('turno-barbero').value = barbero;
    document.getElementById('turno-hora').value = time;
    document.getElementById('turno-fecha').value = new Date().toISOString().split('T')[0];

    // Populate dropdowns
    populateTurnoClientes();
    populateTurnoServicios();
    populateTurnoBarberos();

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus on first input
    setTimeout(() => {
        document.getElementById('turno-cliente').focus();
    }, 100);
}

// Edit turno (placeholder function)
function editTurno(id) {
    alert('Funcionalidad de edición próximamente disponible');
}

// Populate turno clientes dropdown
function populateTurnoClientes() {
    const datalist = document.getElementById('turno-clientes-list');
    if (!datalist) return;

    datalist.innerHTML = '';

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nombre;
        datalist.appendChild(option);
    });
}

// Populate turno servicios dropdown
function populateTurnoServicios() {
    const select = document.getElementById('turno-servicio');
    if (!select) return;

    select.innerHTML = '<option value="">Seleccionar servicio</option>';

    servicios.forEach(servicio => {
        const option = document.createElement('option');
        option.value = servicio.nombre;
        option.textContent = `${servicio.nombre} - $${servicio.precio.toFixed(2)}`;
        select.appendChild(option);
    });
}

// Populate turno barberos dropdown
function populateTurnoBarberos() {
    const select = document.getElementById('turno-barbero');
    if (!select) return;

    select.innerHTML = '<option value="">Seleccionar barbero</option>';

    empleados.forEach(empleado => {
        const option = document.createElement('option');
        option.value = empleado.nombre;
        option.textContent = empleado.nombre;
        select.appendChild(option);
    });
}

// Reset turno form
function resetTurnoForm() {
    const inputs = ['turno-cliente', 'turno-telefono', 'turno-servicio', 'turno-precio', 'turno-barbero', 'turno-fecha', 'turno-hora'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
}

// Close turno modal
function closeTurnoModal() {
    const modal = document.getElementById('turno-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetTurnoForm();
    }
}

// Save turno
function saveTurno() {
    const cliente = document.getElementById('turno-cliente').value.trim();
    const telefono = document.getElementById('turno-telefono').value.trim();
    const servicio = document.getElementById('turno-servicio').value;
    const precio = parseFloat(document.getElementById('turno-precio').value) || 0;
    const barbero = document.getElementById('turno-barbero').value;
    const fecha = document.getElementById('turno-fecha').value;
    const hora = document.getElementById('turno-hora').value;

    // Validation
    let isValid = true;
    let errors = [];

    if (!cliente) {
        errors.push('El cliente es obligatorio');
        isValid = false;
    }

    if (!servicio) {
        errors.push('El servicio es obligatorio');
        isValid = false;
    }

    if (!barbero) {
        errors.push('El barbero es obligatorio');
        isValid = false;
    }

    if (!fecha) {
        errors.push('La fecha es obligatoria');
        isValid = false;
    }

    if (!hora) {
        errors.push('La hora es obligatoria');
        isValid = false;
    }

    if (!isValid) {
        alert('Errores de validación:\n' + errors.join('\n'));
        return;
    }

    // Create new turno
    const newTurno = {
        id: Date.now().toString(),
        cliente: cliente,
        telefono: telefono,
        servicio: servicio,
        precio: precio,
        barbero: barbero,
        fecha: fecha,
        hora: hora
    };

    turnos.push(newTurno);

    // Update table
    updateTurnosTable();

    // Close modal
    closeTurnoModal();

    // Show success message
    showSuccessMessage('Turno creado exitosamente');
}

// Event listeners for turno modal
document.addEventListener('DOMContentLoaded', function() {
    const turnoModal = document.getElementById('turno-modal');
    const turnoModalClose = turnoModal ? turnoModal.querySelector('.modal-close') : null;
    const turnoCancelBtn = document.getElementById('turno-cancel-btn');
    const turnoSaveBtn = document.getElementById('turno-save-btn');

    // Close modal functions
    if (turnoModalClose) {
        turnoModalClose.addEventListener('click', closeTurnoModal);
    }

    if (turnoCancelBtn) {
        turnoCancelBtn.addEventListener('click', closeTurnoModal);
    }

    if (turnoModal) {
        turnoModal.addEventListener('click', function(event) {
            if (event.target === turnoModal) {
                closeTurnoModal();
            }
        });
    }

    // Save turno
    if (turnoSaveBtn) {
        turnoSaveBtn.addEventListener('click', saveTurno);
    }

    // Update servicio precio when servicio changes
    const turnoServicioSelect = document.getElementById('turno-servicio');
    if (turnoServicioSelect) {
        turnoServicioSelect.addEventListener('change', function() {
            const selectedServicio = servicios.find(s => s.nombre === this.value);
            if (selectedServicio) {
                document.getElementById('turno-precio').value = selectedServicio.precio.toFixed(2);
            }
        });
    }
});
