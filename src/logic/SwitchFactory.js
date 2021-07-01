/**
 *
 */
class SwitchFactory {
  constructor() {
    this.caseMap = new Map();
  }

  /**
   *
   * @param {function} fn function with data parammeters and return the expected value.
   * @returns
   */
  addCase(key, fn) {
    this.caseMap.set(key, fn);
    return this;
  }

  addDefaultCase(fn) {
    this.defaultCase = fn;
  }

  process(key, data) {
    if (!this.caseMap.has(key)) {
      return this.defaultCase && this.defaultCase(data);
    }

    const caseValueFn = this.caseMap.get(key);

    return caseValueFn(data);
  }
}

/**
 *
 */
class BlocksLogicSwitchFactory extends SwitchFactory {
  /**
   *
   * @param {function} fn function with parammeters (value, state) and the state as a returned value.
   * @returns
   */
  addCase(
    {
      source: [sourceComponentType, sourceBlockType],
      target: [targetComponentType, targetBlockType]
    },
    fn
  ) {
    const key = `source-${sourceComponentType}-${sourceBlockType}-target-${targetComponentType}-${targetBlockType}`;
    return super.addCase(key, fn);
  }

  process(
    {
      source: [sourceComponentType, sourceBlockType],
      target: [targetComponentType, targetBlockType]
    },
    data
  ) {
    const key = `source-${sourceComponentType}-${sourceBlockType}-target-${targetComponentType}-${targetBlockType}`;

    if (!this.caseMap.has(key)) {
      // console.error('key do not exists: ' + key);
      return this.defaultCase && this.defaultCase(data);
    }

    const caseValueFn = this.caseMap.get(key);

    return caseValueFn(data);
  }
}

export { BlocksLogicSwitchFactory };
