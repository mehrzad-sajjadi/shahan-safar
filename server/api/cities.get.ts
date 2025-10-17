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
    { code: 'KER', fa: 'کرمان', en: 'Kerman' },
    { code: 'KSH', fa: 'کرمانشاه', en: 'Kermanshah' },
    { code: 'AZD', fa: 'یزد', en: 'Yazd' },
    { code: 'BND', fa: 'بندرعباس', en: 'Bandar Abbas' },
    { code: 'RAS', fa: 'رشت', en: 'Rasht' },
    { code: 'OMH', fa: 'ارومیه', en: 'Urmia' },
    { code: 'SRY', fa: 'ساری', en: 'Sari' },
    { code: 'GBT', fa: 'گرگان', en: 'Gorgan' },
    { code: 'BUZ', fa: 'بوشهر', en: 'Bushehr' },
    { code: 'ABD', fa: 'آبادان', en: 'Abadan' },
    { code: 'ADU', fa: 'اردبیل', en: 'Ardabil' },
    { code: 'XBJ', fa: 'بیرجند', en: 'Birjand' },
    { code: 'ZAH', fa: 'زاهدان', en: 'Zahedan' },
    { code: 'JWN', fa: 'زنجان', en: 'Zanjan' },
    { code: 'SDG', fa: 'سنندج', en: 'Sanandaj' },
    { code: 'HDM', fa: 'همدان', en: 'Hamadan' },
    { code: 'KHD', fa: 'خرم‌آباد', en: 'Khorramabad' },
    { code: 'IIL', fa: 'ایلام', en: 'Ilam' },
    { code: 'MRX', fa: 'ماهشهر', en: 'Mahshahr' },
    { code: 'PGU', fa: 'عسلویه', en: 'Asaluyeh' },
    { code: 'RZR', fa: 'رامسر', en: 'Ramsar' },
    { code: 'BJB', fa: 'بجنورد', en: 'Bojnord' },
    { code: 'DEF', fa: 'دزفول', en: 'Dezful' },
    { code: 'NSH', fa: 'نوشهر', en: 'Nowshahr' },
    { code: 'BDH', fa: 'بندر لنگه', en: 'Bandar Lengeh' },
    { code: 'AJK', fa: 'اراک', en: 'Arak' },
    { code: 'AFZ', fa: 'سبزوار', en: 'Sabzevar' },
    { code: 'CQD', fa: 'شهرکرد', en: 'Shahrekord' },
    { code: 'ZBR', fa: 'چابهار', en: 'Chabahar' },
    { code: 'TCX', fa: 'طبس', en: 'Tabas' },
    { code: 'YES', fa: 'یاسوج', en: 'Yasuj' },
    { code: 'BXR', fa: 'بم', en: 'Bam' },
    { code: 'SYJ', fa: 'سیرجان', en: 'Sirjan' }
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