export default {
    default: {
        paths: ['features/**/*.feature'],
        require: ['features/step_definitions/**/*.mjs'],
        requireModule: ['node:esm']
    }
};
