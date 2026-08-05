export const HOME_FEATURES = [
  {
    id: 'monitoring',
    titleKey: 'home.features.monitoring.title',
    descriptionKey: 'home.features.monitoring.description',
    icon: 'activity',
  },
  {
    id: 'automation',
    titleKey: 'home.features.automation.title',
    descriptionKey: 'home.features.automation.description',
    icon: 'bot',
  },
  {
    id: 'statistics',
    titleKey: 'home.features.statistics.title',
    descriptionKey: 'home.features.statistics.description',
    icon: 'chart',
  },
  {
    id: 'security',
    titleKey: 'home.features.security.title',
    descriptionKey: 'home.features.security.description',
    icon: 'shield',
  },
] as const;

export const HOME_BENEFITS = [
  {
    id: 'speed',
    titleKey: 'home.benefits.speed.title',
    descriptionKey: 'home.benefits.speed.description',
    icon: 'zap',
  },
  {
    id: 'control',
    titleKey: 'home.benefits.control.title',
    descriptionKey: 'home.benefits.control.description',
    icon: 'gauge',
  },
  {
    id: 'districts',
    titleKey: 'home.benefits.districts.title',
    descriptionKey: 'home.benefits.districts.description',
    icon: 'mapPin',
  },
] as const;

export const HOME_STEPS = [
  {
    number: '01',
    titleKey: 'home.steps.setup.title',
    descriptionKey: 'home.steps.setup.description',
    icon: 'settings',
  },
  {
    number: '02',
    titleKey: 'home.steps.launch.title',
    descriptionKey: 'home.steps.launch.description',
    icon: 'play',
  },
  {
    number: '03',
    titleKey: 'home.steps.processing.title',
    descriptionKey: 'home.steps.processing.description',
    icon: 'list',
  },
  {
    number: '04',
    titleKey: 'home.steps.result.title',
    descriptionKey: 'home.steps.result.description',
    icon: 'check',
  },
] as const;

export type HomeIconName =
  | (typeof HOME_FEATURES)[number]['icon']
  | (typeof HOME_BENEFITS)[number]['icon']
  | (typeof HOME_STEPS)[number]['icon'];
