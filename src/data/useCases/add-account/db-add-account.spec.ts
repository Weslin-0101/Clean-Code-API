import { DbAddAccount } from './db-add-account'
import { Hasher, AddAccountModel, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account.protocols'

type SutTypes = {
    sut: DbAddAccount
    hasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeHasher = (): Hasher => {
    class HasherStub implements Hasher{
        async hash(value: string): Promise<string> {
         return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new HasherStub()
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'hashed_password'
})

const makeFakeAccoutData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email@email.com',
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

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(null))
        }
    }
    
    return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {    
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const hasherStub = makeHasher()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

describe('DbAddAccount UseCase', () => {
    test('Should call Hasher with correct password', async () => {
        const { sut, hasherStub } = makeSut()
        const hasherSpy = jest.spyOn(hasherStub, 'hash')
        await sut.add(makeFakeAccoutData())
        expect(hasherSpy).toHaveBeenCalledWith('valid_password')
    })
    
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherStub } = makeSut()
        jest.spyOn(hasherStub, 'hash').mockReturnValue(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeFakeAccoutData())
        expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(makeFakeAccoutData())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email@email.com',
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

    test('Should return null if LoadAccountByEmailRepository not return null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
        const account = await sut.add(makeFakeAccoutData())
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(makeFakeAccoutData())
        expect(loadSpy).toHaveBeenCalledWith('valid_email@email.com')
    })
})