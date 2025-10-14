<template>
    <div class="relative bg-white flex-1 rounded-lg border border-gray-300 shadow-sm">
        <slot></slot>
        <input 
            type="text" 
            class="w-full pr-10 py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup>
import Tackeoff from './Icons/Tackeoff.vue';

defineProps({
    placeholder: { type: String, default: 'نام شهر را وارد کنید...' }
});
</script>