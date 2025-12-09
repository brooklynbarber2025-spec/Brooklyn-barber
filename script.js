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

// Menu item click functionality
document.querySelectorAll('.menu-list li').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.textContent.trim();
        const welcomeSection = document.getElementById('welcome-section');
        const dashboardModules = document.getElementById('dashboard-modules');
        const turnosSection = document.getElementById('turnos-section');
        const empleadosSection = document.getElementById('empleados-section');

        // Hide all sections
        welcomeSection.style.display = 'none';
        dashboardModules.style.display = 'none';
        turnosSection.style.display = 'none';
        empleadosSection.style.display = 'none';

        // Show the selected section
        if (text === 'Panel General') {
            welcomeSection.style.display = 'flex';
            dashboardModules.style.display = 'grid';
        } else if (text === 'Turnos') {
            turnosSection.style.display = 'block';
        } else if (text === 'Empleados') {
            empleadosSection.style.display = 'block';
            updateEmpleadosTable();
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
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4edda;
        color: #155724;
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
