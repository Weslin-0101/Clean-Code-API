import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'
import MockDate from 'mockdate'

interface SutTypes {
    sut: LoadSurveysController
    loadSurveyStub: LoadSurveys
}

const makeFakeSurveys = (): SurveyModel[] => ([
    {
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
])

const makeSurveysFactory = (): LoadSurveys => {
    class LoadSurveyStub implements LoadSurveys {
        async load(): Promise<SurveyModel[]> {
            return new Promise(resolve => resolve(makeFakeSurveys()))
        }
    }

    return new LoadSurveyStub()
}

const makeSut = (): SutTypes => {
    const loadSurveyStub = makeSurveysFactory()
    const sut = new LoadSurveysController(loadSurveyStub)
    return {
        sut,
        loadSurveyStub
    }
}

describe('LoadSurveys Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveys', async () => {
        const { sut, loadSurveyStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveyStub, 'load')
        await sut.handle({})
        expect(loadSpy).toHaveBeenCalled()
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(ok(makeFakeSurveys()))
    })

    test('Should return 500 if LoadSurveys throws', async () => {
        const { sut, loadSurveyStub } = makeSut()
        jest.spyOn(loadSurveyStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})