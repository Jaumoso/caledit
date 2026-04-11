// Spanish national holidays + CCAA holidays generator

interface HolidayData {
  year: number
  month: number
  day: number
  nameEs: string
  nameEn: string
  scope: 'NATIONAL' | 'AUTONOMY'
  autonomyCode: string | null
}

// Computus algorithm — Easter Sunday date
function getEasterDate(year: number): { month: number; day: number } {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return { month, day }
}

function addDays(
  year: number,
  month: number,
  day: number,
  offset: number
): { month: number; day: number } {
  const d = new Date(year, month - 1, day + offset)
  return { month: d.getMonth() + 1, day: d.getDate() }
}

export function generateNationalHolidays(year: number): HolidayData[] {
  const easter = getEasterDate(year)
  const viernesSanto = addDays(year, easter.month, easter.day, -2)
  const juevesSanto = addDays(year, easter.month, easter.day, -3)

  return [
    {
      year,
      month: 1,
      day: 1,
      nameEs: 'Año Nuevo',
      nameEn: "New Year's Day",
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 1,
      day: 6,
      nameEs: 'Epifanía del Señor',
      nameEn: 'Epiphany',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: juevesSanto.month,
      day: juevesSanto.day,
      nameEs: 'Jueves Santo',
      nameEn: 'Holy Thursday',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: viernesSanto.month,
      day: viernesSanto.day,
      nameEs: 'Viernes Santo',
      nameEn: 'Good Friday',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 5,
      day: 1,
      nameEs: 'Fiesta del Trabajo',
      nameEn: 'Labour Day',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 8,
      day: 15,
      nameEs: 'Asunción de la Virgen',
      nameEn: 'Assumption of Mary',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 10,
      day: 12,
      nameEs: 'Fiesta Nacional de España',
      nameEn: 'National Day of Spain',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 11,
      day: 1,
      nameEs: 'Todos los Santos',
      nameEn: "All Saints' Day",
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 12,
      day: 6,
      nameEs: 'Día de la Constitución',
      nameEn: 'Constitution Day',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 12,
      day: 8,
      nameEs: 'Inmaculada Concepción',
      nameEn: 'Immaculate Conception',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
    {
      year,
      month: 12,
      day: 25,
      nameEs: 'Natividad del Señor',
      nameEn: 'Christmas Day',
      scope: 'NATIONAL',
      autonomyCode: null,
    },
  ]
}

export function generateAutonomyHolidays(year: number): HolidayData[] {
  const easter = getEasterDate(year)
  const lunesPascua = addDays(year, easter.month, easter.day, 1)
  const corpusChristi = addDays(year, easter.month, easter.day, 60)

  return [
    // Andalucía (AN)
    {
      year,
      month: 2,
      day: 28,
      nameEs: 'Día de Andalucía',
      nameEn: 'Andalusia Day',
      scope: 'AUTONOMY',
      autonomyCode: 'AN',
    },
    // Aragón (AR)
    {
      year,
      month: 4,
      day: 23,
      nameEs: 'Día de Aragón',
      nameEn: 'Aragon Day',
      scope: 'AUTONOMY',
      autonomyCode: 'AR',
    },
    // Asturias (AS)
    {
      year,
      month: 9,
      day: 8,
      nameEs: 'Día de Asturias',
      nameEn: 'Asturias Day',
      scope: 'AUTONOMY',
      autonomyCode: 'AS',
    },
    // Islas Baleares (IB)
    {
      year,
      month: 3,
      day: 1,
      nameEs: 'Día de las Islas Baleares',
      nameEn: 'Balearic Islands Day',
      scope: 'AUTONOMY',
      autonomyCode: 'IB',
    },
    {
      year,
      month: lunesPascua.month,
      day: lunesPascua.day,
      nameEs: 'Lunes de Pascua',
      nameEn: 'Easter Monday',
      scope: 'AUTONOMY',
      autonomyCode: 'IB',
    },
    // Canarias (CN)
    {
      year,
      month: 5,
      day: 30,
      nameEs: 'Día de Canarias',
      nameEn: 'Canary Islands Day',
      scope: 'AUTONOMY',
      autonomyCode: 'CN',
    },
    // Cantabria (CB)
    {
      year,
      month: 7,
      day: 28,
      nameEs: 'Día de las Instituciones',
      nameEn: 'Institutions Day',
      scope: 'AUTONOMY',
      autonomyCode: 'CB',
    },
    {
      year,
      month: 9,
      day: 15,
      nameEs: 'La Bien Aparecida',
      nameEn: 'La Bien Aparecida',
      scope: 'AUTONOMY',
      autonomyCode: 'CB',
    },
    // Castilla y León (CL)
    {
      year,
      month: 4,
      day: 23,
      nameEs: 'Día de Castilla y León',
      nameEn: 'Castile and León Day',
      scope: 'AUTONOMY',
      autonomyCode: 'CL',
    },
    // Castilla-La Mancha (CM)
    {
      year,
      month: 5,
      day: 31,
      nameEs: 'Día de Castilla-La Mancha',
      nameEn: 'Castile-La Mancha Day',
      scope: 'AUTONOMY',
      autonomyCode: 'CM',
    },
    {
      year,
      month: corpusChristi.month,
      day: corpusChristi.day,
      nameEs: 'Corpus Christi',
      nameEn: 'Corpus Christi',
      scope: 'AUTONOMY',
      autonomyCode: 'CM',
    },
    // Cataluña (CT)
    {
      year,
      month: lunesPascua.month,
      day: lunesPascua.day,
      nameEs: 'Lunes de Pascua',
      nameEn: 'Easter Monday',
      scope: 'AUTONOMY',
      autonomyCode: 'CT',
    },
    {
      year,
      month: 6,
      day: 24,
      nameEs: 'Sant Joan',
      nameEn: "Saint John's Day",
      scope: 'AUTONOMY',
      autonomyCode: 'CT',
    },
    {
      year,
      month: 9,
      day: 11,
      nameEs: 'Diada de Cataluña',
      nameEn: 'National Day of Catalonia',
      scope: 'AUTONOMY',
      autonomyCode: 'CT',
    },
    {
      year,
      month: 12,
      day: 26,
      nameEs: 'Sant Esteve',
      nameEn: "Saint Stephen's Day",
      scope: 'AUTONOMY',
      autonomyCode: 'CT',
    },
    // Comunidad Valenciana (VC)
    {
      year,
      month: lunesPascua.month,
      day: lunesPascua.day,
      nameEs: 'Lunes de Pascua',
      nameEn: 'Easter Monday',
      scope: 'AUTONOMY',
      autonomyCode: 'VC',
    },
    {
      year,
      month: 10,
      day: 9,
      nameEs: 'Día de la Comunitat Valenciana',
      nameEn: 'Valencia Day',
      scope: 'AUTONOMY',
      autonomyCode: 'VC',
    },
    // Extremadura (EX)
    {
      year,
      month: 9,
      day: 8,
      nameEs: 'Día de Extremadura',
      nameEn: 'Extremadura Day',
      scope: 'AUTONOMY',
      autonomyCode: 'EX',
    },
    // Galicia (GA)
    {
      year,
      month: 5,
      day: 17,
      nameEs: 'Día das Letras Galegas',
      nameEn: 'Galician Literature Day',
      scope: 'AUTONOMY',
      autonomyCode: 'GA',
    },
    {
      year,
      month: 7,
      day: 25,
      nameEs: 'Santiago Apóstol',
      nameEn: 'Saint James Day',
      scope: 'AUTONOMY',
      autonomyCode: 'GA',
    },
    // Madrid (MD)
    {
      year,
      month: 5,
      day: 2,
      nameEs: 'Día de la Comunidad de Madrid',
      nameEn: 'Madrid Day',
      scope: 'AUTONOMY',
      autonomyCode: 'MD',
    },
    // Murcia (MC)
    {
      year,
      month: 6,
      day: 9,
      nameEs: 'Día de la Región de Murcia',
      nameEn: 'Murcia Day',
      scope: 'AUTONOMY',
      autonomyCode: 'MC',
    },
    // Navarra (NC)
    {
      year,
      month: lunesPascua.month,
      day: lunesPascua.day,
      nameEs: 'Lunes de Pascua',
      nameEn: 'Easter Monday',
      scope: 'AUTONOMY',
      autonomyCode: 'NC',
    },
    {
      year,
      month: 12,
      day: 3,
      nameEs: 'San Francisco Javier',
      nameEn: 'Saint Francis Xavier',
      scope: 'AUTONOMY',
      autonomyCode: 'NC',
    },
    // País Vasco (PV)
    {
      year,
      month: lunesPascua.month,
      day: lunesPascua.day,
      nameEs: 'Lunes de Pascua',
      nameEn: 'Easter Monday',
      scope: 'AUTONOMY',
      autonomyCode: 'PV',
    },
    {
      year,
      month: 10,
      day: 25,
      nameEs: 'Día del País Vasco',
      nameEn: 'Basque Country Day',
      scope: 'AUTONOMY',
      autonomyCode: 'PV',
    },
    // La Rioja (RI)
    {
      year,
      month: 6,
      day: 9,
      nameEs: 'Día de La Rioja',
      nameEn: 'La Rioja Day',
      scope: 'AUTONOMY',
      autonomyCode: 'RI',
    },
    // Ceuta (CE)
    {
      year,
      month: 9,
      day: 2,
      nameEs: 'Día de Ceuta',
      nameEn: 'Ceuta Day',
      scope: 'AUTONOMY',
      autonomyCode: 'CE',
    },
    // Melilla (ML)
    {
      year,
      month: 9,
      day: 17,
      nameEs: 'Día de Melilla',
      nameEn: 'Melilla Day',
      scope: 'AUTONOMY',
      autonomyCode: 'ML',
    },
  ]
}

export function generateAllHolidays(startYear: number, endYear: number): HolidayData[] {
  const all: HolidayData[] = []
  for (let year = startYear; year <= endYear; year++) {
    all.push(...generateNationalHolidays(year))
    all.push(...generateAutonomyHolidays(year))
  }
  return all
}

export const AUTONOMY_CODES: { code: string; name: string }[] = [
  { code: 'AN', name: 'Andalucía' },
  { code: 'AR', name: 'Aragón' },
  { code: 'AS', name: 'Asturias' },
  { code: 'IB', name: 'Islas Baleares' },
  { code: 'CN', name: 'Canarias' },
  { code: 'CB', name: 'Cantabria' },
  { code: 'CL', name: 'Castilla y León' },
  { code: 'CM', name: 'Castilla-La Mancha' },
  { code: 'CT', name: 'Cataluña' },
  { code: 'VC', name: 'Comunidad Valenciana' },
  { code: 'EX', name: 'Extremadura' },
  { code: 'GA', name: 'Galicia' },
  { code: 'MD', name: 'Madrid' },
  { code: 'MC', name: 'Murcia' },
  { code: 'NC', name: 'Navarra' },
  { code: 'PV', name: 'País Vasco' },
  { code: 'RI', name: 'La Rioja' },
  { code: 'CE', name: 'Ceuta' },
  { code: 'ML', name: 'Melilla' },
]
