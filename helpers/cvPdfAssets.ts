const imageCache = new Map<string, string>();
const photoCache = new Map<string, CvPdfPhotoAsset>();

const svgToDataUrl = (svgText: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;

const rasterizeImage = (src: string, width: number, height: number) => new Promise<string>((resolve, reject) => {
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
    reject(new Error(`Failed to load image: ${src}`));
  };

  img.src = src;
});

const loadCachedImage = async (cacheKey: string, loader: () => Promise<string>) => {
  const cached = imageCache.get(cacheKey);
  if (cached) return cached;

  const dataUrl = await loader();
  imageCache.set(cacheKey, dataUrl);
  return dataUrl;
};

export interface CvPdfPhotoAsset {
  dataUrl: string;
  widthMm: number;
  heightMm: number;
}

const loadPhotoForPdf = (path: string, maxSizeMm = 28) => {
  const cacheKey = `${path}:pdf-photo:${maxSizeMm}`;
  const cached = photoCache.get(cacheKey);
  if (cached) return Promise.resolve(cached);

  return new Promise<CvPdfPhotoAsset>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const aspect = img.naturalWidth / img.naturalHeight;
      let heightMm = maxSizeMm;
      let widthMm = heightMm * aspect;

      if (widthMm > maxSizeMm) {
        widthMm = maxSizeMm;
        heightMm = widthMm / aspect;
      }

      const pxPerMm = 12;
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(widthMm * pxPerMm));
      canvas.height = Math.max(1, Math.round(heightMm * pxPerMm));
      const context = canvas.getContext('2d');

      if (!context) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const asset: CvPdfPhotoAsset = {
        dataUrl: canvas.toDataURL('image/png'),
        widthMm,
        heightMm,
      };

      photoCache.set(cacheKey, asset);
      resolve(asset);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${path}`));
    };

    img.src = path;
  });
};

export const loadSvgIconDataUrl = (path: string, width = 64, height = 64) =>
  loadCachedImage(`${path}:${width}x${height}`, async () => {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch icon: ${path}`);
    }

    return rasterizeImage(svgToDataUrl(await response.text()), width, height);
  });

export interface CvPdfHeaderAssets {
  photo: CvPdfPhotoAsset;
  emailIcon: string;
  linkedinIcon: string;
  githubIcon: string;
}

export const loadCvPdfHeaderAssets = async () => {
  const [photo, emailIcon, linkedinIcon, githubIcon] = await Promise.all([
    loadPhotoForPdf('/assets/icons/img/2023_linkedin_no_bg.png'),
    loadSvgIconDataUrl('/assets/icons/pdf/email.svg'),
    loadSvgIconDataUrl('/assets/icons/pdf/linkedin.svg'),
    loadSvgIconDataUrl('/assets/icons/pdf/github.svg'),
  ]);

  return { photo, emailIcon, linkedinIcon, githubIcon };
};
