<template>
    <div class="flex flex-col items-center justify-center">
        <div class="relative">
            <div class="w-full h-[28rem] flex flex-col justify-center items-center relative p-10 overflow-hidden">
                <div class="rounded-[30px] h-full flex overflow-hidden object-cover relative">
                    <div class="w-full flex flex-col justify-start items-start absolute top-1/2 -translate-y-1/2 right-10">
                        <h1 class="text-white font-extrabold text-[1.3rem] tracking-tighter">
                            مارکوپرو ، مرکز رزرواسیون خدمات گردشگری ؛ هتل ، پرواز و تور
                        </h1>
                        <h2 class="text-white text-[1rem] text-justify font-normal tracking-tight">
                            بهترین قیمت ها با تنوع در ارائه خدمات گردشگری
                        </h2>
                    </div>
                    <img
                        src="../public/imgs/home-banner.jpg"
                        alt="مارکوپرو"
                        class="object-cover rounded-[1.2rem] w-full h-full"
                    />
                </div>
            </div>

            <div class="w-[80%] absolute top-[80%] left-1/2 -translate-x-1/2 bg-red-500 p-4 rounded-lg shadow-lg">
                <SearchBox />
            </div>
        </div>
    </div>
</template>

<script setup>
    // Components
    import SearchBox from '~/components/SearchBox.vue';
</script>
