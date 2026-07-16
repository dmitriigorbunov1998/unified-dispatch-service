import type { MockTask, ScriptConfig } from './types';

export const MOCK_TASKS: MockTask[] = [
  {
    edsId: '6950656',
    taskId: 'ЕДС-2024-001542',
    district: 'Немчиновка',
    hasPhone: true,
    address: 'ул. Советская, д. 12',
    apartment: '45',
  },
  {
    edsId: '6950701',
    taskId: 'ЕДС-2024-001587',
    district: 'Немчиновка',
    hasPhone: true,
    address: 'ул. Парковая, д. 3',
    apartment: '18',
  },
  {
    edsId: '6950823',
    taskId: 'ЕДС-2024-001623',
    district: 'Немчиновка',
    hasPhone: false,
    address: 'ул. Школьная, д. 7',
    apartment: '92',
  },
  {
    edsId: '6950845',
    taskId: 'ЕДС-2024-001645',
    district: 'Немчиновка',
    hasPhone: true,
    address: 'ул. Ленина, д. 22',
    apartment: '8',
  },
  {
    edsId: '6950901',
    taskId: 'ЕДС-2024-001701',
    district: 'Новоивановское',
    hasPhone: true,
    address: 'ул. Мичурина, д. 15',
    apartment: '33',
  },
  {
    edsId: '6950938',
    taskId: 'ЕДС-2024-001738',
    district: 'Новоивановское',
    hasPhone: false,
    address: 'ул. Калинина, д. 9',
    apartment: '67',
  },
  {
    edsId: '6950956',
    taskId: 'ЕДС-2024-001756',
    district: 'Новоивановское',
    hasPhone: true,
    address: 'Бульвар Путилково, д. 1',
    apartment: '112',
  },
  {
    edsId: '6950989',
    taskId: 'ЕДС-2024-001789',
    district: 'Новоивановское',
    hasPhone: true,
    address: 'ул. Дружбы, д. 5',
    apartment: '21',
  },
  {
    edsId: '6951012',
    taskId: 'ЕДС-2024-001812',
    district: 'Немчиновка',
    hasPhone: true,
    address: 'ул. Московская, д. 30',
    apartment: '55',
  },
  {
    edsId: '6951034',
    taskId: 'ЕДС-2024-001834',
    district: 'Новоивановское',
    hasPhone: false,
    address: 'ул. Центральная, д. 11',
    apartment: '4',
  },
];

export const ALL_DISTRICTS = ['Немчиновка', 'Новоивановское'] as const;

export const DEFAULT_CONFIG: ScriptConfig = {
  login: import.meta.env.VITE_EDS_LOGIN || '',
  password: import.meta.env.VITE_EDS_ASSWORD || '',
  districts: ['Немчиновка', 'Новоивановское'],
  category:
    '23.4. Обеспечение доступа в квартиру для проведения ТО ВКГО совместно с СО',
  headless: false,
  delayMs: 2000,
};
