export default async (str: string) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
