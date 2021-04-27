class Api {
    constructor() {
        this.isLoading = false;
    }
    initApi(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async fetch(path = '') {
        try {
            this.isLoading = true;
            const response = await fetch(`${this.baseUrl}${path}`);
            return response.json();
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }
}

class Dom {
    initDom(id) {
        this.id = id;
        this.node = document.getElementById(id);
    }
    clear(node) {
        if (node) {
            node.remove();
        }
        else {
            this.node?.querySelectorAll('*').forEach((n) => n.remove());
        }
    }
    createElement(tag, classes = [], attrs = {}, textContent = '') {
        const node = document.createElement(tag);
        node.classList.add(...classes);
        Object.entries(attrs).forEach((attr) => {
            node.setAttribute(...attr);
        });
        node.textContent = textContent;
        return node;
    }
    render(children) {
        if (Array.isArray(children)) {
            children.forEach(this.appendChild, this);
        }
        else {
            this.appendChild(children);
        }
    }
    appendChild(child) {
        this.node?.appendChild(child);
    }
    rerender(children) {
        this.clear();
        this.render(children);
    }
}

class Observer {
    initObserver(observables) {
        this.proxy = new Proxy({}, {
            set: (obj, prop, value) => {
                obj[prop] = value;
                if (observables[prop]) {
                    observables[prop](obj, prop, value);
                }
                return true;
            },
        });
    }
}

function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null));
        });
    });
}

const PROJECTS_PATH = '/project';
class List {
    constructor(id, baseUrl) {
        this.initDom(id);
        this.initApi(baseUrl);
        this.initObserver({
            list: this.reaction.bind(this),
        });
    }
    createListItemNode({ name, hash }) {
        const wrapperNode = this.createElement('div', ['b-list__item']);
        const titleNode = this.createElement('a', ['b-list__item-title'], { href: `${PROJECTS_PATH}#hash=${hash}` }, name);
        const hashNode = this.createElement('span', ['b-list__item-hash'], {}, hash);
        wrapperNode.appendChild(titleNode);
        wrapperNode.appendChild(hashNode);
        return wrapperNode;
    }
    renderListItems() {
        const items = this.proxy?.list.slice().map((item) => this.createListItemNode(item));
        this.rerender(items);
    }
    reaction() {
        this.renderListItems();
    }
    async fetchList() {
        const response = await this.fetch('/projects');
        if (this.proxy) {
            this.proxy.list = response.items;
        }
    }
}
applyMixins(List, [Api, Dom, Observer]);

var env = "local";
var api = {
	baseUrl: "http://localhost:3000"
};
var assets = {
	texture: "https://static.planner5d.com/textures"
};
var config = {
	env: env,
	api: api,
	assets: assets
};

const list = new List('list', config.api.baseUrl);
list.fetchList();
