declare type Color = {
    $type: 'color';
    $value: string;
};
declare type Dimension = {
    $type: 'dimension';
    $value: string;
};
declare type Tokens = {
    [key: string]: Color | Dimension;
};
/**
 * @name
 * defineTypes
 *
 * @example
 * defineTypes({
 *   black: { $type: 'color', $value: '#fff' },
 *   white: { $type: 'color', $value: '#000' },
 *   medium: { $type: 'dimension', $value: '16px' },
 * })
 */
export declare function defineTypes(tokens: Tokens): import("graphql").DocumentNode;
export {};
