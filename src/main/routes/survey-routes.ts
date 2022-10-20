import { Router } from "express";
import { adpatRout } from '../adapters/express/express-route.adapter'
import { makeAddSurveyController } from "../factories/controllers/add-survey/add-survey-controller-factory";

export default (router: Router): void => {
    router.post('/surveys', adpatRout(makeAddSurveyController()))
}