declare const units: {
    readonly hex: "hex";
    readonly hsl: "hsl";
    readonly rgb: "rgb";
    readonly rgba: "rgba";
};
declare type Units = keyof typeof units;
export declare function toColorUnit(unit: Units, value: string): string;
export {};
