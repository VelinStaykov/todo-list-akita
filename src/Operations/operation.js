import { AbstractMethodError } from '../Errors/AbstractMethodError'

export class Operation {

    async perform() {
        throw AbstractMethodError("perform");
    }
    
}