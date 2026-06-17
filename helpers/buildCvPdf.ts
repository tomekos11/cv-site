import { jsPDF } from 'jspdf';

import type {
  CvCertificateEntry,
  CvEducationEntry,
  CvLanguageEntry,
  CvProjectEntry,
  CvWorkEntry,
  JobSlug,
} from '~/composables/useCvData';
import { loadCvPdfHeaderAssets, type CvPdfHeaderAssets } from '~/helpers/cvPdfAssets';
import { cvJobDescriptions, type JobDescriptionContent } from '~/helpers/cvJobDescriptions';
import { loadFlagDataUrl } from '~/helpers/cvPdfFlags';

const FONT_REGULAR = '/assets/fonts/Roboto-Regular.ttf';
const FONT_BOLD = '/assets/fonts/Roboto-Bold.ttf';

const COLORS = {
  title: [15, 23, 42] as const,
  subtitle: [100, 116, 139] as const,
  body: [51, 65, 85] as const,
  section: [30, 41, 59] as const,
  badgeBg: [15, 23, 42] as const,
  badgeText: [248, 250, 252] as const,
  link: [37, 99, 235] as const,
  line: [148, 163, 184] as const,
  headerBg: [245, 247, 250] as const,
};

const BADGE = {
  fontSize: 7.5,
  height: 5.5,
  hPadding: 2.5,
  gap: 1.5,
  rowGap: 1.5,
  radius: 1.2,
  bottomMargin: 0,
};

const HEADER = {
  photoMaxSize: 28,
  photoGap: 6,
  contactIconSize: 4,
  contactIconGap: 2.5,
  contactRowHeight: 5.5,
  contactGap: 1.5,
  flagWidth: 6,
  flagHeight: 4.5,
  flagGap: 2,
  experienceTopGap: 8,
  backgroundPaddingX: 4,
  backgroundPaddingY: 4,
  backgroundRadius: 2,
};

const ptToMm = (pt: number) => pt * 0.352778;

const WORK_TECHNOLOGY_GAP = 1.8;

const getSubtitleVisualBottom = (typo: WorkEntryTypo, lineCount: number) => {
  if (lineCount <= 1) {
    return ptToMm(typo.subtitleSize) * 0.35;
  }

  return (lineCount - 1) * typo.subtitleLineHeight + ptToMm(typo.subtitleSize) * 0.35;
};

const getBodyBaselineOffset = (typo: WorkEntryTypo) => ptToMm(typo.bodySize) * 0.8;

const TECHNOLOGY_GROUP_LINE_HEIGHT = 3.5;
const TECHNOLOGY_GROUP_GAP = 0.5;
const TECHNOLOGY_NOTE_TOP_MARGIN = 1;
const TECHNOLOGIES_CERTIFICATES_GAP = 5;
const CV_WEBSITE_LINK_TEXT = 'cv.tomasz-slapinski.pl';
const SKILLS_NOTE_FONT_SIZE = 7.5;
const SKILLS_NOTE_LINE_HEIGHT = 3.4;

const getCvWebsiteUrl = (locale: 'pl' | 'en') => `https://cv.tomasz-slapinski.pl/${locale}`;

const EDUCATION_ENTRY_GAP = 4;
const ENTRY_NAME_FONT_SIZE = 8.5;
const ENTRY_NAME_LINE_HEIGHT = 3.8;
const EDUCATION_DATE_LINE_HEIGHT = 3.5;
const EDUCATION_GRADE_TOP_GAP = 0.5;
const EDUCATION_TITLE_LINE_HEIGHT = 3.5;

const LANGUAGE_ROW_HEIGHT = 5;
const LANGUAGE_FLAG_WIDTH = 6;
const LANGUAGE_FLAG_HEIGHT = 4.5;
const LANGUAGE_FLAG_TEXT_GAP = 2.5;
const LANGUAGE_ENTRY_GAP = 1.5;

interface WorkEntryTypo {
  companySize: number;
  companyLineHeight: number;
  dateSize: number;
  subtitleSize: number;
  subtitleLineHeight: number;
  bodySize: number;
  bodyLineHeight: number;
  entryGap: number;
}

const DEFAULT_WORK_TYPO: WorkEntryTypo = {
  companySize: 10,
  companyLineHeight: 4.2,
  dateSize: 8.5,
  subtitleSize: 8.5,
  subtitleLineHeight: 3,
  bodySize: 8.5,
  bodyLineHeight: 3.5,
  entryGap: 3,
};

const EXPERIENCE_WORK_TYPO: WorkEntryTypo = {
  companySize: 12,
  companyLineHeight: 5.2,
  dateSize: 10,
  subtitleSize: 10,
  subtitleLineHeight: 3,
  bodySize: 9.5,
  bodyLineHeight: 4.2,
  entryGap: 5,
};

export interface CvPdfLabels {
  experience: string;
  commercialProjects: string;
  education: string;
  languages: string;
  technologies: string;
  projects: string;
  certificates: string;
  issued: string;
  grade: string;
  currently: string;
  certificateLink: string;
  consentClause: string;
}

export interface CvPdfPersonal {
  name: string;
  title: string;
  email: string;
  description: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface CvTechnologyGroup {
  label: string;
  items: string[];
}

export interface CvPdfInput {
  personal: CvPdfPersonal;
  labels: CvPdfLabels;
  experience: CvWorkEntry[];
  commercialProjects: CvWorkEntry[];
  education: CvEducationEntry[];
  languages: CvLanguageEntry[];
  technologyGroups: CvTechnologyGroup[];
  skillsNotePrefix: string;
  projects: CvProjectEntry[];
  certificates: CvCertificateEntry[];
  locale: 'pl' | 'en';
}

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const loadFonts = async (doc: jsPDF) => {
  const [regularResponse, boldResponse] = await Promise.all([
    fetch(FONT_REGULAR),
    fetch(FONT_BOLD),
  ]);

  if (!regularResponse.ok || !boldResponse.ok) {
    throw new Error('Failed to load PDF fonts');
  }

  const [regularBase64, boldBase64] = await Promise.all([
    regularResponse.arrayBuffer().then(arrayBufferToBase64),
    boldResponse.arrayBuffer().then(arrayBufferToBase64),
  ]);

  doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
  doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
};

class CvPdfLayout {
  private readonly pageHeight: number;
  private readonly pageWidth: number;
  readonly contentWidth: number;
  readonly margin = { top: 14, right: 14, bottom: 14, left: 14 };
  y = 0;

  constructor(private readonly doc: jsPDF) {
    this.pageWidth = doc.internal.pageSize.getWidth();
    this.pageHeight = doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - this.margin.left - this.margin.right;
    this.y = this.margin.top;
  }

  private get maxY() {
    return this.pageHeight - this.margin.bottom;
  }

  private get pageContentHeight() {
    return this.maxY - this.margin.top;
  }

  addPage() {
    this.doc.addPage();
    this.y = this.margin.top;
  }

  setFont(style: 'normal' | 'bold', size: number, color: readonly [number, number, number]) {
    this.doc.setFont('Roboto', style);
    this.doc.setFontSize(size);
    this.doc.setTextColor(color[0], color[1], color[2]);
  }

  measureWrappedText(text: string, width: number, fontSize: number, lineHeight: number) {
    this.doc.setFontSize(fontSize);
    const lines = this.doc.splitTextToSize(text, width) as string[];
    return lines.length * lineHeight;
  }

  drawWrappedText(
    text: string,
    x: number,
    width: number,
    fontSize: number,
    lineHeight: number,
    style: 'normal' | 'bold' = 'normal',
    color: readonly [number, number, number] = COLORS.body,
  ) {
    this.setFont(style, fontSize, color);
    const lines = this.doc.splitTextToSize(text, width) as string[];

    for (const line of lines) {
      this.ensureSpace(lineHeight);
      this.doc.text(line, x, this.y);
      this.y += lineHeight;
    }
  }

  ensureSpace(height: number) {
    if (this.y + height > this.maxY) {
      this.addPage();
    }
  }

  beginSection(sectionHeight: number) {
    if (sectionHeight <= this.pageContentHeight && this.y + sectionHeight > this.maxY) {
      this.addPage();
    }
  }

  beginBlock(blockHeight: number) {
    const pageContent = this.pageContentHeight;

    if (blockHeight <= pageContent && this.y + blockHeight > this.maxY) {
      this.addPage();
    }
  }

  measureBadges(labels: string[]) {
    if (!labels.length) return 0;

    this.doc.setFont('Roboto', 'bold');
    this.doc.setFontSize(BADGE.fontSize);

    let rowWidth = 0;
    let rows = 1;

    for (const label of labels) {
      const badgeWidth = this.doc.getTextWidth(label) + BADGE.hPadding * 2;
      if (rowWidth > 0 && rowWidth + BADGE.gap + badgeWidth > this.contentWidth) {
        rows += 1;
        rowWidth = badgeWidth;
      } else {
        rowWidth = rowWidth > 0 ? rowWidth + BADGE.gap + badgeWidth : badgeWidth;
      }
    }

    return rows * BADGE.height + Math.max(0, rows - 1) * BADGE.rowGap + BADGE.bottomMargin;
  }

  drawBadges(labels: string[], x: number) {
    if (!labels.length) return;

    this.doc.setFont('Roboto', 'bold');
    this.doc.setFontSize(BADGE.fontSize);
    this.doc.setTextColor(COLORS.badgeText[0], COLORS.badgeText[1], COLORS.badgeText[2]);

    let cursorX = x;
    let rowY = this.y;

    for (const label of labels) {
      const textWidth = this.doc.getTextWidth(label);
      const badgeWidth = textWidth + BADGE.hPadding * 2;

      if (cursorX > x && cursorX + badgeWidth > x + this.contentWidth) {
        cursorX = x;
        rowY += BADGE.height + BADGE.rowGap;
      }

      this.ensureSpace((rowY - this.y) + BADGE.height + 1);

      this.doc.setFillColor(COLORS.badgeBg[0], COLORS.badgeBg[1], COLORS.badgeBg[2]);
      this.doc.roundedRect(cursorX, rowY, badgeWidth, BADGE.height, BADGE.radius, BADGE.radius, 'F');
      this.doc.text(
        label,
        cursorX + badgeWidth / 2,
        rowY + BADGE.height / 2 + 0.15,
        { align: 'center', baseline: 'middle' },
      );

      cursorX += badgeWidth + BADGE.gap;
    }

    this.y = rowY + BADGE.height + BADGE.bottomMargin;
  }

  drawSectionTitle(title: string, showRule = true) {
    const blockHeight = showRule ? 8 : 6;
    this.beginBlock(blockHeight);
    this.setFont('bold', 11, COLORS.section);
    this.doc.text(title.toUpperCase(), this.margin.left, this.y);
    this.y += 4.5;
    if (showRule) {
      this.doc.setDrawColor(COLORS.line[0], COLORS.line[1], COLORS.line[2]);
      this.doc.line(this.margin.left, this.y, this.margin.left + this.contentWidth, this.y);
      this.y += 5;
    } else {
      this.y += 2;
    }
  }

  drawHorizontalRule() {
    this.y += 2;
    this.doc.setDrawColor(COLORS.line[0], COLORS.line[1], COLORS.line[2]);
    this.doc.line(this.margin.left, this.y, this.margin.left + this.contentWidth, this.y);
    this.y += 6;
  }

  measureLinkText(fontSize = 8.5, lineHeight = 3.5) {
    this.doc.setFontSize(fontSize);
    return lineHeight;
  }

  drawLinkText(text: string, x: number, url: string, fontSize = 8.5, lineHeight = 3.5) {
    this.setFont('normal', fontSize, COLORS.link);
    this.ensureSpace(lineHeight);
    const baselineY = this.y;
    this.doc.text(text, x, baselineY);
    const textWidth = this.doc.getTextWidth(text);
    this.doc.link(x, baselineY - 2.8, textWidth, lineHeight, { url });
    this.y += lineHeight;
  }

  drawLinkTextAt(
    text: string,
    x: number,
    y: number,
    url: string,
    align: 'left' | 'right' = 'left',
    fontSize = 8.5,
    lineHeight = 3.5,
  ) {
    this.setFont('normal', fontSize, COLORS.link);
    const textWidth = this.doc.getTextWidth(text);
    const linkX = align === 'right' ? x - textWidth : x;
    this.doc.text(text, x, y, align === 'right' ? { align: 'right' } : undefined);
    this.doc.link(linkX, y - 2.8, textWidth, lineHeight, { url });
  }
}

const measureJobDescription = (
  layout: CvPdfLayout,
  description: JobDescriptionContent,
  typo: WorkEntryTypo,
  topMargin = 0,
) => {
  let height = topMargin;

  for (const paragraph of description.paragraphs) {
    height += layout.measureWrappedText(paragraph, layout.contentWidth, typo.bodySize, typo.bodyLineHeight);
    height += 1.5;
  }

  if (description.bullets?.length) {
    for (const bullet of description.bullets) {
      height += layout.measureWrappedText(`• ${bullet}`, layout.contentWidth - 4, typo.bodySize, typo.bodyLineHeight);
      height += 1;
    }
  }

  return height;
};

const drawJobDescription = (
  layout: CvPdfLayout,
  description: JobDescriptionContent,
  typo: WorkEntryTypo,
  topMargin = 0,
) => {
  layout.y += topMargin;

  for (const paragraph of description.paragraphs) {
    layout.drawWrappedText(
      paragraph,
      layout.margin.left,
      layout.contentWidth,
      typo.bodySize,
      typo.bodyLineHeight,
    );
    layout.y += 1.5;
  }

  if (description.bullets?.length) {
    for (const bullet of description.bullets) {
      layout.drawWrappedText(
        `• ${bullet}`,
        layout.margin.left + 2,
        layout.contentWidth - 4,
        typo.bodySize,
        typo.bodyLineHeight,
      );
      layout.y += 1;
    }
  }
};

const measureWorkEntry = (
  layout: CvPdfLayout,
  job: CvWorkEntry,
  description: JobDescriptionContent,
  typo: WorkEntryTypo = DEFAULT_WORK_TYPO,
) => {
  const subtitleWidth = layout.contentWidth * 0.72;
  layout.doc.setFontSize(typo.subtitleSize);
  const subtitleLines = layout.doc.splitTextToSize(job.shortDescription, subtitleWidth) as string[];

  let height = 12;
  height += layout.measureWrappedText(job.company, subtitleWidth, typo.companySize, typo.companyLineHeight);
  height += getSubtitleVisualBottom(typo, subtitleLines.length);
  height += WORK_TECHNOLOGY_GAP;
  height += layout.measureBadges(job.technologies);
  height += WORK_TECHNOLOGY_GAP + getBodyBaselineOffset(typo);
  height += measureJobDescription(layout, description, typo, 0);
  return height + typo.entryGap;
};

const drawWorkEntry = (
  layout: CvPdfLayout,
  job: CvWorkEntry,
  description: JobDescriptionContent,
  typo: WorkEntryTypo = DEFAULT_WORK_TYPO,
) => {
  const dateWidth = layout.contentWidth * 0.28;
  const textWidth = layout.contentWidth - dateWidth - 2;

  layout.setFont('bold', typo.companySize, COLORS.title);
  layout.ensureSpace(typo.companyLineHeight);
  layout.doc.text(job.company, layout.margin.left, layout.y);

  layout.setFont('bold', typo.dateSize, COLORS.body);
  const dateLines = layout.doc.splitTextToSize(job.dates, dateWidth) as string[];
  layout.doc.text(dateLines, layout.margin.left + textWidth + 2, layout.y, { align: 'right' });
  layout.y += typo.companyLineHeight + 1;

  layout.doc.setFontSize(typo.subtitleSize);
  const subtitleLines = layout.doc.splitTextToSize(job.shortDescription, textWidth) as string[];
  const subtitleStartY = layout.y;
  layout.drawWrappedText(
    job.shortDescription,
    layout.margin.left,
    textWidth,
    typo.subtitleSize,
    typo.subtitleLineHeight,
    'normal',
    COLORS.subtitle,
  );
  layout.y = subtitleStartY + getSubtitleVisualBottom(typo, subtitleLines.length) + WORK_TECHNOLOGY_GAP;
  layout.drawBadges(job.technologies, layout.margin.left);
  layout.y += WORK_TECHNOLOGY_GAP + getBodyBaselineOffset(typo);
  drawJobDescription(layout, description, typo, 0);
  layout.y += typo.entryGap;
};

const measureEducationEntry = (layout: CvPdfLayout, school: CvEducationEntry, labels: CvPdfLabels) => {
  const dateWidth = layout.contentWidth * 0.28;
  const textWidth = layout.contentWidth - dateWidth - 2;
  const dateLabel = school.status === 'ongoing'
    ? `${school.when} (${labels.currently})`
    : school.when;

  layout.doc.setFontSize(8.5);
  const dateLines = layout.doc.splitTextToSize(dateLabel, dateWidth) as string[];
  const dateBlockHeight = dateLines.length * EDUCATION_DATE_LINE_HEIGHT;

  const leftHeight = ENTRY_NAME_LINE_HEIGHT
    + layout.measureWrappedText(school.title, textWidth, 8.5, EDUCATION_TITLE_LINE_HEIGHT);

  let rightHeight = dateBlockHeight;
  if (school.mark) {
    rightHeight += EDUCATION_GRADE_TOP_GAP
      + layout.measureWrappedText(`${labels.grade}: ${school.mark}`, dateWidth, 8.5, EDUCATION_DATE_LINE_HEIGHT);
  }

  return Math.max(leftHeight, rightHeight) + EDUCATION_ENTRY_GAP;
};

const drawEducationEntry = (layout: CvPdfLayout, school: CvEducationEntry, labels: CvPdfLabels) => {
  const dateWidth = layout.contentWidth * 0.28;
  const textWidth = layout.contentWidth - dateWidth - 2;
  const rightColumnX = layout.margin.left + textWidth + 2;
  const dateLabel = school.status === 'ongoing'
    ? `${school.when} (${labels.currently})`
    : school.when;
  const rowStartY = layout.y;

  layout.setFont('bold', ENTRY_NAME_FONT_SIZE, COLORS.body);
  layout.ensureSpace(ENTRY_NAME_LINE_HEIGHT);
  layout.doc.text(school.name, layout.margin.left, layout.y);

  layout.setFont('bold', 8.5, COLORS.body);
  const dateLines = layout.doc.splitTextToSize(dateLabel, dateWidth) as string[];
  layout.doc.text(dateLines, rightColumnX, layout.y, { align: 'right' });
  const dateBlockHeight = dateLines.length * EDUCATION_DATE_LINE_HEIGHT;

  let rightBottomY = rowStartY + dateBlockHeight;
  if (school.mark) {
    const gradeLabel = `${labels.grade}: ${school.mark}`;
    const gradeY = rowStartY + dateBlockHeight + EDUCATION_GRADE_TOP_GAP;
    layout.setFont('normal', 8.5, COLORS.subtitle);
    const gradeLines = layout.doc.splitTextToSize(gradeLabel, dateWidth) as string[];
    layout.doc.text(gradeLines, rightColumnX, gradeY, { align: 'right' });
    rightBottomY = gradeY + gradeLines.length * EDUCATION_DATE_LINE_HEIGHT;
  }

  layout.y = rowStartY + ENTRY_NAME_LINE_HEIGHT;
  layout.drawWrappedText(
    school.title,
    layout.margin.left,
    textWidth,
    8.5,
    EDUCATION_TITLE_LINE_HEIGHT,
    'normal',
    COLORS.subtitle,
  );

  layout.y = Math.max(layout.y, rightBottomY) + EDUCATION_ENTRY_GAP;
};

const measureProjectEntry = (layout: CvPdfLayout, project: CvProjectEntry) => {
  let height = 6;
  height += layout.measureWrappedText(project.name, layout.contentWidth, 10, 4.2);
  height += layout.measureBadges(project.technologies);
  height += layout.measureWrappedText(project.description, layout.contentWidth, 8.5, 3.8);
  if (project.demoLink) {
    height += layout.measureWrappedText(project.demoLink, layout.contentWidth, 8, 3.5);
  }
  return height + 4;
};

const drawProjectEntry = (layout: CvPdfLayout, project: CvProjectEntry) => {
  layout.setFont('bold', 10, COLORS.title);
  layout.ensureSpace(4.2);
  layout.doc.text(project.name, layout.margin.left, layout.y);
  layout.y += 4.2;

  layout.drawBadges(project.technologies, layout.margin.left);
  layout.drawWrappedText(project.description, layout.margin.left, layout.contentWidth, 8.5, 3.8);

  if (project.demoLink) {
    layout.drawWrappedText(project.demoLink, layout.margin.left, layout.contentWidth, 8, 3.5, 'normal', COLORS.link);
  }

  layout.y += 4;
};

const CERTIFICATE_DATE_LINE_HEIGHT = 3.5;
const CERTIFICATE_LINK_TOP_GAP = 0.5;

const measureCertificateEntry = (layout: CvPdfLayout, cert: CvCertificateEntry, labels: CvPdfLabels) => {
  const dateWidth = layout.contentWidth * 0.28;
  const textWidth = layout.contentWidth - dateWidth - 2;
  const dateLabel = `${labels.issued} ${cert.receivedDate}`;

  layout.doc.setFontSize(8.5);
  const dateLines = layout.doc.splitTextToSize(dateLabel, dateWidth) as string[];
  const dateBlockHeight = dateLines.length * CERTIFICATE_DATE_LINE_HEIGHT;

  const leftHeight = ENTRY_NAME_LINE_HEIGHT + layout.measureWrappedText(cert.company, textWidth, 8.5, 3.5);
  const rightHeight = cert.link
    ? dateBlockHeight + CERTIFICATE_LINK_TOP_GAP + layout.measureLinkText()
    : dateBlockHeight;

  return Math.max(leftHeight, rightHeight) + 4;
};

const drawCertificateEntry = (layout: CvPdfLayout, cert: CvCertificateEntry, labels: CvPdfLabels) => {
  const dateWidth = layout.contentWidth * 0.28;
  const textWidth = layout.contentWidth - dateWidth - 2;
  const rightColumnX = layout.margin.left + textWidth + 2;
  const dateLabel = `${labels.issued} ${cert.receivedDate}`;
  const rowStartY = layout.y;

  layout.setFont('bold', ENTRY_NAME_FONT_SIZE, COLORS.body);
  layout.ensureSpace(ENTRY_NAME_LINE_HEIGHT);
  layout.doc.text(cert.name, layout.margin.left, layout.y);

  layout.setFont('bold', 8.5, COLORS.body);
  const dateLines = layout.doc.splitTextToSize(dateLabel, dateWidth) as string[];
  layout.doc.text(dateLines, rightColumnX, layout.y, { align: 'right' });
  const dateBlockHeight = dateLines.length * CERTIFICATE_DATE_LINE_HEIGHT;

  layout.y = rowStartY + ENTRY_NAME_LINE_HEIGHT;
  layout.drawWrappedText(cert.company, layout.margin.left, textWidth, 8.5, 3.5, 'normal', COLORS.subtitle);
  const leftBottomY = layout.y;

  let entryBottomY = leftBottomY;
  if (cert.link) {
    const linkY = rowStartY + dateBlockHeight + CERTIFICATE_LINK_TOP_GAP;
    layout.drawLinkTextAt(labels.certificateLink, rightColumnX, linkY, cert.link, 'right');
    entryBottomY = Math.max(leftBottomY, linkY + 3.5);
  } else {
    entryBottomY = Math.max(leftBottomY, rowStartY + dateBlockHeight);
  }

  layout.y = entryBottomY + 4;
};

const formatPdfLinkedin = (url: string) => url.replace('https://www.', 'https://');

const drawContactBlockRight = (
  layout: CvPdfLayout,
  doc: jsPDF,
  startY: number,
  contacts: Array<{ icon: string; text: string }>,
) => {
  const rightX = layout.margin.left + layout.contentWidth;
  const maxTextWidth = layout.contentWidth * 0.5;
  let y = startY;

  for (const contact of contacts) {
    layout.setFont('normal', 7.5, COLORS.link);
    const lines = doc.splitTextToSize(contact.text, maxTextWidth) as string[];
    const lineHeight = 3.2;
    const blockHeight = lines.length * lineHeight;

    const textWidth = Math.max(...lines.map((line) => doc.getTextWidth(line)));
    const iconX = rightX - textWidth - HEADER.contactIconGap - HEADER.contactIconSize;
    const iconY = y - HEADER.contactIconSize + 0.8;

    doc.addImage(
      contact.icon,
      'PNG',
      iconX,
      iconY,
      HEADER.contactIconSize,
      HEADER.contactIconSize,
    );
    doc.text(lines, rightX, y, { align: 'right' });
    y += blockHeight + HEADER.contactGap;
  }
};

const drawHeaderFlags = (
  layout: CvPdfLayout,
  doc: jsPDF,
  languages: CvLanguageEntry[],
  flagDataUrls: Record<string, string>,
  x: number,
  y: number,
) => {
  let cursorX = x;

  for (const language of languages) {
    const flagDataUrl = flagDataUrls[language.flag];
    if (!flagDataUrl) continue;

    doc.addImage(
      flagDataUrl,
      'PNG',
      cursorX,
      y,
      HEADER.flagWidth,
      HEADER.flagHeight,
    );
    cursorX += HEADER.flagWidth + HEADER.flagGap;
  }
};

const drawHeader = (
  layout: CvPdfLayout,
  doc: jsPDF,
  personal: CvPdfPersonal,
  languages: CvLanguageEntry[],
  assets: CvPdfHeaderAssets,
  flagDataUrls: Record<string, string>,
) => {
  const headerStartY = layout.y;
  const photo = assets.photo;
  const textX = layout.margin.left + photo.widthMm + HEADER.photoGap;
  const nameY = headerStartY + 5;
  const titleY = headerStartY + 11;
  const flagsY = titleY + 3.5;
  const flagsBottom = flagsY + HEADER.flagHeight;
  const contactsBottom = headerStartY + 5
    + (HEADER.contactRowHeight + HEADER.contactGap) * 3;
  const upperBlockEnd = Math.max(
    headerStartY + photo.heightMm,
    flagsBottom,
    contactsBottom,
  ) + 4;
  const descriptionHeight = layout.measureWrappedText(personal.description, layout.contentWidth, 9.5, 4.3);
  const headerHeight = upperBlockEnd - headerStartY + descriptionHeight + 2;

  doc.setFillColor(COLORS.headerBg[0], COLORS.headerBg[1], COLORS.headerBg[2]);
  doc.roundedRect(
    layout.margin.left - HEADER.backgroundPaddingX,
    headerStartY - HEADER.backgroundPaddingY,
    layout.contentWidth + HEADER.backgroundPaddingX * 2,
    headerHeight + HEADER.backgroundPaddingY * 2,
    HEADER.backgroundRadius,
    HEADER.backgroundRadius,
    'F',
  );

  doc.addImage(
    photo.dataUrl,
    'PNG',
    layout.margin.left,
    headerStartY,
    photo.widthMm,
    photo.heightMm,
  );

  layout.setFont('bold', 20, COLORS.title);
  doc.text(personal.name, textX, nameY);

  layout.setFont('bold', 11, COLORS.subtitle);
  doc.text(personal.title, textX, titleY);

  drawHeaderFlags(layout, doc, languages, flagDataUrls, textX, flagsY);

  drawContactBlockRight(layout, doc, headerStartY + 5, [
    { icon: assets.emailIcon, text: personal.email },
    { icon: assets.linkedinIcon, text: formatPdfLinkedin(personal.linkedin) },
    { icon: assets.githubIcon, text: personal.github },
  ]);

  layout.y = upperBlockEnd;
  layout.drawWrappedText(personal.description, layout.margin.left, layout.contentWidth, 9.5, 4.3);
  layout.y += 2;
};

const measureConsentClause = (layout: CvPdfLayout, text: string) => {
  return layout.measureWrappedText(text, layout.contentWidth, 7.5, 3.4) + 8;
};

const drawConsentClause = (layout: CvPdfLayout, text: string) => {
  layout.y += 4;
  layout.drawWrappedText(text, layout.margin.left, layout.contentWidth, 7.5, 3.4, 'normal', COLORS.subtitle);
};

const measureLanguagesSection = (layout: CvPdfLayout, languages: CvLanguageEntry[]) => {
  if (!languages.length) return 0;
  return languages.length * (LANGUAGE_ROW_HEIGHT + LANGUAGE_ENTRY_GAP) - LANGUAGE_ENTRY_GAP;
};

const drawLanguagesSection = (
  layout: CvPdfLayout,
  doc: jsPDF,
  languages: CvLanguageEntry[],
  flagDataUrls: Record<string, string>,
) => {
  for (const language of languages) {
    layout.ensureSpace(LANGUAGE_ROW_HEIGHT);
    const flagDataUrl = flagDataUrls[language.flag];
    const textX = layout.margin.left + LANGUAGE_FLAG_WIDTH + LANGUAGE_FLAG_TEXT_GAP;

    if (flagDataUrl) {
      doc.addImage(
        flagDataUrl,
        'PNG',
        layout.margin.left,
        layout.y - 3.5,
        LANGUAGE_FLAG_WIDTH,
        LANGUAGE_FLAG_HEIGHT,
      );
    }

    layout.setFont('bold', 8.5, COLORS.body);
    doc.text(language.name, textX, layout.y);

    const nameWidth = doc.getTextWidth(language.name);
    layout.setFont('normal', 8.5, COLORS.subtitle);
    doc.text(language.level, textX + nameWidth + 2, layout.y);

    layout.y += LANGUAGE_ROW_HEIGHT + LANGUAGE_ENTRY_GAP;
  }
};

const measureSkillsNote = (layout: CvPdfLayout, prefix: string, linkText: string) => {
  layout.setFont('normal', SKILLS_NOTE_FONT_SIZE, COLORS.subtitle);
  const prefixLines = layout.doc.splitTextToSize(prefix, layout.contentWidth) as string[];
  const linkWidth = layout.doc.getTextWidth(linkText);
  const lastPrefixLine = prefixLines[prefixLines.length - 1] ?? '';
  const lastLineWidth = layout.doc.getTextWidth(lastPrefixLine);

  if (lastLineWidth + linkWidth > layout.contentWidth) {
    return (prefixLines.length + 1) * SKILLS_NOTE_LINE_HEIGHT;
  }

  return Math.max(prefixLines.length, 1) * SKILLS_NOTE_LINE_HEIGHT;
};

const drawSkillsNote = (
  layout: CvPdfLayout,
  prefix: string,
  linkText: string,
  url: string,
) => {
  const x = layout.margin.left;
  const width = layout.contentWidth;

  layout.setFont('normal', SKILLS_NOTE_FONT_SIZE, COLORS.subtitle);
  const prefixLines = layout.doc.splitTextToSize(prefix, width) as string[];

  for (let i = 0; i < prefixLines.length - 1; i++) {
    layout.ensureSpace(SKILLS_NOTE_LINE_HEIGHT);
    layout.doc.text(prefixLines[i], x, layout.y);
    layout.y += SKILLS_NOTE_LINE_HEIGHT;
  }

  const lastPrefixLine = prefixLines[prefixLines.length - 1] ?? '';
  layout.setFont('normal', SKILLS_NOTE_FONT_SIZE, COLORS.link);
  const linkWidth = layout.doc.getTextWidth(linkText);
  layout.setFont('normal', SKILLS_NOTE_FONT_SIZE, COLORS.subtitle);
  const lastLineWidth = layout.doc.getTextWidth(lastPrefixLine);

  layout.ensureSpace(SKILLS_NOTE_LINE_HEIGHT);
  const baselineY = layout.y;

  if (lastLineWidth + linkWidth <= width) {
    if (lastPrefixLine) {
      layout.doc.text(lastPrefixLine, x, baselineY);
    }
    const linkX = x + lastLineWidth;
    layout.setFont('normal', SKILLS_NOTE_FONT_SIZE, COLORS.link);
    layout.doc.text(linkText, linkX, baselineY);
    layout.doc.link(linkX, baselineY - 2.8, linkWidth, SKILLS_NOTE_LINE_HEIGHT, { url });
  } else {
    if (lastPrefixLine) {
      layout.doc.text(lastPrefixLine, x, baselineY);
      layout.y += SKILLS_NOTE_LINE_HEIGHT;
      layout.ensureSpace(SKILLS_NOTE_LINE_HEIGHT);
    }
    const linkY = layout.y;
    layout.setFont('normal', SKILLS_NOTE_FONT_SIZE, COLORS.link);
    layout.doc.text(linkText, x, linkY);
    layout.doc.link(x, linkY - 2.8, linkWidth, SKILLS_NOTE_LINE_HEIGHT, { url });
  }

  layout.y += SKILLS_NOTE_LINE_HEIGHT;
};

const measureTechnologyGroups = (
  layout: CvPdfLayout,
  groups: CvTechnologyGroup[],
  skillsNotePrefix: string,
) => {
  let height = 0;

  for (const group of groups) {
    height += layout.measureWrappedText(
      `${group.label}: ${group.items.join(', ')}`,
      layout.contentWidth,
      8.5,
      TECHNOLOGY_GROUP_LINE_HEIGHT,
    );
    height += TECHNOLOGY_GROUP_GAP;
  }

  height += TECHNOLOGY_NOTE_TOP_MARGIN;
  height += measureSkillsNote(layout, skillsNotePrefix, CV_WEBSITE_LINK_TEXT);

  return height;
};

const drawTechnologyGroups = (
  layout: CvPdfLayout,
  groups: CvTechnologyGroup[],
  skillsNotePrefix: string,
  websiteUrl: string,
) => {
  for (const group of groups) {
    layout.drawWrappedText(
      `${group.label}: ${group.items.join(', ')}`,
      layout.margin.left,
      layout.contentWidth,
      8.5,
      TECHNOLOGY_GROUP_LINE_HEIGHT,
      'normal',
      COLORS.body,
    );
    layout.y += TECHNOLOGY_GROUP_GAP;
  }

  layout.y += TECHNOLOGY_NOTE_TOP_MARGIN;
  drawSkillsNote(layout, skillsNotePrefix, CV_WEBSITE_LINK_TEXT, websiteUrl);
};

export const buildCvPdf = async (input: CvPdfInput, fileName: string) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  await loadFonts(doc);

  doc.setProperties({
    title: `${input.personal.name} - CV`,
    subject: 'Curriculum Vitae',
    author: input.personal.name,
    keywords: 'Fullstack Developer, Vue, Nuxt, Laravel',
  });

  const layout = new CvPdfLayout(doc);
  const jobDescriptions = cvJobDescriptions[input.locale];

  const [headerAssets, ...languageFlagUrls] = await Promise.all([
    loadCvPdfHeaderAssets(),
    ...input.languages.map((language) => loadFlagDataUrl(language.flag)),
  ]);

  const flagDataUrls = Object.fromEntries(
    input.languages.map((language, index) => [language.flag, languageFlagUrls[index]]),
  );

  drawHeader(layout, doc, input.personal, input.languages, headerAssets, flagDataUrls);
  layout.y += HEADER.backgroundPaddingY + HEADER.experienceTopGap;

  const experienceBlocks = input.experience.map((job) => {
    const description = jobDescriptions[job.slug as JobSlug];
    return {
      measure: () => measureWorkEntry(layout, job, description, EXPERIENCE_WORK_TYPO),
      draw: () => drawWorkEntry(layout, job, description, EXPERIENCE_WORK_TYPO),
    };
  });

  const commercialBlocks = input.commercialProjects.map((job) => {
    const description = jobDescriptions[job.slug as JobSlug];
    return {
      measure: () => measureWorkEntry(layout, job, description, DEFAULT_WORK_TYPO),
      draw: () => drawWorkEntry(layout, job, description, DEFAULT_WORK_TYPO),
    };
  });
  const commercialSubheadingHeight = 6;

  layout.beginBlock(8 + (experienceBlocks[0]?.measure() ?? 0));
  layout.drawSectionTitle(input.labels.experience, false);
  for (const block of experienceBlocks) {
    layout.beginBlock(block.measure());
    block.draw();
  }

  layout.beginBlock(commercialSubheadingHeight + (commercialBlocks[0]?.measure() ?? 0));
  layout.drawSectionTitle(input.labels.commercialProjects, false);
  for (const block of commercialBlocks) {
    layout.beginBlock(block.measure());
    block.draw();
  }

  const educationBlocks = input.education.map((school) => ({
    measure: () => measureEducationEntry(layout, school, input.labels),
    draw: () => drawEducationEntry(layout, school, input.labels),
  }));
  const educationHeight = 8 + educationBlocks.reduce((sum, block) => sum + block.measure(), 0);
  layout.beginSection(educationHeight);
  layout.beginBlock(8 + (educationBlocks[0]?.measure() ?? 0));
  layout.drawSectionTitle(input.labels.education, false);
  for (const block of educationBlocks) {
    layout.beginBlock(block.measure());
    block.draw();
  }

  const languagesHeight = 8 + measureLanguagesSection(layout, input.languages) + 2;
  layout.beginSection(languagesHeight);
  layout.beginBlock(languagesHeight);
  layout.drawSectionTitle(input.labels.languages, false);
  drawLanguagesSection(layout, doc, input.languages, flagDataUrls);
  layout.y += 2;

  const skillsHeight = 6 + measureTechnologyGroups(layout, input.technologyGroups, input.skillsNotePrefix) + 1;
  layout.beginSection(skillsHeight);
  layout.beginBlock(skillsHeight);
  layout.drawSectionTitle(input.labels.technologies, false);
  drawTechnologyGroups(layout, input.technologyGroups, input.skillsNotePrefix, getCvWebsiteUrl(input.locale));
  layout.y += 1 + TECHNOLOGIES_CERTIFICATES_GAP;

  const certificateBlocks = input.certificates.map((cert) => ({
    measure: () => measureCertificateEntry(layout, cert, input.labels),
    draw: () => drawCertificateEntry(layout, cert, input.labels),
  }));
  const certificatesHeight = 8 + certificateBlocks.reduce((sum, block) => sum + block.measure(), 0);
  layout.beginSection(certificatesHeight + TECHNOLOGIES_CERTIFICATES_GAP);
  layout.beginBlock(8 + (certificateBlocks[0]?.measure() ?? 0));
  layout.drawSectionTitle(input.labels.certificates, false);
  for (const block of certificateBlocks) {
    layout.beginBlock(block.measure());
    block.draw();
  }

  const consentHeight = measureConsentClause(layout, input.labels.consentClause);
  layout.beginSection(consentHeight);
  layout.beginBlock(consentHeight);
  drawConsentClause(layout, input.labels.consentClause);

  doc.save(fileName);
};
