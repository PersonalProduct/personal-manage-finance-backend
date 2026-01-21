import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it('should login user successfully', () => {
    const dto = {
      email: 'test@gmail.com',
      password: '123456',
    };

    const result = service.signin(dto);

    expect(result).toEqual({
      message: 'User logged in successfully',
      data: {
        email: 'test@gmail.com',
      },
    });
  });
});
