import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Fulano',
                email: 'fulano@email.com',
                password: '123456',
                passwordConfirmation: '123456'
            })
            .expect(200)
    })
})