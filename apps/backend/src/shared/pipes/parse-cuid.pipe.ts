import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';

//reg
const CUID_REGEX = /^c[a-z0-9]{24}$/i;

@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!CUID_REGEX.test(value)) {
      throw new BadRequestException('Invalid cuid');
    }

    return value;
  }
}
