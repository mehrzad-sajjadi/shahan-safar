import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFlightsStore = defineStore('flights', () => {
    const flights = ref([]);

    function setFlights(data) {
        flights.value = data ;
    }

    function clearFlights() {
        flights.value = [];
    }

    return { flights, setFlights, clearFlights };
});