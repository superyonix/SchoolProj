//IMPORTANT
const SCENE = new THREE.Scene();
const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const MAXPARTICLES = 2000;
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

//CAMERA
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 120;
camera.position.y = 80;
camera.position.z = 150;
camera.lookAt(new THREE.Vector3(0, 0, 0));

//RING1
let particlesGeometry = new THREE.Geometry();
for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-160, 160),
    random(-4.5, 4.5),
    random(-140, 140)
  );
  particlesGeometry.vertices.push(particle);
}
let particleMaterial = new THREE.ParticleBasicMaterial({
  color: 0x1a1a00,
  size: 2,
});
let ringPart = new THREE.ParticleSystem(particlesGeometry, particleMaterial);
ringPart.sortParticles = true;
SCENE.add(ringPart);

//RING2
let particlesGeometry1 = new THREE.Geometry();

for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-100, 100),
    random(-4.5, 4.5),
    random(-120, 120)
  );
  particlesGeometry1.vertices.push(particle);
}
let particleMaterial1 = new THREE.ParticleBasicMaterial({
  color: 0x52527a,
  size: 2,
});

let ringPart1 = new THREE.ParticleSystem(particlesGeometry1, particleMaterial1);
ringPart1.sortParticles = true;
SCENE.add(ringPart1);



//SATURN
let saturnLoader = new THREE.TextureLoader().load('images/planet.jpg');
let saturnGeometry = new THREE.SphereGeometry( 50, 32, 32 );
let saturnMaterial = new THREE.MeshLambertMaterial( {map: saturnLoader} );
let saturnP = new THREE.Mesh( saturnGeometry, saturnMaterial );
SCENE.add( saturnP );


//GalaxyBackground
let starsGeometry  = new THREE.SphereGeometry(250, 32, 32)
let starsMaterial  = new THREE.MeshBasicMaterial()
starsMaterial.map   = THREE.ImageUtils.loadTexture('images/galax.jpg')
starsMaterial.side  = THREE.BackSide
let starLight  = new THREE.Mesh(starsGeometry, starsMaterial)
SCENE.add(starLight);
starLight.position.z=200

//saturnlight
let light = new THREE.AmbientLight( "#ff0000" );
SCENE.add( light );

//RANDOM NUMBER GENERATOR
function random(min, max) {
  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

//RENDER LOOP
function render() {
    requestAnimationFrame(render);
    ringPart.rotation.y += -0.00500;
    ringPart1.rotation.y += -0.00500;
    saturnP.rotation.y += -0.00050;
    starLight.rotation.y += -0.0020;
    RENDERER.render(SCENE, camera);
  }
  render();

//RESIZE
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);