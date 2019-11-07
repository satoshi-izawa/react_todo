/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Constructor<T> = new (...args: any[]) => T;

type DefaultProps<C extends Record<string, any>> = C['defaultProps'] extends (...args: any[]) => any ? ReturnType<C['defaultProps']> : never;
type Props<C extends Record<string, any>> = C['props'] extends undefined ? never : C['props'];
/** defaultPropsで返される値は省略可能にする */
type CreateProps<T extends Record<string, any>> =
  {
    [P in Exclude<keyof Props<T>, keyof DefaultProps<T>>]: Props<T>[P];
  } & {
    [P in Extract<keyof Props<T>, keyof DefaultProps<T>>]?: Props<T>[P];
  };

export type ComponentMixProps<Props, State, T extends Record<string, any>> = {
  props: Props;
  state: State;
  test: CreateProps<T>;

  create(props: CreateProps<T>): JSX.Element | null;
}

interface RequireProps extends ComponentMixProps<any, any, any> {
  render(): ReturnType<this['create']>;
}


export function mix<
  T extends Constructor<RequireProps>
>(Clazz: T) {
  return class extends Clazz {
    private _props!: Record<string, unknown>;
    private _state!: Record<string, unknown>;
    private _setter!: Record<string, React.Dispatch<any>>;

    public get props() {
      return this._props;
    }

    public get state() {
      return this._state;
    }

    public get setter() {
      return this._setter;
    }

    public setState(newState: Partial<this['state']>) {
      const keys = Object.keys(newState);
      keys.forEach(k => this.setter[k](newState[k]));
    }

    private __initializeState() {
      const state = this.state ?? 'defaultState' in this ? this.defaultState() : null;
      if (!state) {
        return;
      }
      this._state = {} as any;
      this._setter = {} as any;
      Object.keys(state).forEach(k => {
        [this._state[k], this._setter[k]] = React.useState(state[k]);
      });
    }
  };
}
