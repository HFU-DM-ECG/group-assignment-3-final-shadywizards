import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from './ARButton.js';

import * as planets from './planets.js';

//changing variables
let time = 0;
let solarSystemOffset = 0;

//constant Variables ----------------------------------------------------------------
const startContainer = document.getElementById('start-container');
const sceneContainer = document.getElementById('scene-container');

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

const sunPos = {
	x: 0,
	y: 0,
	z: 0
}

const can1 = {
	rx: 30,
	ry: 60,
	rz: 180,
}

const can2 = {
	rx: 90,
	ry: 20,
	rz: 0,
}

const can3 = {
	rx: 30,
	ry: 25,
	rz: 25,
}

const can4 = {
	rx: 33,
	ry: 90,
	rz: 90,
}

const can5 = {
	rx: 5,
	ry: 20,
	rz: 100,
}

const canRotations = [
	can1,
	can2,
	can3,
	can4,
	can5,
]
//-----------------------------------------------------------------------------------

//load shaders
const perlinVertexShader = await fetch('./shaders/perlin/perlin_shader.vert').then(response => response.text());
const perlinFragmentShader = await fetch('./shaders/perlin/perlin_shader.frag').then(response => response.text());
const sunVertexShader = await fetch('./shaders/sun_shader.vert').then(response => response.text());
const sunFragmentShader = await fetch('./shaders/sun_shader.frag').then(response => response.text());


//create base components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
const renderer = new THREE.WebGLRenderer(
	{ antialias: true, alpha: true, canvas: sceneContainer }
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// parent of all objects
var solarSystem = new THREE.Group();
solarSystem.position.set(0, 0, solarSystemOffset);
const solarSystemWidth = 100;
const solarSystemScale = planets.getScaleForSolarSystem(solarSystemWidth);
solarSystem.scale.set(solarSystemScale, solarSystemScale, solarSystemScale);
scene.add(solarSystem);

//AR-Button
const arButton = ARButton.createButton(renderer, {
	requiredFeatures: ['hit-test'],
	optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
	domOverlay: { root: document.body },
});
arButton.id = "ar-btn";
startContainer.appendChild(arButton);


//AR controller (for touch input on mobile devices) --------------------------------
let scenePlaced = false;
function onSelect() {
	if (scenePlaced) return;

	solarSystemOffset = -5;
	console.log('solar system placed');

	scenePlaced = true;
}

const controller = renderer.xr.getController(0); //renderer.xr.getController(0) = first touch input onto the scene
controller.addEventListener("select", onSelect);
scene.add(controller);
//----------------------------------------------------------------------------------


//Lights
const sunLight = new THREE.PointLight(0xffffff, 1.5);
sunLight.position.set(sunPos.x, sunPos.y, sunPos.z);
scene.add(sunLight);
const ambientLight = new THREE.AmbientLight(0xffffff, .2);
scene.add(ambientLight);

//Camera settings
camera.position.set(3.5, 0.5, 5);
scene.add(camera);

//load banners for the cans
var canBanners = loadBanners();;
function loadBanners() {
	//load the bannernames into an array, so their loading process can be started within one for-loop
	var bannerNames = ["Merkury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

	var canBanners = [];
	for (let i = 0; i < (planets.amount); i++) {
		const texture = new THREE.TextureLoader().load('Assets/Planetbanners/' + bannerNames[i] + '.png');
		texture.flipY = false;
		texture.encoding = THREE.sRGBEncoding;
		const material = new THREE.MeshPhysicalMaterial({ map: texture });
		canBanners.push(material);
	}
	return canBanners;
}

//GLTF-Loader for Can
const loader = new GLTFLoader();
var cans = loadCans(loader, planets.amount);

// loads the cans using the supplied loader and returns them in a list
function loadCans(loader, amountOfCans) {
	var cans = [];
	loader.load('Assets/Can_Self_Material.glb', function (glb) {
		const can = glb.scene;

		const canObject = can.getObjectByName("Can");
		const canDimensionFactorToOneMeter = 1 / 3.65;
		canObject.scale.set(canDimensionFactorToOneMeter, canDimensionFactorToOneMeter, canDimensionFactorToOneMeter);


		// set the initial Position of the can once
		var canPositions = planets.getAllPlanetPositions(time);
		var canScales = planets.getAllCanScales();

		// clone the cans and put them into the array to be returned later
		for (var i = 0; i < amountOfCans; i++) {
			var thisCan = can;

			if (i != 0) {
				thisCan = can.clone();
			}
			thisCan.position.set(canPositions[i].x, canPositions[i].y, canPositions[i].z);
			thisCan.rotation.set(canRotations[i % 5].rx, canRotations[i % 5].ry, canRotations[i % 5].rz);
			thisCan.scale.set(canScales[i], canScales[i], canScales[i]);
			//add banner to can
			thisCan.getObjectByName("Cylinder.002_0").material = canBanners[i];
			solarSystem.add(thisCan);
			cans.push(thisCan);
		}
		animateCans(cans);
	}, function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + "% loaded")
	}, function (error) {
		console.log("An error occured" + error)
	});
	return cans;
}

function animateCans() {
	// the counter is used to differentiate between the planets
	let canCounter = 0;
	for (const can of cans) {
		can.rotation.x = can.rotation.x + .0008;
		can.rotation.y = can.rotation.y + .0009;
		can.rotation.z = can.rotation.z + .0003;

		const timeFactor = 1 / 2000
		can.position.x = planets.getAllPlanetPositions(time * timeFactor)[canCounter].x;
		can.position.z = planets.getAllPlanetPositions(time * timeFactor)[canCounter].z;
		canCounter += 1;
	}
	requestAnimationFrame(animateCans);
	renderer.render(scene, camera);
};



//Sun----------------------------------------------------------------
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.ShaderMaterial({
	side: THREE.DoubleSide,
	vertexShader: sunVertexShader,
	fragmentShader: sunFragmentShader,
	uniforms: {
		time: { value: 0 },
		uPerlin: { value: null },
		resolution: { value: new THREE.Vector4() }
	}
});

//improved sun texutre -> use the layered noise of perlinShader as a texture, in order to improve performance and have a more realistic look-------------------
//create new scene, which only contains a sphere with a simplex perlin noise shader 
const scenePerlin = new THREE.Scene();
// cuberenderTarget contains the perlin texture
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
	256, {
	format: THREE.RGBAFormat,
	generateMipMaps: true,
	minFilter: THREE.LinearMipmapFilter,
	encoding: THREE.sRGBEncoding
});
cubeRenderTarget.texture.type = THREE.HalfFloatType;
// THREE.CubeCamera: Constructs a CubeCamera that contains 6 PerspectiveCameras that render to a WebGLCubeRenderTarget.
const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
// The ShaderMaterial which is used as a texture
const perlinMaterial = new THREE.ShaderMaterial({
	side: THREE.DoubleSide,
	vertexShader: perlinVertexShader,
	fragmentShader: perlinFragmentShader,
	uniforms: {
		time: { value: 0 },
	}
});

function addSunTexture() {
	const geometry = new THREE.SphereBufferGeometry(0.99, 30, 30);

	const perlin = new THREE.Mesh(geometry, perlinMaterial);
	perlin.position.x = sunPos.x;
	perlin.position.y = sunPos.y;
	perlin.position.z = sunPos.z;
	solarSystem.add(perlin);
}
addSunTexture();
// ------------------------------------------------------------------------------------------------------------------------------------------------------------


const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.x = sunPos.x;
sunMesh.position.y = sunPos.y;
sunMesh.position.z = sunPos.z;
// scaling messes with the shader
// const sunRadius = 696.340;
// sunMesh.scale(sunRadius, sunRadius, sunRadius);
solarSystem.add(sunMesh);
//-------------------------------------------------------------------


const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 15;
controls.maxPolarAngle = Math.PI;
controls.update()


function renderScene() {
	time += 1;
	// cubeCamera.update(renderer, scene);
	perlinMaterial.uniforms.time.value = time;
	sunMaterial.uniforms.time.value = time;
	sunMaterial.uniforms.uPerlin.value = cubeRenderTarget.texture; // cubeRenderTarget.texture = perlinMaterial
	scene;
	controls.update();
	requestAnimationFrame(renderScene);
	renderer.render(scene, camera);
};

renderScene();
