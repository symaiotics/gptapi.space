<template>
    
    {{ $counter.value }}
    <button @click = "$counter.increment">Increment the count</button>
</template>

<script setup>
import { ref  } from 'vue'
 
</script>