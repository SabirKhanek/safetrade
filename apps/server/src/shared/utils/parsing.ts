function parseJsonStringOrArray<T>(input: string): T[] {
  try {
    // First attempt to parse directly
    return JSON.parse(input);
  } catch (error1) {
    try {
      // If it fails, wrap in array brackets and try again
      return JSON.parse(`[${input}]`);
    } catch (error2) {
      // If it still fails, treat as comma-separated values
      return input.split(',').map((item) => item.trim()) as T[];
    }
  }
}
