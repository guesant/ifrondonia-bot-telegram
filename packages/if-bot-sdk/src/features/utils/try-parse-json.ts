export const tryParseJSON = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};
