const request = require('supertest');
const app = require('../../src/app');
const {validUserA} = require("../mocks/users");
const {setupDb} = require("../mocks/helpers");

beforeAll(async () => await setupDb());

test('should sign in existing user', async () => {
    await request(app).post('/auth/login').send(validUserA).expect(200);
});

test('should not sign in non-existing user', async () => {
    await request(app).post('/auth/login').send({
        email: 'idontexist@example.com',
        password: 'ReallyIdont'
    }).expect(403, {error: 'Unable to sign in'} );
});

test('should not sign in user with incorrect passwrod', async () => {
    await request(app).post('/auth/login').send({
        ...validUserA,
        password: 'wrong password'
    }).expect(403, {error: 'Unable to sign in'} );
});

