export declare type RegistryEvent<S, T> = {
    type: "register";
    key: S;
    value: T;
};
export declare type MapRegistryListenerFunction<S, T> = (event: RegistryEvent<S, T>) => void;
/**
 * A registry here is just a wrapper around a Map. It has a register function that simply calls set,
 * but also emits an event for internal use.
 */
export declare class MapRegistry<S, T> {
    protected map: Map<S, T>;
    private handlers;
    subscribe(handler: MapRegistryListenerFunction<S, T>): void;
    unsubscribe(handler: MapRegistryListenerFunction<S, T>): void;
    private notifyHandlers;
    get(key: S): T;
    /**
     * This does *not* trigger a register event, so cells already present with this cell type will not switch automatically.
     * Use register instead.
     */
    set(key: S | Array<S>, value: T): void;
    has(key: S): boolean;
    keys(): IterableIterator<S>;
    values(): IterableIterator<T>;
    register(key: S | Array<S>, value: T): void;
    /**
     * Get the underlying Map
     */
    getMap(): Map<S, T>;
}
