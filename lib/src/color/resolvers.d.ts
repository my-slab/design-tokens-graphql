declare type Pairs = {
    [key: string]: string;
};
declare const units: {
    readonly hex: "hex";
    readonly hsl: "hsl";
    readonly rgb: "rgb";
    readonly rgba: "rgba";
};
declare type Units = keyof typeof units;
export declare function ColorResolvers(tokens: Pairs): {
    color(o: any, { name, unit }: {
        name: string;
        unit: Units;
    }): {
        name: string;
        value: string;
    };
};
export {};
