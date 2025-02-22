/* eslint-disable @typescript-eslint/no-explicit-any */
import { WritableDraft } from 'immer/dist/internal.js';
import { StateSetter } from '../../../types';

export const stateSetterHandler = <TState extends Record<string, any>>(
  set: (fn: (draft: WritableDraft<TState>) => void) => void
) => <TKey extends keyof TState>(
  name: TKey,
  cb?: (newValue: TState[TKey]) => unknown
): StateSetter<TState[TKey]> => value => {
  set(s => {
    let val: any;
    if (typeof value === 'function' && typeof s[name] !== 'function')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      val = value(s[name]);
    else val = value;
    cb?.(val);

    s[name] = val;
  });
};