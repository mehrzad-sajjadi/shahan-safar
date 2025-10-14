<template>
    <div class="z-10 bg-blue-500 flex justify-center">
        <CityInput placeholder="مبدا" >
            <Tackeoff class="absolute  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </CityInput>
        <button class="bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-600">
            ↔
        </button>
        <CityInput placeholder="مقصد" >
            <landing class="absolute  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </CityInput>
    </div>
</template>

<script setup>
import CityInput from './CityInput.vue';
import landing from './Icons/landing.vue';
import Tackeoff from './Icons/Tackeoff.vue';

</script>