function useTruncate(charLimit: number) {
  return (text: string) => {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit - 3).concat('...');
  };
}

export default useTruncate;
