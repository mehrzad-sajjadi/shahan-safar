<template>
    <div class="w-[80%] absolute top-[80%] left-1/2 -translate-x-1/2 bg-white border border-black p-4 rounded-lg shadow-lg">
        <form @submit.prevent="fetchFlights">

            <div class="flex justify-center min-h-min items-center gap-2">
                <CityInput 
                    :cities="data.data"
                    placeholder="مبدا"
                    @emit:city="getOrigin"
                >
                    <Tackeoff class="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </CityInput>
                <CityInput
                    ref="destinationRef"
                    :cities="data.data"
                    placeholder="مقصد"
                    @emit:city="getDestination"
                >
                    <landing class="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </CityInput>

                <ClientOnly>
                    <DatePicker v-model="date" @change="showD" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD" />
                </ClientOnly>

                <PassengersInput @change="updatePassengers" />

                <button @click="submit" class="h-full bg-amber-400 px-4 py-2 rounded">جستجو</button>
            </div>
        </form>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from 'vue3-persian-datetime-picker';
//Components
import CityInput from './CityInput.vue';
import PassengersInput from './PassengersInput.vue';
import landing from './Icons/landing.vue';
import Tackeoff from './Icons/Tackeoff.vue';

const router = useRouter();

function search(){
    router.push("/fly-list");
}

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
    passengers: [] // اولیه خالی، در updatePassengers تنظیم می‌شه
});

// فانکشن برای به‌روزرسانی passengers بر اساس counts از PassengersInput
function updatePassengers(passengerCounts) {
    const passengers = [];
    
    // اضافه کردن بزرگسال‌ها
    for (let i = 0; i < passengerCounts.adl; i++) {
        passengers.push({ type: 'adl', ...defaultPassenger });
    }
    
    // اضافه کردن کودکان
    for (let i = 0; i < passengerCounts.chd; i++) {
        passengers.push({ type: 'chd', ...defaultPassenger });
    }
    
    // اضافه کردن نوزادها
    for (let i = 0; i < passengerCounts.inf; i++) {
        passengers.push({ type: 'inf', ...defaultPassenger });
    }
    
    body.passengers = passengers;
    console.log('Updated passengers:', body.passengers); // برای دیباگ
}

// اولیه‌سازی passengers بر اساس counts اولیه PassengersInput (1 بزرگسال)
updatePassengers({ adl: 1, chd: 0, inf: 0 });


watch(origin, (newValue) => {
    body.origin = newValue;
});
watch(destination, (newValue) => {
    body.destination = newValue;
});
watch(date, (newValue) => {
    body.date = newValue;
});

const result = ref(null);

const fetchFlights = async () => {
    result.value = null;
    try {
        const res = await $fetch('/api/flights/list', {
            method: 'POST',
            body
        });
        result.value = res;
        console.log(result.value);
    } catch (err) {
        throw new Error(err);
    }
};
</script>