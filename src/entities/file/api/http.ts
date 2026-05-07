import { api } from 'shared/api';
import { UploadFileData, UploadResponse } from '../model/types';
import { UploadResponse as UploadResponseSchema } from '../model/schemas';

export class UploadHttp {
  static uploadFile(data: UploadFileData): Promise<UploadResponse> {
    const formData = new FormData();

    formData.append('file', data.file);
    // INCLUDED: SEE AT SWAGGER DOCS TO CONTEXT AND PROPS TOO
    formData.append('context', data.context);

    return api<UploadResponse>({
      url: '/upload',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      contracts: {
        response: UploadResponseSchema,
      },
    });
  }
}
