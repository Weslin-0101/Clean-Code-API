import { Router } from "express";
import { adpatRout } from '../adapters/express/express-route.adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
    router.post('/signup', adpatRout(makeSignUpController()))
    router.post('/login', adpatRout(makeLoginController()))
}