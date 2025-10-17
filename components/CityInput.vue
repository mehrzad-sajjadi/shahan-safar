<template>
    <div class="relative bg-white flex-1 rounded-md min-h-min">
        <slot></slot>
        <select 
            type="text" 
            class="w-full pr-10 py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            :placeholder="placeholder"
        >
            <option v-for="(city,index) in cities" :key="index">
                {{city.fa}} - {{ city.code }}
            </option>
        </select>

    </div>
</template>

<script setup>
const props = defineProps(
    {
        placeholder: { type: String },
        cities:{type:Object}
    }
    
);
console.log(props.cities);

</script>