<template>
    <div class="w-[1000px]  border rounded-xl min-h-[150px] flex flex-row my-3 ">
        <!-- logo -->
        <div class=" w-[15%] flex justify-center items-center flex-col ">
            <FlyLogo />
            <p>{{ airline.fa_name }}</p>
        </div>
        <!-- main -->
        <div class="grow-1 h-full flex flex-col justify-between ">
            <div class="flex-1 flex flex-row py-2 items-center justify-center "> 
                <div class="flex justify-between grow-1 items-center ">
                    <p class="flex flex-col">
                        <span>{{ time }}</span>
                        <span>{{ origin.fa_name }}</span>
                    </p>
                    <p class="flex flex-col ">
                        <span>{{ arrive_time }}</span>
                        <span>{{ destination.fa_name }}</span>
                    </p>
                </div>
                <div class="w-[20%] flex justify-end">
                    <div class="flex flex-col text-sm text-gray-500">
                        <p>{{cabin_type.fa_cabin}}</p>
                        <p>{{type.fa_name}}</p>
                        <p>{{plane_name}}</p>
                    </div>
                </div>
            </div>
            <hr class="border-gray-300 my-1 flex-shrink-0"> <!-- flex-shrink-0 اضافه کردم تا hr فشرده نشه -->
            
            <div class="flex text-blue-500 h-[25%] text-sm gap-3   items-center"> <!-- justify-center و items-center برای وسط‌چین کردن لینک‌ها -->
                <button @click="()=>open=true">اطلاعات پرواز</button>
            </div>
        </div>
        <hr>
        <!-- button -->
        <div class=" w-[20%] flex justify-center items-center flex-col gap-2">
            <p>
                <span class="font-bold text-blue-700 text-xl">{{ price }}</span>
                تومان
            </p>
            <button class="bg-blue-500 text-white rounded-md px-6 py-1">انتخاب پرواز</button>
            <p class="text-sm text-red-400 py-1 ">
                {{capacity}}
                صندلی باقی مانده
            </p>

        </div>
    </div>
    <Teleport to="body">
        <Modal v-if="open" @closeModal="open=false">
            <template #fly-info>
                <div class="flex flex-col font-bold grow h-full px-2">
                    <div class="text-lg mb-4">پرواز رفت : 
                        {{origin.fa_name}}
                        به 
                        {{destination.fa_name}}
                    </div>
                    <div class="flex flex-row items-center justify-between py-5 mb-4">
                        <div class="text-xl flex items-center">
                            <FlyLogo class="w-[50px]" />
                            <span class="px-3">{{airline.fa_name}}</span>
                        </div>
                        <div>1 ساعت و 30 دقیقه</div>
                    </div>
                    <div class="mb-4">
                        <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <FlightInfo
                                v-for="(item, index) in flightInfo"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            />
                        </div>
                    </div>
                
                </div>
            </template>  
            <template #price-info>
                <div class="flex border-r-1 flex-col justify-between items-end w-[35%] h-full">
                    <div class="w-full">
                        <div class="text-sm">
                            <p class="flex flex-row  justify-between p-3 mb-1">
                                <span class="">بزرگسال 2X</span>
                                <span class="">۳٬۴۷۷٬۸۶۰ تومان</span>
                            </p>
                            <p class="flex flex-row  justify-between p-3 mb-1">
                                <span class="">کودک 1X</span>
                                <span class="">۳٬۴۷۷٬۸۶۰ تومان</span>
                            </p>
                            <p class="flex flex-row  justify-between p-3">
                                <span class="">نوزاد 1X</span>
                                <span class="">۳٬۴۷۷٬۸۶۰ تومان</span>
                            </p>
                        </div>
                        <p class="flex flex-row  text-md font-bold justify-between p-3">
                            <span class="">مجموع</span>
                            <span class="">۳٬۴۷۷٬۸۶۰ تومان</span>
                        </p>
                    </div>
                    <div class="mt-auto w-full  p-3">
                        <button
                            class="w-full bg-blue-500 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 transition-colors"
                        >
                            خرید بلیط
                        </button>
                    </div>
                </div>

            </template>  
        </Modal>
    </Teleport>


</template>

<script setup>
import FlightInfo from './FlightInfo.vue';
import FlyLogo from './Icons/FlyLogo.vue';
import Modal from '~/components/Modal.vue';


const props = defineProps({
    price: { type: Number}, 
    airline: { type: Object},
    cabin_type: { type: Object},//اکونومی
    destination: { type: Object },
    origin: { type: Object},
    arrive_time: { type: String},//زمان فرود
    time: { type: String},//زمان پرواز
    capacity:{type:Number},//ظرفیت
    type:{type:Object},//چارتری
    plane_name:{type:String}//M82
});



const flightInfo = [
    { label: 'شماره پرواز', value: props.airline.id },
    { label: 'نوع بلیط', value: props.type.fa_name },
    { label: 'شماره ترمینال', value: '-' },
    { label: 'مقدار بار مجاز', value: "20کیلو" },
    { label: 'نوع پرواز', value: props.cabin_type.fa_cabin },
    { label: 'هواپیما', value: props.plane_name }
]


const open = ref(false);
console.log("dsdjksahdksa");
</script>