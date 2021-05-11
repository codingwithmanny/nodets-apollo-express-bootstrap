// Errors
// ========================================================
/**
 *
 */
export class Forbidden extends Error {
  private httpStatusCode: number;

  constructor(message?: string) {
    super(message);
    this.httpStatusCode = 403;
  }
}

/**
 *
 */
export class NotFound extends Error {
  private httpStatusCode: number;

  constructor(message?: string) {
    super(message);
    this.httpStatusCode = 404;
  }
}
