<template>
    <div class="bg-white">
        <div v-for="(flightsStore,index) in flightsStores"
            class=" flex justify-center"
        >
            <FlyCard
                :key="index"
                :price="flightsStore.flights.trip.price"
                :airline="flightsStore.flights.trip.airline"
                :cabin_type="flightsStore.flights.trip.cabin_type"
                :destination="flightsStore.flights.trip.destination"
                :origin="flightsStore.flights.trip.origin"
                :arrive_time="flightsStore.flights.trip.arrive_time"
                :time="flightsStore.flights.trip.time"
                :plane_name="flightsStore.flights.trip.plane_name"
                :capacity="flightsStore.flights.trip.capacity"
                :type="flightsStore.flights.trip.type"
                :flight_number="flightsStore.flights.trip.flight_number"
                :price_details="flightsStore.flights.trip.price_details"
            />
        </div>

    </div>
</template>


<script setup>
import { useFlightsStore } from '~/stores/flights';
import FlyCard from '../components/FlyCard.vue'

const flightsStores = useFlightsStore().flights;
console.log(flightsStores);
</script>