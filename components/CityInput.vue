<template>
    <div class="relative bg-white flex-1 rounded-md min-h-min">
        <slot></slot>
        <select
            class="w-full pr-10 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            v-model="cityName"
            @change="selectValue"
        >
            <!-- placeholder واقعی برای select -->
            <option value="" disabled>
                {{ placeholder || 'انتخاب شهر' }}
            </option>

            <option v-for="(city, index) in cities" :key="index" :value="city.code">
                {{ city.fa }} - {{ city.code }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const props = defineProps({
    placeholder: { type: String },
    cities: { type: Array, default: () => [] } 
});
const emit = defineEmits(['emit:city']);

const cityName = ref('');

function selectValue() {
    emit('emit:city', cityName.value);
}

function clear() {
  cityName.value = '';
}

defineExpose({ clear });

</script>