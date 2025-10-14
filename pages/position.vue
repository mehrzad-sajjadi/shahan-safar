<template>
    <div class="main">
        <div class="box1">
        </div>
        <div class="box2">
        </div>
    </div>

</template>
<style scoped>
.main{
    display: flex;
    flex-direction: column;
}
.box1{
    width: 400px;
    height: 200px;
    background-color: blue;
    position: absolute;
}
.box2{
    width: 200px;
    height: 200px;
    background-color: rgb(132, 255, 0);
    position: relative;
    top: 150px;
}

</style>