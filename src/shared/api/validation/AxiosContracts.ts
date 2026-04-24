import { AxiosHeaders, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { ZodType } from 'zod';
import { AxiosValidationError } from './AxiosValidationError';

declare module 'axios' {
  export interface AxiosRequestConfig {
    contracts?: {
      response?: ZodType;
      body?: ZodType;
      params?: ZodType;
    };
  }
}

/**
 * A class containing static methods for validating and transforming data using Zod schemas.
 */
export class AxiosContracts {
  /**
   * Validates and normalizes request body and query params according to configured contracts.
   *
   * @param data Axios request config to validate before sending.
   * @returns Updated request config with parsed payload.
   * @throws {AxiosValidationError} When request data does not satisfy contract schema.
   */
  static requestContractInterceptor(data: InternalAxiosRequestConfig) {
    const { contracts } = data;

    if (contracts?.body !== undefined && data.data !== undefined) {
      data.data = AxiosContracts.parseRequest(contracts.body, data.data);
    }
    if (contracts?.params !== undefined && data.params !== undefined) {
      data.params = AxiosContracts.parseRequest(contracts.params, data.params);
    }

    return data;
  }

  /**
   * Parses request data with the provided Zod schema.
   *
   * @template Data Expected request data type.
   * @param schema Zod schema used to validate request data.
   * @param data Request data to validate.
   * @returns Parsed and type-safe request data.
   * @throws {AxiosValidationError} When validation fails.
   */
  static parseRequest<Data>(schema: ZodType<Data>, data: Data): Data {
    const validation = schema.safeParse(data);

    if (validation.error) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.error.issues
      );
    }

    return validation.data;
  }

  /**
   * Validates response payload using response contract from request config.
   *
   * @param response Axios response to validate.
   * @returns Original response with validated and parsed data.
   * @throws {AxiosValidationError} When response data does not satisfy contract schema.
   */
  static responseContractInterceptor(response: AxiosResponse): AxiosResponse {
    const schema = response.config.contracts?.response;

    if (schema !== undefined) {
      response.data = AxiosContracts.parseResponse(schema, response);
    }
    return response;
  }

  /**
   * Parses response data with the provided Zod schema.
   *
   * @template Data Expected response data type.
   * @param schema Zod schema used to validate response data.
   * @param response Axios response containing raw data.
   * @returns Parsed and type-safe response data.
   * @throws {AxiosValidationError} When validation fails.
   */
  static parseResponse<Data>(schema: ZodType<Data>, response?: AxiosResponse<unknown>): Data {
    const validation = schema.safeParse(response?.data);

    if (validation.error) {
      throw new AxiosValidationError(
        response?.config,
        response?.request,
        response,
        validation.error.issues
      );
    }
    return validation.data;
  }
}
