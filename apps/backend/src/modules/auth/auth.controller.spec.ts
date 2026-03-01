import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
    let controller: AuthController
    const authServiceMock = {
        login: jest.fn(),
        registration: jest.fn(),
        me: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ]
        }).compile()

        controller = module.get<AuthController>(AuthController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
