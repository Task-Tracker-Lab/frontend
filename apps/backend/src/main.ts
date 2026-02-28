import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'
import fastifyCompress from '@fastify/compress'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'

async function bootstrap() {
    const PORT = Number(env.PORT)
    if (Number.isNaN(PORT)) {
        throw new Error('Не задан порт в .env')
    }

    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('Tracker API')
        .build()

    const adapter = new FastifyAdapter()

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        adapter,
        { rawBody: true }
    )

    await app.register(fastifyCookie)
    await app.register(fastifyCompress, {
        global: false,
        encodings: ['gzip', 'br'],
        threshold: 1024
    })

    await app
        .getHttpAdapter()
        .getInstance()
        .register(fastifyCors, {
            origin: '*',
            methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
        })

    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api/v1', {
        exclude: ['/']
    })

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document)

    await app.listen(PORT, '0.0.0.0', () =>
        console.log(`\x1b[34mServer started on port = ${PORT}\x1b[0m`)
    )
}

bootstrap()
