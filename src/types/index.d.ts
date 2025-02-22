export type AnyObject<T = unknown> = Record<string, T>;

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
