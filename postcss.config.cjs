module.exports = {
    plugins: {
        'postcss-em-media-query': {
            precision: 5,
        },
        'postcss-pxtorem': {
            rootValue: 16, // The root font size (16px is common)
            unitPrecision: 5, // The number of decimal places to round the REM values
            propList: [
                'margin',
                'margin-top',
                'margin-left',
                'margin-right',
                'margin-bottom',
                'padding',
                'padding-top',
                'padding-left',
                'padding-right',
                'padding-bottom',
                'width',
                'height',
                'font-size',
            ], // The properties that should be converted to REM units
            selectorBlackList: [ /* List of selectors to exclude */
                'line-height',
                'border',
                'border-top',
                'border-left',
                'border-right',
                'border-bottom',
                'outline',
                'outline-top',
                'outline-bottom',
                'outline-right',
                'outline-left',
                'border-radius',
                'border-top-left-radius',
                'border-top-right-radius',
                'border-bottom-left-radius',
                'border-bottom-right-radius',
                'box-shadow',
                'text-shadow',
                'box-sizing'
            ],
            replace: true, // Replace pixel values with REM values
            mediaQuery: false, // Allow REM conversion in media queries
            minPixelValue: 0, // Set the minimum pixel value to replace
        }
    }
};

//postcss style.css -o processed-style.css