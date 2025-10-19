<template>
    <div class="">
        <div v-for="(flightsStore,index) in flightsStores"
            class=" flex justify-center"
        >
            <FlyCard
                :key="index"
                :price="flightsStore.flights.trip.price"
                :airline_name="flightsStore.flights.trip.airline.fa_name"
                :cabin_type="flightsStore.flights.trip.cabin_type.fa_cabin"
                :destination="flightsStore.flights.trip.destination.fa_name"
                :origin="flightsStore.flights.trip.origin.fa_name"
                :arrive_time="flightsStore.flights.trip.arrive_time"
                :plane_name="flightsStore.flights.trip.plane_name"
                :fly_time="flightsStore.flights.trip.time"
                :capacity="flightsStore.flights.trip.capacity"
                :type="flightsStore.flights.trip.type.fa_name"
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