import Api from '../../common/ts/Api';
import Dom from '../../common/ts/Dom';
import Observer from '../../common/ts/Observer';
import { applyMixins } from '../../common/ts/mixins';
import { parseHash } from '../../common/ts/address';
import ProjectScene from './ProjectScene';

export const ROOM = 'Room';

// I would like to type this but it could require a lot of time...
export type ProjectData = any;

class Project {
    private scene: ProjectScene | undefined;

    constructor(id: string, baseUrl: string) {
        this.initDom(id);
        this.initApi(baseUrl);
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('hashchange', this.onHashChanged.bind(this));
        this.onHashChanged();
    }

    onHashChanged() {
        const { hash } = parseHash(location.hash);
        this.fetchProject(hash);
    }

    async fetchProject(id: string): Promise<void> {
        const response = await this.fetch<any>(`/project/${id}`);
        this.renderProject(response.items[0]);
    }

    renderProject(project: ProjectData) {
        this.clear();
        this.renderTitle(project.name);
        this.renderStats(project.data);
        this.renderCanvas(project.data);
    }

    renderTitle(name: string) {
        const h1 = this.createElement('h1', ['b-project__title'], {}, name);
        this.render(h1);
    }

    renderStats(data: any) {
        const statsWrapperNode = this.createElement<HTMLDivElement>('div', ['b-project__stats']);
        const statsTitleNode = this.createElement<HTMLHeadElement>('h2', ['b-project__stats-title'], {}, 'Statistics');
        const infoWrapperNode = this.createElement<HTMLDivElement>('div', ['b-project-stats-info']);

        const floorsCountNode = this.createElement(
            'div',
            ['b-project-stats-info__item'],
            {},
            `Floors: ${data.items.length}`
        );

        const roomsCount = this.countElements(data, [ROOM]);
        const roomsCountNode = this.createElement('div', ['b-project-stats-info__item'], {}, `Rooms: ${roomsCount}`);

        const elementsCount = this.countElements(data, []);
        const elementsCountNode = this.createElement(
            'div',
            ['b-project-stats-info__item'],
            {},
            `Elements: ${elementsCount}`
        );

        infoWrapperNode.appendChild(floorsCountNode);
        infoWrapperNode.appendChild(roomsCountNode);
        infoWrapperNode.appendChild(elementsCountNode);

        statsWrapperNode.appendChild(statsTitleNode);
        statsWrapperNode.appendChild(infoWrapperNode);

        this.render(statsWrapperNode);
    }

    countElements(data: any, items: Array<string> = []): number {
        return data.items.reduce(
            (acc: number, floor: any) =>
                acc + floor.items.filter((element: any) => (items.length ? items.includes(element.className) : true)).length,
            0
        );
    }

    renderCanvas(data: any) {
        const canvasId = `canvas-${data.autoinc}`;
        const canvas = this.createElement('canvas', ['b-project-canvas'], { id: canvasId });
        this.render(canvas);
        this.scene = new ProjectScene(canvasId, data);
    }
}

interface Project extends Api, Dom, Observer {}
applyMixins(Project, [Api, Dom, Observer]);

export default Project;
