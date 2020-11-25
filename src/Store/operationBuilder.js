import { OperationGroup } from '../Operations/operationGroup';

export class OperationBuilder {

  constructor(operations) {
    this._operationsLayer = [];
    this._operationsLayer.push(operations);
  }

  then(operations) {

    if (Array.isArray(operations)) {
      this._operationsLayer.push(new OperationGroup(operations));
    } else {
      this._operationsLayer.push(operations);
    }

    return this;
  }

  build() {

    return async (...params) => {
      let lastOutput = await this._operationsLayer[0].perform(...params);
      for (let i = 1; i < this._operationsLayer.length; i++) {
        lastOutput = await this._operationsLayer[i].perform(lastOutput);
      }
    };
  }

}
