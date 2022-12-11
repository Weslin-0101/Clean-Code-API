import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
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
})