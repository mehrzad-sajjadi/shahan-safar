<template>
    <div class="w-[200px]">
        <input 
            @focus="showPopup" 
            type="text" 
            v-model="h" 
            class="bg-yellow-300"
        >

        <div v-if="popup" class="bg-blue-500 mt-2 p-2">
            <input 
                ref="secondInput"
                type="text" 
                v-model="h"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'

const h = ref('')
const popup = ref(false)
const secondInput = ref(null)

function showPopup() {
    popup.value = true
    // بعد از اینکه popup ظاهر شد، فوکوس رو روی input دوم بذار
    nextTick(() => {
        if(secondInput.value){
            secondInput.value.focus();
        }
    })
}

onClickOutside(secondInput,()=>{
    popup.value = false ;
})
</script>
