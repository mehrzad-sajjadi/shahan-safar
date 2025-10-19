import { defineStore } from "pinia";
import { reactive } from "vue";

export const usePassengerStore = defineStore("passengerStore",()=>{
    const passInfo = reactive({
        start:"",
        end:"",
        date:"",
        nums:45646
    });


    function updateData(newData){
        Object.assign(passInfo,newData)
    }
    return{
        passInfo,
        updateData
    }
})