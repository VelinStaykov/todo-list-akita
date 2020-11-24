export default class LogOperation {

    _operationName;

    constructor(operationName) {
        this._operationName = operationName;
    }

    perform(payload) {
        console.log(`Performing operation: ${this._operationName} with params ${payload}`);
    }
}