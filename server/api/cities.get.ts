// server/api/cities.get.ts
type City = { code: string; fa: string; en: string }

const cities: City[] = [
    { code: 'THR', fa: 'تهران', en: 'Tehran' },
    { code: 'MHD', fa: 'مشهد', en: 'Mashhad' },
    { code: 'IFN', fa: 'اصفهان', en: 'Isfahan' },
    { code: 'SYZ', fa: 'شیراز', en: 'Shiraz' },
    { code: 'TBZ', fa: 'تبریز', en: 'Tabriz' },
    { code: 'AWZ', fa: 'اهواز', en: 'Ahvaz' },
    { code: 'KIH', fa: 'کیش', en: 'Kish' },
    { code: 'GSM', fa: 'قشم', en: 'Qeshm' },
    { code: 'AZD', fa: 'یزد', en: 'Yazd' },
    { code: 'BND', fa: 'بندرعباس', en: 'Bandar Abbas' },
    { code: 'RAS', fa: 'رشت', en: 'Rasht' },
    { code: 'OMH', fa: 'ارومیه', en: 'Urmia' },
    { code: 'SRY', fa: 'ساری', en: 'Sari' },
    { code: 'GBT', fa: 'گرگان', en: 'Gorgan' },
    { code: 'BUZ', fa: 'بوشهر', en: 'Bushehr' },
    { code: 'ZAH', fa: 'زاهدان', en: 'Zahedan' }
]

export default defineEventHandler((event) => {
    const { q, limit } = getQuery(event) as { q?: string; limit?: string }

    let data = cities
    if (q) {
        const s = q.toString().trim().toLowerCase()
        data = cities.filter(
        c => c.code.toLowerCase().includes(s) || c.en.toLowerCase().includes(s) || c.fa.includes(q as string)
        )
    }

    if (limit && !Number.isNaN(Number(limit))) {
        data = data.slice(0, Number(limit))
    }

    return { success: true, count: data.length, data }
})