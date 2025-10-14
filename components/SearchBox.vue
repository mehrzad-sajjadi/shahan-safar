<template>
    <div class="bg-blue-500 w-[60%] z-10">
        adsnlasnd
    </div>
</template>

<script setup>
import { ref } from 'vue'
import PersianDateTimePicker from 'vue3-persian-datetime-picker'
import CityPicker from './CityInput.vue'

const origin = ref('')
const destination = ref('')
const flightDates = ref({ start: null, end: null })

const searchFlights = () => {
  if (origin.value && destination.value && flightDates.value.start && flightDates.value.end) {
    console.log('جستجو:', {
      origin: origin.value,
      destination: destination.value,
      dates: flightDates.value
    })
    // اینجا API کال برای گرفتن پروازها
  } else {
    alert('لطفاً تمام فیلدها را پر کنید')
  }
}
</script>

