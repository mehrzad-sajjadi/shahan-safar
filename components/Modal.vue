<template> 
    <div
        class="fixed top-0 right-0 left-0 bottom-0 bg-[#49445206] p-10 content-center"
    >
        <div 
            ref="checkOut" 
            class="rounded-md m-auto max-h-max my-20 text-[#014329] bg-white w-[900px] h-[600px] px-3"
        >
            <div class="flex flex-row ">
                <XMarkIcon
                    @click="emit('closeModal')"
                    as="button"
                    type="button"
                    class="size-5 cursor-pointer my-2"
                />
                <h2
                    class="font-semibold text-xl m-2"
                >
                    <slot name="header_title"></slot>
                </h2>
            </div>
            <hr class="text-[#7E848E]">
            <div class="flex justify-center py-4 ">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { onClickOutside, useScrollLock } from "@vueuse/core";
    import { XMarkIcon } from "@heroicons/vue/24/solid";

    const props = defineProps({
        open: { type: Boolean, default: true },
        tabs: { type: Array, default: () => ["اطلاعات پرواز", "قوانین و استرداد", "اطلاعات مسافر"] },
        tabIndex: { type: Number, default: 0 }
    });

    const emit = defineEmits(["closeModal", "update:tab"]);

    const panel = ref(null);
    onClickOutside(panel, () => emit("closeModal"));

    // قفل کردن اسکرول صفحه وقتی مودال بازه
    const locked = useScrollLock(document.body);
    watch(() => props.open, v => (locked.value = v), { immediate: true });
</script>

<style scoped>

</style>