import * as THREE from 'three';
// @ts-ignore
import OrbitControls from 'threejs-orbit-controls';

export default class Scene {
    canvas: HTMLCanvasElement | null;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;

    constructor(id: string) {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 1000;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 50;
        this.camera.position.y = 30;
        this.camera.position.x = 20;

        this.scene = new THREE.Scene();

        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-3, 10, 5);

        const ambient = new THREE.AmbientLight( 0x404040 );
        this.scene.add( ambient );

        this.scene.add(light);
    }

    resizeRendererToDisplaySize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }

    enableOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = true;
        this.controls.maxDistance = 30;
        this.controls.minDistance = 0;
        this.controls.enabled = true;
        this.controls.minPolarAngle = ((90 - 90) * Math.PI) / 180;
        this.controls.maxPolarAngle = ((90 + 0) * Math.PI) / 180;
    }

    render(time: number) {
        if (this.resizeRendererToDisplaySize()) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render);
    }

}
