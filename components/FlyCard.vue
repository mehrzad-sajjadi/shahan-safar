
<template>
    <div class="w-[1000px]  border rounded-xl min-h-[150px] flex flex-row my-3 ">
        <!-- logo -->
        <div class=" w-[15%] flex justify-center items-center flex-col ">
            <FlyLogo />
            <p>{{ airline_name }}</p>
        </div>
        <!-- main -->
        <div class="grow-1 h-full flex flex-col justify-between ">
            <div class="flex-1 flex flex-row py-2 items-center justify-center "> 
                <div class="flex justify-between grow-1 items-center ">
                    <p class="flex flex-col">
                        <span>{{ fly_time }}</span>
                        <span>{{ origin }}</span>
                    </p>
                    <p class="flex flex-col ">
                        <span>{{ arrive_time }}</span>
                        <span>{{ destination }}</span>
                    </p>
                </div>
                <div class="w-[20%] flex justify-end">
                    <div class="flex flex-col text-sm text-gray-500">
                        <p>{{cabin_type}}</p>
                        <p>{{type}}</p>
                        <p>{{plane_name}}</p>
                    </div>
                </div>
            </div>
            <hr class="border-gray-300 my-1 flex-shrink-0"> <!-- flex-shrink-0 اضافه کردم تا hr فشرده نشه -->
            
            <div class="flex text-blue-500 h-[25%] text-sm gap-3   items-center"> <!-- justify-center و items-center برای وسط‌چین کردن لینک‌ها -->
                <a href="" class="hover:underline">اطلاعات پرواز</a>
                <a href="" class="hover:underline">قوانین استرداد</a>
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
        <Modal>
            
        </Modal>
    </Teleport>

</template>

<script setup>
import FlyLogo from './Icons/FlyLogo.vue';
import Modal from './Modal.vue';

const props = defineProps({
    price: { type: Number, default: 0 }, 
    airline_name: { type: String, default: 'نامشخص' },
    cabin_type: { type: String, default: 'اکونومی' },
    destination: { type: String, default: 'نامشخص' },
    origin: { type: String, default: 'نامشخص' },
    arrive_time: { type: String, default: 'N/A' },
    plane_name: { type: String, default: 'نامشخص' },
    fly_time: { type: String, default: 'N/A' },
    capacity:{type:Number},
    type:{type:String}
});

console.log("dsdjksahdksa");
</script>