import { Router } from "express";
import { adpatRout } from '../adapters/express/express-route.adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
    router.post('/signup', adpatRout(makeSignUpController()))
    router.post('/login', adpatRout(makeLoginController()))
}