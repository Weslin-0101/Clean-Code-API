import { Router } from "express";
import { adaptMiddleware } from "../adapters/express/express-middleware.adapter";
import { adpatRout } from '../adapters/express/express-route.adapter'
import { makeAddSurveyController } from "../factories/controllers/add-survey/add-survey-controller-factory";
import { makeLoadSurveysController } from "../factories/controllers/load-surveys/load-surveys-controller-factory";
import { makeAuthMiddleware } from "../factories/middleware/auth-middleware-factory";

export default (router: Router): void => {
    const adminAuth =  adaptMiddleware(makeAuthMiddleware('admin'))
    const auth =  adaptMiddleware(makeAuthMiddleware())
    router.post('/surveys', adminAuth, adpatRout(makeAddSurveyController()))
    router.get('/surveys', auth, adpatRout(makeLoadSurveysController()))
}