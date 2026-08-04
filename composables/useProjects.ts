import {
  getProjectDefinitionBySlug,
  projectDefinitions,
  type ProjectDefinition,
  type ProjectGithubLinkKey,
} from '~/helpers/projects';
import type { Technology } from '~/helpers/technology';

export interface Project extends ProjectDefinition {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

function mapProjectDefinition(definition: ProjectDefinition, t: (key: string) => string): Project {
  return {
    ...definition,
    name: t(`projects.${definition.i18nKey}.name`),
    description: t(`projects.${definition.i18nKey}.description`),
    startDate: new Date(definition.startDate),
    endDate: new Date(definition.endDate),
  };
}

export function useProjects() {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const projects = computed<Project[]>(() =>
    projectDefinitions.map((definition) => mapProjectDefinition(definition, t)),
  );

  const homepageProjects = computed<Project[]>(() =>
    projectDefinitions
      .filter((definition) => definition.featuredOnHomepage)
      .map((definition) => mapProjectDefinition(definition, t)),
  );

  function getProjectBySlug(slug: string) {
    const definition = getProjectDefinitionBySlug(slug);
    if (!definition) {
      return null;
    }

    return mapProjectDefinition(definition, t);
  }

  function getOtherProjects(slug: string) {
    return projects.value.filter((project) => project.slug !== slug);
  }

  function projectPath(slug: string) {
    return localePath(`/projects/${slug}`);
  }

  function formatProjectDate(date: Date) {
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
    });
  }

  return {
    projects,
    homepageProjects,
    getProjectBySlug,
    getOtherProjects,
    projectPath,
    formatProjectDate,
  };
}

export type { ProjectGithubLinkKey, Technology };
