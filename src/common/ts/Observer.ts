export type Callback = (obj: object, prop: string, value: unknown) => void;

export default class Observer {
    public proxy: Record<string, any> | undefined;

    initObserver(observables: Record<string, Callback>) {
        this.proxy = new Proxy(
            {},
            {
                set: (obj: any, prop: string, value: unknown): boolean => {
                    obj[prop] = value;

                    if (observables[prop]) {
                        observables[prop](obj, prop, value);
                    }

                    return true;
                },
            }
        );
    }
}
