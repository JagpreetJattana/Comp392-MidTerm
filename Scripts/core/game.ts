/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var axes: AxisHelper;
    var plane: Mesh;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    
    var cubeGeometry: CubeGeometry;
    var cubeMaterial: LambertMaterial;
    
    var planeMaterial: LambertMaterial;
    var planeGeometry: PlaneGeometry;
    
    //these are the cubes used to make the cubeman
var cube1: Mesh;
var cube2: Mesh;
var cube3: Mesh;
var cube4: Mesh;
var cube5: Mesh;    
    

    function init() {
        // Instantiate a new Scene object
        scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera


        var color = new THREE.Color( 0xffffff );
    color.setRGB( Math.random(), 0, 0 );
        
 
      

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        
          // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    
     //Add a Plane to the Scene
      var texture2 = THREE.ImageUtils.loadTexture('Scripts/texture/floor.jpg');
    var material2 = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.05,

    });
	planeGeometry = new PlaneGeometry(35, 35);
	planeMaterial = new LambertMaterial({color:0x0033CC, opacity: 0.5});
	plane = new Mesh(planeGeometry, material2);
	plane.receiveShadow = true;
	
	plane.rotation.x = -0.5 * Math.PI;
//	plane.position.y = -12.5;
	
	scene.add(plane);
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    
       //Adding cube 1
       
        THREE.ImageUtils.crossOrigin = 'anonymous';
    var texture = THREE.ImageUtils.loadTexture('Scripts/texture/crate.jpg');
    var material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.05,

    });
	cubeGeometry = new CubeGeometry(8, 4, 8);
    
	cubeMaterial = new LambertMaterial({color:0x00ff00, opacity:0.5});
	cube1 = new Mesh(cubeGeometry, material);
	cube1.castShadow = true;
    cube1.position.x=0;  
   cube1.position.y=1;
    cube1.position.z=0;	
    scene.add(cube1);
    
        //Add cube 2
	cubeGeometry = new CubeGeometry(7, 4, 7);
	cubeMaterial = new LambertMaterial({color:0x00ff00, opacity:0.5});
	cube2 = new Mesh(cubeGeometry, material);
	cube2.castShadow = true;
    cube2.position.x=0;  
   cube2.position.y=5;
    cube2.position.z=0;	
    scene.add(cube2);
    
    
        //Add Cube 3
	cubeGeometry = new CubeGeometry(6, 4, 6);
	cubeMaterial = new LambertMaterial({color:0x00ff00, opacity:0.5});
	cube3 = new Mesh(cubeGeometry, material);
	cube3.castShadow = true;
    cube3.position.x=0;  
   cube3.position.y=9;
    cube3.position.z=0;	
    scene.add(cube3);
    
    
        //Add Cube 4
	cubeGeometry = new CubeGeometry(5, 4, 5);
	cubeMaterial = new LambertMaterial({color:0x00ff00, opacity:0.5});
	cube4 = new Mesh(cubeGeometry, material);
	cube4.castShadow = true;
    cube4.position.x=0;  
   cube4.position.y=13;
    cube4.position.z=0;	
    scene.add(cube4);
    
    
        //Add Cube 5
	cubeGeometry = new CubeGeometry(3, 4, 3);
	cubeMaterial = new LambertMaterial({color:0x00ff00, opacity:0.5});
	cube5 = new Mesh(cubeGeometry, material);
	cube5.castShadow = true;
    cube5.position.x=0;  
   cube5.position.y=17;
    cube5.position.z=0;	
    scene.add(cube5);
    
    // Add a SpotLight to the scene
	spotLight = new SpotLight(0xffffff);
	spotLight.position.set (21, 70, 19);
    spotLight.lookAt(new Vector3(0, 0, 0));
    spotLight.castShadow = true;
  //  spotLight.angle = 10 * (Math.PI / 180);
  //  spotLight.distance = 50;
  //  spotLight.intensity = 2;
  //  spotLight.shadowCameraNear=1;
	scene.add(spotLight);
	console.log("Added Spot Light to Scene");
    
    // add extras
	gui = new GUI();
	control = new Control(0,0,0,0,0);
 	addControl(control);
     addStatsObject();

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }
    
    
    

    function addControl(controlObject: Control): void {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'Cube1rotation',-0.05,0.05);
        gui.add(controlObject, 'Cube2rotation',-0.05,0.05);
        gui.add(controlObject, 'Cube3rotation',-0.05,0.05);
        gui.add(controlObject, 'Cube4rotation',-0.05,0.05);
        gui.add(controlObject, 'Cube5rotation',-0.05,0.05);
        
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
    function gameLoop(): void {
        stats.update();
        
        cube1.rotation.y+=control.Cube1rotation;
        cube2.rotation.y+=control.Cube2rotation;
        cube3.rotation.y+=control.Cube3rotation;
        cube4.rotation.y+=control.Cube4rotation;
        cube5.rotation.y+=control.Cube5rotation;
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 40;
        camera.position.y = 50;
        camera.position.z = -40;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
     
      camera.lookAt(scene.position);
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

