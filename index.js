const mix = require('laravel-mix');
var CompressionPlugin = require('compression-webpack-plugin');

class LaravelMixGzip {
    /**
     * The optional name to be used when called by Mix.
     * Defaults to the class name, lowercased.
     *
     * Ex: mix.example();
     *
     * @return {String|Array}
     */
    name() {
        return ['gzip'];
    }

    /**
     * All dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['compression-webpack-plugin'];
    }

    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * Ex: register(src, output) {}
     * Ex: mix.yourPlugin('src/path', 'output/path');
     *
     * @param  {*} ...params
     * @return {void}
     *
     */
    register(options = {}) {
        this.options = Object.assign(
            {
                filename: '[path].gz[query]',
                test: /\.(js|css|html|svg)$/,
                algorithm: 'gzip',
                minRatio: 0.8,
                threshold: 8192
            },
            options
        );
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has executed.
     */
    boot() {

    }

    /**
     * Plugins to be merged with the master webpack config.
     *
     * @return {Array|Object}
     */
    webpackPlugins() {
        return new CompressionPlugin(this.options);
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param  {Object} webpackConfig
     * @return {void}
     */
    webpackConfig(webpackConfig) {
        // Example:
        // webpackConfig.resolve.extensions.push('.ts', '.tsx');
    }
}

mix.extend(['gzip'], new LaravelMixGzip());