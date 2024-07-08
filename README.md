# PupiLink

PupiLink es una aplicación de codigo abierto diseñada para ayudar a los estudiantes a encontrar pupilaje de manera mas facil

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#características)
- [Contribuyendo](#contribuyendo)
- [Licencia](#licencia)


## Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v14.x o superior recomendado)
- [npm](https://www.npmjs.com/) (generalmente viene con Node.js)

1. Clona el repositorio:

   ```sh
   git clone https://github.com/MarcelaPortillo/PupiLink.git
   ```

2. Ir al directorio del server
    ```sh
    cd PupiLink/server
    ```

3. Correr el server 
    ```sh
    ./pocketbase serve
    ```
4. Navega al directorio del cliente:
    ```sh
    cd PupiLink/client
    ```

5. Instala las dependencias necesarias:
    ```sh
    npm i 
    ```

6. Iniciar la aplicacion con:
    ```sh
    npm run dev
    ```
Esto lanzará el servidor de desarrollo y abrirá la aplicación en tu navegador web predeterminado.

## Características
- Autenticación de Usuario: Inicio de sesión y registro seguros.
- Gestión de Contenido: Crear, editar y eliminar publicaciones de renta de pupilaje
- Interfaz Interactiva: Interfaz amigable para una mejor interacción del usuario.
- Diseño Responsivo: Funciona en varios dispositivos y tamaños de pantalla.

## Contribuyendo
¡Damos la bienvenida a contribuciones de la comunidad! Para contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature-branch).
3. Realiza tus cambios.
4. Realiza un commit de tus cambios (git commit -am 'Añadir una característica').
5. Haz push a la rama (git push origin feature-branch).
6. Crea un nuevo Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
