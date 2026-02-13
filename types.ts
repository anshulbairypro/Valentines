export enum SectionId {
  Cheese = 'cheese',
  Paramedic = 'paramedic',
  Faith = 'faith',
  Nerd = 'nerd',
  Marcus = 'marcus',
  Gallery = 'gallery',
  Finale = 'finale'
}

export interface VideoCardProps {
  title: string;
  subtitle: string; // Fact or Confession
  src: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export const SECTIONS = [
  { id: SectionId.Cheese, label: 'Cheese & Vanuatu' },
  { id: SectionId.Paramedic, label: 'Paramedic' },
  { id: SectionId.Faith, label: 'Faith' },
  { id: SectionId.Nerd, label: 'Movies and stuff' },
  { id: SectionId.Marcus, label: 'Marcus' },
  { id: SectionId.Gallery, label: 'Gallery' },
  { id: SectionId.Finale, label: 'Finale' },
];