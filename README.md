# Proyecto Backend

## ¿Qué hace cada ruta?

GET / = Saludo para verificar que la API funciona.

GET /tarjetas-graficas = Devuelve todas las tarjetas gráficas.

GET /tarjetas-graficas/:modelo = Busca una tarjeta gráfica específica por su modelo.

POST /tarjetas-graficas/agregar = Permite agregar una nueva tarjeta gráfica.

PUT /tarjetas-graficas/:modelo = Actualiza los detalles de una tarjeta gráfica usando su modelo.

DELETE /tarjetas-graficas/:modelo = Elimina una tarjeta gráfica usando su modelo.

---

### 1. Iniciar el servidor

<ul>
<li>Ejecutar el servidor Express (previo a iniciar Postman): node app.js</li>
<li>Respuesta esperada: Servidor ejecutándose en http://localhost:3000</li>
</ul>

---

### 2. Iniciar Postman y probar ruta

<ul>
<li>Seleccioná el método HTTP correspondiente (GET, POST, PUT, DELETE).</li>
<li>Configurá la URL base: http://localhost:3000</li>
<li>Respuesta esperada: "API funcionando Ok"</li>
</ul>

### 3. Login

<ul>
<li>Seleccionar el método POST.</li>
<li>Configurar la URL: http://localhost:3000/login</li>
<li>Body (JSON): Seleccioná raw → JSON. Agregar el nombre y la contraseña:</li>
</ul>

```
{
	"username": "admin",
	"password": "admin"
}
```

<ul>
<li>Se va a devolver un mensaje de autenticación exitosa y un token.</li>
<li>En la pestaña de Authorization, seleccionar en el menú Auth Type la opción Bearer Token</li>
<li>En la misma pestaña, copiar y pegar el token recibido en la caja de la derecha.</li>
<li>Una vez hecho esto, ya se pueden probar los demás métodos.</li>
</ul>

---

### 4. Pruebas de métodos

#### **4.1 - GET**

4.1.1 Llamar lista de tarjetas gráficas

<ul>
<li>URL: http://localhost:3000/tarjetas-graficas</li>
<li>Respuesta esperada: Lista de tarjetas gráficas del equipo en formato JSON</li>
</ul>

4.1.2 Buscar tarjeta gráfica por modelo

<ul>
<li>URL: http://localhost:3000/tarjetas-graficas/RTX 4090</li>
<li>Respuesta esperada: Datos de la tarjeta gráfica con ese modelo</li>
<li>Mensaje de error: "No se ha encontrado la tarjeta gráfica"</li>
</ul>

#### **4.2 - POST**

4.2.1 Agregar tarjeta gráfica

<ul>
<li>URL: http://localhost:3000/tarjetas-graficas/agregar</li>
<li>Body (JSON): Seleccioná raw → JSON. Agregar el formato JSON con los datos de la nueva tarjeta gráfica:</li>
</ul>

```
{ "modelo": "RTX 4090", "marca": "NVIDIA", "memoria": 24, "precio": 1499.99, "fechaLanzamiento": "2023-10-12T00:00:00Z" }
```

<ul>
<li>Respuesta esperada: Listado de JSON actualizado con nueva tarjeta gráfica.</li>
<li>Mensaje de error: "Faltan datos"</li>
</ul>

#### **4.3 - PUT**

4.3.1 Actualizar detalles de tarjeta gráfica identificando por modelo

<ul>
<li>URL: http://localhost:3000/tarjetas-graficas/RTX4080</li>
<li>Body (JSON): Seleccioná raw → JSON. Agregar en formato JSON los datos a actualizar:</li>
</ul>

```
{ "memoria": 16, "precio": 1299.99 }
```

<ul>
<li>Respuesta esperada: Elemento de JSON con datos de la tarjeta gráfica actualizados.</li>
<li>Mensaje de error: "No se encontró tarjeta gráfica con ese modelo"</li>
</ul>

#### **4.4 - DELETE**

4.4.1 Eliminar una tarjeta gráfica por modelo

<ul>
<li>URL: http://localhost:3000/tarjetas-graficas/RTX3070</li>
<li>Respuesta esperada: Listado de JSON actualizado sin la tarjeta gráfica con el modelo ingresado.</li>
<li>Mensaje de error: "No se ha encontrado la tarjeta gráfica con ese modelo"</li>
</ul>
