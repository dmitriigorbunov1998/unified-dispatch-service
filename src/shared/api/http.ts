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
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);
  const data = (await response.json()) as T & ErrorPayload;

  if (!response.ok) {
    throw new HttpError(data.message ?? response.statusText, response.status);
  }

  return data;
}
