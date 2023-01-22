import { Router } from "express";
import { adpatRout } from '@/main/adapters/express/express-route.adapter'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
    router.post('/signup', adpatRout(makeSignUpController()))
    router.post('/login', adpatRout(makeLoginController()))
}