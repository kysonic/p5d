import * as THREE from 'three';
import Vector2 from '../../common/ts/Vector2';
import config from '../../common/configs/config.json';
import Scene from '../../common/ts/Scene';
import { ROOM } from './Project';

const SKY_BLUE = '#b0fced';
const WALL_HEIGHT = 7;
const WALL_THICKNESS = 0.7;

export type Point = {
    x: number;
    y: number;
};

export default class ProjectScene extends Scene {
    ground: THREE.Mesh | undefined;
    data: any;
    room: any;
    firstFloor: any;
    firstRoom: any;

    constructor(id: string, data: any) {
        super(id);

        this.data = data;
        this.firstFloor = data.items[0];
        this.firstRoom = this.firstFloor.items.find((element: any) => element.className === ROOM);

        if (!this.firstFloor || !this.firstRoom) {
            throw new Error('Data is missing...');
        }

        this.enableOrbitControls();
        this.scenePaintings();
        this.drawSpace();
        this.drawRoom();
        this.drawAnchor();
        this.render(0);
    }

    scenePaintings() {
        const near = 10;
        const far = 500;
        this.scene.fog = new THREE.Fog(SKY_BLUE, near, far);
        this.scene.background = new THREE.Color(SKY_BLUE);
    }

    drawSpace() {
        this.drawGround();
    }

    drawGround() {
        const geometry = new THREE.PlaneGeometry(1000, 1000, 32);
        // Texture
        const texture = new THREE.TextureLoader().load(`${config.assets.texture}/${this.data.ground.texture || 'bg_1_fill.png'}`);
        texture.repeat.set(640, 640);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // Material
        const material = new THREE.MeshBasicMaterial({
            color: this.data.ground.color,
            side: THREE.DoubleSide,
            map: texture,
        });
        this.ground = new THREE.Mesh(geometry, material);
        this.ground.rotation.x = -Math.PI / 2;
        this.scene.add(this.ground);
    }

    normalizePoint(p: Point) {
        return {
            x: p.x / 18,
            y: p.y / 18,
        };
    }

    drawRoom() {
        this.firstRoom.items.forEach(
            (wall: any) => this.drawWall(this.normalizePoint(wall.items[0]), this.normalizePoint(wall.items[1]), wall),
            this
        );
    }

    drawWall(p1: Point, p2: Point, data: any) {
        // Find a vector by two dots
        const v = new Vector2(p2.x - p1.x, p2.y - p1.y);
        const length = v.len();
        // Draw wall from 0,0, to 0,length
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, WALL_HEIGHT);
        shape.lineTo(length, WALL_HEIGHT);
        shape.lineTo(length, 0);
        shape.lineTo(0, 0);
        // Geometry, depth is Wall thickness
        const geometry = new THREE.ExtrudeBufferGeometry([shape], {
            steps: 1,
            depth: WALL_THICKNESS,
            bevelEnabled: false,
            curveSegments: 32,
        });
        // Some textures could be load some not, I don't know why
        const texture = new THREE.TextureLoader().load(`${config.assets.texture}/${data.materials.indoor.texture}.jpg`);
        texture.repeat.set(data.materials.indoor.scale, data.materials.indoor.scale);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // The Wall
        const wall = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: data.materials.indoor.color, map: texture }));
        // Set zero position
        wall.position.x = p1.x;
        wall.position.z = p1.y;
        // Rotate wall on vector direction angle
        wall.rotateY(-v.angle());
        this.scene.add(wall);
    }

    drawAnchor() {
        // It would be greate to find the longest wall but let's keep it for now
        const firstWall = this.firstRoom.items[0];
        const p1 = this.normalizePoint(firstWall.items[0]);
        const p2 = this.normalizePoint(firstWall.items[1]);
        const v = new Vector2(p2.x - p1.x, p2.y - p1.y);
        const normal = v.len() / 2;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 'red' });

        const anchor = new THREE.Mesh(geometry, material);

        anchor.position.x = p1.x + normal;
        anchor.position.z = p1.y + normal;
        anchor.position.y = 0.5;

        this.controls.target = anchor.position;
        anchor.visible = false;

        this.scene.add(anchor);
    }

    render = (time: number) => {
        this.controls.update();
        // Extra render manipulation related to current scene
        super.render(time);
    };
}
