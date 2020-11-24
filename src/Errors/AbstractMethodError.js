export class AbstractMethodError extends Error {
    constructor(methodName) {
        super(`Invoking abstract method ${methodName}`);
        this.name = "AbstractMethodError";
    }
}