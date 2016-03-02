/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var axes;
    var plane;
    var spotLight;
    var cubeGeometry;
    var cubeMaterial;
    var planeMaterial;
    var planeGeometry;
    //these are the cubes used to make the cubeman
    var cube1;
    var cube2;
    var cube3;
    var cube4;
    var cube5;
    function init() {
        // Instantiate a new Scene object
        scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        // add an axis helper to the scene
        axes = new AxisHelper(20);
        scene.add(axes);
        //Add a Plane to the Scene
        planeGeometry = new PlaneGeometry(60, 60);
        planeMaterial = new LambertMaterial({ color: 0x0033CC, opacity: 0.5 });
        plane = new Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        //plane.position.y = -12.5;
        scene.add(plane);
        //Adding cube 1
        cubeGeometry = new CubeGeometry(8, 4, 8);
        cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
        cube1 = new Mesh(cubeGeometry, cubeMaterial);
        cube1.castShadow = true;
        cube1.position.x = 0;
        cube1.position.y = 1;
        cube1.position.z = 0;
        scene.add(cube1);
        //Add cube 2
        cubeGeometry = new CubeGeometry(7, 4, 7);
        cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
        cube2 = new Mesh(cubeGeometry, cubeMaterial);
        cube2.castShadow = true;
        cube2.position.x = 0;
        cube2.position.y = 5;
        cube2.position.z = 0;
        scene.add(cube2);
        //Add Cube 3
        cubeGeometry = new CubeGeometry(6, 4, 6);
        cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
        cube3 = new Mesh(cubeGeometry, cubeMaterial);
        cube3.castShadow = true;
        cube3.position.x = 0;
        cube3.position.y = 9;
        cube3.position.z = 0;
        scene.add(cube3);
        //Add Cube 4
        cubeGeometry = new CubeGeometry(5, 4, 5);
        cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
        cube4 = new Mesh(cubeGeometry, cubeMaterial);
        cube4.castShadow = true;
        cube4.position.x = 0;
        cube4.position.y = 13;
        cube4.position.z = 0;
        scene.add(cube4);
        //Add Cube 5
        cubeGeometry = new CubeGeometry(3, 4, 3);
        cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
        cube5 = new Mesh(cubeGeometry, cubeMaterial);
        cube5.castShadow = true;
        cube5.position.x = 0;
        cube5.position.y = 17;
        cube5.position.z = 0;
        scene.add(cube5);
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(21, 70, 19);
        spotLight.lookAt(new Vector3(0, 0, 0));
        spotLight.castShadow = true;
        scene.add(spotLight);
        console.log("Added Spot Light to Scene");
        // add extras
        gui = new GUI();
        control = new Control(0.005, 0.005, 0.005, 0.005, 0.005);
        addControl(control);
        addStatsObject();
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'Cube1rotation', -0.01, 0.01);
        gui.add(controlObject, 'Cube2rotation', -0.01, 0.01);
        gui.add(controlObject, 'Cube3rotation', -0.01, 0.01);
        gui.add(controlObject, 'Cube4rotation', -0.01, 0.01);
        gui.add(controlObject, 'Cube5rotation', -0.01, 0.01);
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        cube1.rotation.y += control.Cube1rotation;
        cube2.rotation.y += control.Cube2rotation;
        cube3.rotation.y += control.Cube3rotation;
        cube4.rotation.y += control.Cube4rotation;
        cube5.rotation.y += control.Cube5rotation;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 70;
        camera.position.y = 50;
        camera.position.z = -40;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map