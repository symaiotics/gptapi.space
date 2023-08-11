<template>
    {{ $counter.value }}
    <button @click = "$counter.increment">Increment the count</button>

    Some items in the slot
    <slot>


    </slot>
</template>

<script setup>
import { ref } from 'vue'
 
</script>