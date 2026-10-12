import { formatDay, parseDay } from './core'

interface HolidayPreset { name: string; start: string; end: string; workingDates: string[] }

/** 中国大陆公布的放假调休区间；不推算未公布年度的农历日期和调休。 */
export const holidayPresets: Record<number, { source: string; holidays: HolidayPreset[] }> = {
  2025: {
    source: 'https://www.forestry.gov.cn/c/www/szxx/594663.jhtml',
    holidays: [
      { name: '元旦', start: '2025-01-01', end: '2025-01-01', workingDates: [] },
      { name: '春节', start: '2025-01-28', end: '2025-02-04', workingDates: ['2025-01-26', '2025-02-08'] },
      { name: '清明节', start: '2025-04-04', end: '2025-04-06', workingDates: [] },
      { name: '劳动节', start: '2025-05-01', end: '2025-05-05', workingDates: ['2025-04-27'] },
      { name: '端午节', start: '2025-05-31', end: '2025-06-02', workingDates: [] },
      { name: '国庆节、中秋节', start: '2025-10-01', end: '2025-10-08', workingDates: ['2025-09-28', '2025-10-11'] }
    ]
  },
  2026: {
    source: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202511/t20251104_4258873.html',
    holidays: [
      { name: '元旦', start: '2026-01-01', end: '2026-01-03', workingDates: ['2026-01-04'] },
      { name: '春节', start: '2026-02-15', end: '2026-02-23', workingDates: ['2026-02-14', '2026-02-28'] },
      { name: '清明节', start: '2026-04-04', end: '2026-04-06', workingDates: [] },
      { name: '劳动节', start: '2026-05-01', end: '2026-05-05', workingDates: ['2026-05-09'] },
      { name: '端午节', start: '2026-06-19', end: '2026-06-21', workingDates: [] },
      { name: '中秋节', start: '2026-09-25', end: '2026-09-27', workingDates: [] },
      { name: '国庆节', start: '2026-10-01', end: '2026-10-07', workingDates: ['2026-09-20', '2026-10-10'] }
    ]
  }
}

export function holidayDates(preset: HolidayPreset): string[] {
  const start = parseDay(preset.start), end = parseDay(preset.end)
  return Array.from({ length: end - start + 1 }, (_, offset) => formatDay(start + offset))
}
