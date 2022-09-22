import { DbAddAccount } from './db-add-account'
import { Encrypter, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account.protocols'

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter,
    addAccountRepositoryStub: AddAccountRepository
}

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter{
        async encrypt(value: string): Promise<string> {
         return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
})

const makeFakeAccoutData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository{
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {    
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('DbAddAccount UseCase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.add(makeFakeAccoutData())
        expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
    })
    
    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValue(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeFakeAccoutData())
        expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(makeFakeAccoutData())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        })
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValue(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeFakeAccoutData())
        expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(makeFakeAccoutData())
        expect(account).toEqual(makeFakeAccount())
    })
})