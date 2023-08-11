<template>
    <h2>Welcome to GPTAPI.Space, a simple tool to call the OpenAI API</h2>

    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model </label>
    <select v-model = "model"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select your OpenAI Model">
        <option value="gpt-4">gpt-4</option>
        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
    </select>

    <!-- <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your API Key </label>
    <textarea v-model="apiKey" id="message" rows="1"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your API Key"></textarea> -->

    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Temperature</label>
    <textarea v-model="temperature" id="message" rows="1"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your temperature"></textarea>

    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Prompt</label>
    <textarea v-model="userPrompt" id="message" rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your user prompt goes here..."></textarea>

    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your System Prompt </label>
    <textarea v-model="systemPrompt" id="message" rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your system prompt goes here..."></textarea>

    <button @click="postPrompt" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Run Prompt
    </button>

    <br/>
    <h2 v-if = "loading">Loading your results, please wait...</h2>
    <br/>
    <h2>Your Results</h2>
    <br/>
    <div v-if="promptResults" v-html = "promptResults"> </div>
</template>

<script setup>
import { ref } from 'vue';

let promptResults = ref(null)

let loading = ref(false)
let model = ref('gpt-4')
let apiKey = ref('')
let temperature = ref(0.5)
let userPrompt = ref('I need help editing the following text: ')
let systemPrompt = ref('You are a professional editor, helping to make text more clear and comprehensive')

function postPrompt() {

    loading.value = true;
    var params = {
        model: model.value,
        apiKey: apiKey.value,
        temperature: temperature.value,
        userPrompt: userPrompt.value,
        systemPrompt: systemPrompt.value,
    }
    axios.post('/prompts', params).then((response) => {
        loading.value = false;
        console.log("response.data.payload;", response.data.payload)
        if(response?.data?.payload?.response)
        {
        promptResults.value = response.data.payload.response[0].message.content;
        promptResults.value = promptResults.value.replaceAll('\n','<br/>')
        }

    }).catch((error) => {
         loading.value = false;
        console.log(error)
    });
}

</script>
