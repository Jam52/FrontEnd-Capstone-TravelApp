const app = require('../src/server/index')
const supertest = require('supertest')
const request = supertest(app)
const { async } = require('regenerator-runtime');

test('Gets the test endpoint', async done => {
    // Sends GET Request to /test endpoint

    const res = await request.get('/tripData')
    
    expect(res.status).toBe(200)
    expect(typeof res.body).toBe('object');
    done()
  })