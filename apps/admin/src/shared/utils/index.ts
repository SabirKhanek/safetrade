export function GetPublicUrl(uri: string) {
  if (!uri) return "";
  const asset_prefix = "https://cdn.safetrade.cloud";
  return `${asset_prefix}/${uri}`;
}

export function isEqual<T>(arr1: T[], arr2: T[]): boolean {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Create frequency maps for both arrays
  const frequencyMap1 = new Map<T, number>();
  const frequencyMap2 = new Map<T, number>();

  // Fill frequency map for the first array
  for (const item of arr1) {
    frequencyMap1.set(item, (frequencyMap1.get(item) || 0) + 1);
  }

  // Fill frequency map for the second array
  for (const item of arr2) {
    frequencyMap2.set(item, (frequencyMap2.get(item) || 0) + 1);
  }

  // Compare frequency maps
  for (const [key, value] of frequencyMap1) {
    if (frequencyMap2.get(key) !== value) {
      return false;
    }
  }

  return true;
}
