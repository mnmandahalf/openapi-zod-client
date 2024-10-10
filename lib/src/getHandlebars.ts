import type { HelperOptions } from "handlebars";
import { create } from "handlebars";

export const getHandlebars = () => {
    const instance = create();
    instance.registerHelper("ifeq", function (a: string, b: string, options: HelperOptions) {
        if (a === b) {
            // @ts-expect-error
            return options.fn(this);
        }

        // @ts-expect-error
        return options.inverse(this);
    });
    instance.registerHelper("ifNotEmptyObj", function (obj: Record<string, any>, options: HelperOptions) {
        if (typeof obj === "object" && Object.keys(obj).length > 0) {
            // @ts-expect-error
            return options.fn(this);
        }

        // @ts-expect-error
        return options.inverse(this);
    });
    instance.registerHelper("toCamelCase", function (input: string) {
        // Check if input string is already in camelCase
        if (/^[a-z][a-zA-Z0-9]*$/.test(input)) {
            return input
        }

        const words = input.split(/[\s_-]/);
        return words
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                }

                if (/^[A-Z]+$/.test(word)) {
                    word = word.toLowerCase();
                }

                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join("");
    });

    return instance;
};
