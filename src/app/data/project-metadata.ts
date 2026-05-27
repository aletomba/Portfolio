export type ProjectType = 'frontend' | 'backend' | 'fullstack' | 'desktop';

export interface ProjectMeta {
  type: ProjectType;
  previewImage?: string;
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
  },
  ApiLaboratorioAgua: {
    type: 'backend',
  },
  WebAppiWorldCup2022: {
    type: 'backend',
  },
  'API.FurnitureStore': {
    type: 'backend',
  },
  AppPlanillaPlantaPot: {
    type: 'desktop',
    previewImage: 'assets/img/projects/Gestion_lab.png',
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
