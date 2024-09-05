import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import request from 'supertest';
import { handler as app } from '../../../src/handler'

let response: request.Response;
let commentData: any;
let queryParams: any;
let initialComments: any[] = [];

// Implementación del paso Given para los datos del comentario
Given('I have the following comment data:', function (dataTable) {
    commentData = dataTable.rowsHash();
});

// Implementación del paso When para la solicitud POST
When('I send a POST request to {string} with the comment data', async function (endpoint) {
    response = await request(app)
        .post(endpoint)
        .send(commentData);
});

// Implementación del paso Then para verificar el estado de la respuesta
Then('the response status should be {int}', function (status) {
    expect(response.status).to.equal(status);
});

// Implementación del paso Then para verificar el mensaje de la respuesta
Then('the response message should be {string}', function (message) {
    expect(response.body.message).to.equal(message);
});

// Implementación del paso Given para los comentarios iniciales
Given('there are comments with the following data:', async function (dataTable) {
    initialComments = dataTable.hashes();
    // Aquí deberías insertar los comentarios en una base de datos de prueba
    // o utilizar un método de configuración para que estén disponibles durante las pruebas
    for (const comment of initialComments) {
        await request(app).post('/comments').send(comment);
    }
});

// Implementación del paso When para la solicitud GET
When('I send a GET request to {string} with the query parameters:', async function (endpoint, dataTable) {
    queryParams = dataTable.rowsHash();
    response = await request(app)
        .get(endpoint)
        .query(queryParams);
});

// Implementación del paso Then para verificar la respuesta de la búsqueda
Then('the response should contain:', function (dataTable) {
    const expected = dataTable.rowsHash();
    const responseBody = response.body;

    // Verifica los datos esperados en la respuesta
    expect(responseBody.comments).to.deep.equal(JSON.parse(expected.comments)); // Asegúrate de que el formato sea el esperado
    expect(responseBody.lastEvaluatedKey).to.equal(expected.lastEvaluatedKey);
});
