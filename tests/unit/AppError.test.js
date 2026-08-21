const AppError = require('../../utils/AppError');

describe('AppError Utility', () => {
  test('should produce statusCode 404 and status "fail" for 4xx', () => {
    const err = new AppError('Not found', 404);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    expect(err).toBeInstanceOf(Error);
  });

  test('should produce status "error" for 5xx', () => {
    const err = new AppError('Server error', 500);
    expect(err.statusCode).toBe(500);
    expect(err.status).toBe('error');
  });
});