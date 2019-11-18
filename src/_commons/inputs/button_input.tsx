import React from 'react';
import { BaseInput, BaseInputProps } from '../../_cores/bases/base_input';
import { convertToFC } from '../../_cores/bases/init_component';

interface Props extends BaseInputProps<Value> {
  onClick: (() => unknown) | null;
}

type Value = string | null;

class ButtonInputClass extends BaseInput<Props, ButtonInputClass> {
  public defaultProps() {
    return {
      onClick: null,
      value: null,
      disabled: false,
    };
  }

  public render() {
    const { value } = this.state;
    const { onClick } = this.props;
    return React.useMemo(() => (
      <div onClick={onClick ?? undefined}>
        {value ?? ''}
      </div>
    ), [this.state, onClick]);
  }

  public getValue() {
    return this.state.value;
  }
}

export const ButtonInput = convertToFC(ButtonInputClass);
