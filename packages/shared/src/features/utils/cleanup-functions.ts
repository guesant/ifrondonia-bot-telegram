type IFn = () => Promise<void> | void;

export class CleanupFunctions {
  #functions = new Set<IFn>();

  add(...fns: IFn[]) {
    for (const fn of fns) {
      this.#functions.add(fn);
    }
  }

  async run() {
    for (const fn of this.#functions) {
      await fn();
      this.#functions.delete(fn);
    }
  }
}
