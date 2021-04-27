export default class Dom {
    private id: string | undefined;
    private node: HTMLElement | null | undefined;

    initDom(id: string) {
        this.id = id;
        this.node = document.getElementById(id);
    }

    clear(node?: HTMLElement) {
        if (node) {
            node.remove();
        } else {
            this.node?.querySelectorAll('*').forEach((n) => n.remove());
        }
    }

    createElement<T extends HTMLElement>(tag: string, classes: Array<string> = [], attrs: Record<string, string> = {}, textContent = '') {
        const node = document.createElement(tag) as T;
        node.classList.add(...classes);
        Object.entries(attrs).forEach((attr) => {
            node.setAttribute(...attr);
        });
        node.textContent = textContent;

        return node;
    }

    render(children: HTMLElement | Array<HTMLElement>) {
        if (Array.isArray(children)) {
            children.forEach(this.appendChild, this);
        } else {
            this.appendChild(children);
        }
    }

    appendChild(child: HTMLElement) {
        this.node?.appendChild(child);
    }

    rerender(children: HTMLElement) {
        this.clear();
        this.render(children);
    }
}
