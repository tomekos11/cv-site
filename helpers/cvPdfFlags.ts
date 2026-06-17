const flagCache = new Map<string, string>();

const svgToDataUrl = (svgText: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;

const svgToPngDataUrl = (svgText: string, width: number, height: number) => new Promise<string>((resolve, reject) => {
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (!context) {
      reject(new Error('Canvas context unavailable'));
      return;
    }

    context.drawImage(img, 0, 0, width, height);
    resolve(canvas.toDataURL('image/png'));
  };

  img.onerror = () => {
    reject(new Error('Failed to load flag image'));
  };

  img.src = svgToDataUrl(svgText);
});

export const loadFlagDataUrl = async (flagCode: string) => {
  const cached = flagCache.get(flagCode);
  if (cached) return cached;

  const response = await fetch(`/assets/icons/flags/${flagCode}.svg`);
  if (!response.ok) {
    throw new Error(`Failed to fetch flag: ${flagCode}`);
  }

  const dataUrl = await svgToPngDataUrl(await response.text(), 48, 36);
  flagCache.set(flagCode, dataUrl);
  return dataUrl;
};

export const preloadCvPdfFlags = async (flagCodes: string[]) => {
  await Promise.all(flagCodes.map(loadFlagDataUrl));
};
