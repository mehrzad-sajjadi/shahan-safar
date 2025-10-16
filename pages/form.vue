<template>
    <form 
        @submit.prevent="sendData"
        class="bg-blue-400 border border-balck p-10"
    >
        <input v-model="info.start" type="text" class="bg-amber-300 border-2" placeholder="مبدا">
        <input v-model="info.end" type="text" class="bg-amber-300 border-2" placeholder="مقصد">
        <ClientOnly>
            <DatePicker v-model="info.date" />
        </ClientOnly>
        <input  v-model="info.nums" type="number"  class="bg-amber-300 border-2" placeholder="تعداد" />
        <button type="submit" class="bg-white p-10">تایید</button>
    </form>
</template>
<script setup>
import { reactive } from 'vue';
import DatePicker from 'vue3-persian-datetime-picker';
import { usePassengerStore } from '~/stores/PassengerStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const pinia = usePassengerStore();

console.log(pinia.passInfo.nums);

const info = reactive({
    start:"",
    end:"" ,
    date:"",
    nums:0
});

function sendData(){
    pinia.updateData({
        start : info.start ,
        end: info.end,
        date: info.date,
        nums: info.nums
    })
    router.push("/");
}

</script>