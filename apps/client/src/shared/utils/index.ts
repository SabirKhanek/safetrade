export function GetPublicUrl(uri: string) {
  if (!uri) return "";
  const asset_prefix = "https://cdn.safetrade.cloud";
  return `${asset_prefix}/${uri}`;
}
