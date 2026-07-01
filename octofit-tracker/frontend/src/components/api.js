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

export async function fetchCollection(url, resourceName = 'collection') {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`Unable to load ${resourceName} from ${url}: ${error?.message ?? 'network error'}`);
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Unable to load ${resourceName} from ${url}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
    );
  }

  const payload = await response.json();
  return extractItems(payload);
}
