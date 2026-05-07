import { z } from 'zod/v4';
import { UploadResponse } from './schemas';

export type UploadResponse = z.infer<typeof UploadResponse>;

export type UploadFileData = {
  file: File;
  context: string; //TODO: typify
};