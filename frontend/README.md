# TecnoShop

Bienvenido al repositorio de TecnoShop. Este README proporciona una visión general del proyecto, instrucciones de configuración y otra información relevante.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)

## Introducción

El proyecto TecnoShop es una aplicación full-stack diseñada para gestionar pedidos e inventarios. Consiste en un frontend construido con Angular y un backend construido con Node.js y Express. La aplicación proporciona funcionalidades para crear, actualizar y eliminar pedidos y productos, así como gestionar inventarios.

## Características

- Autenticación y autorización de usuarios
- Operaciones CRUD para usuarios, productos y pedidos
- Endpoints de API seguros
- Validación de datos y manejo de errores
- Reconocimiento de voz para la entrada de formularios
- Actualizaciones de stock en tiempo real

## Instalación

Para comenzar con el proyecto TecnoShop, sigue estos pasos:

### Backend

1. **Instalar dependencias:**

    ```bash
    npm install
    ```

2. **Configurar variables de entorno:**

    Modificar el archivo `.env` en el directorio raíz y agrega las variables de entorno necesarias. Consulta `.env.example` para las variables requeridas.

3. **Ejecutar la aplicación:**

    ```bash
    npm start
    ```

    Para poner el servidor express en servicio ejecutar el comando:

    ```bash
    cd ./backend/src

    node db.js
    ```

### Frontend

1. **Navegar al directorio del frontend:**

    ```bash
    cd ../frontend
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Ejecutar la aplicación:**

    ```bash
    ng serve
    ```

    La aplicación se ejecutará en `http://localhost:4200` por defecto.

### Base de Datos

Crear una base de datos con las siguientes caracteristicas:

URL de conexión: mongodb://localhost:27017/InnovacorpDB

Agregar las colecciones adjuntas en el directorio llamado InnovacorpDB que se encuentra ene el directorio raíz.

Las colecciones son:

1. Orders.
2. Products.
3. Reports.
4. Users.

## Uso
Después de configurar el proyecto, puedes iniciar el servidor y acceder a los endpoints de la API. El servidor backend se ejecutará en `http://localhost:3000` por defecto, y la aplicación frontend se ejecutará en `http://localhost:4200`.