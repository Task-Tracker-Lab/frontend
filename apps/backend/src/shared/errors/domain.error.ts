export class DomainError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: 'NOT_FOUND' | 'CONFLICT' | 'BAD_REQUEST' | 'FORBIDDEN' | 'UNAUTHORIZED'
  ) {
    super(message);
    this.name = 'DomainError';
  }

  static NotFound(message: string = 'Not Found'): DomainError {
    return new DomainError(message, 'NOT_FOUND');
  }

  static Unauthorized(message: string = 'Not authorized'): DomainError {
    return new DomainError(message, 'UNAUTHORIZED');
  }

  static Conflict(message: string = 'Conflict'): DomainError {
    return new DomainError(message, 'CONFLICT');
  }

  static BadRequest(message: string = 'Bad Request'): DomainError {
    return new DomainError(message, 'BAD_REQUEST');
  }

  static Forbidden(message: string = "You don't have permissions to do this!"): DomainError {
    return new DomainError(message, 'FORBIDDEN');
  }
}
