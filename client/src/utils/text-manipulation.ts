export const truncateText = (text: string, limit: number) => {
  if (!text) return ""; // Return empty string if text is undefined
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };