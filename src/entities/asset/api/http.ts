import { api } from 'shared/api';
import { UploadAssetData, UploadAssetResponse } from '../model/types';
import { UploadAssetResponse as UploadResponseSchema } from '../model/schemas';

export class AssetHttp {
  static uploadFile(data: UploadAssetData): Promise<UploadAssetResponse> {
    const formData = new FormData();

    formData.append('file', data.file);
    // INCLUDED: SEE AT SWAGGER DOCS TO CONTEXT AND PROPS TOO
    formData.append('context', data.context);

    return api<UploadAssetResponse>({
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
