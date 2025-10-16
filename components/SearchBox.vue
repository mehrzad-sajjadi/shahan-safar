<template>
  <div class="w-[80%] absolute top-[80%] left-1/2 -translate-x-1/2 bg-white border border-black p-4 rounded-lg shadow-lg">
    <div class="flex justify-center min-h-min items-center gap-2">
      <CityInput placeholder="مبدا">
        <Tackeoff class="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </CityInput>
      <CityInput placeholder="مقصد">
        <landing class="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </CityInput>

      <ClientOnly>
        <DatePicker />
      </ClientOnly>

      <!-- جایگزین input -->
      <PassengersInput
        v-model="passengerCount"
        name="passengers"
        label="مسافران"
      />

      <button class="h-full bg-amber-400 px-4 py-2 rounded">جستجو</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CityInput from './CityInput.vue'
import landing from './Icons/landing.vue'
import Tackeoff from './Icons/Tackeoff.vue'
import DatePicker from 'vue3-persian-datetime-picker'
import PassengersInput from './PassengersInput.vue'

const passengerCount = ref(1) // این همیشه عدد خالص است
</script>