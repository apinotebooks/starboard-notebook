export declare function openPrompt(options: any): void;
export declare type FieldOptions = {
    value?: any;
    label: string;
    required?: boolean;
    validate?: (v: any) => string | undefined;
    options?: FieldOptions[];
    clean?: (v: any) => any;
};
export declare class Field {
    options: FieldOptions;
    constructor(options: FieldOptions);
    read(dom: {
        value: string | null | undefined;
    }): string;
    validateType(_value: any): any;
    validate(value: any): any;
    clean(value: any): any;
}
export declare class TextField extends Field {
    render(): HTMLInputElement;
}
export declare class SelectField extends Field {
    render(): HTMLSelectElement;
}
