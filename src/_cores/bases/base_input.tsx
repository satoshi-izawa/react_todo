/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentMixProps } from './init_component';

interface Common<Value> {
  value: Value;
  disabled: boolean;
}

export interface BaseInputProps<Value> extends Common<Value>{
}

interface BaseInputState<Value> extends Common<Value>{
}

export abstract class BaseInput<
  Props extends BaseInputProps<any>,
  T extends {
    defaultState(): BaseInputState<Props['value']>;
    props: Props;
  }
  > {
  public syncKeys(): (keyof Common<any>)[] {
    return ['value', 'disabled'];
  }

  public defaultState() {
    const { value, disabled } = this.props;
    return { value, disabled };
  }

  public abstract getValue(): Props['value'];

  public setValue(value: Props['value']) {
    this.setState({ value });
  }
}

export interface BaseInput<
  Props extends BaseInputProps<any>,
  T extends {
    defaultState(): BaseInputState<Props['value']>;
    props: Props;
  }
  > extends ComponentMixProps<Props, T > { }
