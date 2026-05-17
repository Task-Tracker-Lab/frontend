import { z } from 'zod/v4';
import { UploadAssetResponse } from './schemas';

export type UploadAssetResponse = z.infer<typeof UploadAssetResponse>;

export type UploadAssetData = {
  file: File;
  context: 'user.avatar' | 'team.avatar' | 'team.banner';
};
