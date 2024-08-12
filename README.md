# Star wars comments api
Api que sirve para guardar comentarios u opiniones sobre los recursos de api, donde puedes comentar sobre tu personaje, pelicula, nave, vehiculo, planeta o especie de star wars favorito.

## Uso

Instalar dependencias:

```
npm install
```

y luego desplegar con:

```
serverless deploy
```

### Desarrollo local

```
serverless dev
```

## Documentacion de uso
El repositorio incluye la coleccion de postman, puedes importarlo para revisar los apis facilmente.
En postman, opcion 'importar' o 'import'
![image](https://github.com/user-attachments/assets/296aaa34-f875-45a5-bf77-6e01f2df6fcf)

Apareceran los 3 endpoints que expone el proyecto
![image](https://github.com/user-attachments/assets/b84dd328-0691-484c-90ae-5f31f161763e)

En variables de coleccion, actualizar por la url dada por el `serverless deploy` o `serverless dev`.
![image](https://github.com/user-attachments/assets/11f5c50a-5498-46ff-954d-48c96cfaffc9)

Una vez realizado estas configuraciones, se puede probar los endpoints.
1. GET: Translate swapi: Endpoint que integra todos los recursos que se tiene en el api swapi y traduce sus atributos de ingles a español.
![image](https://github.com/user-attachments/assets/8e28381d-0df9-4d7d-b3ae-f61def201601)
En la url, debe poner de la misma manera que en el api swapi, para cualquier recurso ya sea: personaje, pelicula, nave, vehiculo, planeta o especie. Asimismo, debe incluir el id como en api swapi.

2. POST: Create comment: Endpoint que crea un comentario y guarda el comentario en DynamoDB sobre algun recurso del api swapi. Por ejemplo, se esta creando un comentario sobre el personaje con id 1 en swapi de la siguiente manera.
![image](https://github.com/user-attachments/assets/3cad07a2-1f89-4131-a0eb-f0e932fa1612)
En caso todo vaya bien, devolvera un estado 201 creado con un mensaje.
En caso el recurso o el recursoId no pertenezca a ningun recurso valido en api swapi, saltara el siguiente error. Para ejemplificar, estamos escribiendo mal el recuso.
![image](https://github.com/user-attachments/assets/bc0caa8f-30b1-49ac-9547-87a859c221d2)

3. GET: Comments of resource swapi: Endpoint que obtiene los comentarios registrados a los recursos de swapi. En este ejemplo, vamos a recuperar los comentarios para el recurso `people/1` de swapi.
![image](https://github.com/user-attachments/assets/7658b8d9-b9a2-4cbf-9992-e218bfa0b46e)
Asimismo, se implemento la paginacion, con query params como `limit` y `lastEvaluatedKey` que nos da DynamoDB.
Cuando enviamos un limite, el resultado es el siguiente. Un objeto con los comentarios y se agrega el `lastEvaluatedKey` para enviarlo como query param para obtener la "siguiente pagina".
![image](https://github.com/user-attachments/assets/cae2ee08-46a8-4630-bb07-75343258fc12)
Como se ve, solo nos devolvio 2 comentarios.

Ahora, enviamos como query param `lastEvaluatedKey`.
 ![image](https://github.com/user-attachments/assets/7b588c21-1dce-40a7-9487-1126b2060adc)
Como se ve, se obtiene los otros dos comentarios del recurso.

