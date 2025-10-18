<template>
  <div>
    <h1>لیست پروازها</h1>
    <div v-for="flight in flightsStore.getFlights" :key="flight.flight_key">
      <p>{{ flight.flights.trip.airline.fa_name }} - {{ flight.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { useFlightsStore } from '~/stores/flights';

const flightsStore = useFlightsStore();

console.log(flightsStore);
</script>