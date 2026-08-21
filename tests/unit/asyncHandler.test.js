const asyncHandler = require('../../utils/asyncHandler');

describe('asyncHandler Utility', () => {
  test('should execute wrapped function with req, res, next', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const req = {}, res = {}, next = jest.fn();

    const handler = asyncHandler(fn);
    await handler(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
  });

  test('should pass errors to next() when function fails', async () => {
    const error = new Error('Async failure');
    const fn = jest.fn().mockRejectedValue(error);
    const req = {}, res = {}, next = jest.fn();

    const handler = asyncHandler(fn);
    await handler(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});