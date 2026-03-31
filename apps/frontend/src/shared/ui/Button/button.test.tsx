import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

test('рендерит кнопку с текстом', () => {
  render(<Button>Нажми меня</Button>);
  expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
});

test('вызывает onClick при клике', async () => {
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Нажми меня</Button>);
  await userEvent.click(screen.getByRole('button', { name: 'Нажми меня' }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('не вызывает onClick когда кнопка disabled', async () => {
  const handleClick = vi.fn();

  render(
    <Button disabled onClick={handleClick}>
      Нажми меня
    </Button>
  );
  await userEvent.click(screen.getByRole('button', { name: 'Нажми меня' }));
  expect(handleClick).not.toHaveBeenCalled();
});

test('кнопка задизейблена при передаче пропа disabled', () => {
  render(<Button disabled>Нажми меня</Button>);
  expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeDisabled();
});

test('применяет вариант destructive', () => {
  render(<Button variant="destructive">Удалить</Button>);
  expect(screen.getByRole('button', { name: 'Удалить' })).toHaveAttribute(
    'data-variant',
    'destructive'
  );
});

test('принимает дополнительный className', () => {
  render(<Button className="my-class">Кнопка</Button>);
  expect(screen.getByRole('button', { name: 'Кнопка' })).toHaveClass('my-class');
});
