import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePassengerStore = defineStore('passenger', () => {

    const counts = ref({
        adl: 1,
        chd: 0,  
        inf: 0
    })


    const total = computed(() => counts.value.adl + counts.value.chd + counts.value.inf)


    function setCounts(newCounts) {
        counts.value = { ...counts.value, ...newCounts }
    }

    function increase(type) {
        if (type === 'inf' && counts.value.inf + 1 > counts.value.adl) {
            return // نوزاد نمی‌تونه بیشتر از بزرگسال باشه
        }
        counts.value[type]++
    }

    function decrease(type) {
        if (type === 'adl') {
            if (counts.value.adl <= 1) { 
                return
            }
            if (counts.value.inf > counts.value.adl - 1) {
                counts.value.inf = counts.value.adl - 1
            }
        } else {
            if (counts.value[type] === 0) return
        }
        counts.value[type]--
    }

    const breakdownLabel = computed(() => {
        const parts = []
        if (counts.value.adl) parts.push(`${counts.value.adl} بزرگسال`)
        if (counts.value.chd) parts.push(`${counts.value.chd} کودک`)
        if (counts.value.inf) parts.push(`${counts.value.inf} نوزاد`)
        return parts.length ? parts.join('، ') : `${total.value} مسافر`
    })

    return {
        counts,
        total,
        breakdownLabel,
        setCounts,
        increase,
        decrease
    }
})