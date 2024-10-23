//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

//~~~~~~~~~~~~~~~~global variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, ball, fish, mixer;
let sceneContainer = document.querySelector("scene-container");

// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~~~~~~~~~~~Set up Scene~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();

    //change scene bg color
    scene.background = new THREE.Color(0x1d2b38);

    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

    // ~~~~~~~~~~~~~~~~Rendering~~~~~~~~~~~~~~~~

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);
    renderer.setAnimationLoop(animate);

    // ~~~~~~~~~~~~~~~~Add Lights(Right)~~~~~~~~~~~~~~~~
    const lightRight = new THREE.directionalLight(0xffffff, 4);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    // ~~~~~~~~~~~~~~~~Light Helper~~~~~~~~~~~~~~~~
    // const helper = new THREE.directionalLightHelper(light, 5);
    // scene.add(helper);

    // const lightleft = new THREE.directionalLight(0xffffff, 3);
    // lightleft.position.set(-3, 4, 5);
    // scene.add(lightleft);

    // const helperleft = new THREE.directionalLightHelper(lightleft, 5);
    // scene.add(helperleft);

    // ~~~~~~~~~~~~~~~~Add Lights(Left)~~~~~~~~~~~~~~~~
    const lightLeft = new THREE.directionalLight(0xffffff, 4);
    lightLeft.position.set(-3, 2, 3);
    scene.add(lightLeft);


    // ~~~~~~~~~~~~~~~~Initiate add-ons~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models


    // ~~~~~~~~~~~~~~~~Geometry~~~~~~~~~~~~~~~~
    const geometry = new THREE.SphereGeometry(.2, 32, 16);

    const texture = new THREE.TextureLoader().load('texture/ice.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });

    ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    //load 3d model
    loader.load('assets/fish.gltf', function (gltf) {
        fish = gltf.scene;
        scene.add(fish);
        fish.scale.set(2, 2, 2);
        fish.position.y = -1.5;
        
        //Animation  
        mixer = new THREE.AnimationMixer(fish);
        const clips = gltf.animations;
        
        //load + play animation
        const clipSwim = new THREE.AnimationClip.findByName(clips, 'fishAction');
        const actionSwim = mixer.clipAction(clipSwim);
        actionSwim.play();

        clips.forEach(function (clipSwim) {
            const action = mixer.clipAction(clipSwim);
            action.play();
        });

    })

    //camera position
    camera.position.z = 5;
}


const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    ball.rotation.x += 0.007;
    ball.rotation.y += 0.007;

    ball.position.x = Math.sin(Date.now() / 5000) * 2;
    ball.position.y = Math.sin(Date.now() / 3000) * 2;
    ball.position.z = Math.sin(Date.now() / 4000) * 2;

    if (fish) {
        //fish.rotation.x += 0.007;
        // fish.rotation.y += 0.007;
        
        // animation mixer update
        mixer.update(clock.getDelta());

        fish.rotation.y = Math.sin(Date.now() / 500) * 2;
    }

    if (mixer)
        mixer.update(clock.getDelta());

    renderer.render(scene, camera);

}



function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

}

window.addEventListener('resize', onWindowResize, false);

init();
animate();


