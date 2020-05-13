module.exports = {
    plugins: [
        require('postcss-import'),
        require('precss'),
        require('postcss-mixins'),
        require('postcss-preset-env'),
        require('cssnano'),
    ],
};
