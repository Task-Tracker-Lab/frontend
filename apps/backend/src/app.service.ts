import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {   
    return `<div style="display: flex; flex-direction: column; align-items: center; font-family: arial;">
    <h1>Tracker API</h1>
    <h2>
      <a href="http://${process.env.HOST}:${process.env.PORT}/doc#">Swagger</a>
    </h2>
    <h2>
    <a href="http://${process.env.HOST}:${process.env.PORT}/api/v1/healthcheck">HealthCheck</a>
    </h2>
    <hr style="width: 50vw; margin: 30px auto; border: 1px gray black;">
    </div>`;
  }
}
