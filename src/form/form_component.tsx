import { mix, ComponentMixProps } from '../_cores/bases/init_component';

interface Props {
  a: number;
  b: string;
}
interface State {

}

class FormComponentClass {
  public defaultProps() {
    return {
      a: 10,
      c: 5,
    };
  }

  public render() {
    return null;
  }
}

interface FormComponentClass extends ComponentMixProps<Props, State, FormComponentClass> {

}

export const FormComponent = mix(FormComponentClass);

const form = new FormComponent();
form.create({ d: 10 });
