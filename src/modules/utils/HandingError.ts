export class HandingError extends Error {
  constructor(
    message: string,
    public status: number = 500,
  ) {
    super(message);
  }
}
