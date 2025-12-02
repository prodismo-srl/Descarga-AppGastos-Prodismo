// downloads.js - Script para funcionalidades del centro de descargas

class DownloadsManager {
    constructor() {
        this.downloadButton = document.getElementById('download-apk');
        this.downloadCountElement = document.getElementById('download-count');
        this.lastDownloadElement = document.getElementById('last-download');
        this.versionInfoButton = document.getElementById('version-info');
        
        this.init();
    }
    
    init() {
        this.loadStats();
        this.setupEventListeners();
    }
    
    loadStats() {
        // Cargar estadísticas desde localStorage
        let downloadCount = parseInt(localStorage.getItem('prodismo_download_count')) || 342;
        this.downloadCountElement.textContent = downloadCount.toLocaleString();
        
        const lastDownload = localStorage.getItem('prodismo_last_download');
        if (lastDownload) {
            this.lastDownloadElement.textContent = lastDownload;
        }
    }
    
    setupEventListeners() {
        // Botón de descarga
        this.downloadButton.addEventListener('click', () => this.handleDownload());
        
        // Botón de información de versión
        this.versionInfoButton.addEventListener('click', () => this.showVersionInfo());
        
        // Agregar menú móvil si es necesario
        this.addMobileMenu();
    }
    
    handleDownload() {
        const fileUrl = this.downloadButton.getAttribute('data-file');
        const fileName = this.downloadButton.getAttribute('data-filename');
        
        this.showDownloadConfirmation(fileUrl, fileName);
    }
    
    showDownloadConfirmation(fileUrl, fileName) {
        Swal.fire({
            title: '¿Confirmar descarga?',
            html: `
                <div class="text-left">
                    <p class="mb-2">Estás a punto de descargar:</p>
                    <p class="font-semibold text-blue-600">${fileName}</p>
                    <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                            Asegúrate de tener permisos de instalación desde fuentes desconocidas habilitados en tu dispositivo Android.
                        </p>
                    </div>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Descargar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280'
        }).then((result) => {
            if (result.isConfirmed) {
                this.executeDownload(fileUrl, fileName);
            }
        });
    }
    
    executeDownload(fileUrl, fileName) {
        // Crear enlace temporal para descarga
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Actualizar estadísticas
        this.updateDownloadStats();
        
        // Mostrar mensaje de éxito
        this.showDownloadSuccess(fileUrl);
    }
    
    updateDownloadStats() {
        // Incrementar contador
        let downloadCount = parseInt(localStorage.getItem('prodismo_download_count')) || 342;
        downloadCount++;
        localStorage.setItem('prodismo_download_count', downloadCount);
        this.downloadCountElement.textContent = downloadCount.toLocaleString();
        
        // Actualizar última fecha de descarga
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        localStorage.setItem('prodismo_last_download', formattedDate);
        this.lastDownloadElement.textContent = formattedDate;
    }
    
    showDownloadSuccess(fileUrl) {
        Swal.fire({
            title: '¡Descarga iniciada!',
            html: `
                <div class="text-center">
                    <i class="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
                    <p class="mb-2">La descarga ha comenzado.</p>
                    <p class="text-sm text-gray-600">
                        Si la descarga no inicia automáticamente, 
                        <a href="${fileUrl}" class="text-blue-600 font-medium">haz clic aquí</a>.
                    </p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2563eb'
        });
    }
    
    showVersionInfo() {
        Swal.fire({
            title: 'Detalles de la Versión 1.6.25',
            html: `
                <div class="text-left">
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-800 mb-2">Novedades:</h4>
                        <ul class="list-disc pl-5 text-gray-600 space-y-1">
                            <li>Optimización del rendimiento en dispositivos antiguos</li>
                            <li>Corrección de errores en el reporte de viáticos</li>
                            <li>Mejora en la sincronización offline/online</li>
                            <li>Nuevo diseño de interfaz para mejor usabilidad</li>
                        </ul>
                    </div>
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-800 mb-2">Requisitos del sistema:</h4>
                        <ul class="list-disc pl-5 text-gray-600 space-y=1">
                            <li>Android 7.0 o superior</li>
                            <li>100 MB de espacio disponible</li>
                            <li>Conexión a internet para sincronización</li>
                        </ul>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                            Versión desarrollada específicamente para el control de gastos de viajes de Prodismo SRL.
                        </p>
                    </div>
                </div>
            `,
            width: '600px',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2563eb'
        });
    }
    
    addMobileMenu() {
        // Solo agregar en dispositivos móviles
        if (window.innerWidth < 768) {
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-40';
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.appendChild(mobileMenuButton);
            
            mobileMenuButton.addEventListener('click', () => this.showMobileMenu());
        }
    }
    
    showMobileMenu() {
        Swal.fire({
            title: 'Menú Rápido',
            html: `
                <div class="space-y-3">
                    <a href="./index.html" class="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <i class="fas fa-home mr-2"></i>Volver al inicio
                    </a>
                    <a href="#" class="block p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-info-circle mr-2"></i>Acerca de Prodismo
                    </a>
                    <a href="#" class="block p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-download mr-2"></i>Otras descargas
                    </a>
                    <a href="#" class="block p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-headset mr-2"></i>Soporte técnico
                    </a>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            width: '300px'
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DownloadsManager();
});