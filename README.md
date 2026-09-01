# Tarea 1 - Evolución de una API Backend

## Descripción del proyecto

Este proyecto consiste en una API REST para administrar libros utilizando **Node.js, Express y TypeScript**.

La aplicación fue desarrollada aplicando una **arquitectura en capas**, separando las responsabilidades entre rutas, controladores, servicios, repositorios y tipos. Actualmente los datos se almacenan en memoria, pero la arquitectura permite sustituir esta forma de persistencia por una base de datos como PostgreSQL o MongoDB sin modificar las capas superiores.

La API permite:

- Consultar todos los libros.
- Consultar un libro por ID.
- Crear libros.
- Validar los datos recibidos.
- Actualizar parcialmente un libro.
- Eliminar libros.
- Filtrar libros mediante parámetros de consulta.
- Manejar errores de forma centralizada.
- Mantener desacoplada la lógica de negocio de la persistencia.

---

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- API REST
- Módulos ES

---

## Arquitectura

El flujo principal de una petición es:

```text
Cliente
   ↓
HTTP / Express
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Fuente de datos
```

### Responsabilidad de cada capa

- **Router:** define los endpoints y conecta las rutas con los Controllers.
- **Controller:** recibe la petición HTTP y construye la respuesta.
- **Service:** contiene la lógica de negocio y las validaciones.
- **Repository:** administra el acceso y modificación de los datos.
- **Types:** define las estructuras utilizadas por TypeScript.
- **Middleware de errores:** responde de forma centralizada cuando ocurre un error.

---

## Estructura del proyecto

```text
src/
├── app.ts
├── index.ts
│
├── controllers/
│   └── book.controller.ts
│
├── errors/
│   └── app.error.ts
│
├── middlewares/
│   └── error.middleware.ts
│
├── repositories/
│   └── book.repository.ts
│
├── routes/
│   └── book.routes.ts
│
├── services/
│   └── book.service.ts
│
└── types/
    └── book.ts
```

---

## Instalación

### 1. Clonar o descargar el proyecto

Abrir la carpeta del proyecto en Visual Studio Code.

### 2. Instalar las dependencias

En una terminal dentro de la carpeta del proyecto ejecutar:

```bash
npm install
```

---

## Ejecución

### Modo de desarrollo

```bash
npm run dev
```

El servidor se ejecuta en:

```text
http://localhost:3000
```

### Compilar TypeScript

```bash
npm run build
```

### Ejecutar la versión compilada

```bash
npm start
```

---

## Modelo de libro

Cada libro contiene la siguiente información:

```ts
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}
```

---

## Endpoints disponibles

| Método | Endpoint | Descripción | Respuesta esperada |
|---|---|---|---|
| GET | `/api/books` | Obtener todos los libros | 200 |
| GET | `/api/books/:id` | Obtener un libro por ID | 200 o 404 |
| POST | `/api/books` | Crear un libro | 201 o 400 |
| PATCH | `/api/books/:id` | Actualizar parcialmente un libro | 200 o 404 |
| DELETE | `/api/books/:id` | Eliminar un libro | 204 o 404 |
| GET | `/api/books?author=Martin` | Filtrar libros por autor | 200 |

---

## Ejemplos de uso

### Obtener todos los libros

```http
GET /api/books
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
  },
  {
    "id": 2,
    "title": "Design Patterns",
    "author": "Erich Gamma",
    "year": 1994
  }
]
```

---

### Obtener un libro por ID

```http
GET /api/books/1
```

Ejemplo de respuesta:

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

Si el libro no existe:

```json
{
  "message": "Libro no encontrado"
}
```

---

### Crear un libro

```http
POST /api/books
Content-Type: application/json
```

Body:

```json
{
  "title": "The Hobbit",
  "author": "J. R. R. Tolkien",
  "year": 1937
}
```

Ejemplo de respuesta:

```json
{
  "id": 3,
  "title": "The Hobbit",
  "author": "J. R. R. Tolkien",
  "year": 1937
}
```

La creación correcta devuelve **HTTP 201 Created**.

---

### Actualizar parcialmente un libro

```http
PATCH /api/books/1
Content-Type: application/json
```

Body:

```json
{
  "year": 2009
}
```

Ejemplo de respuesta:

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2009
}
```

Solo se modifican las propiedades enviadas.

---

### Eliminar un libro

```http
DELETE /api/books/3
```

Si la eliminación es exitosa, la API responde con:

```text
HTTP 204 No Content
```

Si el libro no existe:

```json
{
  "message": "Libro no encontrado"
}
```

---

### Filtrar libros por autor

```http
GET /api/books?author=Martin
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
  }
]
```

Si no se proporciona el parámetro `author`, el endpoint mantiene su comportamiento original y devuelve todos los libros.

---

## Validaciones

Para crear un libro se aplican las siguientes validaciones:

- El título es obligatorio.
- El título no puede contener solamente espacios.
- El autor es obligatorio.
- El año debe ser un número válido.
- Una solicitud inválida no crea un libro.

Ejemplo de error:

```json
{
  "message": "El título es obligatorio"
}
```

La API responde con **HTTP 400 Bad Request** cuando los datos enviados son inválidos.

---

## Manejo centralizado de errores

La aplicación utiliza un middleware de errores para evitar repetir la misma lógica en cada Controller.

Los errores generados en las capas inferiores pueden llegar al middleware, que construye una respuesta HTTP consistente para el cliente.

Ejemplos:

```text
400 Bad Request
404 Not Found
500 Internal Server Error
```

---

## Persistencia

Actualmente los libros se almacenan en memoria dentro de la implementación del Repository.

Las capas superiores no conocen cómo se almacenan los datos:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Memoria
```

Esto permite cambiar la persistencia en el futuro:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL / MongoDB
```

El Controller y el Service no deberían necesitar cambios por el simple hecho de sustituir la tecnología de almacenamiento.

---

## Pruebas realizadas

Las pruebas se realizaron mediante `curl.exe`.

| Prueba | Resultado |
|---|---|
| `GET /api/books` | 200 OK |
| `GET /api/books/1` | 200 OK |
| `GET /api/books/999` | 404 Not Found |
| `POST /api/books` con datos válidos | 201 Created |
| `POST /api/books` con datos inválidos | 400 Bad Request |
| `PATCH /api/books/1` | 200 OK |
| `GET /api/books?author=Martin` | 200 OK y filtro correcto |
| `DELETE /api/books/3` | 204 No Content |
| `DELETE /api/books/999` | 404 Not Found |
| `npm run build` | Compilación correcta |

---

# Reflexión de ingeniería

## 1. ¿Qué problema intenta resolver una arquitectura en capas?

Una arquitectura en capas intenta separar las diferentes responsabilidades de una aplicación. De esta manera, cada parte del sistema se encarga de una función específica, lo que facilita entender, modificar, probar y mantener el código.

En este proyecto, por ejemplo, el Controller se encarga de HTTP, el Service contiene la lógica de negocio y el Repository administra los datos.

---

## 2. ¿Qué consecuencias tendría colocar toda la lógica en el Controller?

El Controller tendría demasiadas responsabilidades y el código sería más difícil de mantener. También se mezclarían las reglas de negocio, el manejo HTTP y el acceso a datos en un mismo lugar.

Esto generaría código más largo, repetitivo y difícil de modificar conforme el sistema creciera.

---

## 3. ¿Qué ventaja obtienes al separar la lógica de negocio del acceso a datos?

La principal ventaja es que la lógica de negocio puede mantenerse independiente de la tecnología utilizada para guardar la información.

Por ejemplo, el Service puede seguir utilizando las mismas operaciones aunque los datos dejen de almacenarse en memoria y posteriormente se utilice una base de datos.

También facilita realizar cambios y pruebas sin afectar otras partes de la aplicación.

---

## 4. Si cambiaras PostgreSQL por MongoDB, ¿qué componentes deberían modificarse?

Principalmente tendría que cambiar la implementación del Repository y la configuración necesaria para conectarse a MongoDB.

El Router, Controller y Service deberían permanecer prácticamente iguales, porque estas capas no deberían depender directamente de la tecnología de persistencia utilizada.

---

## 5. ¿Existe una arquitectura "perfecta" para cualquier sistema? ¿Por qué?

No existe una arquitectura perfecta para todos los sistemas, porque cada proyecto tiene diferentes necesidades, tamaño, complejidad y posibilidades de crecimiento.

Una arquitectura útil para una aplicación grande podría agregar complejidad innecesaria a una aplicación pequeña. La arquitectura debe seleccionarse de acuerdo con el problema que se quiere resolver.

---

## 6. ¿En qué momento agregar más capas puede comenzar a generar complejidad innecesaria?

Agregar capas comienza a generar complejidad innecesaria cuando no existe una responsabilidad clara que justifique cada nueva capa.

Si una aplicación pequeña utiliza demasiadas abstracciones, interfaces o componentes para realizar operaciones sencillas, el código puede volverse más difícil de seguir en lugar de facilitar su mantenimiento.

---

## Pregunta adicional

### Piensa en una actividad cotidiana como pedir comida, realizar una compra en línea o solicitar un servicio. ¿Puedes identificar responsabilidades diferentes que podrían separarse de manera similar a las capas de un Backend?

Sí. Por ejemplo, en una compra en línea se pueden separar varias responsabilidades:

- Una parte recibe la solicitud del cliente.
- Otra valida la información del pedido.
- Otra calcula precios, promociones y disponibilidad.
- Otra consulta o actualiza el inventario.
- Otra procesa el pago.
- Otra prepara la respuesta final para el cliente.

Esta separación es similar a una arquitectura Backend, porque cada componente se encarga de una responsabilidad específica y puede modificarse con menor impacto en los demás.

---

## Pregunta de ingeniería sobre persistencia

### Si mañana la empresa decide cambiar PostgreSQL por MongoDB, ¿qué debería cambiar en la arquitectura y qué debería permanecer igual?

Se debería cambiar principalmente la implementación del Repository y la configuración utilizada para conectarse a la nueva base de datos.

El Router, Controller y Service deberían permanecer iguales porque no dependen directamente de PostgreSQL o MongoDB. El Service solamente utiliza las operaciones proporcionadas por el Repository.

De esta manera, el cambio de tecnología de persistencia no obliga a reescribir toda la aplicación.

---

## Repositorio

Repositorio público de GitHub:

```text
Agregar aquí la URL del repositorio público antes de entregar.
```
