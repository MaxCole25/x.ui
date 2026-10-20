import { translate as t } from '../../../../locale'
import { formatDay, parseDay } from './core'

interface HolidayPreset { name: string; start: string; end: string; workingDates: string[] }

/** 中国大陆公布的放假调休区间；不推算未公布年度的农历日期和调休。 */
export const holidayPresets: Record<number, { source: string; holidays: HolidayPreset[] }> = {
  2025: {
    source: 'https://www.forestry.gov.cn/c/www/szxx/594663.jhtml',
    holidays: [
      { get name() { return t("extension.499e5d1fe08b") }, start: '2025-01-01', end: '2025-01-01', workingDates: [] },
      { get name() { return t("extension.33960ae6d599") }, start: '2025-01-28', end: '2025-02-04', workingDates: ['2025-01-26', '2025-02-08'] },
      { get name() { return t("extension.e73175416972") }, start: '2025-04-04', end: '2025-04-06', workingDates: [] },
      { get name() { return t("extension.89cba4f91c6f") }, start: '2025-05-01', end: '2025-05-05', workingDates: ['2025-04-27'] },
      { get name() { return t("extension.e754b8ef226b") }, start: '2025-05-31', end: '2025-06-02', workingDates: [] },
      { get name() { return t("extension.9b148251efc7") }, start: '2025-10-01', end: '2025-10-08', workingDates: ['2025-09-28', '2025-10-11'] }
    ]
  },
  2026: {
    source: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202511/t20251104_4258873.html',
    holidays: [
      { get name() { return t("extension.499e5d1fe08b") }, start: '2026-01-01', end: '2026-01-03', workingDates: ['2026-01-04'] },
      { get name() { return t("extension.33960ae6d599") }, start: '2026-02-15', end: '2026-02-23', workingDates: ['2026-02-14', '2026-02-28'] },
      { get name() { return t("extension.e73175416972") }, start: '2026-04-04', end: '2026-04-06', workingDates: [] },
      { get name() { return t("extension.89cba4f91c6f") }, start: '2026-05-01', end: '2026-05-05', workingDates: ['2026-05-09'] },
      { get name() { return t("extension.e754b8ef226b") }, start: '2026-06-19', end: '2026-06-21', workingDates: [] },
      { get name() { return t("extension.92ba816fbb21") }, start: '2026-09-25', end: '2026-09-27', workingDates: [] },
      { get name() { return t("extension.c6d4f77ed9e7") }, start: '2026-10-01', end: '2026-10-07', workingDates: ['2026-09-20', '2026-10-10'] }
    ]
  }
}

export function holidayDates(preset: HolidayPreset): string[] {
  const start = parseDay(preset.start), end = parseDay(preset.end)
  return Array.from({ length: end - start + 1 }, (_, offset) => formatDay(start + offset))
}
