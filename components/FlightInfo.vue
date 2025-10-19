<template>
    <div class="w-full border border-[#CBCBCB] rounded-lg flex flex-col gap-1.5 justify-center items-center p-4 text-[#333333]">
        <span class="text-sm tracking-tight font-medium">{{ label }}</span>
        <span class="text-sm tracking-tight font-medium">{{ value }}</span>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})
</script>