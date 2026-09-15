export function normalizeCollectionResponse(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const possibleCollections = [
    payload[collectionName],
    payload.data,
    payload.results,
    payload.items,
    payload.docs,
  ]

  const collection = possibleCollections.find((candidate) => Array.isArray(candidate))

  return collection || []
}

export async function fetchCollection(endpoint, collectionName) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollectionResponse(payload, collectionName)
}