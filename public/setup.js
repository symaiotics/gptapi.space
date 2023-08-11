
const options = {
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {

        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {

        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
}

const { loadModule } = window['vue3-sfc-loader'];

const app = Vue.createApp({


    components: {
        'prompt': Vue.defineAsyncComponent(() => loadModule('./components/Prompt.vue', options)),
        'page-layout': Vue.defineAsyncComponent(() => loadModule('./components/PageLayout.vue', options)),
        'my-component': Vue.defineAsyncComponent(() => loadModule('./components/MyComponent.vue', options)),
        'hello-world': Vue.defineAsyncComponent(() => loadModule('./components/HelloWorld.vue', options))
    },

    data() {
        return {
            mainVar: 'mainVar'
        }
    },

    methods: {
        test() {
            console.log(this.mainVar)
        }
    },

    template:
        `
        <page-layout>
    <prompt/>

        </page-layout>

        `
});

app.use({
    install(app) {

        //Define some global reactive variables
        const counter = Vue.ref(1)
        const prmoptResults = Vue.ref(null)
        app.config.globalProperties.$counter = {
            value: counter,
            increment() { counter.value++ }
        };

        app.config.globalProperties.$promptResults = {
            value: prmoptResults
        };


    }
})

function test() {
    console.log("Test")
}
