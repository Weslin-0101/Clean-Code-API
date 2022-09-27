import env from '../../config/env'
import { makeLoginValidation } from "./login-validation-factory";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import { Controller } from "../../../presentation/protocols";
import { LoginController } from "../../../presentation/controller/login/login-controller";
import { DbAuthentication } from "../../../data/useCases/authentication/db-authentication";
import { BcryptAdapter } from "../../../infra/criptography/bcryot-adapter/bcrypt.adapter";
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository";

export const makeLoginController = (): Controller => {
    const salt = 12
    
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}