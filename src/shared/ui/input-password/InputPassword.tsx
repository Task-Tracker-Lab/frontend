import * as React from 'react';
import { HTMLInputTypeAttribute } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button, InputGroup, InputGroupAddon, InputGroupInput } from 'shared/ui';
import { useControllableState } from 'shared/lib/hooks';

interface InputPasswordProps extends React.ComponentProps<typeof InputGroupInput> {
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
