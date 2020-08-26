const path = require('path')

module.exports = {
    root: 'demo',
    outDir: 'demo_dist',
    alias: {
        '/@/': path.resolve(__dirname, 'src'),
    },
    optimizeDeps: {
    },
}
