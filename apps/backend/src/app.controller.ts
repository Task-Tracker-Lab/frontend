import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  private start: number;

  constructor(private readonly appService: AppService) {
    this.start = Date.now();
  }

  @Get()
  @ApiExcludeEndpoint()
  @Header('Content-Type', 'text/html')
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('healthcheck')
  async healthcheck() {
    const now = Date.now();
    return {
      status: 'API online',
      uptime: Number((now - this.start) / 1000).toFixed(0),
    };
  }
}
