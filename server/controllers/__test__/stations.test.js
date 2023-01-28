const request = require('supertest');
const app = require('../../app');

describe('journey', () => {
  it('should returns 200 if valid request', async () => {
    const response = await request(app).get('/api/stations');
    expect(response.statusCode).toEqual(200);
  })
})