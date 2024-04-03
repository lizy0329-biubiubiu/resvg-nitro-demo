//https://nitro.unjs.io/config
export default defineNitroConfig({
    srcDir: 'server',
    routeRules: {
        '/api/**': { cors: true },
    },
});
