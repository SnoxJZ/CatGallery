const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_QXbcjSJ8Y3wriaNYZ6PIpCNSGY646XLCZrsmwfpNq0FYoOcCdU6lYuYbQ2SBgWG8';

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError:' + response.status);
  }
}

export const jsonApiInstance = async <T>(url: string, init?: RequestInit) => {
  const headers = {
    'x-api-key': API_KEY,
    ...(init?.headers || {}),
  };

  const result = await fetch(`${BASE_URL}/${url}`, { ...init, headers });

  if (!result.ok) {
    throw new ApiError(result);
  }

  return (await result.json()) as Promise<T>;
};
