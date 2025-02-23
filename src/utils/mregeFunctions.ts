// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeFunctions =
  <F extends ((...args: any[]) => any) | undefined>(...funcs: F[]) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (...args: F extends Function ? Parameters<F> : never) => {
    funcs.forEach((func) => {
      func?.(...args);
    });
  };

export default mergeFunctions;
