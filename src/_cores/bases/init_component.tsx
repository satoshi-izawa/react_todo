/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Constructor<T> = new (...args: any[]) => T;

type DefaultProps<T extends Record<string, any>> = T['defaultProps'] extends (...args: any[]) => any ? ReturnType<T['defaultProps']> : never;
type Props<T extends Record<string, any>> = T['props'] extends undefined ? never : T['props'];
type State<T extends Record<string, any>> = T['defaultState'] extends (...args: any[]) => any ? ReturnType<T['defaultState']> : never;
/** defaultPropsで返される値は省略可能にする */
type CreateProps<T extends Record<string, any>> =
  {
    [P in Exclude<keyof Props<T>, keyof DefaultProps<T>>]: Props<T>[P];
  } & {
    [P in Extract<keyof Props<T>, keyof DefaultProps<T>>]?: Props<T>[P];
  };

export type ComponentMixProps<Props, T extends Record<string, any>> = {
  props: Props;
  state: State<T>;
  setter: { [P in keyof State<T>]: React.Dispatch<State<T>[P]> };

  toJSX(props: CreateProps<T>): JSX.Element|null;
}

/** 初期化の過程で必要ですが、外には公開したくないプロパティ群です */
type ExcludeUtilities = 'props'
  | 'state'
  | 'setter'
  | keyof RequireProps;

type ExcludeUtilityMethods<T extends RequireProps> = {
  [P in Exclude<keyof T, ExcludeUtilities>]: T[P];
}

interface RequireProps extends ComponentMixProps<any, any> {
  render(): JSX.Element | null;
  defaultState?: () => any;
  defaultProps?: () => any;
}

export function mix<
  T extends Constructor<RequireProps>
>(Clazz: T): T {
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

    public toJSX = (props: CreateProps<T>) => this.__create(props);

    private __create(props: CreateProps<T>): JSX.Element | null {
      this._props = props as any;
      this.__initializeState();
      return this.render();
    }

    private __initializeState() {
      const state = this.state ?? (this.defaultState ? this.defaultState() : null);
      if (!state) {
        return;
      }
      this._state = {} as any;
      this._setter = {} as any;
      Object.keys(state).forEach(k => {
        [this._state[k], this._setter[k]] = React.useState(state[k]);
      });
    }

    // @ts-ignore
    private __inited = this.__init();
    /** デバッグ用に生成関数にクラス名をつけたり、defaultPropsを繋げます。 */
    private __init() {
      const desc = Object.getOwnPropertyDescriptor(this.toJSX, 'name');
      if (!desc) {
        return;
      }
      desc.value = (this as any).constructor.name;
      Object.defineProperty(this.toJSX, 'name', desc);
      (this.toJSX as any).defaultProps = this.defaultProps;
    }
  };
}

export const convertToFC = <T extends RequireProps>(Clazz: Constructor<T>) => {
  const Mix = mix(Clazz);
  const func = (props: CreateProps<T>) => {
    const instance = React.useMemo(() => new Mix(), []);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (<instance.toJSX {...props} />);
  };
  func.new = (() => new Mix()) as () => ExcludeUtilityMethods<T>;
  return func;
};
