type Listener = (...args: any[]) => void;
class EventCenter {
    listeners: Record<string, Array<Listener>>
    constructor() {
        // 所有 eventType 监听器回调函数（数组）
        this.listeners = {}
    }

    on(eventType: string, listener: Listener) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = []
        }
        this.listeners[eventType].push(listener)
    }

    emit(eventType: string, data?: any) {
        const callbacks = this.listeners[eventType]
        if (callbacks) {
            callbacks.forEach((c) => {
                c(data)
            })
        }
    }
}

export const eventCenter = new EventCenter()
