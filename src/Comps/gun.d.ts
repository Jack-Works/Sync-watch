declare module 'gun/gun' {
    //#region Constructor
    /**
     * options['module name'] allows you to pass options to a 3rd party module.
     * Their project README will likely list the exposed options
     * https://github.com/amark/gun/wiki/Modules
     */
    type Modules<Mod = any> = typeof Mod extends any ? { [key: string]: any } : Mod
    type ConstructorOptions<Mod = any> = Partial<
        {
            /** where the URLs are properties, and the value is an empty object. */
            peers: Record<string, {}>
            /** default: true, creates and persists local (nodejs) data using Radisk. */
            radisk: boolean
            /** default: true, persists local (browser) data to localStorage. */
            localStorage: boolean
            /** uuid allows you to override the default 24 random alphanumeric soul generator with your own function. */
            uuid(): string
        } & Modules<Mod>
    >
    //#endregion
    //#region Instance
    type Saveable<DataType> = Partial<DataType> | string | number | boolean | null | Instance<DataType>
    type CallbackTypeA = (ack: { err?: Error; ok?: string }) => void
    export interface Instance<DataType = unknown, ThisKey extends keyof DataType = unknown> {
        /** Save data into gun, syncing it with your connected peers.
         * You cannot save primitive values at the root level.
         */
        put(data: Saveable<DataType>, callback?: CallbackTypeA): Instance<DataType, ThisKey>
        /**
         * Where to read data from.
         * @param callback You will usually be using gun.on or gun.once to actually retrieve your data,
            not this callback (it is intended for more low level control, for module and extensions).
         */
        get<K extends keyof DataType>(
            key: K,
            callback?: (ack: {
                /** the raw data. */
                put: DataType[K]
                /** the key, ID, or property name of the data. */
                key: K
            }) => void,
        ): Instance<DataType[K], K>
        /** Change the configuration of the gun database instance.
         * @param options The options argument is the same object you pass to the constructor. The options's properties replace those in the instance's configuration but options.peers are added to peers known to the gun instance.
         * @returns Didn't mention in the document, marked as unknown
         */
        opt(options: ConstructorOptions): unknown
        /** Move up to the parent context on the chain.
         * Every time a new chain is created, a reference to the old context is kept to go back to.
         * @param amount The number of times you want to go back up the chain. -1 or Infinity will take you to the root.
         * @returns Impossible to determinate final type. You must cast it by yourself.
         */
        back(amount?: number): Instance<unknown>

        // Main API
        /** Subscribe to updates and changes on a node or property in realtime.
         * @param option Currently, the only option is to filter out old data, and just be given the changes. If you're listening to a node with 100 fields, and just one changes, you'll instead be passed a node with a single property representing that change rather than the full node every time.
         */
        on(
            callback: (data: DataType, key: ThisKey) => void,
            option?: { change: boolean } | true,
        ): Instance<DataType, ThisKey>
        /** Get the current data without subscribing to updates. Or undefined if it cannot be found.
         * @returns In the document, it said the return value may change in the future. Don't relay on it.
         */
        once(
            callback?: (data: DataType | undefined, key: ThisKey) => void,
            option?: { wait: number },
        ): Instance<DataType, ThisKey>
        /** Add a unique item to an unordered list.
         * `gun.set` works like a mathematical set, where each item in the list is unique. If the item is added twice, it will be merged. This means only objects, for now, are supported. */
        set<T = unknown>(data: DataType | Instance<T, K>, callback?: CallbackTypeA): Instance<T>
        set<T = unknown>(data: { [key: string | number]: any } | Instance<T, K>, callback?: CallbackTypeA): Instance<T>
        /** Map iterates over each property and item on a node, passing it down the chain, behaving like a forEach on your data. It also subscribes to every item as well and listens for newly inserted items. It accepts one argument: */
        map<NewType>(
            callback: (value: DataType[keyof DataType], key: keyof DataType) => NewType | undefined,
        ): Instance<{ [key: keyof DataType]: NewType }, ThisKey>
        map(): Instance<DataType, ThisKey>
        /** Undocumented */
        off(): void

        // Extended API
        // * Note, I'll stop working on extended API, just like them not existing.
        // * Only some useful extended api I will add to here
        // /**
        //  * @deprecated This is not friendly with type system.
        //  *
        //  * **Warning**: This extension was removed from core, you probably shouldn't be using it!
        //  *
        //  * **Warning**: Not included by default! You must include it yourself via `require('gun/lib/path.js')` or `<script src="https://cdn.jsdelivr.net/npm/gun/lib/path.js"></script>`!
        //  */
        // path?(path: string | string[]): Instance
        // /**
        //  * Handle cases where data can't be found.
        //  *
        //  * **Warning**: This extension was removed from core, you probably shouldn't be using it!
        //  *
        //  * **Warning**: Not included by default! You must include it yourself via `require('gun/lib/not.js')` or `<script src="https://cdn.jsdelivr.net/npm/gun/lib/not.js"></script>`!
        //  */
        // not?(callback: (key: ThisKey) => void)
        /**
         * Warning: Not included by default! You must include it yourself via `require('gun/lib/then.js')` or `<script src="https://cdn.jsdelivr.net/npm/gun/lib/then.js"></script>`!
         */
        then?(): Promise<DataType>
        promise?(): Promise<{ put: DataType; key: ThisKey; gun: Instance<DataType, ThisKey> }>
        /** Subscribes to all future events that occur on the Timegraph and retrieve a specified number of old events
         *
         * Warning: The Timegraph extension isn't required by default, you would need to include at "gun/lib/time.js"
         */
        time?(
            callback: (data: DataType, key: ThisKey, time: number) => void,
            alsoReceiveNOldEvents?: number,
        ): Instance<DataType, ThisKey>
        /** Pushes data to a Timegraph with it's time set to Gun.state()'s time */
        time?(data: DataType): void
        //#endregion
    }
    declare const Constructor: {
        /** no parameters undefined creates a local datastore using the default persistence layer, either localStorage or Radisk. */
        <DataType, Mod = any>(): Instance<DataType>

        /** @param url passing a URL string creates the above local datastore that also tries to sync with the URL.
         * or you can pass in an array of URLs to sync with multiple peers. */
        <DataType, Mod = any>(url: string | string[]): Instance<DataType>
        <DataType, Mod = any>(option: ConstructorOptions): Instance<DataType>
        node: {
            /** Returns true if data is a gun node, otherwise false. */
            is(anything: any): anything is Instance
            /** Returns data's gun ID (instead of manually grabbing its metadata i.e. data["_"]["#"], which is faster but could change in the future)
             *
             * Returns undefined if data is not correct gun data. */
            soul(data: Instance): string
            /** Returns a "gun-ified" variant of the json input by injecting a new gun ID into the metadata field. */
            ify(json: any): any
        }
    }
    export default Constructor
}
