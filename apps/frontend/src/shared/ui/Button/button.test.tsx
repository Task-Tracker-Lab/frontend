import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

test('рендерит кнопку с текстом', () => {
  // ARRANGE
  render(<Button>Нажми меня</Button>);

  // ASSERT
  expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
});

test('вызывает onClick при клике', async () => {
  // ARRANGE
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Нажми меня</Button>);

  // ACT
  await userEvent.click(screen.getByRole('button', { name: 'Нажми меня' }));

  // ASSERT
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('не вызывает onClick когда кнопка disabled', async () => {
  // ARRANGE
  const handleClick = vi.fn();
  render(
    <Button disabled onClick={handleClick}>
      Нажми меня
    </Button>
  );

  // ACT
  await userEvent.click(screen.getByRole('button', { name: 'Нажми меня' }));

  // ASSERT
  expect(handleClick).not.toHaveBeenCalled();
});

test('кнопка задизейблена при передаче пропа disabled', () => {
  // ARRANGE
  render(<Button disabled>Нажми меня</Button>);

  // ASSERT
  expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeDisabled();
});

test('применяет вариант destructive', () => {
  // ARRANGE
  render(<Button variant="destructive">Удалить</Button>);

  // ASSERT
  expect(screen.getByRole('button', { name: 'Удалить' })).toHaveAttribute(
    'data-variant',
    'destructive'
  );
});

test('принимает дополнительный className', () => {
  // ARRANGE
  render(<Button className="my-class">Кнопка</Button>);

  // ASSERT
  expect(screen.getByRole('button', { name: 'Кнопка' })).toHaveClass('my-class');
});
