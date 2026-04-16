import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { ZodIssue } from 'zod';

/**
 * Custom error class for handling validation errors in axios requests.
 * Extends the AxiosError class and includes an optional array of ZodIssue objects.
 */
export class AxiosValidationError<T = unknown> extends AxiosError {
  /**
   * Static property representing the error code for bad validation.
   */
  static readonly ERR_BAD_VALIDATION = 'ERR_BAD_VALIDATION';

  /**
   * Constructor for the AxiosValidationError class.
   *
   * @param config - The configuration object for the axios request.
   * @param request - The request object.
   * @param response - The response object.
   * @param issues - An optional array of ZodIssue objects representing the validation errors.
   */
  constructor(
    config?: InternalAxiosRequestConfig,
    request?: unknown,
    response?: AxiosResponse<T>,
    public readonly issues?: ZodIssue[]
  ) {
    super(
      'The provided data does not meet the required criteria.',
      AxiosValidationError.ERR_BAD_VALIDATION,
      config,
      request,
      response
    );
  }
}
