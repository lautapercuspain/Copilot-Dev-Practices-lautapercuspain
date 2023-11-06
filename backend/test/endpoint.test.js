const request = require('supertest');
const app = require('../server');
const fs = require('fs');

describe('Backend Setup Tests', () => {
    test('Test Backend Response', async () => {
        /**
         * Sends a GET request to the root endpoint of the app and returns the response.
         * @returns {Promise<object>} The response object from the GET request.
         */
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Welcome to the application.');
    });
    test('Test the CORS policy', async () => {
        const response = await request(app).get('/');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });
});


describe('API Testing / Test the model routes', () => {
    test('Test respond to the GET method', async () => {
        /**
         * Sends a GET request to the '/api/model' endpoint and returns the response.
         * @returns {Promise<object>} The response object.
         */
        const response = await request(app).get('/api/model');
        expect(response.statusCode).toBe(200);
        //fs.writeFileSync('response.json', response.text);
    });

    test('Test GET /api/model Returning Listings', async () => {
        const response = await request(app).get('/api/model');
        expect(response.statusCode).toBe(200);
        //fs.writeFileSync('response.json', response.text);
        /**
         * Parses the response text to extract the listings and reviews data.
         * @param {string} response - The response object from the API call.
         * @returns {Array} - An array of listings and reviews data.
         */
        let listingsAndReviews = JSON.parse(response.text).listingsAndReviews;
        expect(Array.isArray(listingsAndReviews)).toBe(true);
    });

    test('Test - GET /api/model/{id}', async () => {
        /**
         * Sends a GET request to the '/api/model/:id' endpoint with the specified ID and awaits the response.
         * @param {string} id - The ID of the model to retrieve.
         * @returns {Promise<object>} - A promise that resolves to the response object.
         */
        let response = await request(app).get('/api/model/15469178');        
        expect(response.statusCode).toBe(200);
        //fs.writeFileSync('response1.json', response.text);
        var data = JSON.parse(response.text);
        expect(data).toEqual(expect.objectContaining({ 'name': 'Cozy place in Hong Kong Island' }));
    });

    test('Test - PUT /api/model/{id} & GET /api/model/{id}', async () => {
        /**
         * Test updating a model by sending a PUT request to the API endpoint.
         * @returns {Promise} A Promise that resolves with the response from the API.
         */
        let response = await request(app)
            .put('/api/model/15386249')
            .send({
                name: 'Test Listing Update',
                description: 'Test Update Description'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ "message": "Model was updated successfully." });

        response = await request(app).get('/api/model/15386249');
        //fs.writeFileSync('response2.json', response.text);
        var data = JSON.parse(response.text);
        expect(data).toEqual(expect.objectContaining({ 'name': 'Test Listing Update' }));

    });    

    //START:TODO - Implement the Test Cases

    test('Test - GET /api/model/{id} with id=102995', async () => {
        /**
         * Sends a GET request to the '/api/model/:id' endpoint with the specified ID and awaits the response.
         * @param {string} id - The ID of the model to retrieve.
         * @returns {Promise<object>} - A promise that resolves to the response object.
         */
        let response = await request(app).get('/api/model/102995');        
        expect(response.statusCode).toBe(200);
        //fs.writeFileSync('response1.json', response.text);
        var data = JSON.parse(response.text);
        expect(data).toEqual(expect.objectContaining({ 'name': 'UWS Brownstone Prime' }));
    });


    test('Test - GET /api/model/ with x-forwarded-for-ip header', async () => {
        /**
         * Sends a GET request to the '/api/model' endpoint with the specified x-forwarded-for-ip header and awaits the response.
         * @param {string} ip - The IP address to set in the x-forwarded-for-ip header.
         * @returns {Promise<object>} - A promise that resolves to the response object.
         */
        let response = await request(app)
            .get('/api/model')
            .set('x-forwarded-for-ip', '200.20.0.88');
        expect(response.statusCode).toBe(200);
        let data = JSON.parse(response.text);
        let listingsAndReviews = data.listingsAndReviews;
        expect(Array.isArray(listingsAndReviews)).toBe(true);
        for (let i = 0; i < listingsAndReviews.length; i++) {
            let listing = listingsAndReviews[i];
            expect(listing.address.country).toBe('Hong Kong');
        }
    });
      
    

    //END:TODO

});        
