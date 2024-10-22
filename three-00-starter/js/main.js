//\ Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, cube;

// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //rendering
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    //lights
    const light = new THREE.directionalLight(0xffffff, 3);
    light.position.set(3, 4, 5);
    scene.add(light);

    const helper = new THREE.directionalLightHelper(light, 5);
    scene.add(helper);

    const lightleft = new THREE.directionalLight(0xffffff, 3);
    lightleft.position.set(-3, 4, 5);
    scene.add(lightleft);
    
    const helperleft = new THREE.directionalLightHelper(lightleft, 5);
    scene.add(helperleft);

    //initiate add ons
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models

    loader.load('assets/fish.gltf', function(gltf){
        const fish = gltf.scene
        scene.add(fish);
    })
    
    geometry
    const geometry = new THREE.CapsuleGeometry( 1, 1, 1, 8 );

    const texture = new THREE.TextureLoader().load('texture/ice.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
        
    //camera position
    camera.position.z = 5;
}


function animate() {

    requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}



function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectMatrix();
    renderer.setSize(window.innerWidth , window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init();
animate();


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models


// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


