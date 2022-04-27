import request  from 'supertest'
import 'jest'
import { appDataSource } from '../dbConfig'
const createServer = require('../app')

beforeAll(async () => {
    await appDataSource.initialize()
})
const app = createServer()

describe('Testing API /metric', () => {
    const obj1 = {
        name: 'test1',
        value: 1000,
        timestamp: '2022-03-01T10:40'
    }

    test('Send a valid metric', async () => {
        const response = await request(app)
            .post('/metric')
            .send(obj1)
            .expect('Content-Type', /json/)

        expect(response.status).toEqual(201)
        expect(Array.isArray(response.body)).toBeFalsy()
        expect(response.body.name).toEqual(obj1.name)
        expect(response.body).toHaveProperty('id')
    })
    
    test('Send a wrong metric without all props', async () => {
        const obj2 = {
            name: 'test2',
        }

        await request(app)
        .post('/metric')
        .send(obj2)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
            expect(response.body.message).toBe('Missing parameters')
        })

    })

    test('Send a wrong metric with invalid type prop', async () => {
        const obj2 = {
            name: 33,
            value: 2000,
            timestamp: '2022-02-01T10:40'
        }

        await request(app)
        .post('/metric')
        .send(obj2)
        .expect('Content-Type', /json/)
        .expect(500)
        .then(response => {
            expect(response.body.message).toBe('Something went wrong when saving data')
        })

    })

    test('Get metric without period', async () => {
        const response = await request(app)
            .get('/metric')
            .expect('Content-Type', /json/)

        expect(response.status).toBe(400)      
        expect(response.body.message).toBe('Invalid period')
    })

    test('Get metric with valid period', async () => {     
        await request(app)
        .get('/metric?period=day')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toHaveLength(1)
        })
    })

    test('Return right day average from user', async () => {
        const obj2 = {
            name: 'test1',
            value: 2000,
            timestamp: '2022-03-01T12:40'
        }
        
        await request(app)
            .post('/metric')
            .send(obj2)
            .expect('Content-Type', /json/)
            .expect(201)
        
        await request(app)
            .get('/metric?period=day')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(1)
                expect(response.body[0].value).toBe(1500)

            })
    })
})
