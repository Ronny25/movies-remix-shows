export const replaceAllNonWords = (str: string) => str.toLowerCase().replace(/\W/gi, ' ').replace(/\s+/g, '-');
