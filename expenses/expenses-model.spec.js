const Expenses = require('./expenses-model');
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');
const Trips = require('../trips/trips-model');

describe('the expenses model', () => {

    beforeEach(async () => {
        await db('expenses').truncate();
        await db('trips').truncate();
    })

    describe('The add model', () => {

        it('should return an object', async () => {
            const tripData = { destination: "Hawaii"};
            const trip = await Trips.addTrip(tripData);
            const expenseData = { name: "Resort Stay", price: 200, trip_id: 1 };
            const expense = await Expenses.addExpenses(expenseData);

            expect(expense[0]).toEqual({"destination": "Hawaii", "id": 1, "name": "Resort Stay", "price"
            : 200, "trip_id": 1});
        })

        it('should return status code 201', async () => {
            const tripData = { destination: "Hawaii"};
            const trip = await Trips.addTrip(tripData);
            const expenseData = { name: "Resort Stay", price: 200, trip_id: 1 };
            const res = await request(server).post('/api/expenses').set('Accept', 'application/json').send(expenseData);

            expect(res.status).toBe(201)
        })
    })

    describe('The get model', () => {

        it('should return an object', async () => {
            const tripData = { destination: "Hawaii"};
            const trip = await Trips.addTrip(tripData);
            const expenseData = { name: "Resort Stay", price: 200, trip_id: 1 };
            const expense = await Expenses.addExpenses(expenseData);
            const get = await Expenses.findExpenses()

            expect(get.length).toBe(1);
        })

        it('should return status code 200', async () => {
            const res = await request(server).get('/api/expenses');

            expect(res.status).toBe(200)
        })
    })
})