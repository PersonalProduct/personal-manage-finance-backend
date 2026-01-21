import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should signin successfully', () => {
    const dto = {
      email: 'test@gmail.com',
      password: '123456',
    };

    const result = controller.signin(dto);

    expect(result).toEqual({
      message: 'User logged in successfully',
      data: {
        email: 'test@gmail.com',
      },
    });
  });
});
