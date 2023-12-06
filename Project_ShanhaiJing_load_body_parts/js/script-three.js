console.log("three.js Version: " + THREE.REVISION);

let container, gui, stats;
let scene, camera, renderer;
let controls;
let time, frame = 0;

function initThree() {
  scene = new THREE.Scene();

  const fov = 75;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // const Amlight = new THREE.AmbientLight(0x404040, 0.2); // soft white light
  // Amlight.position.set(0, 20, 10);
  // scene.add(Amlight);
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 200, 0);
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  //scene.add(spotLightHelper);

  container = document.getElementById("container-three");
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  gui = new dat.GUI();

  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.domElement);

  setupThree(); // *** 

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  time = performance.now();

  // if (bodyPart1) {
  //   bodyPart1.position.x = Math.sin(frame * 0.01) * 10;  // Example movement
  // }

  frame++;

  updateThree(); // ***

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});