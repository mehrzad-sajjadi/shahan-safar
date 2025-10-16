<template>
    <div class="relative" ref="root" dir="rtl">
        <!-- Visible field (readonly) -->
        <div class="w-full">
            <label v-if="label" class="block mb-1 text-sm text-slate-500">{{ label }}</label>
            <div class="relative">
                <input
                    type="text"
                    :value="display"
                    readonly
                    @click="open = !open"
                    :aria-expanded="open ? 'true' : 'false'"
                    aria-haspopup="dialog"
                    class="w-full h-12 px-4 rounded-lg border border-slate-300 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    placeholder="مسافران"
                />
                <!-- ارسال فقط عدد به سرور -->
                <input type="hidden" :name="name" :value="modelValue" />
                <!-- آیکن -->
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
            </div>
        </div>

        <!-- Dropdown -->
        <transition name="fade">
            <div
                v-if="open"
                class="absolute z-50 mt-2 right-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                role="dialog"
                aria-label="انتخاب تعداد مسافران"
            >
                <div class="p-4 space-y-3">
                    <!-- خلاصه بالا -->
                    <div class="px-2 py-2 bg-slate-50 rounded-lg text-sm text-slate-600">
                        {{ breakdownLabel }}
                    </div>

                    <!-- بزرگسال -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">بزرگسال</div>
                            <div class="text-sm text-slate-400">(۱۲ سال به بالا)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                @click="decrease('adult')"
                                :disabled="counts.adult <= minAdult"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ toFa(counts.adult) }}</span>
                            <button
                                @click="increase('adult')"
                                :disabled="total >= maxPassengers"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
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
                                @click="decrease('child')"
                                :disabled="counts.child === 0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ toFa(counts.child) }}</span>
                            <button
                                @click="increase('child')"
                                :disabled="total >= maxPassengers"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
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
                                @click="decrease('infant')"
                                :disabled="counts.infant === 0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ toFa(counts.infant) }}</span>
                            <button
                                @click="increase('infant')"
                                :disabled="total >= maxPassengers || counts.infant + 1 > counts.adult"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                        </div>
                    </div>
                </div>

                <div class="border-t border-slate-200 p-4">
                    <button
                        @click="closeDropdown"
                        class="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        تایید - {{ toFa(total) }} مسافر
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'

const props = defineProps({
    modelValue: { type: Number, default: 1 }, // فقط عدد کل
    name: { type: String, default: 'passengers' }, // برای فرم (hidden input)
    label: { type: String, default: '' },
    minAdult: { type: Number, default: 1 },
    maxPassengers: { type: Number, default: 9 }
})
const emit = defineEmits(['update:modelValue', 'change']) // change: ارسال جزئیات انتخاب

const root = ref(null)
const open = ref(false)

const counts = reactive({
    adult: Math.max(props.minAdult, Math.min(props.modelValue || 1, props.maxPassengers)),
    child: 0,
    infant: 0
})

const total = computed(() => counts.adult + counts.child + counts.infant)
const display = computed(() => `${toFa(total.value)} مسافر`)

const breakdownLabel = computed(() => {
    const parts = []
    if (counts.adult) parts.push(`${toFa(counts.adult)} بزرگسال`)
    if (counts.child) parts.push(`${toFa(counts.child)} کودک`)
    if (counts.infant) parts.push(`${toFa(counts.infant)} نوزاد`)
    return parts.length ? parts.join('، ') : `${toFa(total.value)} مسافر`
})

function increase(type) {
    if (total.value >= props.maxPassengers) return
    if (type === 'infant' && counts.infant + 1 > counts.adult) return
    counts[type]++
}
function decrease(type) {
    if (type === 'adult') {
        if (counts.adult <= props.minAdult) return
        // اگر کاهش بزرگسال باعث شود تعداد نوزاد > بزرگسال شود، نوزاد را هم کم می‌کنیم
        if (counts.infant > counts.adult - 1) {
            counts.infant = counts.adult - 1
        }
    } else {
        if (counts[type] === 0) return
    }
    counts[type]--
}

function closeDropdown() {
    open.value = false
}

watch(total, (n) => {
    emit('update:modelValue', n)               // فقط عدد
    emit('change', { ...counts, total: n })   // اگر والد بخواهد جزئیات را هم داشته باشد
}, { immediate: true, deep: true })

onClickOutside(root, () => { open.value = false })
useEventListener(window, 'keydown', (e) => {
    if (e.key === 'Escape') open.value = false
})

function toFa(x) {
    return String(x).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>