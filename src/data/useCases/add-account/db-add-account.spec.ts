import { DbAddAccount } from './db-add-account'
import { Hasher, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account.protocols'

interface SutTypes {
    sut: DbAddAccount
    hasherStub: Hasher,
    addAccountRepositoryStub: AddAccountRepository
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
    const hasherStub = makeHasher()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub
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