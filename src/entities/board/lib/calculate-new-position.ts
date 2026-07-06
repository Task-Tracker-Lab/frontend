const MIN_STEP = 10000000;

function isNumber(value: number | null): value is number {
  return value !== null && !Number.isNaN(value);
}

function prepareResult(result: number): number {
  return Math.round(result); // TODO: remove this after change schema to allow float
}

export function calculateNewPosition(
  prevPosition: number | null,
  nextPosition: number | null
): number {
  if (!isNumber(prevPosition) && isNumber(nextPosition)) return prepareResult(nextPosition / 2);
  if (isNumber(prevPosition) && !isNumber(nextPosition))
    return prepareResult(prevPosition + MIN_STEP);

  if (isNumber(prevPosition) && isNumber(nextPosition)) {
    return prepareResult((prevPosition + nextPosition) / 2);
  }

  return MIN_STEP;
}
