import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository";
export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string;

  async logError(stackError: string): Promise<void> {
    this.stack = stackError;
    return Promise.resolve();
  }
}
