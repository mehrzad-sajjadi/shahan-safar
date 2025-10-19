import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSearchStore = defineStore('search', () => {
    const passengers = ref([]); 
    
    const passengerCounts = computed(() => {
        return passengers.value.reduce((acc, p) => {
        if (p.type === 'adl') acc.adl += 1;
        else if (p.type === 'chd') acc.chd += 1;
        else if (p.type === 'inf') acc.inf += 1;
        return acc;
        }, { adl: 0, chd: 0, inf: 0 });
    });

    function setPassengers(list) {
        passengers.value = Array.isArray(list) ? list : [];
    }

    return { passengers, passengerCounts, setPassengers };
});