# App de Recetas Web – CRUD con MERN Stack

Este proyecto es una aplicación web fullstack desarrollada como parte de una cursada universitaria. Permite crear, leer, actualizar y eliminar recetas de cocina, cada una con su nombre, imagen, ingredientes y pasos de preparación.


El proyecto carga primeramente en el formulario de Login, en el cual solamente necesitas user y passw,
una vez superado este inicio de sesion pasas a ver las recetas que hay cargadas en la pagina, con la posibilidad de
mostrarlas segun su categoria(pastas, postres y veganos).


En el header hay 2 botones con los que podras agregar recetas y cerrar tu sesion,
las tarjetas tienen 3 botones(ver, editar y eliminar)
al mostrar, crear y actualizar tus recetas se visualizan a traves de un Modal. Y al termino de la accion
se muestra automaticamente el cambio por el uso de estados y manejo de props
---

## Tecnologías utilizadas

- **Frontend**: React + TailwindCSS
- **Backend**: Node.js + Express.js
- **Base de datos**: MongoDB con Mongoose
- **Middleware de imagenes**: Multer

---

## Funcionalidades principales

- 📝 Crear una receta con:
  - Nombre
  - Categoria
  - Tiempo de preparacion
  - Cantidad de porciones
  - Ingredientes dinamicos (nombre, cantidad, unidad)
  - Imagen representativa
  - Descripción de preparación
- 📚 Visualizar recetas
- ✏️ Editar recetas existentes
- 🗑️ Eliminar recetas
- 📂 Subida de imagenes locales (guardadas en `public/uploads`)
- 🔒 Validaciones en frontend y backend

---

## 🗂️ Estructura del proyecto

📁 client/ → Frontend con React
📁 public/uploads/ → Carpeta donde se almacenan las imagenes
📁 src/ → Backend con Express
│ ├── controllers/ → Lógica de negocio
│ ├── models/ → Schemas de Mongoose (recetas y usuarios)
│ ├── routes/ → Endpoints de Express
│ ├── services/ → Funciones que interactúan con la base de datos
│ └── middlewares/ → Multer para manejo de imagenes
📄 app.js → Configuración principal de Express