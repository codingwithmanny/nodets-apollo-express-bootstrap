// Imports
// ========================================================

// Tested
// ========================================================
import checkConnectivity from '../db';

// Mocks
// ========================================================
/**
 * @constant
 */
const mockKnexRaw = jest.fn().mockName('mockKnexRaw');

/**
 *
 */
const mockProcessExit = jest.fn().mockName('mockProcessExit');

/**
 *
 */
const realProcessExit = process.exit;

/**
 * Mock
 */
jest.mock('knex', () => ({
  __esModule: true,
  default: () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw: (args: any) => mockKnexRaw(args),
  }),
}));

/**
 *
 */
process.exit = jest.fn((args) => {
  mockProcessExit(args);
  throw 'mockExit';
});

afterAll(() => {
  process.exit = realProcessExit;
});

/**
 * Reset for mocks
 */
beforeEach(() => {
  jest.clearAllMocks();
});

// Tests
// ========================================================
/**
 * Success
 */
test('checkConnectivity successful & callback', async () => {
  // Setup
  const mockCallback = jest.fn().mockName('mockCallback');

  // Pre Expectations
  expect(mockKnexRaw).toHaveBeenCalledTimes(0);
  expect(mockCallback).toHaveBeenCalledTimes(0);

  // Init
  await checkConnectivity(mockCallback);

  // Post Expectations
  expect(mockKnexRaw).toHaveBeenCalledTimes(1);
  expect(mockKnexRaw).toHaveBeenCalledWith('select 1');
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

/**
 * Failure
 */
test('checkConnectivity failed', async () => {
  // Setup
  const mockCallback = jest.fn().mockName('mockCallback');
  mockKnexRaw.mockRejectedValue('Something went wrong');

  // Pre Expectations
  expect(mockKnexRaw).toHaveBeenCalledTimes(0);
  expect(mockCallback).toHaveBeenCalledTimes(0);
  expect(mockProcessExit).toHaveBeenCalledTimes(0);

  // Init
  try {
    await checkConnectivity(mockCallback);
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    expect(error).toEqual('mockExit');
  }

  // Post Expectations
  expect(mockKnexRaw).toHaveBeenCalledTimes(1);
  expect(mockKnexRaw).toHaveBeenCalledWith('select 1');
  expect(mockCallback).toHaveBeenCalledTimes(0);
  expect(mockProcessExit).toHaveBeenCalledTimes(1);
  expect(mockProcessExit).toHaveBeenCalledWith(0);
});
