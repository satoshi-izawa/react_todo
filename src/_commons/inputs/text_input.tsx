import React from 'react';
import { convertToFC, ComponentMixProps } from '../../_cores/bases/init_component';
import { BaseInput, BaseInputProps } from '../../_cores/bases/base_input';

interface Props extends BaseInputProps<Value> {
}

type Value = string | null;

class TextInputClass extends BaseInput<Props, TextInputClass> {
  private _input = React.createRef<HTMLInputElement>();

  private get input() {
    return this._input.current;
  }

  public defaultProps() {
    return {
      value: null,
      disabled: false,
    };
  }

  public getValue() {
    if (!this.input) {
      return this.state.value;
    }
    return this.input.value || null;
  }

  public render() {
    const { value } = this.state;
    return React.useMemo(() => (
      <input defaultValue={value ?? ''} ref={this._input} />
    ), [this.state]);
  }
}

interface TextInputClass extends ComponentMixProps<Props, TextInputClass> { }

export const TextInput = convertToFC(TextInputClass);
