import Api from '../../common/ts/Api';
import Dom from '../../common/ts/Dom';
import Observer from '../../common/ts/Observer';
import { applyMixins } from '../../common/ts/mixins';
import { ListResponse, ListItem } from '../../common/declaraitions/declarations';

const PROJECTS_PATH = '/project';

class List {
    constructor(id: string, baseUrl: string) {
        this.initDom(id);
        this.initApi(baseUrl);
        this.initObserver({
            list: this.reaction.bind(this),
        });
    }

    createListItemNode({ name, hash }: ListItem): HTMLDivElement {
        const wrapperNode = this.createElement<HTMLDivElement>('div', ['b-list__item']);

        const titleNode = this.createElement<HTMLAnchorElement>(
            'a',
            ['b-list__item-title'],
            { href: `${PROJECTS_PATH}#hash=${hash}` },
            name
        );

        const hashNode = this.createElement<HTMLSpanElement>(
            'span',
            ['b-list__item-hash'],
            {},
            hash
        );

        wrapperNode.appendChild(titleNode);
        wrapperNode.appendChild(hashNode);

        return wrapperNode;
    }

    renderListItems() {
        const items = this.proxy?.list.slice().map((item: ListItem) => this.createListItemNode(item));
        this.rerender(items);
    }

    reaction() {
        this.renderListItems();
    }

    async fetchList(): Promise<void> {
        const response = await this.fetch<ListResponse>('/projects');

        if (this.proxy) {
            this.proxy.list = response.items;
        }
    }
}

interface List extends Api, Dom, Observer {}
applyMixins(List, [Api, Dom, Observer]);

export default List;
