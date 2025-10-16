<template>
    <div class="relative" ref="root" dir="rtl">
        <!-- Visible field (readonly) -->
        <div class="w-full">
            <div class="relative">
                <input
                    type="text"
                    :value="display"
                    readonly
                    @click="open = !open"
                    :aria-expanded="open ? 'true' : 'false'"
                    aria-haspopup="dialog"
                    class="w-full  h-12 px-4 rounded-lg border border-slate-300 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <!-- ارسال فقط عدد به سرور -->
                <input type="hidden" :value="modelValue" />
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
                                @click="increase('adult')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ counts.adult }}</span>
                            <button
                                @click="decrease('adult')"
                                :disabled="counts.adult <= minAdult"
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
                                @click="increase('child')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ counts.child }}</span>
                            <button
                                @click="decrease('child')"
                                :disabled="counts.child === 0"
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
                                @click="increase('infant')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ counts.infant }}</span>

                            <button
                                @click="decrease('infant')"
                                :disabled="counts.infant === 0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                        
                        </div>
                    </div>
                </div>

                <div class="border-t border-slate-200 p-4">
                    <button
                        @click="closeDropdown"
                        class="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        تایید - {{ total }} مسافر
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    minAdult: { type: Number, default: 1 },
})

const emit = defineEmits(['update:modelValue', 'change']);

const root = ref(null);
const open = ref(false);

const counts = reactive({
    adult: 1,
    child: 0,
    infant: 0
})

const total = computed(() => counts.adult + counts.child + counts.infant)
const display = computed(() => `${total.value} مسافر`)

const breakdownLabel = computed(() => {
    const parts = []
    if (counts.adult) parts.push(`${counts.adult} بزرگسال`)
    if (counts.child) parts.push(`${counts.child} کودک`)
    if (counts.infant) parts.push(`${counts.infant} نوزاد`)
    return parts.length ? parts.join('، ') : `${total.value} مسافر`
})

function increase(type) {
    if (type === 'infant' && counts.infant + 1 > counts.adult) return
    counts[type]++
}

function decrease(type) {
    if (type === 'adult') {
        if (counts.adult <= props.minAdult){ 
            return
        }
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
    emit('update:modelValue', n)
    emit('change', { ...counts, total: n })
}, { immediate: true, deep: true })

onClickOutside(root, () => { open.value = false })


</script>

<style scoped>
button{
    cursor: pointer;
}
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

</style>
