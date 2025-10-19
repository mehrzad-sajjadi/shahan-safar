<template>
    <div class="w-[80%] absolute top-[80%] left-1/2 -translate-x-1/2 bg-white border border-black p-4 rounded-lg shadow-lg">
        <form @submit.prevent="fetchFlights">
            <div class="flex justify-center min-h-min items-start gap-4">

                <!-- مبدا -->
                <div class="flex flex-col w-64">
                    <CityInput 
                        :cities="data.data"
                        placeholder="مبدا"
                        @emit:city="getOrigin"
                    >
                        <Tackeoff class="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </CityInput>
                    <p v-if="errors.origin" class="text-red-500 text-xs mt-1">پر کردن این فیلد اجباری است</p>
                </div>

                <!-- مقصد -->
                <div class="flex flex-col w-64">
                    <CityInput
                        ref="destinationRef"
                        :cities="data.data"
                        placeholder="مقصد"
                        @emit:city="getDestination"
                    >
                        <landing class="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </CityInput>
                    <p v-if="errors.destination" class="text-red-500 text-xs mt-1">پر کردن این فیلد اجباری است</p>
                </div>

                <!-- تاریخ -->
                <div class="flex flex-col w-64">
                    <ClientOnly>
                        <DatePicker
                            v-model="date"
                            @change="showD"
                            format="YYYY-MM-DD"
                            display-format="jYYYY-jMM-jDD"
                        />
                    </ClientOnly>
                    <p v-if="errors.date" class="text-red-500 text-xs mt-1">پر کردن این فیلد اجباری است</p>
                </div>

                <!-- مسافران (بدون ارور اجباری) -->
                <PassengersInput @change="updatePassengers" />

                <button type="submit" class="cursor-pointer h-full bg-amber-400 px-4 py-2 rounded">جستجو</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from 'vue3-persian-datetime-picker';
import { useFlightsStore } from '~/stores/flights'; 

import CityInput from './CityInput.vue';
import PassengersInput from './PassengersInput.vue';
import landing from './Icons/landing.vue';
import Tackeoff from './Icons/Tackeoff.vue';

const router = useRouter();

const { data } = await useFetch('/api/cities');

const origin = ref('');
const destination = ref('');
const destinationRef = ref(null);
const date = ref('');

function getOrigin(e) {
    origin.value = e;
    check();
}

function getDestination(e) {
    destination.value = e;
    check();
}

function check() {
    if (origin.value === destination.value) {
        destination.value = '';
        destinationRef.value?.clear();
    }
}

const defaultPassenger = {
    name: '',
    family: '',
    fa_name: '',
    fa_family: '',
    gender: 1,
    nid: '',
    passport_number: '',
    birthday: '',
    nationality: 'IRN',
    passport_nationality: '',
    passport_expire: ''
};

const body = reactive({
    origin: "",
    destination: "",
    date: "",
    return_date: '',
    passengers: [] 
});

function updatePassengers(passengerCounts) {
    const passengers = [];
    for (let i = 0; i < passengerCounts.adl; i++) {
        passengers.push({ type: 'adl', ...defaultPassenger });
    }
    for (let i = 0; i < passengerCounts.chd; i++) {
        passengers.push({ type: 'chd', ...defaultPassenger });
    }
    for (let i = 0; i < passengerCounts.inf; i++) {
        passengers.push({ type: 'inf', ...defaultPassenger });
    }
    body.passengers = passengers;
}

updatePassengers({ adl: 1, chd: 0, inf: 0 });

watch(origin, (newValue) => {
    body.origin = newValue;
    if (newValue) errors.origin = '';
});
watch(destination, (newValue) => {
    body.destination = newValue;
    if (newValue) errors.destination = '';
});
watch(date, (newValue) => {
    body.date = newValue;
    if (newValue) errors.date = '';
});

const flightsStore = useFlightsStore();
const result = ref(null);

// State خطاها
const errors = reactive({
    origin: '',
    destination: '',
    date: ''
});

function validate() {
    errors.origin = origin.value ? '' : 'required';
    errors.destination = destination.value ? '' : 'required';
    errors.date = date.value ? '' : 'required';
    return !errors.origin && !errors.destination && !errors.date;
}

const fetchFlights = async () => {
    result.value = null;

    // اگر اعتبارسنجی رد شد، API صدا نزن
    if (!validate()) return;

    try {
        const res = await $fetch('/api/flights/list', {
            method: 'POST',
            body
        });
        result.value = res;
        flightsStore.setFlights(res.data);
        router.push('/fly-list'); 
    } catch (err) {
        throw new Error(err);
    }
};
</script>