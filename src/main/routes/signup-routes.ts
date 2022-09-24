import { Router } from "express";
import { makeSignUpController } from '../factories/signup/signup'
import { adpatRout } from '../adapters/express-route.adapter'

export default (router: Router): void => {
    router.post('/signup', adpatRout(makeSignUpController()))
}