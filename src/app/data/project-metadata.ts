export type ProjectType = 'frontend' | 'backend' | 'fullstack' | 'desktop';

export interface ProjectMeta {
  type: ProjectType;
  previewImage?: string;
  previewImages?: string[];
  previewVideo?: string;
  demoUrl?: string;
}

export const PROJECT_METADATA: Record<string, ProjectMeta> = {
  Portfolio: {
    type: 'frontend',
    demoUrl: 'https://aletomba.github.io/Portfolio/',
  },
  WorldCupQatar: {
    type: 'frontend',
    previewImages: [
      'assets/img/projects/world-cup-1.png',
      'assets/img/projects/world-cup-2.png',
    ],
  },
  ApiLaboratorioAgua: {
    type: 'backend',
  },
  WebAppiWorldCup2022: {
    type: 'backend',
    previewImage: 'assets/img/projects/world-cup-api.png',
  },
  'API.FurnitureStore': {
    type: 'backend',
  },
  AppPlanillaPlantaPot: {
    type: 'desktop',
    previewImage: 'assets/img/projects/Gestion_lab.png',
    previewVideo: 'assets/img/projects/video.muestra.mp4',
  },
  'Centro-de-vacunacion': {
    type: 'backend',
  },
  RomaF5: {
    type: 'fullstack',
  },
  RomaF5patioComidas: {
    type: 'fullstack',
  },
  Concecionaria: {
    type: 'fullstack',
  },
  muni: {
    type: 'fullstack',
  },
};
