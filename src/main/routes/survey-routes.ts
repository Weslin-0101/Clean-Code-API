import { Router } from "express";
import { adpatRout } from '@/main/adapters/express/express-route.adapter'
import { makeAddSurveyController } from "@/main/factories/controllers/add-survey/add-survey-controller-factory";
import { makeLoadSurveysController } from "@/main/factories/controllers/load-surveys/load-surveys-controller-factory";
import { adminAuth } from "@/main/middlewares/admin-auth";
import { auth } from "@/main/middlewares/auth";

export default (router: Router): void => {
    router.post('/surveys', adminAuth, adpatRout(makeAddSurveyController()))
    router.get('/surveys', auth, adpatRout(makeLoadSurveysController()))
}