import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import request from 'supertest';
import { handler as app } from '../../../src/handler'

let response: request.Response;
let commentData: any;
let queryParams: any;
let initialComments: any[] = [];


Given('I have the following comment data:', function (dataTable) {
    commentData = dataTable.rowsHash();
});


When('I send a POST request to {string} with the comment data', async function (endpoint) {
    response = await request(app)
        .post(endpoint)
        .send(commentData);
});


Then('the response status should be {int}', function (status) {
    expect(response.status).to.equal(status);
});


Then('the response message should be {string}', function (message) {
    expect(response.body.message).to.equal(message);
});


Given('there are comments with the following data:', async function (dataTable) {
    initialComments = dataTable.hashes();
    for (const comment of initialComments) {
        await request(app).post('/comments').send(comment);
    }
});


When('I send a GET request to {string} with the query parameters:', async function (endpoint, dataTable) {
    queryParams = dataTable.rowsHash();
    response = await request(app)
        .get(endpoint)
        .query(queryParams);
});


Then('the response should contain:', function (dataTable) {
    const expected = dataTable.rowsHash();
    const responseBody = response.body;


    expect(responseBody.comments).to.deep.equal(JSON.parse(expected.comments));
    expect(responseBody.lastEvaluatedKey).to.equal(expected.lastEvaluatedKey);
});
