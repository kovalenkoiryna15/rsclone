declare module 'MyModels' {
  export interface IAction<P> {
    type: string,
    payload: P,
  }
  export type Reducer<S, P> = (state: S, action: IAction<P>) => S;
  export interface IHandlers<S, P> {
    [key: string]: Reducer<S, P>,
  }
}
