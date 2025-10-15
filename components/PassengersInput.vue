<template>
    <div class="relative" dir="rtl" ref="root">
        <!-- Input فقط برای باز کردن پاپ‌اور -->
        <input
            type="text"
            :value="inputLabel"
            readonly
            @click="openPopover"
            @focus="openPopover"
            class="w-full px-3 py-2 border rounded-lg cursor-pointer"
            placeholder="انتخاب مسافر"
            aria-haspopup="dialog"
            :aria-expanded="open ? 'true' : 'false'"
        />

        <!-- Popover: زیر اینپوت -->
        <div
            v-if="open"
            class="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white border rounded-xl shadow-xl z-50"
            role="dialog"
            aria-modal="true"
            @keydown.esc.prevent.stop="onCancel"
        >
            <div class="p-4 space-y-3">
                <!-- بزرگسال -->
                <div class="flex items-center justify-between">
                    <div class="text-right">
                        <div class="font-medium">بزرگسال</div>
                        <div class="text-sm text-gray-400">(۱۲ سال به بالا)</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            @click="dec('bozorgh')"
                            :disabled="draft.bozorgh <= minBozorgh"
                            class="h-8 w-8 grid place-items-center rounded bg-gray-200 disabled:opacity-50"
                        >-</button>
                        <span class="w-8 text-center font-medium">{{ fa(draft.bozorgh) }}</span>
                        <button
                            @click="inc('bozorgh')"
                            class="h-8 w-8 grid place-items-center rounded bg-gray-200"
                        >+</button>
                    </div>
                </div>

                <!-- کودک -->
                <div class="flex items-center justify-between">
                    <div class="text-right">
                        <div class="font-medium">کودک</div>
                        <div class="text-sm text-gray-400">(۲ تا ۱۲ سال)</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            @click="dec('koodak')"
                            :disabled="draft.koodak <= 0"
                            class="h-8 w-8 grid place-items-center rounded bg-gray-200 disabled:opacity-50"
                        >-</button>
                        <span class="w-8 text-center font-medium">{{ fa(draft.koodak) }}</span>
                        <button
                            @click="inc('koodak')"
                            class="h-8 w-8 grid place-items-center rounded bg-gray-200"
                        >+</button>
                    </div>
                </div>

                <!-- نوزاد -->
                <div class="flex items-center justify-between">
                    <div class="text-right">
                        <div class="font-medium">نوزاد</div>
                        <div class="text-sm text-gray-400">(۱۰ روز تا ۲ سال)</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            @click="dec('nozad')"
                            :disabled="draft.nozad <= 0"
                            class="h-8 w-8 grid place-items-center rounded bg-gray-200 disabled:opacity-50"
                        >-</button>
                        <span class="w-8 text-center font-medium">{{ fa(draft.nozad) }}</span>
                        <button
                            @click="inc('nozad')"
                            :disabled="draft.nozad >= draft.bozorgh"
                            class="h-8 w-8 grid place-items-center rounded bg-gray-200 disabled:opacity-50"
                        >+</button>
                    </div>
                </div>

                <!-- Footer -->
                <div class="pt-3 border-t">
                    <button
                        class="w-full py-2 rounded-lg bg-blue-600 text-white"
                        @click="onConfirm"
                    >
                        تایید - {{ fa(draftTotal) }} مسافر
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    modelValue: { type: Number, default: 1 }, // v-model: مجموع
    initialPassengers: {
        type: Object,
        default: () => ({ bozorgh: 1, koodak: 0, nozad: 0 })
    },
    labelMode: {
        type: String,
        default: 'breakdown', // 'breakdown' | 'total'
        validator: v => ['breakdown', 'total'].includes(v)
    },
    minBozorgh: { type: Number, default: 1 }
})

const emit = defineEmits(['update:modelValue', 'update:passengers', 'confirm'])

const open = ref(false)
const root = ref(null)

// وضعیت تاییدشده (درون input نمایش داده می‌شود)
const passengers = reactive({
    bozorgh: props.initialPassengers.bozorgh ?? 1,
    koodak: props.initialPassengers.koodak ?? 0,
    nozad: props.initialPassengers.nozad ?? 0
})

// پیش‌نویس برای ویرایش داخل پاپ‌اور
const draft = reactive({ ...passengers })

watch(
    () => props.initialPassengers,
    (val) => {
        if (!val) return
        passengers.bozorgh = val.bozorgh ?? passengers.bozorgh
        passengers.koodak = val.koodak ?? passengers.koodak
        passengers.nozad = val.nozad ?? passengers.nozad
        // هم‌گام‌سازی پیش‌نویس وقتی بسته است
        if (!open.value) {
            draft.bozorgh = passengers.bozorgh
            draft.koodak = passengers.koodak
            draft.nozad = passengers.nozad
        }
    },
    { deep: true }
)

const draftTotal = computed(() => draft.bozorgh + draft.koodak + draft.nozad)
const committedTotal = computed(() => passengers.bozorgh + passengers.koodak + passengers.nozad)

const nf = new Intl.NumberFormat('fa-IR')
const fa = (n) => nf.format(n)

// لیبل برای input
const breakdownLabel = computed(() => {
    const parts = []
    if (passengers.bozorgh) parts.push(`${fa(passengers.bozorgh)} بزرگسال`)
    if (passengers.koodak) parts.push(`${fa(passengers.koodak)} کودک`)
    if (passengers.nozad) parts.push(`${fa(passengers.nozad)} نوزاد`)
    return parts.length ? parts.join('، ') : 'انتخاب مسافر'
})
const totalLabel = computed(() => `${fa(committedTotal.value)} مسافر`)
const inputLabel = computed(() => (props.labelMode === 'total' ? totalLabel.value : breakdownLabel.value))

function openPopover() {
    // کپی به پیش‌نویس
    draft.bozorgh = passengers.bozorgh
    draft.koodak = passengers.koodak
    draft.nozad = passengers.nozad
    open.value = true
}

function onCancel() {
    open.value = false
}

function onConfirm() {
    // انتقال از پیش‌نویس به وضعیت تاییدشده
    passengers.bozorgh = draft.bozorgh
    passengers.koodak = draft.koodak
    passengers.nozad = draft.nozad

    emit('update:modelValue', draftTotal.value)
    emit('update:passengers', { ...passengers })
    emit('confirm', { passengers: { ...passengers }, total: draftTotal.value })

    open.value = false
}

function inc(type) {
    if (type === 'nozad') {
        if (draft.nozad >= draft.bozorgh) return
    }
    draft[type]++
}

function dec(type) {
    if (type === 'bozorgh') {
        if (draft.bozorgh <= props.minBozorgh) return
        draft.bozorgh--
        if (draft.nozad > draft.bozorgh) draft.nozad = draft.bozorgh
        return
    }
    if (draft[type] <= 0) return
    draft[type]--
}

// بستن با کلیک بیرون
onClickOutside(root, () => {
    if (open.value) onCancel()
})
</script>