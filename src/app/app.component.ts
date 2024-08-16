import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as BABYLON from 'babylonjs';

import 'babylonjs-loaders';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('renderCanvas', { static: true })
  renderCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.createScene();
  }

  createScene = async () => {
    const canvas = this.renderCanvas.nativeElement;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Create a basic camera and light
    const camera = new BABYLON.ArcRotateCamera(
      'camera1',
      Math.PI / 2,
      0,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;

    // Add a ground mesh
    const ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 6, height: 6 },
      scene
    );

    // Import a .glb file into the scene
    // BABYLON.SceneLoader.ImportMesh(
    //   null, // MESH NAME (null means all meshes in the file)
    //   '', // ROOT URL (path to the .glb file)
    //   'samsung-controller.glb', // FILENAME (name of the .glb file)
    //   scene, // SCENE to import into
    //   function (meshes) {
    //     // CALLBACK once the mesh is imported
    //     meshes.forEach((mesh) => {
    //       mesh.position.y = 0; // Adjust the position if needed
    //     });
    //     console.log('GLB file imported successfully!');
    //   },
    //   null, // onProgress callback (optional)
    //   function (scene, message, exception) {
    //     // onError callback (optional)
    //     console.error('Failed to load the GLB file:', message, exception);
    //   }
    // );
    await BABYLON.SceneLoader.ImportMeshAsync(
      null,
      '../',
      'base_basic_shaded.glb',
      scene
    );

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });
  };
}
