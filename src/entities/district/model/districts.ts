export interface DistrictStat {
  id: 'nemchinovka' | 'novoivanovskoe';
  nameKey: 'district.nemchinovka' | 'district.novoivanovskoe';
  applicationsCount: number;
  color: 'blue' | 'cyan';
}

export const DISTRICT_STATS: readonly DistrictStat[] = [
  {
    id: 'nemchinovka',
    nameKey: 'district.nemchinovka',
    applicationsCount: 0,
    color: 'blue',
  },
  {
    id: 'novoivanovskoe',
    nameKey: 'district.novoivanovskoe',
    applicationsCount: 0,
    color: 'cyan',
  },
];

export function getTotalApplications(
  districts: readonly DistrictStat[]
): number {
  return districts.reduce(
    (total, district) => total + district.applicationsCount,
    0
  );
}
