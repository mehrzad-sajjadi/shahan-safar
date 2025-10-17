<template>
    <div class="p-4 space-y-3">
        <button
            @click="fetchFlights"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-60"
            :disabled="pending"
        >
            {{ pending ? 'در حال بارگذاری...' : 'جستجوی پروازها' }}
        </button>

        <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>

        <pre v-if="result" class="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {{ JSON.stringify(result, null, 2) }}
        </pre>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const pending = ref(false)
const result = ref(null)
const errorMsg = ref('')

const body = {
    origin: 'THR',
    destination: 'MHD',
    date: '2025-10-23',
    return_date: '',
    passengers: [
        { type: 'adl', name: '', family: '', fa_name: '', fa_family: '', gender: 1, nid: '', passport_number: '', birthday: '', nationality: 'IRN', passport_nationality: '', passport_expire: '' },
        { type: 'adl', name: '', family: '', fa_name: '', fa_family: '', gender: 1, nid: '', passport_number: '', birthday: '', nationality: 'IRN', passport_nationality: '', passport_expire: '' },
        { type: 'inf', name: '', family: '', fa_name: '', fa_family: '', gender: 1, nid: '', passport_number: '', birthday: '', nationality: 'IRN', passport_nationality: '', passport_expire: '' }
    ]
}

const fetchFlights = async () => {
    pending.value = true
    errorMsg.value = ''
    result.value = null

    try {
        // فراخوانی روت داخلی — بدون مشکل CORS
        const res = await $fetch('/api/flights/list', {
        method: 'POST',
        body
        })
        result.value = res
    } catch (err) {
        console.error(err)
        errorMsg.value = err?.data?.message || err?.message || 'خطا در دریافت اطلاعات'
    } finally {
        pending.value = false
    }
}
</script>