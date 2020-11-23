import { AbstractMethodError } from '../Errors/AbstractMethodError'

export class Operation {

    perform() {
        throw AbstractMethodError("perform");
    }
}