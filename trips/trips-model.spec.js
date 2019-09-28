const Trips = require('./trips-model');
const db = require('../data/db-config');
const request = require('supertest')
const server = require('../api/server')

describe('the trips model', () => {

    beforeEach(async () => {
        await db('trips').truncate();
    })

    describe('The add model', () => {

        it('should return an object', async () => {
            const tripData = { destination: "Hawaii"};
            const trip = await Trips.addTrip(tripData);

            expect(trip).toEqual({ "complete": 0, "destination": "Hawaii", "end_date": null, "id": 1, "start_date": null });
        })

        it('should return status code 201', async () => {
            const tripData = { destination: "Hawaii"};
            const res = await request(server).post('/api/trips').set('Accept', 'application/json').send(tripData);

            expect(res.status).toBe(201)
        })
    })

    describe('The get model', () => {

        it('should return an object', async () => {
            const tripData = { destination: "Hawaii"};
            const trip = await Trips.addTrip(tripData);
            const get = await Trips.findTrips()

            expect(get.length).toBe(1);
        })

        it('should return status code 200', async () => {
            const res = await request(server).get('/api/trips');

            expect(res.status).toBe(200)
        })
    })
})