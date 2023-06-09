// see devsrv.config.json for threejs version dynamically replaced by devsrv
import * as THREE from 'https://cdn.skypack.dev/three@0.135';
import { BoxLineGeometry } from 'https://cdn.skypack.dev/three@0.135/examples/jsm/geometries/BoxLineGeometry.js';

import { CanvasUI } from './CanvasUI.js';
import { VRButton } from './VRButton.js';

class UiPanel {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 1.6, 0);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x505050);
        this.scene.add(this.camera);

        this.scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1).normalize();
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        container.appendChild(this.renderer.domElement);

        this.initScene();
        this.setupXR();

        window.addEventListener('resize', this.resize.bind(this));
    }

    initScene() {
        this.room = new THREE.LineSegments(
            new BoxLineGeometry(6, 6, 6, 10, 10, 10),
            new THREE.LineBasicMaterial({ color: 0x808080 })
        );
        this.room.geometry.translate(0, 3, 0);
        this.scene.add(this.room);

        this.createUI();
    }

    static createUI(scene, position, headerText, mainText, headerColor, textColor) {
        let mainTextHeight = 130;
        const css = {
            header: {
                type: "text",
                position: { top: 0 },
                paddingTop: 30,
                height: 70,
                backgroundColor: headerColor,
            },
            temp: {
                type: "text",
                position: { top: 70 },
                height: mainTextHeight, // default height is 512 so this is 512 - header height:70 - footer height:70
                backgroundColor: textColor,
                fontColor: "#000",
            },
            dist: {
                type: "text",
                position: { top: 125 },
                height: mainTextHeight, // default height is 512 so this is 512 - header height:70 - footer height:70
                backgroundColor: textColor,
                fontColor: "#000"
            },
            mass: {
                type: "text",
                position: { top: 230},
                height: mainTextHeight, // default height is 512 so this is 512 - header height:70 - footer height:70
                backgroundColor: textColor,
                fontColor: "#000"
            },
            a: {
                type: "text",
                position: { top: 290 },
                height: mainTextHeight, // default height is 512 so this is 512 - header height:70 - footer height:70
                backgroundColor: textColor,
                fontColor: "#000"
            },
            b: {
                type: "text",
                position: { top: 350 },
                height: mainTextHeight, // default height is 512 so this is 512 - header height:70 - footer height:70
                backgroundColor: textColor,
                fontColor: "#000"
            },
            c: {
                type: "text",
                position: { top: 410 },
                height: mainTextHeight, // default height is 512 so this is 512 - header height:70 - footer height:70
                backgroundColor: textColor,
                fontColor: "#000"
            },
            footer: {
                type: "text",
                position: { bottom: 0 },
                paddingTop: 30,
                height: 50,
                backgroundColor: headerColor,
            }
        }
        const content = {
            header: headerText,
            temp: mainText,
            dist: mainText,
            mass: mainText,
            a: mainText,
            b: mainText,
            c: mainText,
            footer: ""
        }
        const ui = new CanvasUI(content, css);
        ui.mesh.position.set(position.x, position.y, position.z);
        scene.add(ui.mesh);
        return ui;
    }

    setupXR() {
        this.renderer.xr.enabled = true;
        new VRButton(this.renderer);
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        if (this.renderer.xr.isPresenting) this.ui.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export { UiPanel };
