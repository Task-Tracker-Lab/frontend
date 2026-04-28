import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { AxiosValidationError, isAxiosValidationError } from '../validation';
import { GlobalErrorSchema } from '../schemas';
import { z } from 'zod';

export type ErrorMessage = {
  message: string;
  description: string[];
  code: string | null;
};

const HTTP_ERROR_DESCRIPTIONS: Partial<Record<HttpStatusCode, string>> = {
  [HttpStatusCode.BadRequest]: 'Некорректный запрос (400): проверьте введенные данные.',
  [HttpStatusCode.Unauthorized]: 'Необходима авторизация (401): войдите в аккаунт.',
  [HttpStatusCode.Forbidden]: 'Доступ запрещен (403): недостаточно прав для операции.',
  [HttpStatusCode.NotFound]: 'Ресурс не найден (404): проверьте адрес или параметры.',
  [HttpStatusCode.Conflict]: 'Конфликт данных (409): попробуйте обновить данные и повторить.',
  [HttpStatusCode.UnprocessableEntity]:
    'Ошибка валидации (422): проверьте корректность заполненных полей.',
  [HttpStatusCode.TooManyRequests]:
    'Слишком много запросов (429): повторите попытку немного позже.',
  [HttpStatusCode.InternalServerError]:
    'Внутренняя ошибка сервера (500): попробуйте повторить запрос позже.',
  [HttpStatusCode.BadGateway]: 'Ошибка шлюза (502): проблема на стороне промежуточного сервиса.',
  [HttpStatusCode.ServiceUnavailable]:
    'Сервис временно недоступен (503): попробуйте повторить запрос позже.',
  [HttpStatusCode.GatewayTimeout]:
    'Тайм-аут шлюза (504): сервис долго не отвечает, попробуйте позже.',
};

const ERROR_DESCRIPTIONS: Record<string, string> = {
  [AxiosError.ERR_BAD_OPTION_VALUE]: 'Недопустимое значение параметра в конфигурации.',
  [AxiosError.ERR_BAD_OPTION]: 'Недопустимый параметр в конфигурации.',
  [AxiosError.ERR_DEPRECATED]: 'Используется устаревшая возможность: обновите конфигурацию.',
  [AxiosError.ERR_CANCELED]: 'Запрос отменен пользователем.',
  [AxiosError.ERR_NETWORK]: 'Сетевая ошибка: не удалось установить соединение с сервером.',
  [AxiosError.ECONNABORTED]: 'Превышено время ожидания ответа от сервера.',
  [AxiosError.ETIMEDOUT]: 'Тайм-аут соединения: сервер не ответил вовремя.',
  [AxiosError.ERR_FR_TOO_MANY_REDIRECTS]: 'Слишком много перенаправлений при выполнении запроса.',
  [AxiosError.ERR_BAD_REQUEST]: 'Некорректный запрос: проверьте параметры и тело запроса.',
  [AxiosError.ERR_BAD_RESPONSE]: 'Сервер вернул некорректный или неполный ответ.',
  [AxiosError.ERR_INVALID_URL]: 'Некорректный URL запроса.',
  [AxiosError.ERR_NOT_SUPPORT]: 'Операция не поддерживается в текущем окружении выполнения.',
};

export class ErrorUtils {
  static getErrors(error: unknown): ErrorMessage {
    let errorMessages: ErrorMessage;

    // Ошибка валидации запроса/ответа
    if (isAxiosValidationError(error)) {
      const axiosValidationMessage = this._tryGetLocalErrorFromData(error);

      if (axiosValidationMessage) {
        errorMessages = axiosValidationMessage;
      } else {
        errorMessages = {
          message: error.response ? 'Не валидный ответ от сервера' : 'Не валидный запрос к серверу',
          description: [],
          code: error.code ?? null,
        };
      }
    } else if (axios.isAxiosError(error)) {
      if (error.response) {
        // ответ от сервера
        errorMessages = this._getResponseErrors(error.response, error.message, error.code);
      } else if (error.request) {
        // запрос ушел - ответ не пришел
        errorMessages = this._getRequestErrors(error.code);
      } else {
        // локальный инстанс ошибки
        const axiosValidationMessage = this._tryGetLocalErrorFromData(error);

        if (axiosValidationMessage) {
          errorMessages = axiosValidationMessage;
        } else {
          errorMessages = {
            message: 'Не удалось отправить запрос',
            description: [],
            code: error.code ?? null,
          };
        }
      }
    } else {
      // ошибка не является инстансом AxiosError
      errorMessages = this._handleNotAxiosError(error);
    }

    return this._processErrorMessages(errorMessages);
  }

  private static _getResponseErrors(
    response: AxiosResponse,
    message: string,
    code?: string
  ): ErrorMessage {
    // Попытка распознать модель ошибки, которую прислал сервер
    const errorMessageFromData = this._tryGetErrorFromData(response);

    if (errorMessageFromData?.message) {
      return errorMessageFromData;
    }

    // сообщение из списка статусов
    const errorMessageFromStatus = HTTP_ERROR_DESCRIPTIONS[response.status as HttpStatusCode];

    if (errorMessageFromStatus) {
      return { message: errorMessageFromStatus, description: [], code: code ?? null };
    }

    return { message, description: [], code: code ?? null };
  }

  private static _tryGetErrorFromData(response: AxiosResponse): ErrorMessage | undefined {
    if (!response.data) {
      return undefined;
    }
    // здесь может быть несколько моделей ошибок

    const data = response.data as z.infer<typeof GlobalErrorSchema>;
    let description: string[] = [];

    if (data.details && data.details.length > 0) {
      description = data.details.map(({ message }) => message);
    }

    return { message: data.error?.message, description, code: data.error.code };
  }

  private static _tryGetLocalErrorFromData(error: AxiosError): ErrorMessage | undefined {
    if (error.code === AxiosValidationError.ERR_BAD_VALIDATION && isAxiosValidationError(error)) {
      let description: string[] = [];

      if (error.issues && error.issues.length > 0) {
        description = error.issues.map(({ message }) => message);
      }

      return { message: error.message, description, code: error.code };
    }

    return undefined;
  }

  private static _getRequestErrors(code?: string): ErrorMessage {
    if (code) {
      /* Получаем сообщение об ошибке на основе кода ошибки */
      const errorMessage = ERROR_DESCRIPTIONS[code];

      if (errorMessage) {
        return { message: errorMessage, description: [], code };
      }
    }

    return { message: 'Не удалось получить ответ от сервера', description: [], code: null };
  }

  private static _handleNotAxiosError(error: unknown): ErrorMessage {
    if (error instanceof Error) {
      return { message: 'Ошибка на стороне клиента', description: [error.message], code: null };
    }

    return typeof error === 'string'
      ? { message: error, description: [], code: null }
      : { message: 'Ошибка на стороне клиента', description: [], code: null };
  }

  private static _processErrorMessages(message: ErrorMessage): ErrorMessage {
    return {
      ...message,
      description: message.description.filter(Boolean),
    };
  }
}
