declare module 'csstype' {
    interface Properties {
        '--rects-num'?: number;
        '--rect-value'?: number;

        // the following line allow for any property name and value
        // [index: string]: any;
    }
}

export {};
