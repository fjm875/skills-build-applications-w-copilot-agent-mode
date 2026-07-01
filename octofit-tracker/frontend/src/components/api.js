export function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
}

function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload.docs)) {
      return payload.docs;
    }
  }

  return [];
}

export async function fetchCollection(resource) {
  const url = getApiUrl(resource);
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`Unable to load ${resource} from ${url}: ${error?.message ?? 'network error'}`);
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Unable to load ${resource} from ${url}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
    );
  }

  const payload = await response.json();
  return extractItems(payload);
}
