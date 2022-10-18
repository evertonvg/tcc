<template>
    <div v-show="$store.state.loading==true"
        class="fixed w-screen h-screen bg-lightblue top-0 left-0 flex items-center justify-center z-50">
        <img src="@/assets/img/icon.png" class="animate-pulse" />
    </div>
</template>
<script>
export default {
    
}
</script>