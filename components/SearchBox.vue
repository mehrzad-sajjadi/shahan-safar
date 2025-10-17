<template>
    <div class="w-[80%] absolute top-[80%] left-1/2 -translate-x-1/2 bg-white border border-black p-4 rounded-lg shadow-lg">
        <form action="">

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
                    <DatePicker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD" />
                </ClientOnly>

                <!-- جایگزین input -->
                <PassengersInput
                    v-model="passengerCount"
                />

                <button @click="execute" class="h-full bg-amber-400 px-4 py-2 rounded">جستجو</button>
            </div>
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityInput from './CityInput.vue';
import landing from './Icons/landing.vue';
import Tackeoff from './Icons/Tackeoff.vue';
import DatePicker from 'vue3-persian-datetime-picker';
import PassengersInput from './PassengersInput.vue';

const passengerCount = ref(1);
const router = useRouter();

function search(){
    router.push("/fly-list");
}

const { data } = await useFetch('/api/cities');

const origin = ref('');
const destination = ref('');
const destinationRef = ref(null);

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

const playLoad = {
    "origin": "THR",
    "destination": "MHD",
    "date": "2025-10-23",
    "return_date": "",
    "passengers": [
        {
            "type": "adl",
            "name": "",
            "family": "",
            "fa_name": "",
            "fa_family": "",
            "gender": 1,
            "nid": "",
            "passport_number": "",
            "birthday": "",
            "nationality": "IRN",
            "passport_nationality": "",
            "passport_expire": ""
        },
        {
            "type": "adl",
            "name": "",
            "family": "",
            "fa_name": "",
            "fa_family": "",
            "gender": 1,
            "nid": "",
            "passport_number": "",
            "birthday": "",
            "nationality": "IRN",
            "passport_nationality": "",
            "passport_expire": ""
        },
        {
            "type": "inf",
            "name": "",
            "family": "",
            "fa_name": "",
            "fa_family": "",
            "gender": 1,
            "nid": "",
            "passport_number": "",
            "birthday": "",
            "nationality": "IRN",
            "passport_nationality": "",
            "passport_expire": ""
        }
    ]
};

const { execute } = useFetch("https://marcopro.co/api/flights/list",{
    method:"POST",
    body:playLoad,
    server:false,
    immediate: false
})
</script>
