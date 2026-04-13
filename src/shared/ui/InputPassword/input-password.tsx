import * as React from 'react';
import { EyeOffIcon, EyeIcon } from 'lucide-react';
import { Button, InputGroup, InputGroupAddon, InputGroupInput } from 'shared/ui';
import { useControllableState } from 'shared/lib/hooks';
import { HTMLInputTypeAttribute } from 'react';

interface InputPasswordProps extends Omit<
  React.ComponentProps<typeof InputGroupInput>,
  'children'
> {
  showEyeIcon?: boolean;
  visible?: boolean;
  defaultVisibleValue?: boolean;
  onVisibleChange?: (val: boolean) => void;
}

function InputPassword(props: InputPasswordProps) {
  const {
    showEyeIcon = true,
    visible,
    defaultVisibleValue = false,
    onVisibleChange,
    ...rest
  } = props;

  const [show, setShow] = useControllableState({
    value: visible,
    defaultValue: defaultVisibleValue,
    onChange: onVisibleChange,
  });

  const passwordInputType: HTMLInputTypeAttribute = show ? 'text' : 'password';

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="password"
        aria-required="true"
        aria-label="Пароль"
        {...rest}
        type={passwordInputType}
      />
      {showEyeIcon ? (
        <InputGroupAddon align="inline-end">
          <Button
            aria-label="Показать или скрыть пароль"
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setShow((val) => !val)}
          >
            {show ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}

export { InputPassword };
