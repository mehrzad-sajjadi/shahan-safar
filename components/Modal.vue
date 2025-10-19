<template>
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <!-- BOX -->
        <div
            ref="panel"
            class="bg-white rounded-2xl w-[900px] h-[75vh] overflow-hidden shadow-xl border border-gray-200 flex flex-col"
        >
            <div class="p-6 text-gray-700 text-sm flex justify-between flex-1">
                <slot name="fly-info"></slot>
                <slot name="price-info"></slot>                
            </div>
        </div>        
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['closeModal']);

const props = defineProps({
    airline_name: { type: String, default: 'نامشخص' },
    airline_code: { type: String, default: '' },
    flight_number: { type: [String, Number], default: '' },
    origin: { type: String, default: '' },
    destination: { type: String, default: '' },
    date: { type: String, default: '' },
    fly_time: { type: String, default: '' },
    arrive_time: { type: String, default: '' },
    cabin_type: { type: String, default: '' },
    type: { type: String, default: '' },
    plane_name: { type: String, default: '' },
    allowed_baggage: { type: Object, default: () => ({}) },
    price_breakdown: {
        type: Object,
        default: () => ({
        adl: { count: 0, unit: 0, sum: 0 },
        chd: { count: 0, unit: 0, sum: 0 },
        inf: { count: 0, unit: 0, sum: 0 },
        })
    },
    price: { type: Number, default: 0 },
});

const panel = ref(null);
onClickOutside(panel, () => emit('closeModal'));

</script>
