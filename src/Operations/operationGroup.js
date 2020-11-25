import { Operation } from './operation'

export class OperationGroup extends Operation {

    constructor(operations) {
        super()
        this._operations = operations
    }

    async perform(...params) {
        return Promise.all(this._operations.map(operation => {
                return operation.perform(...params);
            }
        ))
    }
}