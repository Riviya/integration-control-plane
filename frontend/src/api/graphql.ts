import { authenticatedFetch } from '../auth/tokenManager';

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await authenticatedFetch(window.API_CONFIG.graphqlUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  let json: any = undefined;

  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      // If the server returned non-JSON HTML or plain text, keep the raw text
    }
  }

  if (!res.ok) {
    const message = json?.message ?? text;
    throw new Error(message || `Request failed (${res.status})`);
  }

  if (json?.errors) {
    throw new Error(json.errors[0]?.message ?? 'GraphQL error occurred');
  }

  return json.data as T;
}
