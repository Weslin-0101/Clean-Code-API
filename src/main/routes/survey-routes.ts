import { Router } from "express";
import { adpatRout } from '../adapters/express/express-route.adapter'
import { makeAddSurveyController } from "../factories/controllers/add-survey/add-survey-controller-factory";
import { makeLoadSurveysController } from "../factories/controllers/load-surveys/load-surveys-controller-factory";
import { adminAuth } from "../middlewares/admin-auth";
import { auth } from "../middlewares/auth";

export default (router: Router): void => {
    router.post('/surveys', adminAuth, adpatRout(makeAddSurveyController()))
    router.get('/surveys', auth, adpatRout(makeLoadSurveysController()))
}