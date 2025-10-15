<template>
    <div
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        dir="rtl"
    >
        <div class="w-full max-w-md bg-white text-black rounded-2xl shadow-xl overflow-hidden">
            <div class="p-4 sm:p-6 space-y-4">

                <!-- Rows -->
                <div class="space-y-3">

                    <!-- Adult -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">بزرگسال</div>
                            <div class="text-sm text-slate-400">(۱۲ سال به بالا)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                @click="decrease('bozorgh')"
                                :disabled="pasengerNums.bozorgh==1"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ pasengerNums.bozorgh }}</span>
                            <button
                                @click="increase('bozorgh')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >+</button>
                        </div>
                    </div>

                    <!-- Child -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">کودک</div>
                            <div class="text-sm text-slate-400">(۲ تا ۱۲ سال)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                @click="decrease('koodak')"
                                :disabled="pasengerNums.koodak==0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>
                            <span class="w-8 text-center font-medium text-slate-800">{{ pasengerNums.koodak }}</span>
                            <button
                                @click="increase('koodak')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >+</button>
                        </div>
                    </div>

                    <!-- Infant -->
                    <div class="flex items-center justify-between">
                        <div class="text-right">
                            <div class="font-medium text-slate-800">نوزاد</div>
                            <div class="text-sm text-slate-400">(۱۰ روز تا ۲ سال)</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                @click="increase('nozad')"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >+</button>
                            <span class="w-8 text-center font-medium text-slate-800">
                                {{ pasengerNums.nozad }}
                            </span>
                        
                            <button
                                @click="decrease('nozad')"
                                :disabled="pasengerNums.nozad==0"
                                class="h-9 w-9 grid place-items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >-</button>

                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="border-t border-slate-200 pt-4">
                    <button
                        class="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        تایید - {{ sum }} مسافر
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const pasengerNums = reactive({
  bozorgh: 1,
  koodak: 0,
  nozad: 0,
});

function increase(type) {
  pasengerNums[type]++;
}
function decrease(type) {
  if (pasengerNums[type] > 0) pasengerNums[type]--;
}

const sum = computed(() => {
  return pasengerNums.bozorgh + pasengerNums.koodak + pasengerNums.nozad;
});
</script>
