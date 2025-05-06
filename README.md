# 3MPRND, S.A. - Portal Web

Portal web para la empresa 3MPRND, S.A., especializada en mantenimiento y reparación de dispositivos electrónicos.

## Características

- Catálogo de productos reacondicionados
- Servicios de mantenimiento y reparación
- Carrito de compras
- Sistema de facturación
- Panel de administración
- Chatbot de atención al cliente

## Tecnologías Utilizadas

- React 18
- React Router DOM
- Firebase (Firestore, Storage)
- Tailwind CSS
- Vite

## Requisitos Previos

- Node.js 16.x o superior
- npm 7.x o superior
- Cuenta de Firebase

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/3mprnd.git
cd 3mprnd
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar Firebase:
   - Crear un proyecto en Firebase Console
   - Habilitar Firestore y Storage
   - Copiar las credenciales de configuración
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```
     VITE_FIREBASE_API_KEY=tu-api-key
     VITE_FIREBASE_AUTH_DOMAIN=tu-auth-domain
     VITE_FIREBASE_PROJECT_ID=tu-project-id
     VITE_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
     VITE_FIREBASE_APP_ID=tu-app-id
     ```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter

## Estructura del Proyecto

```
/src
  /components      # Componentes reutilizables
  /pages          # Páginas de la aplicación
  /context        # Contextos de React
  /styles         # Estilos globales
  /firebase       # Configuración de Firebase
```

## Despliegue

1. Construir la aplicación:
```bash
npm run build
```

2. Desplegar en Firebase Hosting:
```bash
firebase deploy
```

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

3MPRND, S.A.
- Email: info@3mprnd.com
- Teléfono: (123) 456-7890
- Dirección: Calle Principal #123 