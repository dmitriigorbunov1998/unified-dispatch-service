export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

type ErrorPayload = {
  message?: string;
};

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  parse?: (value: unknown) => T
): Promise<T> {
  const response = await fetch(input, init);
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new HttpError('Server returned a non-JSON response', response.status);
  }

  const data: unknown = await response.json();

  if (!response.ok) {
    const errorPayload = isErrorPayload(data) ? data : undefined;
    throw new HttpError(
      errorPayload?.message ?? response.statusText,
      response.status
    );
  }

  return parse ? parse(data) : (data as T);
}

function isErrorPayload(value: unknown): value is ErrorPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    (!('message' in value) || typeof value.message === 'string')
  );
}
