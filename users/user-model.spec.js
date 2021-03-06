const Users = require('./users-model');
const db = require('../data/db-config');
const request = require('supertest')
const server = require('../api/server')

describe('the user model', () => {

    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('The registration model', () => {

        it('should return an object', async () => {
            const userData = { username: 'username', password: 'password', name: "test" };
            const user = await Users.add(userData);

            expect(user).toEqual({"id": 1, "name": "test", "username": "username"});
        })

        it('should return status code 201', async () => {
            const userData = {"name": "test", "username": "username", "password": "password"};
            const res = await request(server).post('/api/users/register').set('Accept', 'application/json').send(userData);

            expect(res.status).toBe(201)
        })
    })

    describe('The login model', () => {

        it('should return an object', async () => {
            const userData = { username: 'username', password: 'password', name: "test" };
            const { username, password } = userData
            const user = await Users.add(userData);
            const login = await Users.findBy({ username })

            expect(login.length).toBe(1);
        })

        it('should return status code 201', async () => {
            let userData = {"name": "test", "username": "username", "password": "password"};
            const send = await request(server).post('/api/users/register').set('Accept', 'application/json').send(userData);
            delete userData.name
            const res = await request(server).post('/api/users/login').set('Accept', 'application/json').send(userData);

            expect(res.status).toBe(200)
        })
    })
})