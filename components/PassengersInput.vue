<template>
    <div class="relative" ref="root" dir="rtl">
        <div class="w-full">
            <div class="relative">
                <input
                    type="text"
                    :value="display"
                    readonly
                    @click="open = !open"
                    :aria-expanded="open ? 'true' : 'false'"
                    aria-haspopup="dialog"
                    class="w-full h-12 px-4 rounded-lg border border-slate-300 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <input type="hidden" :value="modelValue" />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
            </div>
        </div>

        <transition name="fade">
            <div
                v-if="open"
                class="absolute z-50 mt-2 right-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                role="dialog"
                aria-label="انتخاب تعداد مسافران"
            >
                <div class="p-4 space-y-3">
                    <div class="px-2 py-2 bg-slate-50 rounded-lg text-sm text-slate-600">
                        {{ store.breakdownLabel }}
                    </div>

                    <!-- بزرگسال -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">بزرگسال</div>
                            <div class="text-sm text-slate-400">(۱۲ سال به بالا)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                type="button"
                                @click="store.increase('adl')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ store.counts.adl }}</span>
                            <button
                                type="button"
                                @click="store.decrease('adl')"
                                :disabled="store.counts.adl <= minAdult"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                        </div>
                    </div>

                    <!-- کودک -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">کودک</div>
                            <div class="text-sm text-slate-400">(۲ تا ۱۲ سال)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                type="button"
                                @click="store.increase('chd')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ store.counts.chd }}</span>
                            <button
                                type="button"
                                @click="store.decrease('chd')"
                                :disabled="store.counts.chd === 0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                        </div>
                    </div>

                    <!-- نوزاد -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">نوزاد</div>
                            <div class="text-sm text-slate-400">(۱۰ روز تا ۲ سال)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                type="button"
                                @click="store.increase('inf')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ store.counts.inf }}</span>
                            <button
                                type="button"
                                @click="store.decrease('inf')"
                                :disabled="store.counts.inf === 0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                        </div>
                    </div>
                </div>

                <div class="border-t border-slate-200 p-4">
                    <button
                        type="button"
                        @click="closeDropdown"
                        class="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        تایید - {{ store.total }} مسافر
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { usePassengerStore } from '@/stores/PassengerStore' 

const props = defineProps({
    minAdult: { type: Number, default: 1 },
    modelValue: { type: [Number, String] }
})

const emit = defineEmits(['update:modelValue', 'change'])

const root = ref(null)
const open = ref(false)


const store = usePassengerStore()


const display = computed(() => `${store.total} مسافر`)

watch(() => props.modelValue, (newVal) => {
    if (newVal && typeof newVal === 'number') {
        store.setCounts({ adl: newVal, chd: 0, inf: 0 })
    }
}, { immediate: true })

function closeDropdown() {
    store.setCounts({
        adl: store.counts.adl, 
        chd: store.counts.chd,
        inf: store.counts.inf
    })
    emit('update:modelValue', store.total)
    emit('change', { ...store.counts, total: store.total })
    
    open.value = false
}

onClickOutside(root, () => { open.value = false })
</script>

<style scoped>
button {
    cursor: pointer;
}
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>