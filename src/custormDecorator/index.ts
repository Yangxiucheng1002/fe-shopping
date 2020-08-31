import { get } from 'lodash';
import { createDecorator } from 'vue-class-component';

export function MapState(path: string) {
    return createDecorator((options, key, a) => {
        if (!options.computed) options.computed = {};
        options.computed[key] = function() {
            const temp = (this.$store as any).state;
            return get(temp, path, '');
        };
    });
}

export function MapGetter(path: string) {
    return createDecorator((options, key, a) => {
        if (!options.computed) options.computed = {};

        options.computed[key] = function() {
            const temp = (this.$store as any).getters;
            return get(temp, path, '');
        };
    });
}
