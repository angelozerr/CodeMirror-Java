(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("tern/lib/infer"), require("tern/lib/tern"));
  if (typeof define == "function" && define.amd) // AMD
    return define([ "tern/lib/infer", "tern/lib/tern" ], mod);
  mod(tern, tern);
})(function(infer, tern) {
  "use strict";

  tern.registerPlugin("threejs", function(server, options) {
    return {
      defs : {
  "!name": "threejs",
  "THREE": {
    "Original": {
      "!name": "Original",
      "!url": "http://threejs.org/docs/#Reference/Original",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "todo"
    },
    "Camera": {
      "!name": "Camera",
      "!url": "http://threejs.org/docs/#Reference/cameras/Camera",
      "prototype": {
        "!proto": "THREE.Object3D.prototype",
        "matrixWorldInverse": {
          "!type": "Matrix4",
          "!doc": "This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera."
        },
        "lookAt": {
          "!type": "fn(vector: Vector3)",
          "!doc": "vector — point to look at<br>\n\t\t<br>\n\t\tThis makes the camera look at the vector position in the global space as long as the parent of this camera is the scene or at position (0,0,0)."
        }
      },
      "!doc": "Abstract base class for cameras. This class should always be inherited when you build a new camera.",
      "!type": "fn()"
    },
    "CubeCamera": {
      "!name": "CubeCamera",
      "!url": "http://threejs.org/docs/#Reference/cameras/CubeCamera",
      "prototype": {
        "!proto": "Object3D",
        "renderTarget": {
          "!type": "WebGLRenderTargetCube",
          "!doc": "The cube texture that gets generated."
        },
        "updateCubeMap": {
          "!type": "fn(renderer: todo, scene: todo) -> todo",
          "!doc": "Call this to update the renderTarget."
        }
      },
      "!doc": "Creates 6 cameras that render to a [page:WebGLRenderTargetCube].",
      "!type": "fn(near: number, far: number, cubeResolution: number)"
    },
    "OrthographicCamera": {
      "!name": "OrthographicCamera",
      "!url": "http://threejs.org/docs/#Reference/cameras/OrthographicCamera",
      "prototype": {
        "!proto": "Object3D",
        "left": {
          "!type": "number",
          "!doc": "Camera frustum left plane."
        },
        "top": {
          "!type": "number",
          "!doc": "Camera frustum top plane."
        },
        "near": {
          "!type": "number",
          "!doc": "Camera frustum near plane."
        },
        "updateProjectionMatrix": {
          "!type": "fn()",
          "!doc": "Updates the camera projection matrix. Must be called after change of parameters."
        }
      },
      "!doc": "Camera with orthographic projection.",
      "!type": "fn(left: number, right: number, top: number, bottom: number, near: number, far: number)"
    },
    "PerspectiveCamera": {
      "!name": "PerspectiveCamera",
      "!url": "http://threejs.org/docs/#Reference/cameras/PerspectiveCamera",
      "prototype": {
        "!proto": "Object3D",
        "fov": {
          "!type": "number",
          "!doc": "Camera frustum vertical field of view, from bottom to top of view, in degrees."
        },
        "near": {
          "!type": "number",
          "!doc": "Camera frustum near plane."
        },
        "setLens": {
          "!type": "fn(focalLength: number, frameSize: number)",
          "!doc": "Uses focal length (in mm) to estimate and set FOV 35mm (fullframe) camera is used if frame size is not specified.<br>\n\t\tFormula based on [link:http://www.bobatkins.com/photography/technical/field_of_view.html]"
        },
        "updateProjectionMatrix": {
          "!type": "fn()",
          "!doc": "Updates the camera projection matrix. Must be called after change of parameters."
        }
      },
      "!doc": "Camera with perspective projection.",
      "!type": "fn(fov: number, aspect: number, near: number, far: number)"
    },
    "CustomBlendingEquations": {
      "!name": "CustomBlendingEquations",
      "!url": "http://threejs.org/docs/#Reference/constants/CustomBlendingEquations",
      "prototype": {}
    },
    "GLState": {
      "!name": "GLState",
      "!url": "http://threejs.org/docs/#Reference/constants/GLState",
      "prototype": {}
    },
    "Materials": {
      "!name": "Materials",
      "!url": "http://threejs.org/docs/#Reference/constants/Materials",
      "prototype": {}
    },
    "ShadowingTypes": {
      "!name": "ShadowingTypes",
      "!url": "http://threejs.org/docs/#Reference/constants/ShadowingTypes",
      "prototype": {}
    },
    "Textures": {
      "!name": "Textures",
      "!url": "http://threejs.org/docs/#Reference/constants/Textures",
      "prototype": {}
    },
    "BufferAttribute": {
      "!name": "BufferAttribute",
      "!url": "http://threejs.org/docs/#Reference/core/BufferAttribute",
      "prototype": {
        "!proto": "BufferGeometry",
        "array": {
          "!type": "array",
          "!doc": "Stores the data associated with this attribute; can be an Array or a Typed Array. This element should have <code>itemSize * numVertices</code> elements, where numVertices is the number of vertices in the associated [page:BufferGeometry geometry]."
        },
        "length": {
          "!type": "number",
          "!doc": "Gives the total number of elements in the array."
        },
        "setX": {
          "!type": "fn(index, x)",
          "!doc": "Sets the value of the array at <code>index * itemSize</code> to x"
        },
        "setZ": {
          "!type": "fn(index, z)",
          "!doc": "Sets the value of the array at <code>index * itemSize + 2</code> to z"
        },
        "setXYZ": {
          "!type": "fn(index, x, y, z)",
          "!doc": "Sets the value of the array at <code>index * itemSize</code> to x,\n\t\tthe value of the array at <code>index * itemSize + 1</code> to y, and\n\t\tthe value of the array at <code>index * itemSize + 2</code> to z."
        },
        "clone": {
          "!type": "fn() -> BufferAttribute",
          "!doc": "Copies this attribute."
        }
      },
      "!doc": "This class stores data for an attribute associated with a [page:BufferGeometry]. See that page for details and a usage example. This class is used to store builtin attributes such as vertex position, normals, color, etc., but can also be used in your code to store custom attributes in a [page:BufferGeometry].",
      "!type": "fn(array: array, itemSize: number)"
    },
    "BufferGeometry": {
      "!name": "BufferGeometry",
      "!url": "http://threejs.org/docs/#Reference/core/BufferGeometry",
      "prototype": {
        "!proto": "Geometry",
        "id": {
          "!type": "number",
          "!doc": "Unique number for this buffergeometry instance."
        },
        "drawCalls": {
          "!type": "array",
          "!doc": "For geometries that use indexed triangles, this Array can be used to split the object into multiple WebGL draw calls. Each draw call will draw some subset of the vertices in this geometry using the configured [page:Material shader]. This may be necessary if, for instance, you have more than 65535 vertices in your object. \n\t\tEach element is an object of the form:\n\t\t<code>{ start: Integer, count: Integer, index: Integer }</code>\n\t\twhere start specifies the index of the first vertex in this draw call, count specifies how many vertices are included, and index specifies an optional offset.\n\n\t\tUse addDrawCall to add draw calls, rather than modifying this array directly."
        },
        "boundingSphere": {
          "!type": "Sphere",
          "!doc": "Bounding sphere.\n\t\t<code>{ radius: float }</code>"
        },
        "hasTangents": {
          "!type": "boolean",
          "!doc": "True if BufferGeometry has tangents. Set in [page:.computeTangents]."
        },
        "addAttribute": {
          "!type": "null",
          "!doc": "Adds an attribute to this geometry. Use this rather than the attributes property, \n\t\tbecause an internal array of attributes is maintained to speed up iterating over\n\t\tattributes."
        },
        "addDrawCall": {
          "!type": "fn(start: number, count: number, indexOffset: number)",
          "!doc": "Adds a draw call to this geometry; see the drawcalls property for details."
        },
        "computeVertexNormals": {
          "!type": "fn()",
          "!doc": "Computes vertex normals by averaging face normals.<br>"
        },
        "computeBoundingBox": {
          "!type": "fn()",
          "!doc": "Computes bounding box of the geometry, updating [page:Geometry Geometry.boundingBox] attribute.<br>\n\t\tBounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are *null*."
        },
        "dispose": {
          "!type": "fn()",
          "!doc": "Disposes the object from memory. <br>\n\t\tYou need to call this when you want the bufferGeometry removed while the application is running."
        },
        "getAttribute": {
          "!type": "fn(name: string) -> BufferAttribute",
          "!doc": "Returns the [page:BufferAttribute attribute] with the specified name."
        }
      },
      "!doc": "<p>\n\t\tThis class is an efficient alternative to [page:Geometry], because it stores all data, including\n\t\tvertex positions, face indices, normals, colors, UVs, and custom attributes within buffers; this\n\t\treduces the cost of passing all this data to the GPU. \n\t\tThis also makes BufferGeometry harder to work with than [page:Geometry]; rather than accessing \n\t\tposition data as [page:Vector3] objects, color data as [page:Color] objects, and so on, you have to \n\t\taccess the raw data from the appropriate [page:BufferAttribute attribute] buffer. This makes \n\t\tBufferGeometry best-suited for static objects where you don't need to manipulate the geometry much\n\t\tafter instantiating it.\n\t\t</p>\n\n\t\t<h3>Example</h3>\n\t\t<code>\n\t\tvar geometry = new THREE.BufferGeometry();\n\t\t// create a simple square shape. We duplicate the top left and bottom right\n\t\t// vertices because each vertex needs to appear once per triangle. \n\t\tvar vertexPositions = [ \n\t\t\t[-1.0, -1.0,  1.0],\n\t\t\t[ 1.0, -1.0,  1.0],\n\t\t\t[ 1.0,  1.0,  1.0],\n\n\t\t\t[ 1.0,  1.0,  1.0],\n\t\t\t[-1.0,  1.0,  1.0],\n\t\t\t[-1.0, -1.0,  1.0]\n\t\t];\n\t\tvar vertices = new Float32Array( vertexPositions.length * 3 ); // three components per vertex\n\n\t\t// components of the position vector for each vertex are stored\n\t\t// contiguously in the buffer.\n\t\tfor ( var i = 0; i &lt; vertexPositions.length; i++ )\n\t\t{\n\t\t\tvertices[ i*3 + 0 ] = vertexPositions[i][0];\n\t\t\tvertices[ i*3 + 1 ] = vertexPositions[i][1];\n\t\t\tvertices[ i*3 + 2 ] = vertexPositions[i][2];\n\t\t}\n\n\t\t// itemSize = 3 because there are 3 values (components) per vertex\n\t\tgeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );\n\t\tvar material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );\n\t\tvar mesh = new THREE.Mesh( geometry, material );\n\t\t</code>\n\t\t<p>More examples: [example:webgl_buffergeometry Complex mesh with non-indexed faces], [example:webgl_buffergeometry_uint Complex mesh with indexed faces], [example:webgl_buffergeometry_lines Lines], [example:webgl_buffergeometry_lines_indexed Indexed Lines], [example:webgl_buffergeometry_particles Particles], and [example:webgl_buffergeometry_rawshader Raw Shaders].</p>\n\n\t\t\n\t\t<h3>Accessing attributes</h3>\n\t\t<p>\n\t\tWebGL stores data associated with individual vertices of a geometry in <emph>attributes</emph>. \n\t\tExamples include the position of the vertex, the normal vector for the vertex, the vertex color,\n\t\tand so on. When using [page:Geometry], the [page:WebGLRenderer renderer] takes care of wrapping\n\t\tup this information into typed array buffers and sending this data to the shader. With \n\t\tBufferGeometry, all of this data is stored in buffers associated with an individual attributes.\n\t\tThis means that to get the position data associated with a vertex (for instance), you must call\n\t\t[page:.getAttribute] to access the 'position' [page:BufferAttribute attribute], then access the individual \n\t\tx, y, and z coordinates of the position.  \n\t\t</p>\n\t\t<p>\n\t\tThe following attributes are set by various members of this class:\n\t\t</p>\n\t\t<h4>[page:BufferAttribute position] (itemSize: 3)</h4>\n\t\t<div>\n\t\tStores the x, y, and z coordinates of each vertex in this geometry. Set by [page:.fromGeometry]().\n\t\t</div>\n\n\t\t<h4>[page:BufferAttribute normal] (itemSize: 3)</h4>\n\t\t<div>\n\t\tStores the x, y, and z components of the face or vertex normal vector of each vertex in this geometry.\n\t\tSet by [page:.fromGeometry]().\n\t\t</div>\n\n\t\t<h4>[page:BufferAttribute color] (itemSize: 3)</h4>\n\t\t<div>\n\t\tStores the red, green, and blue channels of vertex color of each vertex in this geometry.\n\t\tSet by [page:.fromGeometry]().\n\t\t</div>\n\n\t\t<h4>[page:BufferAttribute tangent] (itemSize: 3)</h4>\n\t\t<div>\n\t\tStores the x, y, and z components of the tangent vector of each vertex in this geometry. Set by [page:.computeTangents]().\n\t\t</div>\n\n\t\t<h4>[page:BufferAttribute index] (itemSize: 3)</h4>\n\t\tAllows for vertices to be re-used across multiple triangles; this is called using \"indexed triangles,\" and works much the same as it does in [page:Geometry]: each triangle is associated with the index of three vertices. This attribute therefore stores the index of each vertex for each triangular face.\n\n\t\tIf this attribute is not set, the [page:WebGLRenderer renderer] assumes that each three contiguous positions represent a single triangle.",
      "!type": "fn()"
    },
    "Clock": {
      "!name": "Clock",
      "!url": "http://threejs.org/docs/#Reference/core/Clock",
      "prototype": {
        "autoStart": {
          "!type": "boolean",
          "!doc": "If set, starts the clock automatically when the first update is called."
        },
        "oldTime": {
          "!type": "number",
          "!doc": "When the clock is running, It holds the previous time from a update.<br>\n\t\tThis counted from the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC."
        },
        "running": {
          "!type": "boolean",
          "!doc": "This property keeps track whether the clock is running or not."
        },
        "start": {
          "!type": "fn()",
          "!doc": "Starts clock."
        },
        "getElapsedTime": {
          "!type": "fn() -> number",
          "!doc": "Get the seconds passed since the clock started."
        }
      },
      "!doc": "Object for keeping track of time.",
      "!type": "fn(autoStart: boolean)"
    },
    "EventDispatcher": {
      "!name": "EventDispatcher",
      "!url": "http://threejs.org/docs/#Reference/core/EventDispatcher",
      "prototype": {
        "addEventListener": {
          "!type": "fn(type: string, listener: function)",
          "!doc": "Adds a listener to an event type."
        },
        "removeEventListener": {
          "!type": "fn(type: string, listener: function)",
          "!doc": "Removes a listener from an event type."
        }
      },
      "!doc": "JavaScript events for custom objects.<br>\n\t\t<a href=\"https://github.com/mrdoob/eventdispatcher.js\">https://github.com/mrdoob/eventdispatcher.js</a>",
      "!type": "fn()"
    },
    "Face3": {
      "!name": "Face3",
      "!url": "http://threejs.org/docs/#Reference/core/Face3",
      "prototype": {
        "a": {
          "!type": "number",
          "!doc": "Vertex A index."
        },
        "c": {
          "!type": "number",
          "!doc": "Vertex C index."
        },
        "color": {
          "!type": "Color",
          "!doc": "Face color."
        },
        "vertexColors": {
          "!type": "array",
          "!doc": "Array of 3 vertex colors."
        },
        "materialIndex": {
          "!type": "number",
          "!doc": "Material index (points to [page:MeshFaceMaterial MeshFaceMaterial.materials])."
        },
        "clone": {
          "!type": "fn() -> Face3",
          "!doc": "Creates a new clone of the Face3 object."
        }
      },
      "!doc": "Triangle face.",
      "!type": "fn(a: number, b: number, c: number, normal: Vector3, color: Color, materialIndex: number)"
    },
    "Geometry": {
      "!name": "Geometry",
      "!url": "http://threejs.org/docs/#Reference/core/Geometry",
      "prototype": {
        "!proto": "PointCloud",
        "id": {
          "!type": "number",
          "!doc": "Unique number for this geometry instance."
        },
        "vertices": {
          "!type": "array",
          "!doc": "Array of [page:Vector3 vertices].<br>\n\t\tThe array of vertices holds every position of points in the model.<br>\n\t\tTo signal an update in this array, [page:Geometry Geometry.verticesNeedUpdate] needs to be set to true."
        },
        "faces": {
          "!type": "array",
          "!doc": "Array of [page:Face3 triangles].<br>\n\t\tThe array of faces describe how each vertex in the model is connected with each other.<br>\n\t\tTo signal an update in this array, [page:Geometry Geometry.elementsNeedUpdate] needs to be set to true."
        },
        "morphTargets": {
          "!type": "array",
          "!doc": "Array of morph targets. Each morph target is a Javascript object:\n\t\t<code>{ name: \"targetName\", vertices: [ new THREE.Vector3(), ... ] }</code>\n\t\tMorph vertices match number and order of primary vertices."
        },
        "morphNormals": {
          "!type": "array",
          "!doc": "Array of morph normals. Morph normals have similar structure as morph targets, each normal set is a Javascript object:\n\t\t<code>morphNormal = { name: \"NormalName\", normals: [ new THREE.Vector3(), ... ] }</code>"
        },
        "skinIndices": {
          "!type": "array",
          "!doc": "Array of skinning indices, matching number and order of vertices."
        },
        "boundingSphere": {
          "!type": "object",
          "!doc": "Bounding sphere.\n\t\t<code>{ radius: float }</code>"
        },
        "dynamic": {
          "!type": "boolean",
          "!doc": "Set to *true* if attribute buffers will need to change in runtime (using \"dirty\" flags).<br>\n\t\tUnless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.<br>\n\t\tDefaults to true."
        },
        "elementsNeedUpdate": {
          "!type": "boolean",
          "!doc": "Set to *true* if the faces array has been updated."
        },
        "normalsNeedUpdate": {
          "!type": "boolean",
          "!doc": "Set to *true* if the normals array has been updated."
        },
        "colorsNeedUpdate": {
          "!type": "boolean",
          "!doc": "Set to *true* if the colors array has been updated."
        },
        "lineDistances": {
          "!type": "array",
          "!doc": "An array containing distances between vertices for Line geometries.\n\t\tThis is required for LinePieces/LineDashedMaterial to render correctly.\n\t\tLine distances can also be generated with computeLineDistances."
        },
        "applyMatrix": {
          "!type": "fn(matrix: +THREE.Matrix4)",
          "!doc": "Bakes matrix transform directly into vertex coordinates."
        },
        "computeVertexNormals": {
          "!type": "fn()",
          "!doc": "Computes vertex normals by averaging face normals.<br>\n\t\tFace normals must be existing / computed beforehand."
        },
        "computeTangents": {
          "!type": "fn()",
          "!doc": "Computes vertex tangents.<br>\n\t\tBased on [link:http://www.terathon.com/code/tangent.html]<br>\n\t\tGeometry must have vertex [page:UV UVs] (layer 0 will be used)."
        },
        "computeBoundingSphere": {
          "!type": "fn()",
          "!doc": "Neither bounding boxes or bounding spheres are computed by default. They need to be explicitly computed, otherwise they are *null*."
        },
        "mergeVertices": {
          "!type": "fn()",
          "!doc": "Checks for duplicate vertices using hashmap.<br>\n\t\tDuplicated vertices are removed and faces' vertices are updated."
        },
        "dispose": {
          "!type": "fn()",
          "!doc": "Removes The object from memory. <br>\n\t\tDon't forget to call this method when you remove a geometry because it can cause memory leaks."
        }
      },
      "!doc": "Base class for geometries.<br>\n\t\tA geometry holds all data necessary to describe a 3D model.",
      "!type": "fn()"
    },
    "Object3D": {
      "!name": "Object3D",
      "!url": "http://threejs.org/docs/#Reference/core/Object3D",
      "prototype": {
        "!proto": "Mesh",
        "id": {
          "!type": "number",
          "!doc": "readonly – Unique number for this object instance."
        },
        "name": {
          "!type": "string",
          "!doc": "Optional name of the object (doesn't need to be unique)."
        },
        "children": {
          "!type": "Object3D",
          "!doc": "Array with object's children."
        },
        "rotation": {
          "!type": "Euler",
          "!doc": "Object's local rotation (<a href=\"https://en.wikipedia.org/wiki/Euler_angles\" target=\"_blank\">Euler angles</a>), in radians."
        },
        "up": {
          "!type": "Vector3",
          "!doc": "Up direction."
        },
        "quaternion": {
          "!type": "Quaternion",
          "!doc": "Object's local rotation as [page:Quaternion Quaternion]."
        },
        "castShadow": {
          "!type": "boolean",
          "!doc": "default – false"
        },
        "frustumCulled": {
          "!type": "boolean",
          "!doc": "default – true"
        },
        "matrixWorldNeedsUpdate": {
          "!type": "boolean",
          "!doc": "default – false"
        },
        "userData": {
          "!type": "object",
          "!doc": "An object that can be used to store custom data about the Object3d. It should not hold references to functions as these will not be cloned."
        },
        "applyMatrix": {
          "!type": "fn(matrix: +THREE.Matrix4)",
          "!doc": "This updates the position, rotation and scale with the matrix."
        },
        "translateY": {
          "!type": "fn(distance: number)",
          "!doc": "Translates object along y axis by distance."
        },
        "localToWorld": {
          "!type": "fn(vector: Vector3) -> Vector3",
          "!doc": "Updates the vector from local space to world space."
        },
        "lookAt": {
          "!type": "fn(vector: Vector3)",
          "!doc": "Rotates object to face point in space."
        },
        "traverse": {
          "!type": "fn(callback: function)",
          "!doc": "Executes the callback on this object and all descendants."
        },
        "traverseAncestors": {
          "!type": "fn(callback: function)",
          "!doc": "Executes the callback on this object and all ancestors."
        },
        "updateMatrixWorld": {
          "!type": "fn(force: boolean)",
          "!doc": "Updates global transform of the object and its children."
        },
        "getObjectByName": {
          "!type": "fn(name: string) -> Object3D",
          "!doc": "Searches through the object's children and returns the first with a matching name."
        },
        "translateOnAxis": {
          "!type": "fn(axis: Vector3, distance: number) -> Object3D",
          "!doc": "Translate an object by distance along an axis in object space. The axis is assumed to be normalized."
        },
        "raycast": {
          "!type": "fn(raycaster: Raycaster, intersects: array) -> array",
          "!doc": "Abstract method to get intersections between a casted ray and this object. Subclasses such as [page:Mesh], [page:Line], and [page:PointCloud] implement this method in order to participate in raycasting."
        }
      },
      "!doc": "Base class for scene graph objects.",
      "!type": "fn()"
    },
    "Raycaster": {
      "!name": "Raycaster",
      "!url": "http://threejs.org/docs/#Reference/core/Raycaster",
      "prototype": {
        "!proto": "Mesh",
        "ray": {
          "!type": "Ray",
          "!doc": "The Ray used for the raycasting."
        },
        "far": {
          "!type": "float",
          "!doc": "The far factor of the raycaster. This value indicates which objects can be discarded based on the distance.<br>\n\t\tThis value shouldn't be negative and should be larger than the near property."
        },
        "set": {
          "!type": "fn(origin: Vector3, direction: Vector3)",
          "!doc": "Updates the ray with a new origin and direction."
        },
        "intersectObject": {
          "!type": "fn(object: Object3D, recursive: boolean) -> array",
          "!doc": "Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first. An array of intersections is returned...\n        <code>\n            [ { distance, point, face, faceIndex, indices, object }, ... ]\n        </code>\n        <p>\n        [page:Float distance] – distance between the origin of the ray and the intersection<br>\n        [page:Vector3 point] – point of intersection, in world coordinates<br>\n        [page:Face3 face] – intersected face<br>\n        [page:Integer faceIndex] – index of the intersected face<br>\n        [page:Array indices] – indices of vertices comprising the intersected face<br>\n        [page:Object3D object] – the intersected object\n    \t</p>\n        <p>\n        When intersecting a [page:Mesh] with a [page:BufferGeometry], the *faceIndex* will be *undefined*, and *indices* will be set; when intersecting a [page:Mesh] with a [page:Geometry], *indices* will be *undefined*. \n        </p>\n\t\t<p>\n\t\t*Raycaster* delegates to the [page:Object3D.raycast raycast] method of the passed object, when evaluating whether the ray intersects the object or not. This allows [page:Mesh meshes] to respond differently to ray casting than [page:Line lines] and [page:PointCloud pointclouds].\n\t\t</p>\n\t\t<p>\n\t\t*Note* that for meshes, faces must be pointed towards the origin of the [page:.ray ray] in order to be detected; intersections of the ray passing through the back of a face will not be detected. To raycast against both faces of an object, you'll want to set the [page:Mesh.material material]'s [page:Material.side side] property to *THREE.DoubleSide*.  \n\t\t</p>"
        }
      },
      "!doc": "This class makes raycasting easier. Raycasting is used for picking and more.",
      "!type": "fn(origin: Vector3, direction: Vector3, near: number, far: number)"
    },
    "Lut": {
      "!name": "Lut",
      "!url": "http://threejs.org/docs/#Reference/examples/Lut",
      "prototype": {
        "minV": {
          "!type": "number",
          "!doc": "The minimum value to be represented with the lookup table. Default is 0."
        },
        "copy": {
          "!type": "fn(lut: Lut)",
          "!doc": "Copies given lut."
        },
        "setminV": {
          "!type": "fn(minV: number) -> Lut",
          "!doc": "Sets this Lut with the minimum value to be represented."
        },
        "changeNumberOfColors": {
          "!type": "fn(numberOfColors: number) -> Lut",
          "!doc": "Sets this Lut with the number of colors to be used."
        },
        "addColorMap": {
          "!type": "fn(colorMapName, arrayOfColors) -> Lut",
          "!doc": "Insert a new color map into the set of available color maps."
        }
      },
      "!doc": "Represents a lookup table for colormaps. It is used to determine the color values from a range of data values.",
      "!type": "fn(colormap, numberOfColors)"
    },
    "CombinedCamera": {
      "!name": "CombinedCamera",
      "!url": "http://threejs.org/docs/#Reference/examples/cameras/CombinedCamera",
      "prototype": {
        "!proto": "Camera",
        "fov": {
          "!type": "number",
          "!doc": "Gets or sets the camera frustum vertical field of view in perspective view."
        },
        "right": {
          "!type": "number",
          "!doc": "Gets or sets the camera frustum right plane in orthographic view."
        },
        "bottom": {
          "!type": "number",
          "!doc": "Gets or sets the camera frustum bottom plane in orthographic view."
        },
        "near": {
          "!type": "number",
          "!doc": "Gets camera frustum near plane."
        },
        "cameraO": {
          "!type": "OrthographicCamera",
          "!doc": "Gets or sets the internal OrthographicCamera used as camera."
        },
        "inOrthographicMode": {
          "!type": "boolean",
          "!doc": "Gets whether the combinedCamera is in Orthographic Mode."
        },
        "setFov": {
          "!type": "fn(fov: number)",
          "!doc": "sets the camera frustum vertical field of view in perspective view."
        },
        "setLens": {
          "!type": "fn(focalLength: number, frameHeight: number)",
          "!doc": "Sets the fov based on lens data."
        },
        "toBackView": {
          "!type": "fn()",
          "!doc": "Sets the camera to view the back of the target."
        },
        "toRightView": {
          "!type": "fn()",
          "!doc": "Sets the camera to view the right of the target."
        },
        "toBottomView": {
          "!type": "fn()",
          "!doc": "Sets the camera to view the bottom."
        },
        "toOrthographic": {
          "!type": "fn()",
          "!doc": "Change the camera to orthographic view."
        },
        "updateProjectionMatrix": {
          "!type": "fn()",
          "!doc": "Updates the ProjectionMatrix."
        }
      },
      "!doc": "A general purpose camera, for setting FOV, Lens Focal Length,\n \t\tand switching between perspective and orthographic views easily.\n \t\tUse this only if you do not wish to manage\n \t\tboth an Orthographic and Perspective Camera",
      "!type": "fn(width: number, height: number, fov: number, near: number, far: number, orthoNear: number, orthoFar: number)"
    },
    "FontUtils": {
      "!name": "FontUtils",
      "!url": "http://threejs.org/docs/#Reference/extras/FontUtils",
      "prototype": {
        "!proto": "TextGeometry",
        "divisions": {
          "!type": "number",
          "!doc": "The amount of segments in a curve. Default is 10."
        },
        "weight": {
          "!type": "string",
          "!doc": "The weight of the used font. Default is \"normal\"."
        },
        "faces": {
          "!type": "object",
          "!doc": "All Fonts which are already loaded in."
        },
        "drawText": {
          "!type": "fn(text: string) -> object",
          "!doc": "Calculates the path and offset of the text in the used font. It returns an  object like { paths : fontPaths, offset : width }."
        },
        "extractGlyphPoints": {
          "!type": "fn(c: string, face: string, scale: number, offset: number, path: Path) -> object",
          "!doc": "This ectracts the glyphPoints of the character of the face and returns an object containing the path and the new offset."
        },
        "loadFace": {
          "!type": "fn(data: object) -> object",
          "!doc": "This loads and saves the data of the face and return the data. When you add the font Data as javascriptfile, then this automatically get called. So there is no need to do this yourself."
        }
      },
      "!doc": "A class for text operations in three.js (See [page:TextGeometry])"
    },
    "GeometryUtils": {
      "!name": "GeometryUtils",
      "!url": "http://threejs.org/docs/#Reference/extras/GeometryUtils",
      "prototype": {},
      "!doc": "Contains handy functions geometry manipulations."
    },
    "ImageUtils": {
      "!name": "ImageUtils",
      "!url": "http://threejs.org/docs/#Reference/extras/ImageUtils",
      "prototype": {
        "crossOrigin": {
          "!type": "string",
          "!doc": "The crossOrigin string to implement CORS for loading the image from a different domain that allows CORS."
        },
        "generateDataTexture": {
          "!type": "fn(width: number, height: number, color: number) -> DataTexture",
          "!doc": "Generates a texture of a single color. It is a DataTexture with format, RGBFormat."
        },
        "loadCompressedTexture": {
          "!type": "fn(url: todo, mapping: todo, onLoad: todo, onError: todo) -> todo",
          "!doc": "todo"
        },
        "getNormalMap": {
          "!type": "fn(image: todo, depth: todo) -> todo",
          "!doc": "todo"
        },
        "loadTextureCube": {
          "!type": "fn(array: todo, mapping: todo, onLoad: todo, onError: todo) -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "A Helper class to ease the loading of images of different types."
    },
    "SceneUtils": {
      "!name": "SceneUtils",
      "!url": "http://threejs.org/docs/#Reference/extras/SceneUtils",
      "prototype": {
        "createMultiMaterialObject": {
          "!type": "fn(geometry: Geometry, materials: array) -> Object3D",
          "!doc": "Creates an new Object3D an new mesh for each material defined in materials. Beware that this is not the same as Meshfacematerial which defines multiple material for 1 mesh.<br>\n\t\tThis is mostly useful for object that need a material and a wireframe implementation."
        },
        "detach": {
          "!type": "fn(child: Object3D, parent: Object3D, scene: Object3D)",
          "!doc": "Detaches the object from the parent and adds it back to the scene without moving in worldspace."
        }
      },
      "!doc": "A class containing useful utility functions for scene manipulation."
    },
    "Animation": {
      "!name": "Animation",
      "!url": "http://threejs.org/docs/#Reference/extras/animation/Animation",
      "prototype": {
        "root": {
          "!type": "Object3d",
          "!doc": "The root object of the animation."
        },
        "hierarchy": {
          "!type": "array",
          "!doc": "The objects that are influenced by the animation."
        },
        "timeScale": {
          "!type": "number",
          "!doc": "The timez"
        },
        "isPaused": {
          "!type": "boolean",
          "!doc": "Indicates whether the animation is paused. This shouldn't be adapted by user code."
        },
        "interpolationType": {
          "!type": "number",
          "!doc": "The type to indicate how to interpolate between 2 data points."
        },
        "play": {
          "!type": "fn(startTime: number)",
          "!doc": "Starts the animation from a moment startTime in the animation."
        },
        "update": {
          "!type": "fn(deltaTimeMS: number) -> boolean",
          "!doc": "Updates the animation in time. This shouldn't be called by user code. The animationHandler calls this method."
        },
        "getNextKeyWith": {
          "!type": "fn(type: string, h: object, key: number) -> object",
          "!doc": "Gets the next key. Is used in Update."
        }
      },
      "!doc": "This class animates an object based on an hierarchy. This hierarchy can be Object3ds or bones.",
      "!type": "fn(root: Object3d, name: string)"
    },
    "AnimationHandler": {
      "!name": "AnimationHandler",
      "!url": "http://threejs.org/docs/#Reference/extras/animation/AnimationHandler",
      "prototype": {
        "CATMULLROM": {
          "!type": "number",
          "!doc": "Enum Value to indicate that the animation needs to be interpolated as CATMULLROM."
        },
        "LINEAR": {
          "!type": "number",
          "!doc": "Enum Value to indicate that the animation needs to be interpolated as LINEAR."
        },
        "removeFromUpdate": {
          "!type": "fn(animation: Animation)",
          "!doc": "Removes the animation from the update cycle. This gets called when the animation stops. This shouldn't be called by usercode."
        },
        "update": {
          "!type": "fn(deltaTimeMS: number)",
          "!doc": "Updates all active animations with deltaTime."
        },
        "add": {
          "!type": "fn(data: object)",
          "!doc": "Adds the animationData from its library."
        }
      },
      "!doc": "The AnimationHandler handles the initialisation of the Animation data and \n\t\tthe animations itself. It keeps track of every animation and if it's active or not.\n\t\tIt also update all animations which are active if its method *update* is called.",
      "!type": "fn()"
    },
    "AnimationMorphTarget": {
      "!name": "AnimationMorphTarget",
      "!url": "http://threejs.org/docs/#Reference/extras/animation/AnimationMorphTarget",
      "prototype": {
        "root": {
          "!type": "todo",
          "!doc": "todo"
        },
        "hierarchy": {
          "!type": "todo",
          "!doc": "todo"
        },
        "timeScale": {
          "!type": "number",
          "!doc": "todo"
        },
        "isPaused": {
          "!type": "boolean",
          "!doc": "todo"
        },
        "influence": {
          "!type": "number",
          "!doc": "todo"
        },
        "play": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        },
        "stop": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn(root: todo, data: todo)"
    },
    "KeyFrameAnimation": {
      "!name": "KeyFrameAnimation",
      "!url": "http://threejs.org/docs/#Reference/extras/animation/KeyFrameAnimation",
      "prototype": {
        "root": {
          "!type": "todo",
          "!doc": "todo"
        },
        "hierarchy": {
          "!type": "todo",
          "!doc": "todo"
        },
        "timeScale": {
          "!type": "number",
          "!doc": "todo"
        },
        "isPaused": {
          "!type": "boolean",
          "!doc": "todo"
        },
        "JITCompile": {
          "!type": "boolean",
          "!doc": "todo"
        },
        "play": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        },
        "stop": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        },
        "interpolateCatmullRom": {
          "!type": "fn(points: todo, scale: todo) -> todo",
          "!doc": "todo"
        },
        "getPrevKeyWith": {
          "!type": "fn(sid: todo, h: todo, key: todo) -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn(root: todo, data: todo, JITCompile: todo)"
    },
    "Curve": {
      "!name": "Curve",
      "!url": "http://threejs.org/docs/#Reference/extras/core/Curve",
      "prototype": {
        "getPoint": {
          "!type": "fn(t) -> Vector",
          "!doc": "Returns a vector for point t of the curve where t is between 0 and 1"
        },
        "getPoints": {
          "!type": "fn(divisions) -> array",
          "!doc": "Get sequence of points using getPoint( t )"
        },
        "getLength": {
          "!type": "fn() -> number",
          "!doc": "Get total curve arc length"
        },
        "updateArcLengths": {
          "!type": "fn()",
          "!doc": "Update the cumlative segment distance cache"
        },
        "getTangent": {
          "!type": "fn(t) -> Vector",
          "!doc": "Returns a unit vector tangent at t. If the subclassed curve do not implement its tangent derivation, 2 points a small delta apart will be used to find its gradient which seems to give a reasonable approximation"
        }
      },
      "!doc": "An extensible curve object which contains methods for interpolation.",
      "!type": "fn()"
    },
    "CurvePath": {
      "!name": "CurvePath",
      "!url": "http://threejs.org/docs/#Reference/extras/core/CurvePath",
      "prototype": {
        "!proto": "Curve",
        "curves": {
          "!type": "array",
          "!doc": "todo"
        },
        "autoClose": {
          "!type": "boolean",
          "!doc": "todo"
        },
        "getWrapPoints": {
          "!type": "fn(oldPts: todo, path: todo) -> todo",
          "!doc": "todo"
        },
        "addWrapPath": {
          "!type": "fn(bendpath: todo) -> todo",
          "!doc": "todo"
        },
        "add": {
          "!type": "fn(curve: todo) -> todo",
          "!doc": "todo"
        },
        "createSpacedPointsGeometry": {
          "!type": "fn(divisions: todo) -> todo",
          "!doc": "todo"
        },
        "getBoundingBox": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        },
        "getTransformedPoints": {
          "!type": "fn(segments: todo, bends: todo) -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn()"
    },
    "Gyroscope": {
      "!name": "Gyroscope",
      "!url": "http://threejs.org/docs/#Reference/extras/core/Gyroscope",
      "prototype": {
        "!proto": "Object3D"
      },
      "!doc": "todo",
      "!type": "fn()"
    },
    "Path": {
      "!name": "Path",
      "!url": "http://threejs.org/docs/#Reference/extras/core/Path",
      "prototype": {
        "!proto": "CurvePath",
        "actions": {
          "!type": "array",
          "!doc": "The possible actions that define the path."
        },
        "fromPoints": {
          "!type": "fn(vectors) -> todo",
          "!doc": "Adds to the Path from the points. The first vector defines the offset. After that the lines get defined."
        },
        "lineTo": {
          "!type": "fn(x, y) -> todo",
          "!doc": "This creates a line from the offset to X and Y and updates the offset to X and Y."
        },
        "bezierCurveTo": {
          "!type": "fn(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) -> todo",
          "!doc": "This creates a bezier curve from the offset to aX and aY with aCP1x, aCP1y and aCP1x, aCP1y  as control points and updates the offset to aX and aY."
        },
        "arc": {
          "!type": "fn(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) -> todo",
          "!doc": "todo"
        },
        "ellipse": {
          "!type": "fn(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise) -> todo",
          "!doc": "todo"
        },
        "toShapes": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "A 2d path representation, comprising of points, lines, and cubes,  similar to the html5 2d canvas api. It extends CurvePath.",
      "!type": "fn(points: todo)"
    },
    "Shape": {
      "!name": "Shape",
      "!url": "http://threejs.org/docs/#Reference/extras/core/Shape",
      "prototype": {
        "!proto": "Path",
        "holes": {
          "!type": "array",
          "!doc": "todo"
        },
        "makeGeometry": {
          "!type": "fn(options: todo) -> todo",
          "!doc": "Convenience method to return ShapeGeometry"
        },
        "extrude": {
          "!type": "fn(options: todo) -> todo",
          "!doc": "Convenience method to return ExtrudeGeometry"
        },
        "extractAllSpacedPoints": {
          "!type": "fn(divisions: todo) -> todo",
          "!doc": "todo"
        },
        "getSpacedPointsHoles": {
          "!type": "fn(divisions: todo) -> todo",
          "!doc": "Get points of holes (spaced by regular distance)"
        }
      },
      "!doc": "Defines a 2d shape plane using paths.",
      "!type": "fn()"
    },
    "ArcCurve": {
      "!name": "ArcCurve",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/ArcCurve",
      "prototype": {
        "!proto": "EllipseCurve"
      },
      "!doc": "Alias for [page:EllipseCurve]"
    },
    "ClosedSplineCurve3": {
      "!name": "ClosedSplineCurve3",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/ClosedSplineCurve3",
      "prototype": {
        "!proto": "Curve",
        "points": "array"
      },
      "!doc": "Create a smooth 3d spline curve from a series of points that loops back onto itself",
      "!type": "fn(points: array)"
    },
    "CubicBezierCurve": {
      "!name": "CubicBezierCurve",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/CubicBezierCurve",
      "prototype": {
        "!proto": "Curve",
        "v0": "Vector2",
        "v2": "Vector2"
      },
      "!doc": "Create a smooth 2d <a href=\"http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:Bezier_curve.svg\" target=\"_blank\">cubic bezier curve</a>."
    },
    "CubicBezierCurve3": {
      "!name": "CubicBezierCurve3",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/CubicBezierCurve3",
      "prototype": {
        "!proto": "Curve",
        "v0": "Vector3",
        "v2": "Vector3"
      },
      "!doc": "Create a smooth 3d <a href=\"http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:Bezier_curve.svg\" target=\"_blank\">cubic bezier curve</a>.",
      "!type": "fn(v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3)"
    },
    "EllipseCurve": {
      "!name": "EllipseCurve",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/EllipseCurve",
      "prototype": {
        "!proto": "Curve",
        "aX": "number",
        "xRadius": "Radians",
        "aStartAngle": "number",
        "aClockwise": "boolean"
      },
      "!doc": "Creates a 2d curve in the shape of an ellipse.",
      "!type": "fn(aX: number, aY: number, xRadius: number, yRadius: number, aStartAngle: Radians, aEndAngle: Radians, aClockwise: boolean)"
    },
    "LineCurve": {
      "!name": "LineCurve",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/LineCurve",
      "prototype": {
        "!proto": "Curve",
        "v1": "Vector2"
      },
      "!doc": "A curve representing a 2d line segment",
      "!type": "fn(v1: Vector2, v2: Vector2)"
    },
    "LineCurve3": {
      "!name": "LineCurve3",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/LineCurve3",
      "prototype": {
        "!proto": "Curve",
        "v1": "Vector3"
      },
      "!doc": "A curve representing a 3d line segment",
      "!type": "fn(v1: Vector3, v2: Vector3)"
    },
    "QuadraticBezierCurve": {
      "!name": "QuadraticBezierCurve",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/QuadraticBezierCurve",
      "prototype": {
        "!proto": "Curve",
        "v0": "Vector2",
        "v2": "Vector2"
      },
      "!doc": "Create a smooth 2d <a href=\"http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:B%C3%A9zier_2_big.gif\" target=\"_blank\">quadratic bezier curve</a>.",
      "!type": "fn(v0: Vector2, v1: Vector2, v2: Vector2)"
    },
    "QuadraticBezierCurve3": {
      "!name": "QuadraticBezierCurve3",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/QuadraticBezierCurve3",
      "prototype": {
        "!proto": "Curve",
        "v0": "Vector3",
        "v2": "Vector3"
      },
      "!doc": "Create a smooth 3d <a href=\"http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:B%C3%A9zier_2_big.gif\" target=\"_blank\">quadratic bezier curve</a>.",
      "!type": "fn(v0: Vector3, v1: Vector3, v2: Vector3)"
    },
    "SplineCurve": {
      "!name": "SplineCurve",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/SplineCurve",
      "prototype": {
        "!proto": "Curve",
        "points": "array"
      },
      "!doc": "Create a smooth 2d spline curve from a series of points",
      "!type": "fn(points: array)"
    },
    "SplineCurve3": {
      "!name": "SplineCurve3",
      "!url": "http://threejs.org/docs/#Reference/extras/curves/SplineCurve3",
      "prototype": {
        "!proto": "Curve",
        "points": "array"
      },
      "!doc": "Create a smooth 3d spline curve from a series of points",
      "!type": "fn(points: array)"
    },
    "BoxGeometry": {
      "!name": "BoxGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/BoxGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "BoxGeometry is the quadrilateral primitive geometry class. It is typically used for creating a cube or irregular quadrilateral of the dimensions provided with the 'width', 'height', and 'depth' constructor arguments.",
      "!type": "fn(width: number, height: number, depth: number, widthSegments: number, heightSegments: number, depthSegments: number)"
    },
    "CircleGeometry": {
      "!name": "CircleGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/CircleGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "CircleGeometry is a simple shape of Euclidean geometry.  It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius.  It is built counter-clockwise from a start angle and a given central angle.  It can also be used to create regular polygons, where the number of segments determines the number of sides.",
      "!type": "fn(radius: number, segments: number, thetaStart: number, thetaLength: number)"
    },
    "CubeGeometry": {
      "!name": "CubeGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/CubeGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "Renamed CubeGeometry to BoxGeometry. see [page:BoxGeometry]."
    },
    "CylinderGeometry": {
      "!name": "CylinderGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/CylinderGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "A class for generating cylinder geometries",
      "!type": "fn(radiusTop: number, radiusBottom: number, height: number, radiusSegments: number, heightSegments: number, openEnded: boolean, thetaStart: number, thetaLength: number)"
    },
    "DodecahedronGeometry": {
      "!name": "DodecahedronGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/DodecahedronGeometry",
      "prototype": {
        "!proto": "PolyhedronGeometry",
        "parameters": {
          "!type": "object",
          "!doc": "An object with all of the parameters that were used to generate the geometry."
        }
      },
      "!doc": "A class for generating a dodecahedron geometries.",
      "!type": "fn(radius: number, detail: number)"
    },
    "ExtrudeGeometry": {
      "!name": "ExtrudeGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/ExtrudeGeometry",
      "prototype": {
        "!proto": "Geometry",
        "addShapeList": {
          "!type": "fn(shapes: array, options: object)",
          "!doc": "Adds the shapes to the list to extrude."
        }
      },
      "!doc": "Creates extruded geometry from a path shape",
      "!type": "fn(shapes: array, options: object)"
    },
    "IcosahedronGeometry": {
      "!name": "IcosahedronGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/IcosahedronGeometry",
      "prototype": {
        "!proto": "PolyhedronGeometry",
        "parameters": {
          "!type": "object",
          "!doc": "An object with all of the parameters that were used to generate the geometry."
        }
      },
      "!doc": "A class for generating an icosahedron geometry.",
      "!type": "fn(radius: number, detail: number)"
    },
    "LatheGeometry": {
      "!name": "LatheGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/LatheGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "Class for generating meshes with axial symmetry. Possible uses include donuts, pipes, vases etc. The lathe rotate around the Z axis.",
      "!type": "fn(points: array, segments: number, phiStart: number, phiLength: number)"
    },
    "OctahedronGeometry": {
      "!name": "OctahedronGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/OctahedronGeometry",
      "prototype": {
        "!proto": "PolyhedronGeometry",
        "parameters": {
          "!type": "object",
          "!doc": "An object with all of the parameters that were used to generate the geometry."
        }
      },
      "!doc": "A class for generating an octahedron geometry.",
      "!type": "fn(radius: number, detail: number)"
    },
    "ParametricGeometry": {
      "!name": "ParametricGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/ParametricGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "Generate geometry representing a parametric surface.",
      "!type": "fn(func: function, slices: number, stacks: number)"
    },
    "PlaneGeometry": {
      "!name": "PlaneGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/PlaneGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "A class for generating plane geometries",
      "!type": "fn(width: number, height: number, widthSegments: number, heightSegments: number)"
    },
    "PolyhedronGeometry": {
      "!name": "PolyhedronGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/PolyhedronGeometry",
      "prototype": {
        "!proto": "Geometry",
        "parameters": {
          "!type": "object",
          "!doc": "An object with all of the parameters that were used to generate the geometry."
        }
      },
      "!doc": "A polyhedron is a solid in three dimensions with flat faces. This class will take an array of vertices,\n\t\t\tproject them onto a sphere, and then divide them up to the desired level of detail. This class is used\n\t\t\tby [page:DodecahedronGeometry], [page:IcosahedronGeometry], [page:OctahedronGeometry],\n\t\t\tand [page:TetrahedronGeometry] to generate their respective geometries.",
      "!type": "fn(vertices: array, faces: array, radius: number, detail: number)"
    },
    "RingGeometry": {
      "!name": "RingGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/RingGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "A class for generating a two-dimensional ring geometry.",
      "!type": "fn(innerRadius: number, outerRadius: number, thetaSegments: number, phiSegments: number, thetaStart: number, thetaLength: number)"
    },
    "ShapeGeometry": {
      "!name": "ShapeGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/ShapeGeometry",
      "prototype": {
        "!proto": "Geometry",
        "addShape": {
          "!type": "fn(shape: Shape, options: object)",
          "!doc": "Adds a single shape to the geometry"
        }
      },
      "!doc": "Creates a one-sided polygonal geometry from one or more path shapes. Similar to [page:ExtrudeGeometry]",
      "!type": "fn(shapes: array, options: object)"
    },
    "SphereGeometry": {
      "!name": "SphereGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/SphereGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "A class for generating sphere geometries",
      "!type": "fn(radius: number, widthSegments: number, heightSegments: number, phiStart: number, phiLength: number, thetaStart: number, thetaLength: number)"
    },
    "TetrahedronGeometry": {
      "!name": "TetrahedronGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/TetrahedronGeometry",
      "prototype": {
        "!proto": "PolyhedronGeometry",
        "parameters": {
          "!type": "object",
          "!doc": "An object with all of the parameters that were used to generate the geometry."
        }
      },
      "!doc": "A class for generating a tetrahedron geometries.",
      "!type": "fn(radius: number, detail: number)"
    },
    "TextGeometry": {
      "!name": "TextGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/TextGeometry",
      "prototype": {
        "!proto": "ExtrudeGeometry"
      },
      "!doc": "This object creates an 3D object of text as a single object.",
      "!type": "fn(text: string, parameters: object)"
    },
    "TorusGeometry": {
      "!name": "TorusGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/TorusGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "A class for generating torus geometries",
      "!type": "fn(radius: number, tube: number, radialSegments: number, tubularSegments: number, arc: number)"
    },
    "TorusKnotGeometry": {
      "!name": "TorusKnotGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/TorusKnotGeometry",
      "prototype": {
        "!proto": "Geometry"
      },
      "!doc": "Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q.  If p and q are not coprime, the result will be a torus link.",
      "!type": "fn(radius: number, tube: number, radialSegments: number, tubularSegments: number, p: number, q: number, heightScale: number)"
    },
    "TubeGeometry": {
      "!name": "TubeGeometry",
      "!url": "http://threejs.org/docs/#Reference/extras/geometries/TubeGeometry",
      "prototype": {
        "!proto": "Geometry",
        "parameters": {
          "!type": "object",
          "!doc": "An object with all of the parameters that were used to generate the geometry."
        },
        "normals": {
          "!type": "array",
          "!doc": "An array of [page:Vector3] normals"
        }
      },
      "!doc": "Creates a tube that extrudes along a 3d curve",
      "!type": "fn(path: Curve, segments: number, radius: number, radiusSegments: number, closed: boolean)"
    },
    "ArrowHelper": {
      "!name": "ArrowHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/ArrowHelper",
      "prototype": {
        "!proto": "Object3D",
        "line": {
          "!type": "Line",
          "!doc": "Contains the line part of the arrowHelper."
        },
        "setColor": {
          "!type": "fn(hex: number)",
          "!doc": "Sets the color of the arrowHelper."
        },
        "setDirection": {
          "!type": "fn(dir: Vector3)",
          "!doc": "Sets the direction of the arrowhelper."
        }
      },
      "!doc": "An 3D arrow Object.",
      "!type": "fn(dir: Vector3, origin: Vector3, length: number, hex: number, headLength: number, headWidth: number)"
    },
    "AxisHelper": {
      "!name": "AxisHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/AxisHelper",
      "prototype": {
        "!proto": "Line"
      },
      "!doc": "An axis object to visualize the the 3 axes in a simple way. <br>\n\t\t\tThe X axis is red. The Y axis is green. The Z axis is blue.",
      "!type": "fn(size: number)"
    },
    "BoundingBoxHelper": {
      "!name": "BoundingBoxHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/BoundingBoxHelper",
      "prototype": {
        "!proto": "Mesh",
        "object": {
          "!type": "Object3D",
          "!doc": "Contains the object3D to show the world-axis-aligned boundingbox."
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the BoundingBoxHelper based on the object property."
        }
      },
      "!doc": "A helper object to show the world-axis-aligned bounding box for an object.",
      "!type": "fn(object: Object3D, hex: number)"
    },
    "BoxHelper": {
      "!name": "BoxHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/BoxHelper",
      "prototype": {
        "!proto": "Line",
        "update": {
          "!type": "fn(object: Object3D)",
          "!doc": "Updates the helper's geometry to match the dimensions of the [page:Geometry.boundingBox bounding box] of the passed object's geometry.\n\n\t\t<h2>Source</h2>\n\n\t\t[link:https://github.com/mrdoob/three.js/blob/master/src/[path].js src/[path].js]"
        }
      },
      "!doc": "Helper object to show a wireframe box (with no face diagonals) around an object",
      "!type": "fn(object: Object3D)"
    },
    "CameraHelper": {
      "!name": "CameraHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/CameraHelper",
      "prototype": {
        "!proto": "Line",
        "pointMap": {
          "!type": "object",
          "!doc": "This contains the points to viualize the cameraHelper"
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the helper based on the projectionMatrix of the camera."
        }
      },
      "!doc": "The camera Helper is an Object3D which helps visualizing what a camera contains in its frustum.<br>\n\t\tIt visualizes the frustum with an line Geometry.",
      "!type": "fn(camera: Camera)"
    },
    "DirectionalLightHelper": {
      "!name": "DirectionalLightHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/DirectionalLightHelper",
      "prototype": {
        "!proto": "Object3D",
        "lightPlane": {
          "!type": "Line",
          "!doc": "Contains the line mesh showing the location of the directional light."
        },
        "targetLine": {
          "!type": "Line",
          "!doc": "Contains the line mesh that shows the direction of the light."
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the helper to match the position and direction of the [page:.light]."
        }
      },
      "!doc": "Visualize a [page:DirectionalLight]'s effect on the scene",
      "!type": "fn(light: DirectionalLight, size: number)"
    },
    "EdgesHelper": {
      "!name": "EdgesHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/EdgesHelper",
      "prototype": {
        "!proto": "Line"
      },
      "!doc": "Creates a wireframe object that shows the \"hard\" edges of another object's geometry. To draw a full wireframe image of an object, see [page:WireframeHelper].",
      "!type": "fn(object: Object3D, color: Color, thresholdAngle: number)"
    },
    "FaceNormalsHelper": {
      "!name": "FaceNormalsHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/FaceNormalsHelper",
      "prototype": {
        "!proto": "Line",
        "object": {
          "!type": "Object3D",
          "!doc": "The attached object"
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the face normal preview based on movement of the object."
        }
      },
      "!doc": "Renders [page:ArrowHelper arrows] to visualize an object's [page:Face3 face] normals. Requires that the object's geometry be an instance of [page:Geometry] (does not work with [page:BufferGeometry]), and that face normals have been specified on all [page:Face3 faces] or calculated with [page:Geometry.computeFaceNormals computeFaceNormals].",
      "!type": "fn(object: Object3D, size: number, color: Color, linewidth: number)"
    },
    "GridHelper": {
      "!name": "GridHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/GridHelper",
      "prototype": {
        "!proto": "Line",
        "setColors": {
          "!type": "fn(colorCenterLine: number, colorGrid: number)",
          "!doc": "Updates the color of the grid lines."
        }
      },
      "!doc": "The GridHelper is an object to define grids. Grids are two-dimensional arrays of lines.",
      "!type": "fn(size: number, step: number)"
    },
    "HemisphereLightHelper": {
      "!name": "HemisphereLightHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/HemisphereLightHelper",
      "prototype": {
        "!proto": "Object3D",
        "lightSphere": {
          "!type": "Mesh",
          "!doc": "The sphere mesh that shows the location of the hemispherelight."
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the helper to match the position and direction of the [page:.light]."
        }
      },
      "!doc": "Creates a visual aid for a [page:HemisphereLight HemisphereLight].",
      "!type": "fn(light: HemisphereLight, sphereSize: number)"
    },
    "PointLightHelper": {
      "!name": "PointLightHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/PointLightHelper",
      "prototype": {
        "!proto": "Mesh",
        "lightSphere": {
          "!type": "Mesh",
          "!doc": "todo"
        },
        "update": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "This display a helper for a pointLight",
      "!type": "fn(light: todo, sphereSize: todo)"
    },
    "SpotLightHelper": {
      "!name": "SpotLightHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/SpotLightHelper",
      "prototype": {
        "!proto": "Object3D",
        "lightSphere": {
          "!type": "Mesh",
          "!doc": "todo"
        },
        "lightCone": {
          "!type": "Mesh",
          "!doc": "todo"
        },
        "update": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn(light: todo, sphereSize: todo)"
    },
    "VertexNormalsHelper": {
      "!name": "VertexNormalsHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/VertexNormalsHelper",
      "prototype": {
        "!proto": "Line",
        "object": {
          "!type": "Object3D",
          "!doc": "The attached object"
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the vertex normal preview based on movement of the object."
        }
      },
      "!doc": "Renders [page:ArrowHelper arrows] to visualize an object's vertex normal vectors. Requires that normals have been specified in a [page:BufferAttribute custom attribute] or have been calculated using [page:Geometry.computeVertexNormals computeVertexNormals].",
      "!type": "fn(object: Object3D, size: number, color: Color, linewidth: number)"
    },
    "VertexTangentsHelper": {
      "!name": "VertexTangentsHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/VertexTangentsHelper",
      "prototype": {
        "!proto": "Line",
        "object": {
          "!type": "Object3D",
          "!doc": "The attached object"
        },
        "update": {
          "!type": "fn()",
          "!doc": "Updates the vertex tangent preview arrows based on the new position and tangents of the object."
        }
      },
      "!doc": "Renders [page:ArrowHelper arrows] to visualize an object's vertex tangent vectors. Requires that tangents have been specified in a [page:BufferAttribute custom attribute] or have been computed using [page:Geometry.computeTangents computeTangents].",
      "!type": "fn(object: Object3D, size: number, color: Color, linewidth: number)"
    },
    "WireframeHelper": {
      "!name": "WireframeHelper",
      "!url": "http://threejs.org/docs/#Reference/extras/helpers/WireframeHelper",
      "prototype": {
        "!proto": "Line"
      },
      "!doc": "Creates a wireframe object that shows the edges of another object's geometry. To draw a  wireframe image showing only \"hard\" edges (edges between non-coplanar faces), see [page:EdgesHelper].",
      "!type": "fn(object: Object3D, color: Color)"
    },
    "ImmediateRenderObject": {
      "!name": "ImmediateRenderObject",
      "!url": "http://threejs.org/docs/#Reference/extras/objects/ImmediateRenderObject",
      "prototype": {
        "!proto": "Object3D",
        "render": {
          "!type": "fn(renderCallback: function)",
          "!doc": "This function needs to be overridden to start the creation of the object and should call renderCallback when finished."
        }
      },
      "!doc": "base class for immediate rendering objects.",
      "!type": "fn()"
    },
    "MorphBlendMesh": {
      "!name": "MorphBlendMesh",
      "!url": "http://threejs.org/docs/#Reference/extras/objects/MorphBlendMesh",
      "prototype": {
        "!proto": "Mesh",
        "animationsMap": {
          "!type": "object",
          "!doc": "todo"
        },
        "setAnimationWeight": {
          "!type": "fn(name: todo, weight: todo) -> todo",
          "!doc": "todo"
        },
        "createAnimation": {
          "!type": "fn(name: todo, start: todo, end: todo, fps: todo) -> todo",
          "!doc": "todo"
        },
        "update": {
          "!type": "fn(delta: todo) -> todo",
          "!doc": "todo"
        },
        "setAnimationDuration": {
          "!type": "fn(name: todo, duration: todo) -> todo",
          "!doc": "todo"
        },
        "getAnimationDuration": {
          "!type": "fn(name: todo) -> todo",
          "!doc": "todo"
        },
        "setAnimationDirectionBackward": {
          "!type": "fn(name: todo) -> todo",
          "!doc": "todo"
        },
        "stopAnimation": {
          "!type": "fn(name: todo) -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn(geometry: todo, material: todo)"
    },
    "AmbientLight": {
      "!name": "AmbientLight",
      "!url": "http://threejs.org/docs/#Reference/lights/AmbientLight",
      "prototype": {
        "!proto": "Object3D"
      },
      "!doc": "This light's color gets applied to all the objects in the scene globally.",
      "!type": "fn(hex: number)"
    },
    "AreaLight": {
      "!name": "AreaLight",
      "!url": "http://threejs.org/docs/#Reference/lights/AreaLight",
      "prototype": {
        "!proto": "Object3D",
        "right": {
          "!type": "Vector3",
          "!doc": "Sets or gets an unit vector that indicates the right side of the light. This is calculated in local space."
        },
        "height": {
          "!type": "number",
          "!doc": "Sets or gets the height of the illuminating plane."
        },
        "intensity": {
          "!type": "number",
          "!doc": "Light's intensity.<br>\n\t\tDefault — *1.0*."
        },
        "linearAttenuation": {
          "!type": "number",
          "!doc": "Sets or gets the attention of the light in linear space. This increases the attenuation linearly with the distance from the light."
        }
      },
      "!doc": "This illuminates the scene from a complete surface. This light only works in the [page:WebGLDeferredRenderer deferredrenderer].",
      "!type": "fn(hex: number, intensity: number)"
    },
    "DirectionalLight": {
      "!name": "DirectionalLight",
      "!url": "http://threejs.org/docs/#Reference/lights/DirectionalLight",
      "prototype": {
        "!proto": "Object3D",
        "target": {
          "!type": "Object3D",
          "!doc": "Target used for shadow camera orientation."
        },
        "onlyShadow": {
          "!type": "boolean",
          "!doc": "If set to *true* light will only cast shadow but not contribute any lighting (as if *intensity* was 0 but cheaper to compute).<br>\n\t\t\tDefault — *false*."
        },
        "shadowCameraFar": {
          "!type": "number",
          "!doc": "Orthographic shadow camera frustum parameter.<br>\n\t\t\tDefault — *5000*."
        },
        "shadowCameraRight": {
          "!type": "number",
          "!doc": "Orthographic shadow camera frustum parameter.<br>\n\t\t\tDefault — *500*."
        },
        "shadowCameraBottom": {
          "!type": "number",
          "!doc": "Orthographic shadow camera frustum parameter.<br>\n\t\t\tDefault — *-500*."
        },
        "shadowBias": {
          "!type": "number",
          "!doc": "Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow.<br>\n\t\t\tDefault — *0*."
        },
        "shadowMapWidth": {
          "!type": "number",
          "!doc": "Shadow map texture width in pixels.<br>\n\t\t\tDefault — *512*."
        },
        "shadowCascade": {
          "!type": "boolean",
          "!doc": "**Experimental** If true, use a series of shadow maps in a cascade. This can give better z-depth resolution for a directional light. <br>\n\t\t\tDefault — *false*."
        },
        "shadowCascadeOffset": {
          "!type": "Vector3",
          "!doc": "A relative position to real camera where virtual shadow cameras are attached. A magic vector; scene and light orientation dependent. <br>\n\t\t\tDefault — *Three.Vector3( 0, 0, -1000 )*."
        },
        "shadowCascadeWidth": {
          "!type": "array",
          "!doc": "An array of shadowMapWidth values for the corresponding shadow map in the cascade, near to far. <br>\n\t\t\tDefault — <strong>[ 512, 512, 512 ]</strong>."
        },
        "shadowCascadeNearZ": {
          "!type": "array",
          "!doc": "An array of shadowMapNear values for the corresponding shadow map in the cascade, near to far. These typically start with -1.0 (near plane) and match with the previous shadowCascadeFarZ array value.<br>\n\t\t\tDefault — <strong>[ -1.000, 0.990, 0.998 ]</strong>."
        },
        "shadowCascadeArray": {
          "!type": "array",
          "!doc": "Array of size shadowCascadeCount of [page:DirectionalLight THREE.DirectionalLight] objects. This holds the series of separate shadow maps in a cascade, near to far. Created internally."
        },
        "shadowCamera": {
          "!type": "OrthographicCamera",
          "!doc": "The shadow's view of the world. Computed internally during rendering from the shadowCamera* settings."
        },
        "shadowMap": {
          "!type": "WebGLRenderTarget",
          "!doc": "The depth map generated using the shadowCamera; a location beyond a pixel's depth is in shadow. Computed internally during rendering."
        }
      },
      "!doc": "Affects objects using [page:MeshLambertMaterial] or [page:MeshPhongMaterial].",
      "!type": "fn(hex: number, intensity: number)"
    },
    "HemisphereLight": {
      "!name": "HemisphereLight",
      "!url": "http://threejs.org/docs/#Reference/lights/HemisphereLight",
      "prototype": {
        "!proto": "Object3D",
        "groundColor": {
          "!type": "number",
          "!doc": "Light's ground color.<br>"
        }
      },
      "!doc": "A light source positioned directly above the scene.",
      "!type": "fn(skyColorHex: number, groundColorHex: number, intensity: number)"
    },
    "Light": {
      "!name": "Light",
      "!url": "http://threejs.org/docs/#Reference/lights/Light",
      "prototype": {
        "!proto": "Object3D",
        "color": {
          "!type": "Color",
          "!doc": "Color of the light.<br>"
        }
      },
      "!doc": "Abstract base class for lights.",
      "!type": "fn(hex: number)"
    },
    "PointLight": {
      "!name": "PointLight",
      "!url": "http://threejs.org/docs/#Reference/lights/PointLight",
      "prototype": {
        "!proto": "Object3D",
        "intensity": {
          "!type": "number",
          "!doc": "Light's intensity.<br>\n\t\t\tDefault - *1.0*."
        }
      },
      "!doc": "Affects objects using [page:MeshLambertMaterial] or [page:MeshPhongMaterial].",
      "!type": "fn(hex: number, intensity: number, distance: number)"
    },
    "SpotLight": {
      "!name": "SpotLight",
      "!url": "http://threejs.org/docs/#Reference/lights/SpotLight",
      "prototype": {
        "!proto": "Object3D",
        "target": {
          "!type": "Object3D",
          "!doc": "Spotlight focus points at target.position.<br>\n\t\t\tDefault position — *(0,0,0)*."
        },
        "distance": {
          "!type": "number",
          "!doc": "If non-zero, light will attenuate linearly from maximum intensity at light *position* down to zero at *distance*.<br>\n\t\t\tDefault — *0.0*."
        },
        "exponent": {
          "!type": "number",
          "!doc": "Rapidity of the falloff of light from its target direction.<br>\n\t\t\tDefault — *10.0*."
        },
        "onlyShadow": {
          "!type": "boolean",
          "!doc": "If set to *true* light will only cast shadow but not contribute any lighting (as if *intensity* was 0 but cheaper to compute).<br>\n\t\t\tDefault — *false*."
        },
        "shadowCameraFar": {
          "!type": "number",
          "!doc": "Perspective shadow camera frustum <em>far</em> parameter.<br>\n\t\t\tDefault — *5000*."
        },
        "shadowCameraVisible": {
          "!type": "boolean",
          "!doc": "Show debug shadow camera frustum.<br>\n\t\t\tDefault — *false*."
        },
        "shadowDarkness": {
          "!type": "number",
          "!doc": "Darkness of shadow casted by this light (from *0* to *1*).<br>\n\t\t\tDefault — *0.5*."
        },
        "shadowMapHeight": {
          "!type": "number",
          "!doc": "Shadow map texture height in pixels.<br>\n\t\t\tDefault — *512*."
        },
        "shadowCamera": {
          "!type": "PerspectiveCamera",
          "!doc": "The shadow's view of the world. Computed internally during rendering from the shadowCamera* settings."
        },
        "shadowMap": {
          "!type": "WebGLRenderTarget",
          "!doc": "The depth map generated using the shadowCamera; a location beyond a pixel's depth is in shadow. Computed internally during rendering."
        }
      },
      "!doc": "A point light that can cast shadow in one direction.",
      "!type": "fn(hex: number, intensity: number, distance: todo, angle: todo, exponent: todo)"
    },
    "BabylonLoader": {
      "!name": "BabylonLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/BabylonLoader",
      "prototype": {
        "!proto": "Object3D",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and call onLoad with the parsed response content."
        }
      },
      "!doc": "A loader for loading a <em>.babylon</em> resource.",
      "!type": "fn(manager: LoadingManager)"
    },
    "BufferGeometryLoader": {
      "!name": "BufferGeometryLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/BufferGeometryLoader",
      "prototype": {
        "!proto": "BufferGeometry",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and call onLoad with the parsed response content."
        }
      },
      "!doc": "A loader for loading a [page:BufferGeometry].",
      "!type": "fn(manager: LoadingManager)"
    },
    "Cache": {
      "!name": "Cache",
      "!url": "http://threejs.org/docs/#Reference/loaders/Cache",
      "prototype": {
        "!proto": "XHRLoader",
        "files": {
          "!type": "object",
          "!doc": "An [page:Object object] that hold cached values."
        },
        "add": {
          "!type": "fn(key: string, value)",
          "!doc": "Adds a cache entry with that key to hold the value. If this key already holds a value, it is overwritten."
        },
        "remove": {
          "!type": "fn(key: string)",
          "!doc": "Remove the cached value associated with the key."
        }
      },
      "!doc": "A simple caching classe, used internaly by [page:XHRLoader].",
      "!type": "fn()"
    },
    "ColladaLoader": {
      "!name": "ColladaLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/ColladaLoader",
      "prototype": {
        "!proto": "Geometry",
        "options": {
          "!type": "array",
          "!doc": "&nbsp;.[page:Boolean centerGeometry] — Force [page:Geometry] to always be centered at the local origin of the containing [page: Mesh].<br>\n\t\t&nbsp;.[page:Boolean convertUpAxis] — Axis conversion is done for geometries, animations, and controllers.<br>\n\t\t&nbsp;.[page:Boolean subdivideFaces] — Force subdivision into multiple [page: Face3].<br>\n\t\t&nbsp;.[page:String upAxis] — X, Y or Z<br>\n\t\t&nbsp;.[page:Boolean defaultEnvMap] — Cubemap to use for reflective or refractive materials.<br>"
        },
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function)",
          "!doc": "Begin loading from url and call onLoad with the parsed response content."
        },
        "setPreferredShading": {
          "!type": "fn(shading: number)",
          "!doc": "Set the .[page:Integer shading] property on the resource's materials.<br>\n\t\tOptions are [page:Materials THREE.SmoothShading], [page:Materials THREE.FlatShading], [page:Materials THREE.NoShading]."
        }
      },
      "!doc": "A loader for <em>Collada</em> files.",
      "!type": "fn()"
    },
    "ImageLoader": {
      "!name": "ImageLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/ImageLoader",
      "prototype": {
        "!proto": "Image",
        "crossOrigin": {
          "!type": "string",
          "!doc": "The crossOrigin string to implement CORS for loading the url from a different domain that allows CORS."
        },
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and return the [page:Image image] object that will contain the data."
        }
      },
      "!doc": "A loader for loading an [page:Image].",
      "!type": "fn(manager: LoadingManager)"
    },
    "JSONLoader": {
      "!name": "JSONLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/JSONLoader",
      "prototype": {
        "!proto": "Loader",
        "withCredentials": {
          "!type": "boolean",
          "!doc": "If true, the ajax request will use cookies."
        },
        "statusDomElement": {
          "!type": "DOMElement",
          "!doc": "This is the recipient of status messages."
        },
        "onLoadComplete": {
          "!type": "function",
          "!doc": "The default is a function with empty body."
        },
        "load": {
          "!type": "fn(url: string, callback: function, texturePath: string)",
          "!doc": "[page:String url] — required<br>\n\t\t[page:Function callback] — required. Will be called when load completes. The arguments will be the loaded [page:Object3D] and the loaded [page:Array materials].<br>\n\t\t[page:String texturePath] — optional. If not specified, textures will be assumed to be in the same folder as the Javascript model file."
        },
        "parse": {
          "!type": "fn(json: object, texturePath: string) -> Object3D",
          "!doc": "Parse a <em>JSON</em> structure and return an [page:Object] containing the parsed .[page:Geometry] and .[page:Array materials]."
        },
        "updateProgress": {
          "!type": "fn(progress: object)",
          "!doc": "Updates the DOM object with the progress made."
        },
        "initMaterials": {
          "!type": "fn(materials: array, texturePath: string) -> array",
          "!doc": "Creates an array of [page:Material] based on the array of parameters m. The index of the parameters decide the correct index of the materials."
        },
        "addStatusElement": {
          "!type": "fn() -> DOMElement",
          "!doc": "Add a DOM element to indicate the progress and return the DOMElement"
        }
      },
      "!doc": "A loader for loading objects in JSON format.",
      "!type": "fn(showStatus: boolean)"
    },
    "Loader": {
      "!name": "Loader",
      "!url": "http://threejs.org/docs/#Reference/loaders/Loader",
      "prototype": {
        "!proto": "Material",
        "showStatus": {
          "!type": "boolean",
          "!doc": "If true, show loading status in the statusDomElement."
        },
        "onLoadStart": {
          "!type": "function",
          "!doc": "The default is a function with empty body."
        },
        "onLoadComplete": {
          "!type": "function",
          "!doc": "The default is a function with empty body."
        },
        "needsTangents": {
          "!type": "fn(materials: array) -> boolean",
          "!doc": "Checks if the loaded object needs tangents based on its materials."
        },
        "createMaterial": {
          "!type": "fn(m: object, texturePath: string) -> Material",
          "!doc": "Creates the Material based on the parameters m."
        },
        "extractUrlBase": {
          "!type": "fn(url: string) -> string",
          "!doc": "Extract the base from the URL."
        }
      },
      "!doc": "Base class for implementing loaders.",
      "!type": "fn(showStatus: boolean)"
    },
    "LoadingManager": {
      "!name": "LoadingManager",
      "!url": "http://threejs.org/docs/#Reference/loaders/LoadingManager",
      "prototype": {
        "onLoad": {
          "!type": "function",
          "!doc": "The function that needs to be called when all loaders are done."
        },
        "onError": {
          "!type": "function",
          "!doc": "The function that needs to be called when an item errors."
        },
        "itemStart": {
          "!type": "fn(url: string)",
          "!doc": "This should be called by any loader used by the manager when the loader starts loading an url. These shouldn't be called outside a loader."
        }
      },
      "!doc": "Handles and keeps track of loaded and pending data.",
      "!type": "fn(onLoad: function, onProgress: function, onError: function)"
    },
    "MTLLoader": {
      "!name": "MTLLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/MTLLoader",
      "prototype": {
        "!proto": "OBJMTLLoader",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and return the loaded material."
        }
      },
      "!doc": "A loader for loading an <em>.mtl</em> resource, used internaly by [page:OBJMTLLoader] and [page:UTF8Loader].",
      "!type": "fn(baseUrl: string, options: object, crossOrigin: string)"
    },
    "MaterialLoader": {
      "!name": "MaterialLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/MaterialLoader",
      "prototype": {
        "!proto": "Material",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and return the [page:Material] object that will contain the data."
        },
        "parse": {
          "!type": "fn(json: object) -> Material",
          "!doc": "Parse a <em>JSON</em> structure and create a new [page:Material] of the type [page:String json.type] with parameters defined in the json object."
        }
      },
      "!doc": "A loader for loading a [page:Material] in JSON format.",
      "!type": "fn(manager: LoadingManager)"
    },
    "OBJLoader": {
      "!name": "OBJLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/OBJLoader",
      "prototype": {
        "!proto": "Object3D",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and call onLoad with the parsed response content."
        }
      },
      "!doc": "A loader for loading an <em>.obj</em> resource.",
      "!type": "fn(manager: LoadingManager)"
    },
    "OBJMTLLoader": {
      "!name": "OBJMTLLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/OBJMTLLoader",
      "prototype": {
        "!proto": "Object3D",
        "load": {
          "!type": "fn(objUrl: string, mtlUrl: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from urls and call onLoad with the parsed response content."
        }
      },
      "!doc": "A loader for loading a <em>.obj</em> and its <em>.mtl</em> together.",
      "!type": "fn(manager: LoadingManager)"
    },
    "ObjectLoader": {
      "!name": "ObjectLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/ObjectLoader",
      "prototype": {
        "!proto": "JSONLoader",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and call onLoad with the parsed response content."
        },
        "setCrossOrigin": {
          "!type": "fn(value: string)",
          "!doc": "[page:String value] — The crossOrigin string to implement CORS for loading the url from a different domain that allows CORS."
        }
      },
      "!doc": "A loader for loading a JSON resource. Unlike the [page:JSONLoader], this one make use of the <em>.type</em> attributes of objects to map them to their original classes.",
      "!type": "fn(manager: LoadingManager)"
    },
    "PDBLoader": {
      "!name": "PDBLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/PDBLoader",
      "prototype": {
        "!proto": "Geometry",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and call onLoad with the parsed response content."
        },
        "createModel": {
          "!type": "fn(json: object, callback: function)",
          "!doc": "Parse a <em>(JSON) pdb</em> structure and return two [page:Geometry]: one for atoms, one for bonds.<br>"
        }
      },
      "!doc": "A loader for loading a <em>.pdb</em> resource.\n\t\t<br><br>\n\t\tThe <a href=\"http://en.wikipedia.org/wiki/Protein_Data_Bank_(file_format)\">Protein Data Bank file format</a> is a textual file format describing the three-dimensional structures of molecules.",
      "!type": "fn(manager: LoadingManager)"
    },
    "SVGLoader": {
      "!name": "SVGLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/SVGLoader",
      "prototype": {
        "!proto": "SVGDocument",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and call onLoad with the response content."
        }
      },
      "!doc": "A loader for loading an <em>.svg</em> resource.",
      "!type": "fn(manager: LoadingManager)"
    },
    "TGALoader": {
      "!name": "TGALoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/TGALoader",
      "prototype": {
        "!proto": "DataTexture",
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function) -> DataTexture",
          "!doc": "Begin loading from url and pass the loaded [page:DataTexture texture] to onLoad. The [page:DataTexture texture] is also directly returned for immediate use (but may not be fully loaded)."
        }
      },
      "!doc": "Class for loading a <em>.tga</em> [page:DataTexture texture].",
      "!type": "fn(manager: LoadingManager)"
    },
    "TextureLoader": {
      "!name": "TextureLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/TextureLoader",
      "prototype": {
        "crossOrigin": {
          "!type": "string",
          "!doc": "default — *null*.<br>\n\t\tIf set, assigns the *crossOrigin* attribute of the image to the value of *crossOrigin*, prior to starting the load."
        },
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and pass the loaded [page:Texture texture] to onLoad."
        }
      },
      "!doc": "Class for loading a [page:Texture texture].",
      "!type": "fn(manager: LoadingManager)"
    },
    "XHRLoader": {
      "!name": "XHRLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/XHRLoader",
      "prototype": {
        "cache": {
          "!type": "Cache",
          "!doc": "A [page:Cache cache] instance that hold the response from each request made through this loader, so each file is requested once."
        },
        "responseType": {
          "!type": "string",
          "!doc": "Can be set to change the response type."
        },
        "load": {
          "!type": "fn(url: string, onLoad: function, onProgress: function, onError: function)",
          "!doc": "Begin loading from url and return the [page:String text] response that will contain the data."
        },
        "setResponseType": {
          "!type": "fn(value: string)",
          "!doc": "[page:String value] — the empty string (default), \"arraybuffer\", \"blob\", \"document\", \"json\", or \"text\"."
        }
      },
      "!doc": "A low level class for loading resources with XmlHttpRequest, used internaly by most loaders.",
      "!type": "fn(manager: LoadingManager)"
    },
    "glTFLoader": {
      "!name": "glTFLoader",
      "!url": "http://threejs.org/docs/#Reference/loaders/glTFLoader",
      "prototype": {
        "!proto": "Loader",
        "load": {
          "!type": "fn(url: string, callback: function) -> Object3D",
          "!doc": "Begin loading from url and call the callback function with the parsed response content."
        }
      },
      "!doc": "A loader for loading a <em>.gltf</em> resource in <em>JSON</em> format.\n\t\t<br><br>\n\t\tThe <a href=\"https://www.khronos.org/gltf\">glTF file format</a> is a JSON file format to enable rapid delivery and loading of 3D content.",
      "!type": "fn()"
    },
    "LineBasicMaterial": {
      "!name": "LineBasicMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/LineBasicMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "number",
          "!doc": "Sets the color of the line. Default is 0xffffff."
        },
        "linecap": {
          "!type": "string",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:WebGLRenderer WebGL] renderer, but does work with the [page:CanvasRenderer Canvas] renderer."
        },
        "vertexColors": {
          "!type": "number",
          "!doc": "This setting might not have any effect when used with certain renderers."
        }
      },
      "!doc": "A material for drawing wireframe-style geometries.",
      "!type": "fn(parameters: object)"
    },
    "LineDashedMaterial": {
      "!name": "LineDashedMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/LineDashedMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "Color",
          "!doc": "Sets the color of the line. Default is 0xffffff."
        },
        "scale": {
          "!type": "number",
          "!doc": "The scale of the dashed part of a line."
        },
        "gapSize": {
          "!type": "number",
          "!doc": "The size of the gap. Default is 1."
        },
        "fog": {
          "!type": "boolean",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:CanvasRenderer Canvas] renderer, but does work with the [page:WebGLRenderer WebGL] renderer."
        }
      },
      "!doc": "A material for drawing wireframe-style geometries with dashed lines.",
      "!type": "fn(parameters: object)"
    },
    "Material": {
      "!name": "Material",
      "!url": "http://threejs.org/docs/#Reference/materials/Material",
      "prototype": {
        "!proto": "CanvasRenderer",
        "id": {
          "!type": "number",
          "!doc": "Unique number for this material instance."
        },
        "opacity": {
          "!type": "number",
          "!doc": "Default is *1.0*."
        },
        "blendDst": {
          "!type": "number",
          "!doc": "Blending destination. It's one of the blending mode constants defined in [page:Three Three.js]. Default is [page:CustomBlendingEquation OneMinusSrcAlphaFactor]."
        },
        "depthTest": {
          "!type": "boolean",
          "!doc": "Whether to have depth test enabled when rendering this material. Default is *true*."
        },
        "polygonOffset": {
          "!type": "boolean",
          "!doc": "Whether to use polygon offset. Default is *false*. This corresponds to the *POLYGON_OFFSET_FILL* WebGL feature."
        },
        "polygonOffsetUnits": {
          "!type": "number",
          "!doc": "Sets the polygon offset units. Default is *0*."
        },
        "overdraw": {
          "!type": "number",
          "!doc": "Amount of triangle expansion at draw time. This is a workaround for cases when gaps appear between triangles when using [page:CanvasRenderer]. *0.5* tends to give good results across browsers. Default is *0*."
        },
        "side": {
          "!type": "Enum",
          "!doc": "Default is [page:Materials THREE.FrontSide]. Other options are [page:Materials THREE.BackSide] and [page:Materials THREE.DoubleSide]."
        },
        "clone": {
          "!type": "fn(material: material) -> Material",
          "!doc": "This clones the material in the optional parameter and returns it."
        },
        "setValues": {
          "!type": "fn(values: object)",
          "!doc": "Sets the properties based on the *values*."
        }
      },
      "!doc": "Materials describe the appearance of [page:Object objects]. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.",
      "!type": "fn()"
    },
    "MeshBasicMaterial": {
      "!name": "MeshBasicMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/MeshBasicMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "number",
          "!doc": "Sets the color of the geometry. Default is 0xffffff."
        },
        "specularMap": {
          "!type": "Texture",
          "!doc": "Set specular map. Default is null."
        },
        "envMap": {
          "!type": "TextureCube",
          "!doc": "Set env map. Default is null."
        },
        "shading": {
          "!type": "string",
          "!doc": "Define shading type. Default is THREE.SmoothShading."
        },
        "wireframeLinewidth": {
          "!type": "number",
          "!doc": "Due to limitations in the <a href=\"https://code.google.com/p/angleproject/\" target=\"_blank\">ANGLE layer</a>, on Windows platforms linewidth will always be 1 regardless of the set value."
        },
        "wireframeLinejoin": {
          "!type": "string",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:WebGLRenderer WebGL] renderer, but does work with the [page:CanvasRenderer Canvas] renderer."
        },
        "skinning": {
          "!type": "boolean",
          "!doc": "Define whether the material uses skinning. Default is false."
        },
        "map": {
          "!type": "Texture",
          "!doc": "Sets the texture map. Default is  null."
        },
        "reflectivity": {
          "!type": "number",
          "!doc": "How much the environment map affects the surface; also see \"combine\"."
        }
      },
      "!doc": "A material for drawing geometries in a simple shaded (flat or wireframe) way.",
      "!type": "fn(parameters: object)"
    },
    "MeshDepthMaterial": {
      "!name": "MeshDepthMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/MeshDepthMaterial",
      "prototype": {
        "!proto": "Material",
        "morphTargets": {
          "!type": "boolean",
          "!doc": "Define whether the material uses morphTargets. Default is false."
        },
        "wireframeLinewidth": {
          "!type": "number",
          "!doc": "Controls wireframe thickness. Default is 1.<br><br>\n\t\t\tDue to limitations in the ANGLE layer, on Windows platforms linewidth will always be 1 regardless of the set value."
        }
      },
      "!doc": "A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest.",
      "!type": "fn(parameters: object)"
    },
    "MeshFaceMaterial": {
      "!name": "MeshFaceMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/MeshFaceMaterial",
      "prototype": {
        "materials": {
          "!type": "array",
          "!doc": "Get or set the materials for the geometry."
        }
      },
      "!doc": "A Material to define multiple materials for the same geometry. \n\t\tThe geometry decides which material is used for which faces by the [page:Face3 faces materialindex].\n\t\tThe materialindex corresponds with the index of the material in the materials array.",
      "!type": "fn(materials: array)"
    },
    "MeshLambertMaterial": {
      "!name": "MeshLambertMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/MeshLambertMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "Color",
          "!doc": "Diffuse color of the material. Default is white.<br>"
        },
        "wrapAround": {
          "!type": "boolean",
          "!doc": "Define whether the diffuse lighting wraps around the model or not. This option adds a little more (tintable) light\n\t\t\tonto the side of the object in relation to a light."
        },
        "map": {
          "!type": "Texture",
          "!doc": "Set color texture map. Default is null."
        },
        "specularMap": {
          "!type": "Texture",
          "!doc": "Since this material does not have a specular component, the specular value affects only how much of the environment map affects the surface. Default is null."
        },
        "envMap": {
          "!type": "TextureCube",
          "!doc": "Set env map. Default is null."
        },
        "reflectivity": {
          "!type": "number",
          "!doc": "How much the environment map affects the surface; also see \"combine\"."
        },
        "fog": {
          "!type": "boolean",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:CanvasRenderer Canvas] renderer, but does work with the [page:WebGLRenderer WebGL] renderer."
        },
        "wireframe": {
          "!type": "boolean",
          "!doc": "Whether the triangles' edges are displayed instead of surfaces. Default is *false*."
        },
        "wireframeLinecap": {
          "!type": "string",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:WebGLRenderer WebGL] renderer, but does work with the [page:CanvasRenderer Canvas] renderer."
        },
        "vertexColors": {
          "!type": "number",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:CanvasRenderer Canvas] renderer, but does work with the [page:WebGLRenderer WebGL] renderer."
        },
        "morphTargets": {
          "!type": "boolean",
          "!doc": "Define whether the material uses morphTargets. Default is *false*."
        }
      },
      "!doc": "A material for non-shiny (Lambertian) surfaces, evaluated per vertex.",
      "!type": "fn(parameters: object)"
    },
    "MeshNormalMaterial": {
      "!name": "MeshNormalMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/MeshNormalMaterial",
      "prototype": {
        "!proto": "Material",
        "wireframe": {
          "!type": "boolean",
          "!doc": "Render geometry as wireframe. Default is false (i.e. render as smooth shaded)."
        },
        "morphTargets": {
          "!type": "boolean",
          "!doc": "Define whether the material uses morphTargets. Default is false."
        }
      },
      "!doc": "A material that maps the normal vectors to RGB colors.",
      "!type": "fn(parameters: object)"
    },
    "MeshPhongMaterial": {
      "!name": "MeshPhongMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/MeshPhongMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "Color",
          "!doc": "Diffuse color of the material. Default is white.<br>"
        },
        "specular": {
          "!type": "Color",
          "!doc": "Specular color of the material, i.e., how shiny the material is and the color of its shine. Setting this the same color as the diffuse value (times some intensity) makes the material more metallic-looking; setting this to some gray makes the material look more plastic. Default is dark gray.<br>"
        },
        "metal": {
          "!type": "boolean",
          "!doc": "If set to true the shader multiplies the specular highlight by the underlying color of the object, making\n\t\t\tit appear to be more metal-like and darker. If set to false the specular highlight is added ontop of the\n\t\t\tunderlying colors."
        },
        "wrapRGB": {
          "!type": "Vector3",
          "!doc": "Decide how much of the wrap around values get used if the wrapAround option is set. The x, y, z values correspond\n\t\t\tto the r, g, b values respectively. The typical range is of each is from 0 to 1. For example setting all of the\n\t\t\tvector values to 0.5 will add a moderate amount of light to the side of the model. Changing *b* to 1 will\n\t\t\ttint the light on the side to be more blue. Defaults to (1,1,1)."
        },
        "lightMap": {
          "!type": "Texture",
          "!doc": "Set light map. Default is null."
        },
        "bumpScale": {
          "!type": "number",
          "!doc": "How much the bump map affects the material. Typical ranges are 0-1. Default is 1."
        },
        "normalScale": {
          "!type": "Vector2",
          "!doc": "How much the normal map affects the material. Typical ranges are 0-1. Default is (1,1)."
        },
        "alphaMap": {
          "!type": "Texture",
          "!doc": "Only the color of the texture is used, ignoring the alpha channel if one exists. For RGB and RGBA textures, the [page:WebGLRenderer WebGL] renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected."
        },
        "combine": {
          "!type": "number",
          "!doc": "Options are [page:Textures THREE.MultiplyOperation] (default), [page:Textures THREE.MixOperation], [page:Textures THREE.AddOperation]. If mix is chosen, the reflectivity is used to blend between the two colors."
        },
        "refractionRatio": {
          "!type": "number",
          "!doc": "The index of refraction for an environment map using [page:Textures THREE.CubeRefractionMapping]. Default is *0.98*."
        },
        "shading": {
          "!type": "number",
          "!doc": "Options are [page:Materials THREE.SmoothShading] (default), [page:Materials THREE.FlatShading], [page:Materials THREE.NoShading]."
        },
        "wireframeLinewidth": {
          "!type": "number",
          "!doc": "Due to limitations in the <a href=\"https://code.google.com/p/angleproject/\" target=\"_blank\">ANGLE layer</a>, on Windows platforms linewidth will always be 1 regardless of the set value."
        },
        "wireframeLinejoin": {
          "!type": "string",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:WebGLRenderer WebGL] renderer, but does work with the [page:CanvasRenderer Canvas] renderer."
        },
        "skinning": {
          "!type": "boolean",
          "!doc": "Define whether the material uses skinning. Default is *false*."
        },
        "morphNormals": {
          "!type": "boolean",
          "!doc": "Defines whether the material uses morphNormals. Set as true to pass morphNormal attributes from the [page:Geometry]\n\t\t\tto the shader. Default is *false*."
        }
      },
      "!doc": "A material for shiny surfaces, evaluated per pixel.",
      "!type": "fn(parameters: object)"
    },
    "PointCloudMaterial": {
      "!name": "PointCloudMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/PointCloudMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "number",
          "!doc": "Sets the color of the particles. Default is 0xffffff."
        },
        "size": {
          "!type": "number",
          "!doc": "Sets the size of the particles. Default is 1.0."
        },
        "vertexColors": {
          "!type": "boolean",
          "!doc": "This setting might not have any effect when used with certain renderers. For example, it is ignored with the [page:CanvasRenderer Canvas] renderer, but does work with the [page:WebGLRenderer WebGL] renderer."
        }
      },
      "!doc": "The default material used by [page:PointCloud particle] systems.",
      "!type": "fn(parameters: object)"
    },
    "RawShaderMaterial": {
      "!name": "RawShaderMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/RawShaderMaterial",
      "prototype": {
        "!proto": "ShaderMaterial"
      },
      "!doc": "This class works just like [page:ShaderMaterial], except that definitions of built-in uniforms and attributes are not automatically prepended to the GLSL shader code."
    },
    "ShaderMaterial": {
      "!name": "ShaderMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/ShaderMaterial",
      "prototype": {
        "!proto": "Material",
        "uniforms": {
          "!type": "object",
          "!doc": "Object specifying the uniforms to be passed to the shader code; keys are uniform names, values are definitions of the form\n\t\t<code>\n\t\t{ type: 'f', value: 1.0 }\n\t\t</code>\n\t\twhere *type* is a <a href=\"#uniform-types\">uniform type string</a>, and *value* is the value of the uniform. Names must match the name of the uniform, as defined in the GLSL code. Note that uniforms are refreshed on every frame, so updating the value of the uniform will immediately update the value available to the GLSL code."
        },
        "defines": {
          "!type": "object",
          "!doc": "Defines custom constants using *#define* directives within the GLSL code for both the vertex shader and the fragment shader; each key/value pair yields another directive:\n\t\t<code>\n\t\tdefines: {\n\t\t\tFOO: 15,\n\t\t\tBAR: true\n\t\t}\n\t\t</code>\n\t\tyields the lines\n\t\t<code>\n\t\t#define FOO 15\n\t\t#define BAR true\n\t\t</code>\n\t\tin the GLSL code."
        },
        "fragmentShader": {
          "!type": "string",
          "!doc": "Fragment shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead."
        },
        "linewidth": {
          "!type": "number",
          "!doc": "Due to limitations in the <a href=\"https://code.google.com/p/angleproject/\" target=\"_blank\">ANGLE layer</a>, on Windows platforms linewidth will always be 1 regardless of the set value."
        },
        "wireframeLinewidth": {
          "!type": "number",
          "!doc": "Due to limitations in the <a href=\"https://code.google.com/p/angleproject/\" target=\"_blank\">ANGLE layer</a>, on Windows platforms linewidth will always be 1 regardless of the set value."
        },
        "lights": {
          "!type": "boolean",
          "!doc": "Defines whether this material uses lighting; true to pass uniform data related to lighting to this shader"
        },
        "skinning": {
          "!type": "boolean",
          "!doc": "Define whether the material uses skinning; true to pass skinning attributes to the shader. Default is false."
        },
        "morphNormals": {
          "!type": "boolean",
          "!doc": "Defines whether the material uses morphNormals. Set as true to pass morphNormal attributes from the [page:Geometry]\n\t\t\tto the shader. Default is *false*."
        },
        "clone": {
          "!type": "fn() -> ShaderMaterial",
          "!doc": "Generates a shallow copy of this material. Note that the vertexShader and fragmentShader are copied <emph>by reference</emph>, as are the definitions of the *attributes*; this means that clones of the material will share the same compiled [page:WebGLProgram]. However, the *uniforms* are copied <emph>by value</emph>, which allows you to have different sets of uniforms for different copies of the material."
        }
      },
      "!doc": "Material rendered with custom shaders. A shader is a small program written in [link:https://www.opengl.org/documentation/glsl/ GLSL] to run on the GPU. You may want to use a custom shader if you need to:\n\t\t<ul>\n\t\t\t<li>implement an effect not included with any of the built-in [page:Material materials]</li>\n\t\t\t<li>combine many objects into a single [page:Geometry] or [page:BufferGeometry] in order to improve performance</li>\n\t\t\t<li>associate custom data with individual vertices (\"custom attributes\")</li>\n\t\t</ul>\n\t\tNote that a ShaderMaterial will only be rendered properly by [page:WebGLRenderer], since the GLSL code in the vertexShader and fragmentShader properties must be compiled and run on the GPU using WebGL.",
      "!type": "fn(parameters: object)"
    },
    "SpriteCanvasMaterial": {
      "!name": "SpriteCanvasMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/SpriteCanvasMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "Color",
          "!doc": "The color of the sprite. The material will set up the color for the context before calling the material's program."
        },
        "program": {
          "!type": "fn(context: CanvasRenderingContext2D, color: Color)",
          "!doc": "Define a program that will use the context to draw the sprite."
        }
      },
      "!doc": "Create a material that can draw custom sprites using a 2d canvas.",
      "!type": "fn(parameters: object)"
    },
    "SpriteMaterial": {
      "!name": "SpriteMaterial",
      "!url": "http://threejs.org/docs/#Reference/materials/SpriteMaterial",
      "prototype": {
        "!proto": "Material",
        "color": {
          "!type": "Color",
          "!doc": "The texture is multiplied by this color. The default is 0xffffff"
        },
        "rotation": {
          "!type": "Radians",
          "!doc": "The rotation of the sprite in radians. Default is 0."
        }
      },
      "!doc": "A material for a [page:Sprite].",
      "!type": "fn(parameters: object)"
    },
    "Box2": {
      "!name": "Box2",
      "!url": "http://threejs.org/docs/#Reference/math/Box2",
      "prototype": {
        "!proto": "Vector2",
        "min": {
          "!type": "Vector2",
          "!doc": "Lower (x, y) boundary of this box."
        },
        "set": {
          "!type": "fn(min: Vector2, max: Vector2) -> Box2",
          "!doc": "Sets the lower and upper (x, y) boundaries of this box."
        },
        "clampPoint": {
          "!type": "fn(point: Vector2, optionalTarget: Vector2) -> Vector2",
          "!doc": "Clamps *point* within the bounds of this box."
        },
        "setFromPoints": {
          "!type": "fn(points: array) -> Box2",
          "!doc": "Sets the upper and lower bounds of this box to include all of the points in *points*."
        },
        "union": {
          "!type": "fn(box: Box2) -> Box2",
          "!doc": "Unions this box with *box* setting the upper bound of this box to the greater of the \n\t\ttwo boxes' upper bounds and the lower bound of this box to the lesser of the two boxes'\n\t\tlower bounds."
        },
        "expandByScalar": {
          "!type": "fn(scalar: float) -> Box2",
          "!doc": "Expands each dimension of the box by *scalar*. If negative, the dimensions of the box <br>\n\t\twill be contracted."
        },
        "containsBox": {
          "!type": "fn(box: Box2) -> boolean",
          "!doc": "Returns true if this box includes the entirety of *box*. If this and *box* overlap exactly,<br>\n\t\tthis function also returns true."
        },
        "empty": {
          "!type": "fn() -> boolean",
          "!doc": "Returns true if this box includes zero points within its bounds.<br>\n\t\tNote that a box with equal lower and upper bounds still includes one point, the\n\t\tone both bounds share."
        },
        "equals": {
          "!type": "fn(box: Box2) -> boolean",
          "!doc": "Returns true if this box and *box* share the same lower and upper bounds."
        },
        "copy": {
          "!type": "fn(box: Box2) -> Box2",
          "!doc": "Copies the values of *box* to this box."
        },
        "center": {
          "!type": "fn(optionalTarget: Vector2) -> Vector2",
          "!doc": "Returns the center point of this box."
        },
        "containsPoint": {
          "!type": "fn(point: Vector2) -> boolean",
          "!doc": "Returns true if the specified point lies within the boundaries of this box."
        }
      },
      "!doc": "Represents a boundary box in 2D space.",
      "!type": "fn(min: Vector2, max: Vector2)"
    },
    "Box3": {
      "!name": "Box3",
      "!url": "http://threejs.org/docs/#Reference/math/Box3",
      "prototype": {
        "!proto": "Matrix4",
        "min": {
          "!type": "Vector3",
          "!doc": "Lower (x, y, z) boundary of this box."
        },
        "set": {
          "!type": "fn(min: Vector3, max: Vector3) -> Box3",
          "!doc": "Sets the lower and upper (x, y, z) boundaries of this box."
        },
        "clampPoint": {
          "!type": "fn(point: Vector3, optionalTarget: Vector3) -> Vector3",
          "!doc": "Clamps *point* within the bounds of this box."
        },
        "setFromPoints": {
          "!type": "fn(points: array) -> Box3",
          "!doc": "Sets the upper and lower bounds of this box to include all of the points in *points*."
        },
        "size": {
          "!type": "fn(optionalTarget: Vector3) -> Vector3",
          "!doc": "Returns the width, height, and depth of this box."
        },
        "getParameter": {
          "!type": "fn(point: Vector3, optionalTarget: Vector3) -> Vector3",
          "!doc": "Returns point as a proportion of this box's width and height."
        },
        "containsBox": {
          "!type": "fn(box: Box3) -> boolean",
          "!doc": "Returns true if this box includes the entirety of *box*. If this and *box* overlap exactly,<br>\n\t\tthis function also returns true."
        },
        "translate": {
          "!type": "fn(offset: Vector3) -> Box3",
          "!doc": "Adds *offset* to both the upper and lower bounds of this box, effectively moving this box <br>\n\t\t*offset* units in 3D space."
        },
        "clone": {
          "!type": "fn() -> Box3",
          "!doc": "Returns a copy of this box."
        },
        "expandByPoint": {
          "!type": "fn(point: Vector3) -> Box3",
          "!doc": "Expands the boundaries of this box to include *point*."
        },
        "expandByVector": {
          "!type": "fn(vector: Vector3) -> Box3",
          "!doc": "Expands this box equilaterally by *vector*. The width of this box will be\n\t\texpanded by the x component of *vector* in both directions. The height of \n\t\tthis box will be expanded by the y component of *vector* in both directions.\n\t\tThe depth of this box will be expanded by the z component of *vector* in\n\t\tboth directions."
        },
        "makeEmpty": {
          "!type": "fn() -> Box3",
          "!doc": "Makes this box empty."
        },
        "getBoundingSphere": {
          "!type": "fn(optionalTarget: Sphere) -> Sphere",
          "!doc": "Gets a sphere that bounds the box."
        },
        "setFromCenterAndSize": {
          "!type": "fn(center: Vector3, size: Vector3) -> Box3",
          "!doc": "Centers this box on *center* and sets this box's width and height to the values specified\n\t\tin *size*."
        }
      },
      "!doc": "Represents a boundary box in 3d space.",
      "!type": "fn(min: Vector3, max: Vector3)"
    },
    "Color": {
      "!name": "Color",
      "!url": "http://threejs.org/docs/#Reference/math/Color",
      "prototype": {
        "!proto": "Color",
        "r": {
          "!type": "number",
          "!doc": "Red channel value between 0 and 1. Default is 1."
        },
        "b": {
          "!type": "number",
          "!doc": "Blue channel value between 0 and 1. Default is 1."
        },
        "copy": {
          "!type": "fn(color: Color) -> Color",
          "!doc": "Copies given color."
        },
        "copyLinearToGamma": {
          "!type": "fn(color: Color) -> Color",
          "!doc": "Copies given color making conversion from linear to gamma space."
        },
        "convertLinearToGamma": {
          "!type": "fn() -> Color",
          "!doc": "Converts this color from linear to gamma space."
        },
        "getHex": {
          "!type": "fn() -> number",
          "!doc": "Returns the hexadecimal value of this color."
        },
        "setHex": {
          "!type": "fn(hex: number) -> Color",
          "!doc": "Sets this color from a hexadecimal value."
        },
        "getStyle": {
          "!type": "fn() -> string",
          "!doc": "Returns the value of this color as a CSS-style string. Example: rgb(255,0,0)"
        },
        "offsetHSL": {
          "!type": "fn(h: number, s: number, l: number) -> Color",
          "!doc": "Adds given h, s, and l to this color's existing h, s, and l values."
        },
        "addColors": {
          "!type": "fn(color1: Color, color2: Color) -> Color",
          "!doc": "Sets this color to the sum of color1 and color2"
        },
        "multiply": {
          "!type": "fn(color: Color) -> Color",
          "!doc": "Multiplies this color's rgb values by given color's rgb values"
        },
        "lerp": {
          "!type": "fn(color: Color, alpha) -> Color",
          "!doc": "Linear interpolation of this colors rgb values and the rgb values of the first argument. The alpha argument can be thought of as the percent between the two colors, where 0 is this color and 1 is the first argument."
        },
        "equals": {
          "!type": "fn(c: Color) -> Color",
          "!doc": "Compares this color and c and returns true if they are the same, false otherwise."
        },
        "set": {
          "!type": "fn(value) -> Color",
          "!doc": "Delegates to .copy, .setStyle, or .setHex depending on input type."
        }
      },
      "!doc": "Represents a color.",
      "!type": "fn(value)"
    },
    "Euler": {
      "!name": "Euler",
      "!url": "http://threejs.org/docs/#Reference/math/Euler",
      "prototype": {
        "!proto": "number",
        "x": "number",
        "z": "number",
        "set": {
          "!type": "fn(x: number, y: number, z: number, order: string) -> Euler",
          "!doc": "Sets the angles of this euler transform."
        },
        "setFromRotationMatrix": {
          "!type": "fn(m: Matrix4, order: string) -> Euler",
          "!doc": "Sets the angles of this euler transform from a pure rotation matrix based on the orientation specified by order."
        },
        "reorder": {
          "!type": "fn(newOrder: string) -> Euler",
          "!doc": "Resets the euler angle with a new order by creating a quaternion from this euler angle and then setting this euler angle with the quaternion and the new order. <br>\n\t\tWARNING: this discards revolution information."
        },
        "toVector3": {
          "!type": "fn() -> Vector3",
          "!doc": "Returns the Euler's XYZ properties as a Vector3."
        },
        "toArray": {
          "!type": "fn(array: array) -> array",
          "!doc": "Returns an array [x, y, z, order]"
        },
        "clone": {
          "!type": "fn() -> Euler",
          "!doc": "Returns a new euler created from this euler."
        }
      },
      "!doc": "Euler Angles. <br><br>\n\n\t\tEuler angles describe a rotation transformation by rotating an object on its various axes in specified amounts per axis, and a specified axis order.\n\t\t(More information on <a href=\"http://en.wikipedia.org/wiki/Euler_angles\" target=\"blank\">Wikipedia</a>)",
      "!type": "fn(x: number, y: number, z: number, order: string)"
    },
    "Frustum": {
      "!name": "Frustum",
      "!url": "http://threejs.org/docs/#Reference/math/Frustum",
      "prototype": {
        "!proto": "Plane",
        "planes": {
          "!type": "array",
          "!doc": "Array of 6 [page:Plane planes]."
        },
        "setFromMatrix": {
          "!type": "fn(matrix: Matrix4) -> Frustum",
          "!doc": "Array of 6 [page:Plane planes]."
        },
        "clone": {
          "!type": "fn() -> Frustum",
          "!doc": "Return a copy of this Frustum"
        },
        "copy": {
          "!type": "fn(frustum: Frustum) -> Frustum",
          "!doc": "Copies the values of the passed frustum."
        },
        "intersectsSphere": {
          "!type": "fn(sphere: Sphere) -> boolean",
          "!doc": "Check to see if the sphere intersects with the frustum."
        }
      },
      "!doc": "<a href=\"http://en.wikipedia.org/wiki/Frustum\">Frustums</a> are used to determine what is inside the camera's field of view. They help speed up the rendering process.",
      "!type": "fn(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane)"
    },
    "Line3": {
      "!name": "Line3",
      "!url": "http://threejs.org/docs/#Reference/math/Line3",
      "prototype": {
        "!proto": "Vector3",
        "start": "Vector3",
        "set": {
          "!type": "fn(start: Vector3, end: Vector3) -> Line3",
          "!doc": "Sets the start and end values by copying the provided vectors."
        },
        "clone": {
          "!type": "fn() -> Line3",
          "!doc": "Return a new copy of this [page:Line3]."
        },
        "distance": {
          "!type": "fn() -> number",
          "!doc": "Returns the length of the line segment."
        },
        "applyMatrix4": {
          "!type": "fn(matrix: Matrix4) -> Line3",
          "!doc": "Apply a matrix transform to the line segment."
        },
        "center": {
          "!type": "fn(optionalTarget: Vector3) -> Vector3",
          "!doc": "Return the center of the line segment."
        },
        "closestPointToPoint": {
          "!type": "fn(point: Vector3, clampToLine: boolean, optionalTarget: Vector3) -> Vector3",
          "!doc": "Returns the closets point on the line. If clamp to line is true, then the returned value will be clamped to the line segment."
        }
      },
      "!doc": "A geometric line segment represented by a start and end point.",
      "!type": "fn(start: Vector3, end: Vector3)"
    },
    "Math": {
      "!name": "Math",
      "!url": "http://threejs.org/docs/#Reference/math/Math",
      "prototype": {
        "!proto": "number",
        "clamp": {
          "!type": "fn(x: number, a: number, b: number) -> number",
          "!doc": "Clamps the *x* to be between *a* and *b*."
        },
        "mapLinear": {
          "!type": "fn(x: number, a1: number, a2: number, b1: number, b2: number) -> number",
          "!doc": "Linear mapping of *x* from range [*a1*, *a2*] to range [*b1*, *b2*]."
        },
        "randInt": {
          "!type": "fn(low: number, high: number) -> number",
          "!doc": "Random integer from *low* to *high* interval."
        },
        "randFloatSpread": {
          "!type": "fn(range: number) -> number",
          "!doc": "Random float from *- range / 2* to *range / 2* interval."
        },
        "degToRad": {
          "!type": "fn(degrees: number) -> number",
          "!doc": "Converts degrees to radians."
        },
        "smoothstep": {
          "!type": "fn(x: number, min: number, max: number) -> number",
          "!doc": "Returns a value between 0-1 that represents the percentage that x has moved between min and max, but smoothed or slowed down the closer X is to the min and max.<br><br>\n\t\t\n\t\t[link:http://en.wikipedia.org/wiki/Smoothstep Wikipedia]"
        }
      },
      "!doc": "Math utility functions"
    },
    "Matrix3": {
      "!name": "Matrix3",
      "!url": "http://threejs.org/docs/#Reference/math/Matrix3",
      "prototype": {
        "!proto": "number",
        "elements": {
          "!type": "Float32Array",
          "!doc": "Float32Array with column-major matrix values."
        },
        "transpose": {
          "!type": "fn() -> Matrix3",
          "!doc": "Transposes this matrix in place."
        },
        "determinant": {
          "!type": "fn() -> number",
          "!doc": "Returns the matrix's determinant."
        },
        "multiplyScalar": {
          "!type": "fn(scalar: number) -> Matrix3",
          "!doc": "Multiply every component of the matrix by a scalar value."
        },
        "getNormalMatrix": {
          "!type": "fn(matrix4: Matrix4) -> Matrix3",
          "!doc": "Set this matrix as the normal matrix of the passed [page:Matrix4 matrix4]. The normal matrix is the inverse transpose of the matrix."
        },
        "copy": {
          "!type": "fn(matrix: Matrix3) -> Matrix3",
          "!doc": "Copy the values of the passed matrix."
        },
        "identity": {
          "!type": "fn() -> Matrix3",
          "!doc": "Set as an identity matrix.<br><br>\n\t\t\n\t\t1, 0, 0<br>\n\t\t0, 1, 0<br>\n\t\t0, 0, 1<br>"
        }
      },
      "!doc": "A 3x3 matrix.",
      "!type": "fn(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number)"
    },
    "Matrix4": {
      "!name": "Matrix4",
      "!url": "http://threejs.org/docs/#Reference/math/Matrix4",
      "prototype": {
        "elements": {
          "!type": "Float32Array",
          "!doc": "A column-major list of matrix values."
        },
        "set": {
          "!type": "fn(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number) -> Matrix4",
          "!doc": "Sets all fields of this matrix to the supplied row-major values n11..n44."
        },
        "copy": {
          "!type": "fn(m: Matrix4) -> Matrix4",
          "!doc": "Copies a matrix *m* into this matrix."
        },
        "makeBasis": {
          "!type": "fn(xAxis: Vector3, zAxis: Vector3, zAxis: Vector3) -> Matrix4",
          "!doc": "Creates the basis matrix consisting of the three provided axis vectors.  Returns the current matrix."
        },
        "extractRotation": {
          "!type": "fn(m: Matrix4) -> Matrix4",
          "!doc": "Extracts the rotation of the supplied matrix *m* into this matrix rotation component."
        },
        "multiply": {
          "!type": "fn(m: Matrix4) -> Matrix4",
          "!doc": "Multiplies this matrix by *m*."
        },
        "multiplyToArray": {
          "!type": "fn(a: Matrix4, b: Matrix4, r: array) -> Matrix4",
          "!doc": "Sets this matrix to *a x b* and stores the result into the flat array *r*.<br>\n\t\t*r* can be either a regular Array or a TypedArray."
        },
        "determinant": {
          "!type": "fn() -> number",
          "!doc": "Computes determinant of this matrix.<br>\n\t\tBased on [link:http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm]"
        },
        "flattenToArrayOffset": {
          "!type": "fn(flat: array, offset: number) -> array",
          "!doc": "Flattens this matrix into supplied *flat* array starting from *offset* position in the array."
        },
        "getInverse": {
          "!type": "fn(m: Matrix4) -> Matrix4",
          "!doc": "Sets this matrix to the inverse of matrix *m*.<br>\n\t\tBased on [link:http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm]."
        },
        "makeRotationFromQuaternion": {
          "!type": "fn(q: Quaternion) -> Matrix4",
          "!doc": "Sets the rotation submatrix of this matrix to the rotation specified by *q*. The rest of the matrix is identity."
        },
        "compose": {
          "!type": "fn(translation: Vector3, quaternion: Quaternion, scale: Vector3) -> Matrix4",
          "!doc": "Sets this matrix to the transformation composed of *translation*, *quaternion* and *scale*."
        },
        "makeTranslation": {
          "!type": "fn(x: number, y: number, z: number) -> Matrix4",
          "!doc": "Sets this matrix as translation transform."
        },
        "makeRotationY": {
          "!type": "fn(theta: number) -> Matrix4",
          "!doc": "Sets this matrix as rotation transform around y axis by *theta* radians."
        },
        "makeRotationAxis": {
          "!type": "fn(axis: Vector3, theta: number) -> Matrix4",
          "!doc": "Sets this matrix as rotation transform around *axis* by *angle* radians.<br>\n\t\tBased on [link:http://www.gamedev.net/reference/articles/article1199.asp]."
        },
        "makeFrustum": {
          "!type": "fn(left: number, right: number, bottom: number, top: number, near: number, far: number) -> Matrix4",
          "!doc": "Creates a [page:Frustum frustum] matrix."
        },
        "makeOrthographic": {
          "!type": "fn(left: number, right: number, bottom: number, top: number, near: number, far: number) -> Matrix4",
          "!doc": "Creates an orthographic projection matrix."
        },
        "applyToVector3Array": {
          "!type": "fn(a: array) -> array",
          "!doc": "Multiply (apply) this matrix to every vector3 in the array."
        }
      },
      "!doc": "A 4x4 Matrix.",
      "!type": "fn(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number)"
    },
    "Plane": {
      "!name": "Plane",
      "!url": "http://threejs.org/docs/#Reference/math/Plane",
      "prototype": {
        "!proto": "Vector3",
        "normal": "Vector3",
        "normalize": {
          "!type": "fn() -> Plane",
          "!doc": "Normalizes the normal vector, and adjusts the constant value accordingly."
        },
        "copy": {
          "!type": "fn(plane: Plane) -> Plane",
          "!doc": "Copies the values of the passed plane to this plane."
        },
        "orthoPoint": {
          "!type": "fn(point: Vector3, optionalTarget: Vector3) -> Vector3",
          "!doc": "Returns a vector in the same direction as the Plane's normal, but the magnitude is passed point's original distance to the plane."
        },
        "intersectLine": {
          "!type": "fn(line: Line3, optionalTarget: Vector3) -> Vector3",
          "!doc": "Returns the intersection point of the passed line and the plane. Returns undefined if the line does not intersect. Returns the line's starting point if the line is coplanar with the plane."
        },
        "clone": {
          "!type": "fn() -> Plane",
          "!doc": "Returns a new copy of this plane."
        },
        "equals": {
          "!type": "fn(plane: Plane) -> boolean",
          "!doc": "Checks to see if two planes are equal (their normals and constants match)"
        },
        "distanceToSphere": {
          "!type": "fn(sphere: Sphere) -> number",
          "!doc": "Returns the smallest distance from an edge of the sphere to the plane."
        },
        "projectPoint": {
          "!type": "fn(point: Vector3, optionalTarget: Vector3) -> Vector3",
          "!doc": "Projects a point onto the plane. The projected point is the closest point on the plane to the passed point, so a line drawn from the projected point and the passed point would be orthogonal to the plane."
        },
        "translate": {
          "!type": "fn(offset: Vector3) -> Plane",
          "!doc": "Translates the plane the distance defined by the vector. Note that this only affects the constant (distance from origin) and will not affect the normal vector."
        }
      },
      "!doc": "A two dimensional surface that extends infinitely in 3d space.",
      "!type": "fn(normal: Vector3, constant: number)"
    },
    "Quaternion": {
      "!name": "Quaternion",
      "!url": "http://threejs.org/docs/#Reference/math/Quaternion",
      "prototype": {
        "x": "number",
        "z": "number",
        "set": {
          "!type": "fn(x: number, y: number, z: number, w: number) -> Quaternion",
          "!doc": "Sets values of this quaternion."
        },
        "setFromEuler": {
          "!type": "fn(euler: Euler) -> Quaternion",
          "!doc": "Sets this quaternion from rotation specified by Euler angle."
        },
        "setFromRotationMatrix": {
          "!type": "fn(m: Matrix4) -> Quaternion",
          "!doc": "Sets this quaternion from rotation component of *m*.<br>\n\t\tAdapted from [link:http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm]."
        },
        "inverse": {
          "!type": "fn() -> Quaternion",
          "!doc": "Inverts this quaternion."
        },
        "normalize": {
          "!type": "fn() -> Quaternion",
          "!doc": "Normalizes this quaternion."
        },
        "multiplyQuaternions": {
          "!type": "fn(a: Quaternion, b: Quaternion) -> Quaternion",
          "!doc": "Sets this quaternion to *a x b*<br>\n\t\tAdapted from [link:http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm]."
        },
        "clone": {
          "!type": "fn() -> Quaternion",
          "!doc": "Clones this quaternion."
        },
        "slerp": {
          "!type": "fn(qb: Quaternion, t: float) -> Quaternion",
          "!doc": "Handles the spherical linear interpolation between this quaternion's configuration\n\t\tand that of *qb*. *t* represents how close to the current (0) or target (1) rotation the\n\t\tresult should be."
        },
        "equals": {
          "!type": "fn(v: Quaternion) -> boolean",
          "!doc": "Compares each component of *v* to each component of this quaternion to determine if they\n\t\trepresent the same rotation."
        },
        "fromArray": {
          "!type": "fn(array: array) -> Quaternion",
          "!doc": "Sets this quaternion's component values from an array."
        }
      },
      "!doc": "Implementation of a <a href=\"http://en.wikipedia.org/wiki/Quaternion\">quaternion</a>. This is used for rotating things without encountering the dreaded <a href=\"http://en.wikipedia.org/wiki/Gimbal_lock\">gimbal lock</a> issue, amongst other advantages.",
      "!type": "fn(x: number, y: number, z: number, w: number)"
    },
    "Ray": {
      "!name": "Ray",
      "!url": "http://threejs.org/docs/#Reference/math/Ray",
      "prototype": {
        "!proto": "Vector3",
        "origin": {
          "!type": "Vector3",
          "!doc": "The origin of the [page:Ray]."
        },
        "applyMatrix4": {
          "!type": "fn(matrix4: Matrix4) -> Ray",
          "!doc": "Transform this [page:Ray] by the [page:Matrix4]."
        },
        "clone": {
          "!type": "fn() -> Ray",
          "!doc": "Create a clone of this [page:Ray]."
        },
        "copy": {
          "!type": "fn(ray: Ray) -> Ray",
          "!doc": "Copy the properties of the provided [page:Ray], then return this [page:Ray]."
        },
        "distanceToPlane": {
          "!type": "fn(plane: Plane) -> number",
          "!doc": "Get the distance from the origin to the [page:Plane], or *null* if the [page:Ray] doesn't intersect the [page:Plane]."
        },
        "equals": {
          "!type": "fn(ray: Ray) -> boolean",
          "!doc": "Return whether this and the other [page:Ray] have equal offsets and directions."
        },
        "isIntersectionBox": {
          "!type": "fn(box: Box3) -> boolean",
          "!doc": "Return whether or not this [page:Ray] intersects with the [page:Box3]."
        },
        "isIntersectionSphere": {
          "!type": "fn(sphere: Sphere) -> boolean",
          "!doc": "Return whether or not this [page:Ray] intersects with the [page:Sphere]."
        },
        "set": {
          "!type": "fn(origin: Vector3, direction: Vector3) -> Ray",
          "!doc": "Copy the parameters to the origin and direction properties."
        }
      },
      "!doc": "A ray that emits from an origin in a certain direction.",
      "!type": "fn(origin: Vector3, direction: Vector3)"
    },
    "Sphere": {
      "!name": "Sphere",
      "!url": "http://threejs.org/docs/#Reference/math/Sphere",
      "prototype": {
        "!proto": "Vector3",
        "center": "Vector3",
        "applyMatrix4": {
          "!type": "fn(matrix: Matrix4) -> Sphere",
          "!doc": "Transforms this sphere with the provided [page:Matrix4]."
        },
        "translate": {
          "!type": "fn(offset: Vector3) -> Sphere",
          "!doc": "Translate the sphere's center by the provided offset vector."
        },
        "equals": {
          "!type": "fn(sphere: Sphere) -> boolean",
          "!doc": "Checks to see if the two spheres' centers and radii are equal."
        },
        "distanceToPoint": {
          "!type": "fn(point: Vector3) -> number",
          "!doc": "Returns the closest distance from the boundary of the sphere to the point. If the sphere contains the point, the distance will be negative."
        },
        "containsPoint": {
          "!type": "fn(point: Vector3) -> boolean",
          "!doc": "Checks to see if the sphere contains the provided point inclusive of the edge of the sphere."
        },
        "intersectsSphere": {
          "!type": "fn(sphere: Sphere) -> boolean",
          "!doc": "Checks to see if two spheres intersect."
        }
      },
      "!doc": "A geometric sphere defined by a center position and radius.",
      "!type": "fn(center: Vector3, radius: number)"
    },
    "Spline": {
      "!name": "Spline",
      "!url": "http://threejs.org/docs/#Reference/math/Spline",
      "prototype": {
        "points": "array",
        "initFromArray": {
          "!type": "fn(a: array)",
          "!doc": "Initialises using the data in the array as a series of points. Each value in *a* must be another array with three values, where a[n] is v, the value for the *nth* point, and v[0], v[1] and v[2] are the x, y and z coordinates of that point n, respectively."
        },
        "getControlPointsArray": {
          "!type": "fn() -> array",
          "!doc": "Returns an array with triplets of x, y, z coordinates that correspond to the current control points."
        },
        "reparametrizeByArcLength": {
          "!type": "fn(samplingCoef: number)",
          "!doc": "This is done by resampling the original spline, with the density of sampling controlled by *samplingCoef*. Here it's interesting to note that denser sampling is not necessarily better: if sampling is too high, you may get weird kinks in curvature."
        }
      },
      "!doc": "Represents a spline.",
      "!type": "fn(points: array)"
    },
    "Triangle": {
      "!name": "Triangle",
      "!url": "http://threejs.org/docs/#Reference/math/Triangle",
      "prototype": {
        "!proto": "Vector3",
        "a": {
          "!type": "Vector3",
          "!doc": "The first [page:Vector3] of the triangle."
        },
        "c": {
          "!type": "Vector3",
          "!doc": "The third [page:Vector3] of the triangle."
        },
        "setFromPointsAndIndices": {
          "!type": "fn(points: array, i0: number, i1: number, i2: number) -> Triangle",
          "!doc": "Sets the triangle's vectors to the vectors in the array."
        },
        "normal": {
          "!type": "fn(optionalTarget: Vector3) -> Vector3",
          "!doc": "Return the calculated normal of the triangle."
        },
        "clone": {
          "!type": "fn() -> Triangle",
          "!doc": "Return a new copy of this triangle."
        },
        "midpoint": {
          "!type": "fn(optionalTarget: Vector3) -> Vector3",
          "!doc": "Return the midpoint of the triangle. Optionally sets a target vector."
        },
        "plane": {
          "!type": "fn(optionalTarget: Plane) -> Plane",
          "!doc": "Return a [page:Plane plane] based on the triangle. Optionally sets a target plane."
        },
        "copy": {
          "!type": "fn(triangle: Triangle) -> Triangle",
          "!doc": "Copies the values of the vertices of the passed triangle to this triangle."
        }
      },
      "!doc": "A geometric triangle as defined by three vectors.",
      "!type": "fn(a: Vector3, b: Vector3, c: Vector3)"
    },
    "Vector2": {
      "!name": "Vector2",
      "!url": "http://threejs.org/docs/#Reference/math/Vector2",
      "prototype": {
        "!proto": "number",
        "x": "number",
        "set": {
          "!type": "fn(x: number, y: number) -> Vector2",
          "!doc": "Sets value of this vector."
        },
        "add": {
          "!type": "fn(v: Vector2) -> Vector2",
          "!doc": "Adds *v* to this vector."
        },
        "sub": {
          "!type": "fn(v: Vector2) -> Vector2",
          "!doc": "Subtracts *v* from this vector."
        },
        "multiplyScalar": {
          "!type": "fn(s: number) -> Vector2",
          "!doc": "Multiplies this vector by scalar *s*."
        },
        "negate": {
          "!type": "fn() -> Vector2",
          "!doc": "Inverts this vector."
        },
        "lengthSq": {
          "!type": "fn() -> number",
          "!doc": "Computes squared length of this vector."
        },
        "normalize": {
          "!type": "fn() -> Vector2",
          "!doc": "Normalizes this vector."
        },
        "distanceToSquared": {
          "!type": "fn(v: Vector2) -> number",
          "!doc": "Computes squared distance of this vector to *v*."
        },
        "equals": {
          "!type": "fn(v: Vector2) -> boolean",
          "!doc": "Checks for strict equality of this vector and *v*."
        },
        "clamp": {
          "!type": "fn(min: Vector2, max: Vector2) -> Vector2",
          "!doc": "If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value. <br>\tIf this vector's x or y value is less than the min vector's x or y value, it is replace by the corresponding value."
        },
        "floor": {
          "!type": "fn() -> Vector2",
          "!doc": "The components of the vector are rounded downwards (towards negative infinity) to an integer value."
        },
        "round": {
          "!type": "fn() -> Vector2",
          "!doc": "The components of the vector are rounded towards the nearest integer value."
        },
        "lerp": {
          "!type": "fn(v: Vector2, alpha: number) -> Vector2",
          "!doc": "Linear interpolation between this vector and v, where alpha is the percent along the line."
        },
        "setComponent": {
          "!type": "fn(index: number, value: number) -> undefined",
          "!doc": "if index equals 0 method replaces this.x with value. <br>\n\t\tif index equals 1 method replaces this.y with value."
        },
        "getComponent": {
          "!type": "fn(index: number) -> number",
          "!doc": "if index equals 0 returns the x value. <br>\n\t\tif index equals 1 returns the y value."
        },
        "toArray": {
          "!type": "fn(array: array) -> array",
          "!doc": "Returns an array [x, y]."
        },
        "max": {
          "!type": "fn(v: Vector2) -> Vector2",
          "!doc": "If this vector's x or y value is greater than v's x or y value, replace that value with the corresponding max value."
        },
        "setY": {
          "!type": "fn(y: number) -> Vector2",
          "!doc": "replace this vector's y value with y."
        }
      },
      "!doc": "2D vector.",
      "!type": "fn(x: number, y: number)"
    },
    "Vector3": {
      "!name": "Vector3",
      "!url": "http://threejs.org/docs/#Reference/math/Vector3",
      "prototype": {
        "!proto": "number",
        "x": "number",
        "z": "number",
        "set": {
          "!type": "fn(x: number, y: number, z: number) -> Vector3",
          "!doc": "Sets value of this vector."
        },
        "setY": {
          "!type": "fn(y: number) -> Vector3",
          "!doc": "Sets y value of this vector."
        },
        "copy": {
          "!type": "fn(v: Vector3) -> Vector3",
          "!doc": "Copies value of *v* to this vector."
        },
        "addVectors": {
          "!type": "fn(a: Vector3, b: Vector3) -> Vector3",
          "!doc": "Sets this vector to *a + b*."
        },
        "subVectors": {
          "!type": "fn(a: Vector3, b: Vector3) -> Vector3",
          "!doc": "Sets this vector to *a - b*."
        },
        "divideScalar": {
          "!type": "fn(s: number) -> Vector3",
          "!doc": "Divides this vector by scalar *s*.<br>\n\t\tSet vector to *( 0, 0, 0 )* if *s == 0*."
        },
        "dot": {
          "!type": "fn(v: Vector3) -> number",
          "!doc": "Computes dot product of this vector and *v*."
        },
        "length": {
          "!type": "fn() -> number",
          "!doc": "Computes length of this vector."
        },
        "normalize": {
          "!type": "fn() -> Vector3",
          "!doc": "Normalizes this vector. Transforms this Vector into a Unit vector by dividing the vector by it's length."
        },
        "distanceToSquared": {
          "!type": "fn(v: Vector3) -> number",
          "!doc": "Computes squared distance of this vector to *v*."
        },
        "cross": {
          "!type": "fn(v: Vector3) -> Vector3",
          "!doc": "Sets this vector to cross product of itself and *v*."
        },
        "setFromMatrixPosition": {
          "!type": "fn(m: Matrix4) -> Vector3",
          "!doc": "Sets this vector extracting position from matrix transform."
        },
        "equals": {
          "!type": "fn(v: Vector3) -> boolean",
          "!doc": "Checks for strict equality of this vector and *v*."
        },
        "clamp": {
          "!type": "fn(min: Vector3, max: Vector3) -> Vector3",
          "!doc": "If this vector's x, y or z value is greater than the max vector's x, y or z value, it is replaced by the corresponding value. <br><br>\n\t\tIf this vector's x, y or z value is less than the min vector's x, y or z value, it is replace by the corresponding value."
        },
        "floor": {
          "!type": "fn() -> Vector3",
          "!doc": "The components of the vector are rounded downwards (towards negative infinity) to an integer value."
        },
        "round": {
          "!type": "fn() -> Vector3",
          "!doc": "The components of the vector are rounded towards the nearest integer value."
        },
        "applyMatrix3": {
          "!type": "fn(m: Matrix3) -> Vector3",
          "!doc": "Multiplies this vector times a 3 x 3 matrix."
        },
        "projectOnPlane": {
          "!type": "fn(planeNormal: Vector3) -> Vector3",
          "!doc": "Projects this vector onto a plane by subtracting this vector projected onto the plane's normal from this vector."
        },
        "addScalar": {
          "!type": "fn() -> Vector3",
          "!doc": "Adds a s to this vector."
        },
        "min": {
          "!type": "fn(v: Vector3) -> Vector3",
          "!doc": "If this vector's x, y, or z value is less than vector v's x, y, or z value, that value is replaced by the corresponding vector v value."
        },
        "setComponent": {
          "!type": "fn(index: number, value: number) -> Vector3",
          "!doc": "If index equals 0 the method sets this vector's x value to value <br>\n\t\tIf index equals 1 the method sets this vector's y value to value <br>\n\t\tIf index equals 2 the method sets this vector's z value to value"
        },
        "multiplyVectors": {
          "!type": "fn(a: Vector3, b: Vector3) -> Vector3",
          "!doc": "Sets this vector equal to the result of multiplying vector a by vector b."
        },
        "applyAxisAngle": {
          "!type": "fn(axis: Vector3, angle: number) -> Vector3",
          "!doc": "Applies a rotation specified by an axis and an angle to this vector."
        },
        "lerpVectors": {
          "!type": "fn(v1: Vector3, v2: Vector3, alpha: number) -> Vector3",
          "!doc": "Sets this vector to be the vector linearly interpolated between *v1* and *v2* with *alpha* factor."
        },
        "setFromMatrixColumn": {
          "!type": "fn(index: number, matrix: Matrix4) -> Vector3",
          "!doc": "Sets this vector's x, y, and z equal to the column of the matrix specified by the index."
        },
        "fromArray": {
          "!type": "fn(array: array) -> Vector3",
          "!doc": "Sets the vector's components based on an array formatted like [x, y, z]"
        },
        "applyProjection": {
          "!type": "fn(m: Matrix4) -> Vector3",
          "!doc": "Multiplies this vector and m, and divides by perspective."
        },
        "applyEuler": {
          "!type": "fn(euler: Euler) -> Vector3",
          "!doc": "Applies euler transform to this vector by converting the [page:Euler] obect to a [page:Quaternion] and applying."
        },
        "project": {
          "!type": "fn(camera: Camera) -> Vector3",
          "!doc": "Projects the vector with the camera."
        }
      },
      "!doc": "3D vector.",
      "!type": "fn(x: number, y: number, z: number)"
    },
    "Vector4": {
      "!name": "Vector4",
      "!url": "http://threejs.org/docs/#Reference/math/Vector4",
      "prototype": {
        "!proto": "number",
        "x": "number",
        "z": "number",
        "set": {
          "!type": "fn(x: number, y: number, z: number, w: number) -> Vector4",
          "!doc": "Sets value of this vector."
        },
        "add": {
          "!type": "fn(v: Vector4) -> Vector4",
          "!doc": "Adds *v* to this vector."
        },
        "sub": {
          "!type": "fn(v: Vector4) -> Vector4",
          "!doc": "Subtracts *v* from this vector."
        },
        "multiplyScalar": {
          "!type": "fn(s: number) -> Vector4",
          "!doc": "Multiplies this vector by scalar *s*."
        },
        "negate": {
          "!type": "fn() -> Vector4",
          "!doc": "Inverts this vector."
        },
        "lengthSq": {
          "!type": "fn() -> number",
          "!doc": "Computes squared length of this vector."
        },
        "normalize": {
          "!type": "fn() -> Vector4",
          "!doc": "Normalizes this vector."
        },
        "lerp": {
          "!type": "fn(v: Vector4, alpha: number) -> Vector4",
          "!doc": "Linearly interpolate between this vector and *v* with *alpha* factor."
        },
        "clone": {
          "!type": "fn() -> Vector4",
          "!doc": "Clones this vector."
        },
        "clampScalar": {
          "!type": "fn(min: number, max: number) -> Vector4",
          "!doc": "If this vector's x, y, z or w values are greater than the max value, they are replaced by the max value. <br>\n\t\tIf this vector's x, y, z or w values are less than the min value, they are replace by the min value."
        },
        "ceil": {
          "!type": "fn() -> Vector4",
          "!doc": "The components of the vector are rounded upwards (towards positive infinity) to an integer value."
        },
        "roundToZero": {
          "!type": "fn() -> Vector4",
          "!doc": "The components of the vector are rounded towards zero (up if negative, down if positive) to an integer value."
        },
        "min": {
          "!type": "fn(v: Vector4) -> Vector4",
          "!doc": "If this vector's x, y, z, or w value is less than vector v's x, y, z, or w value, that value is replaced by the corresponding vector v value."
        },
        "addScalar": {
          "!type": "fn(s: number) -> Vector4",
          "!doc": "Adds a scalar value to all of the vector's components."
        },
        "setAxisAngleFromRotationMatrix": {
          "!type": "fn(m: Matrix4) -> Vector4",
          "!doc": "Sets this Vector4 to the computed <a href=\"http://en.wikipedia.org/wiki/Axis%E2%80%93angle_representation\" target=\"_blank\">axis-angle representation</a> of the rotation defined by Matrix4 m. Assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled).<br><br>\n\n\t\tThe axis is stored in components (x, y, z) of the vector, and the rotation in radians is stored in component w"
        },
        "getComponent": {
          "!type": "fn(index: number) -> number",
          "!doc": "Returns the value of the vector component x, y, or z by an index.<br><br>\n\n\t\tIndex 0: x<br>\n\t\tIndex 1: y<br>\n\t\tIndex 2: z<br>\n\t\tIndex 3: w<br>"
        },
        "fromArray": {
          "!type": "fn(array: array) -> Vector4",
          "!doc": "Sets the vector's components based on an array formatted like [x, y, z, w]"
        },
        "lengthManhattan": {
          "!type": "fn() -> number",
          "!doc": "Computes Manhattan length of this vector.<br>\n\t\t[link:http://en.wikipedia.org/wiki/Taxicab_geometry]"
        },
        "setY": {
          "!type": "fn(y: number) -> Vector4",
          "!doc": "Sets the y component of the vector."
        },
        "setW": {
          "!type": "fn(w: number) -> Vector4",
          "!doc": "Sets the w component of the vector."
        }
      },
      "!doc": "4D vector.",
      "!type": "fn(x: number, y: number, z: number, w: number)"
    },
    "Bone": {
      "!name": "Bone",
      "!url": "http://threejs.org/docs/#Reference/objects/Bone",
      "prototype": {
        "!proto": "Object3D",
        "skinMatrix": {
          "!type": "Matrix4",
          "!doc": "The matrix of the bone."
        },
        "update": {
          "!type": "fn(parentSkinMatrix: Matrix4, forceUpdate: boolean) -> todo",
          "!doc": "This updates the matrix of the bone and the matrices of its children."
        }
      },
      "!doc": "A bone which is part of a SkinnedMesh.",
      "!type": "fn(belongsToSkin: SkinnedMesh)"
    },
    "LOD": {
      "!name": "LOD",
      "!url": "http://threejs.org/docs/#Reference/objects/LOD",
      "prototype": {
        "!proto": "Object3D",
        "objects": {
          "!type": "array",
          "!doc": "todo"
        },
        "addLevel": {
          "!type": "fn(object: todo, distance: todo) -> todo",
          "!doc": "todo"
        },
        "update": {
          "!type": "fn(camera: todo) -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn()"
    },
    "LensFlare": {
      "!name": "LensFlare",
      "!url": "http://threejs.org/docs/#Reference/objects/LensFlare",
      "prototype": {
        "!proto": "Object3D",
        "lensFlares": {
          "!type": "array",
          "!doc": "todo"
        },
        "customUpdateCallback": {
          "!type": "todo",
          "!doc": "todo"
        },
        "updateLensFlares": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn(texture: todo, size: todo, distance: todo, blending: todo, color: todo)"
    },
    "Line": {
      "!name": "Line",
      "!url": "http://threejs.org/docs/#Reference/objects/Line",
      "prototype": {
        "!proto": "Object3D",
        "geometry": {
          "!type": "Geometry",
          "!doc": "Vertices representing the line segment(s)."
        },
        "type": {
          "!type": "number",
          "!doc": "In OpenGL terms, LineStrip is the classic GL_LINE_STRIP and LinePieces is the equivalent to GL_LINES."
        },
        "raycast": {
          "!type": "fn(raycaster: Raycaster, intersects: array) -> array",
          "!doc": "Get intersections between a casted ray and this Line. [page:Raycaster.intersectObject] will call this method."
        }
      },
      "!doc": "A line or a series of lines.",
      "!type": "fn(geometry: Geometry, material: Material, type: number)"
    },
    "Mesh": {
      "!name": "Mesh",
      "!url": "http://threejs.org/docs/#Reference/objects/Mesh",
      "prototype": {
        "!proto": "Object3D",
        "geometry": {
          "!type": "Geometry",
          "!doc": "An instance of [page:Geometry], defining the object's structure."
        },
        "getMorphTargetIndexByName": {
          "!type": "fn(name: string) -> number",
          "!doc": "Returns the index of a morph target defined by name."
        },
        "raycast": {
          "!type": "fn(raycaster: Raycaster, intersects: array) -> array",
          "!doc": "Get intersections between a casted ray and this mesh. [page:Raycaster.intersectObject] will call this method."
        }
      },
      "!doc": "Base class for Mesh objects, such as [page:MorphAnimMesh] and [page:SkinnedMesh].",
      "!type": "fn(geometry: Geometry, material: Material)"
    },
    "MorphAnimMesh": {
      "!name": "MorphAnimMesh",
      "!url": "http://threejs.org/docs/#Reference/objects/MorphAnimMesh",
      "prototype": {
        "!proto": "Object3D",
        "directionBackwards": {
          "!type": "boolean",
          "!doc": "todo"
        },
        "endKeyframe": {
          "!type": "number",
          "!doc": "todo"
        },
        "startKeyframe": {
          "!type": "number",
          "!doc": "todo"
        },
        "length": {
          "!type": "number",
          "!doc": "todo"
        },
        "duration": {
          "!type": "number",
          "!doc": "todo"
        },
        "setDirectionForward": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        },
        "setFrameRange": {
          "!type": "fn(start: todo, end: todo) -> todo",
          "!doc": "todo"
        },
        "parseAnimations": {
          "!type": "fn() -> todo",
          "!doc": "todo"
        },
        "setAnimationLabel": {
          "!type": "fn(label: todo, start: todo, end: todo) -> todo",
          "!doc": "todo"
        }
      },
      "!doc": "todo",
      "!type": "fn(geometry: todo, material: todo)"
    },
    "PointCloud": {
      "!name": "PointCloud",
      "!url": "http://threejs.org/docs/#Reference/objects/PointCloud",
      "prototype": {
        "!proto": "Object3D",
        "geometry": {
          "!type": "Geometry",
          "!doc": "An instance of [page:Geometry], where each vertex designates the position of a particle in the system."
        },
        "clone": {
          "!type": "fn() -> PointCloud",
          "!doc": "This creates a clone of the particle system."
        }
      },
      "!doc": "A class for displaying particles in the form of variable size points. For example, if using the [page:WebGLRenderer], the particles are displayed using GL_POINTS.",
      "!type": "fn(geometry: Geometry, material: Material)"
    },
    "SkinnedMesh": {
      "!name": "SkinnedMesh",
      "!url": "http://threejs.org/docs/#Reference/objects/SkinnedMesh",
      "prototype": {
        "!proto": "Object3D",
        "bones": {
          "!type": "array",
          "!doc": "This contains the array of bones for this mesh. These should be set in the constructor."
        },
        "useVertexTexture": {
          "!type": "boolean",
          "!doc": "The boolean defines whether a vertex texture is used to calculate the bones. This boolean shouldn't be changed after constructor."
        },
        "pose": {
          "!type": "fn()",
          "!doc": "This method sets the skinnedmesh in the rest pose."
        }
      },
      "!doc": "An 3d object that has bones data. These Bones can then be used to animate the vertices of the object.",
      "!type": "fn(geometry: Geometry, material: Material, useVertexTexture: boolean)"
    },
    "Sprite": {
      "!name": "Sprite",
      "!url": "http://threejs.org/docs/#Reference/objects/Sprite",
      "prototype": {
        "!proto": "Object3D",
        "material": {
          "!type": "SpriteMaterial",
          "!doc": "An instance of [page:Material], defining the object's appearance. Default is a [page:SpriteMaterial] which is a white plane."
        },
        "clone": {
          "!type": "fn() -> Sprite",
          "!doc": "This creates a new clone of the sprite."
        }
      },
      "!doc": "A sprite is a plane in an 3d scene which faces always towards the camera.",
      "!type": "fn(material: Material)"
    },
    "CanvasRenderer": {
      "!name": "CanvasRenderer",
      "!url": "http://threejs.org/docs/#Reference/renderers/CanvasRenderer",
      "prototype": {
        "!proto": "WebGLRenderer",
        "info": {
          "!type": "object",
          "!doc": "An object with a series of statistical information about the graphics board memory and the rendering process. Useful for debugging or just for the sake of curiosity. The object contains the following fields:"
        },
        "autoClear": {
          "!type": "boolean",
          "!doc": "Defines whether the renderer should automatically clear its output before rendering."
        },
        "sortElements": {
          "!type": "boolean",
          "!doc": "Defines whether the renderer should sort the face of each object. Default is true."
        },
        "render": {
          "!type": "fn(scene: Scene, camera: Camera)",
          "!doc": "Render a scene using a camera."
        },
        "setClearColor": {
          "!type": "fn(color: Color, alpha: number)",
          "!doc": "This set the clearColor and the clearAlpha."
        },
        "setClearColorHex": {
          "!type": "fn(hex: number, alpha: number)",
          "!doc": "This set the clearColor and the clearAlpha."
        },
        "getClearAlpha": {
          "!type": "fn() -> number",
          "!doc": "Returns the alpha value."
        }
      },
      "!doc": "The Canvas renderer displays your beautifully crafted scenes <em>not</em> using WebGL, but draws it using the (slower) <a href=\"http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/\">Canvas 2D Context</a> API.<br><br>\n\t\t\tThis renderer can be a nice fallback from [page:WebGLRenderer] for simple scenes:\n\n\t\t\t<code>\n\t\t\tfunction webglAvailable() {\n\t\t\t\ttry {\n\t\t\t\t\tvar canvas = document.createElement( 'canvas' );\n\t\t\t\t\treturn !!( window.WebGLRenderingContext &amp;&amp; (\n\t\t\t\t\t\tcanvas.getContext( 'webgl' ) ||\n\t\t\t\t\t\tcanvas.getContext( 'experimental-webgl' ) )\n\t\t\t\t\t);\n\t\t\t\t} catch ( e ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ( webglAvailable() ) {\n\t\t\t\trenderer = new THREE.WebGLRenderer();\n\t\t\t} else {\n\t\t\t\trenderer = new THREE.CanvasRenderer();\n\t\t\t}\n\t\t\t</code>\n\n\t\t\tNote: both WebGLRenderer and CanvasRenderer are embedded in the web page using an HTML5 &lt;canvas&gt; tag.\n\t\t\tThe \"Canvas\" in CanvasRenderer means it uses Canvas 2D instead of WebGL.<br><br>\n\n\t\t\tDon't confuse either CanvasRenderer with the SoftwareRenderer example, which simulates a screen buffer in a Javascript array.",
      "!type": "fn(parameters: object)"
    },
    "WebGLRenderTarget": {
      "!name": "WebGLRenderTarget",
      "!url": "http://threejs.org/docs/#Reference/renderers/WebGLRenderTarget",
      "prototype": {
        "wrapS": {
          "!type": "number",
          "!doc": "The default is THREE.ClampToEdgeWrapping, where the edge is clamped to the outer edge texels. The other two choices are THREE.RepeatWrapping and THREE.MirroredRepeatWrapping."
        },
        "magFilter": {
          "!type": "number",
          "!doc": "How the texture is sampled when a texel covers more than one pixel. The default is THREE.LinearFilter, which takes the four closest texels and bilinearly interpolates among them. The other option is THREE.NearestFilter, which uses the value of the closest texel."
        },
        "anisotropy": {
          "!type": "number",
          "!doc": "The number of samples taken along the axis through the pixel that has the highest density of texels. By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used. Use renderer.getMaxAnisotropy() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2."
        },
        "offset": {
          "!type": "Vector2",
          "!doc": "How much a single repetition of the texture is offset from the beginning, in each direction U and V. Typical range is 0.0 to 1.0."
        },
        "type": {
          "!type": "number",
          "!doc": "The default is THREE.UnsignedByteType. Other valid types (as WebGL allows) are THREE.ByteType, THREE.ShortType, THREE.UnsignedShortType, THREE.IntType, THREE.UnsignedIntType, THREE.HalfFloatType, THREE.FloatType, THREE.UnsignedShort4444Type, THREE.UnsignedShort5551Type, and THREE.UnsignedShort565Type."
        },
        "stencilBuffer": {
          "!type": "boolean",
          "!doc": "Renders to the stencil buffer. Default is true."
        },
        "shareDepthFrom": {
          "!type": "WebGLRenderTarget",
          "!doc": "Shares the depth from another WebGLRenderTarget. Default is null."
        },
        "setSize": {
          "!type": "fn(width: number, height: number)",
          "!doc": "Sets the size of the renderTarget."
        },
        "dispose": {
          "!type": "fn()",
          "!doc": "Dispatches a dispose event."
        }
      },
      "!doc": "A render target is a buffer where the video card draws pixels for a scene that is being rendered in the background. It is used in different effects.",
      "!type": "fn(width: number, height: number, options: object)"
    },
    "WebGLRenderTargetCube": {
      "!name": "WebGLRenderTargetCube",
      "!url": "http://threejs.org/docs/#Reference/renderers/WebGLRenderTargetCube",
      "prototype": {
        "!proto": "WebGLRenderTarget",
        "activeCubeFace": {
          "!type": "integer",
          "!doc": "The activeCubeFace property corresponds to a cube side (PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5) and is\n\t\tused and set internally by the [page:CubeCamera]."
        }
      },
      "!doc": "[page:CubeCamera] uses this as its [page:WebGLRenderTarget]",
      "!type": "fn(width: number, height: number, options: object)"
    },
    "WebGLRenderer": {
      "!name": "WebGLRenderer",
      "!url": "http://threejs.org/docs/#Reference/renderers/WebGLRenderer",
      "prototype": {
        "!proto": "CanvasRenderer",
        "domElement": {
          "!type": "DOMElement",
          "!doc": "A [page:Canvas] where the renderer draws its output.<br>\n\t\tThis is automatically created by the renderer in the constructor (if not provided already); you just need to add it to your page."
        },
        "autoClear": {
          "!type": "boolean",
          "!doc": "Defines whether the renderer should automatically clear its output before rendering."
        },
        "autoClearDepth": {
          "!type": "boolean",
          "!doc": "If autoClear is true, defines whether the renderer should clear the depth buffer. Default is true."
        },
        "sortObjects": {
          "!type": "boolean",
          "!doc": "Note: Sorting is used to attempt to properly render objects that have some degree of transparency.  By definition, sorting objects may not work in all cases.  Depending on the needs of application, it may be neccessary to turn off sorting and use other methods to deal with transparency rendering e.g. manually determining the object rendering order."
        },
        "gammaInput": {
          "!type": "boolean",
          "!doc": "Default is false. If set, then it expects that all textures and colors are premultiplied gamma."
        },
        "shadowMapEnabled": {
          "!type": "boolean",
          "!doc": "Default is false. If set, use shadow maps in the scene."
        },
        "shadowMapCullFace": {
          "!type": "number",
          "!doc": "Default is THREE.CullFaceFront. The faces that needed to be culled. Possible values: THREE.CullFaceFront and THREE.CullFaceBack"
        },
        "shadowMapCascade": {
          "!type": "boolean",
          "!doc": "Default is false. If Set, use cascaded shadowmaps. See [link:http://developer.download.nvidia.com/SDK/10.5/opengl/src/cascaded_shadow_maps/doc/cascaded_shadow_maps.pdf cascaded shadowmaps] for more information."
        },
        "maxMorphNormals": {
          "!type": "number",
          "!doc": "Default is 4. The maximum number of MorphNormals allowed in a shader. Keep in mind that the standard materials only allow 4 MorphNormals."
        },
        "info": {
          "!type": "object",
          "!doc": "<ul>\n\t\t\t<li>memory:\n\t\t\t\t<ul>\n\t\t\t\t\t<li>programs</li>\n\t\t\t\t\t<li>geometries</li>\n\t\t\t\t\t<li>textures</li>\n\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\t<li>render:\n\t\t\t\t<ul>\n\t\t\t\t\t<li>calls</li>\n\t\t\t\t\t<li>vertices</li>\n\t\t\t\t\t<li>faces</li>\n\t\t\t\t\t<li>points</li>\n\t\t\t\t</ul>\n\t\t\t</li>\n\t\t</ul>"
        },
        "getContext": {
          "!type": "fn() -> WebGLRenderingContext",
          "!doc": "Return the WebGL context."
        },
        "setSize": {
          "!type": "fn(width: number, height: number)",
          "!doc": "Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0)."
        },
        "setScissor": {
          "!type": "fn(x: number, y: number, width: number, height: number)",
          "!doc": "Sets the scissor area from (x, y) to (x + width, y + height)."
        },
        "setClearColor": {
          "!type": "fn(color: Color, alpha: number)",
          "!doc": "Sets the clear color and opacity."
        },
        "getClearAlpha": {
          "!type": "fn() -> number",
          "!doc": "Returns a [page:Float float] with the current clear alpha. Ranges from 0 to 1."
        },
        "renderBufferImmediate": {
          "!type": "fn(object: Object3D, program: shaderprogram, shading: Material)",
          "!doc": "Render an immediate buffer. Gets called by renderImmediateObject."
        },
        "renderBuffer": {
          "!type": "fn(camera: Camera, lights: array, fog: Fog, material: Material, geometryGroup: object, object: Object3D)",
          "!doc": "Render a geometry group using the camera and with the correct material."
        },
        "renderImmediateObject": {
          "!type": "fn(camera, lights, fog, material, object)",
          "!doc": "Renders an immediate Object using a camera."
        },
        "setDepthTest": {
          "!type": "fn(depthTest: boolean)",
          "!doc": "This sets, based on depthTest, whether or not the depth data needs to be tested against the depth buffer."
        },
        "setBlending": {
          "!type": "fn(blending: number, blendEquation: number, blendSrc: number, blendDst: number)",
          "!doc": "This method sets the correct blending."
        },
        "setRenderTarget": {
          "!type": "fn(renderTarget: WebGLRenderTarget)",
          "!doc": "This method sets the active rendertarget."
        },
        "getMaxAnisotropy": {
          "!type": "fn() -> number",
          "!doc": "This returns the anisotropy level of the textures."
        },
        "setMaterialFaces": {
          "!type": "fn(material: Material)",
          "!doc": "This sets which side needs to be culled in the webgl renderer."
        },
        "supportsFloatTextures": {
          "!type": "fn() -> boolean",
          "!doc": "This method returns true if the webgl implementation supports float textures."
        }
      },
      "!doc": "The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.",
      "!type": "fn(parameters: object)"
    },
    "ShaderChunk": {
      "!name": "ShaderChunk",
      "!url": "http://threejs.org/docs/#Reference/renderers/shaders/ShaderChunk",
      "prototype": {},
      "!doc": "Shader chunks for WebLG Shader library"
    },
    "ShaderLib": {
      "!name": "ShaderLib",
      "!url": "http://threejs.org/docs/#Reference/renderers/shaders/ShaderLib",
      "prototype": {},
      "!doc": "Webgl Shader Library for three.js"
    },
    "UniformsLib": {
      "!name": "UniformsLib",
      "!url": "http://threejs.org/docs/#Reference/renderers/shaders/UniformsLib",
      "prototype": {},
      "!doc": "Uniforms library for shared webgl shaders"
    },
    "UniformsUtils": {
      "!name": "UniformsUtils",
      "!url": "http://threejs.org/docs/#Reference/renderers/shaders/UniformsUtils",
      "prototype": {},
      "!doc": "Uniform Utilities. Support merging and cloning of uniform variables"
    },
    "WebGLProgram": {
      "!name": "WebGLProgram",
      "!url": "http://threejs.org/docs/#Reference/renderers/webgl/WebGLProgram",
      "prototype": {
        "uniforms": "object",
        "id": "string",
        "usedTimes": "number",
        "vertexShader": "WebGLShader"
      },
      "!doc": "Constructor for the GLSL program sent to vertex and fragment shaders, including default uniforms and attributes.",
      "!type": "fn(renderer: WebGLRenderer, code: object, material: Material, parameters: object)"
    },
    "WebGLShader": {
      "!name": "WebGLShader",
      "!url": "http://threejs.org/docs/#Reference/renderers/webgl/WebGLShader",
      "prototype": {},
      "!doc": "todo"
    },
    "LensFlarePlugin": {
      "!name": "LensFlarePlugin",
      "!url": "http://threejs.org/docs/#Reference/renderers/webgl/plugins/LensFlarePlugin",
      "prototype": {
        "render": {
          "!type": "fn(scene: Scene, camera: Camera, viewportWidth: number, viewportHeight: number)",
          "!doc": "Renders the lensflares defined in the scene. This gets automatically called as post render function to draw the lensflares."
        }
      },
      "!doc": "The Webglrenderer plugin class that allows lensflares to be rendered in the WebglRenderer. This plugin is automatically loaded in the Webglrenderer.",
      "!type": "fn()"
    },
    "ShadowMapPlugin": {
      "!name": "ShadowMapPlugin",
      "!url": "http://threejs.org/docs/#Reference/renderers/webgl/plugins/ShadowMapPlugin",
      "prototype": {
        "render": {
          "!type": "fn(scene: Scene, camera: Camera)",
          "!doc": "Prepares the shadowmaps to be rendered defined in the scene. This gets automatically called as pre render function to draw the lensflares."
        }
      },
      "!doc": "The Webglrenderer plugin class that allows shadowmaps to be rendered in the WebglRenderer. This plugin is automatically loaded in the Webglrenderer.",
      "!type": "fn()"
    },
    "SpritePlugin": {
      "!name": "SpritePlugin",
      "!url": "http://threejs.org/docs/#Reference/renderers/webgl/plugins/SpritePlugin",
      "prototype": {
        "render": {
          "!type": "fn(scene: Scene, camera: Camera)",
          "!doc": "Renders the sprites defined in the scene. This gets automatically called as post-render function to draw the lensflares."
        }
      },
      "!doc": "The Webglrenderer plugin class that allows Sprites to be rendered in the WebglRenderer. This plugin is automatically loaded in the Webglrenderer.",
      "!type": "fn()"
    },
    "Fog": {
      "!name": "Fog",
      "!url": "http://threejs.org/docs/#Reference/scenes/Fog",
      "prototype": {
        "!proto": "Color",
        "name": {
          "!type": "string",
          "!doc": "Default is the empty string."
        },
        "near": {
          "!type": "number",
          "!doc": "Default is 1."
        },
        "clone": {
          "!type": "fn() -> Fog",
          "!doc": "Returns a copy of this."
        }
      },
      "!doc": "This class contains the parameters that define linear fog, i.e., that grows linearly denser with the distance.",
      "!type": "fn(hex: number, near: number, far: number)"
    },
    "FogExp2": {
      "!name": "FogExp2",
      "!url": "http://threejs.org/docs/#Reference/scenes/FogExp2",
      "prototype": {
        "!proto": "Color",
        "name": {
          "!type": "string",
          "!doc": "Default is the empty string."
        },
        "density": {
          "!type": "number",
          "!doc": "Default is 0.00025."
        },
        "clone": {
          "!type": "fn() -> FogExp2",
          "!doc": "Returns a copy of this."
        }
      },
      "!doc": "This class contains the parameters that define exponential fog, i.e., that grows exponentially denser with the distance.",
      "!type": "fn(hex: number, density: number)"
    },
    "Scene": {
      "!name": "Scene",
      "!url": "http://threejs.org/docs/#Reference/scenes/Scene",
      "prototype": {
        "!proto": "Object3D",
        "fog": {
          "!type": "Fog",
          "!doc": "A [page:Fog fog] instance defining the type of fog that affects everything rendered in the scene. Default is null."
        },
        "autoUpdate": {
          "!type": "boolean",
          "!doc": "Default is true. If set, then the renderer checks every frame if the scene and its objects needs matrix updates. \n\t\tWhen it isn't, then you have to maintain all matrices in the scene yourself."
        }
      },
      "!doc": "Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.",
      "!type": "fn()"
    },
    "CompressedTexture": {
      "!name": "CompressedTexture",
      "!url": "http://threejs.org/docs/#Reference/textures/CompressedTexture",
      "prototype": {
        "!proto": "Texture",
        "flipY": {
          "!type": "boolean",
          "!doc": "False by default. Flipping textures does not work for compressed textures."
        }
      },
      "!doc": "Creates a texture based on data in compressed form.",
      "!type": "fn(mipmaps: array, width: number, height: number, format: number, type: number, mapping: number, wrapS: number, wrapT: number, magFilter: number, minFilter: number, anisotropy: number)"
    },
    "DataTexture": {
      "!name": "DataTexture",
      "!url": "http://threejs.org/docs/#Reference/textures/DataTexture",
      "prototype": {
        "!proto": "Texture"
      },
      "!doc": "Creates a texture directly from bitmapdata, width and height.",
      "!type": "fn(data: ArraybufferView, width: number, height: number, format: number, type: number, mapping: number, wrapS: number, wrapT: number, magFilter: number, minFilter: number, anisotropy: number)"
    },
    "Texture": {
      "!name": "Texture",
      "!url": "http://threejs.org/docs/#Reference/textures/Texture",
      "prototype": {
        "id": {
          "!type": "number",
          "!doc": "Unique number for this texture instance."
        },
        "mapping": {
          "!type": "object",
          "!doc": "How the image is applied to the object. An object type of THREE.UVMapping is the default, where the U,V coordinates are used to apply the map, and a single texture is expected. The other types are THREE.CubeReflectionMapping, for cube maps used as a reflection map; THREE.CubeRefractionMapping, refraction mapping; and THREE.SphericalReflectionMapping, a spherical reflection map projection."
        },
        "wrapT": {
          "!type": "number",
          "!doc": "NOTE: tiling of images in textures only functions if image dimensions are powers of two (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels. Individual dimensions need not be equal, but each must be a power of two. This is a limitation of WebGL, not Three.js."
        },
        "minFilter": {
          "!type": "number",
          "!doc": "How the texture is sampled when a texel covers less than one pixel. The default is THREE.LinearMipMapLinearFilter, which uses mipmapping and a trilinear filter. Other choices are THREE.NearestFilter, THREE.NearestMipMapNearestFilter, THREE.NearestMipMapLinearFilter, THREE.LinearFilter, and THREE.LinearMipMapNearestFilter. These vary whether the nearest texel or nearest four texels are retrieved on the nearest mipmap or nearest two mipmaps. Interpolation occurs among the samples retrieved."
        },
        "type": {
          "!type": "number",
          "!doc": "The default is THREE.UnsignedByteType. Other valid types (as WebGL allows) are THREE.ByteType, THREE.ShortType, THREE.UnsignedShortType, THREE.IntType, THREE.UnsignedIntType, THREE.FloatType, THREE.UnsignedShort4444Type, THREE.UnsignedShort5551Type, and THREE.UnsignedShort565Type."
        },
        "needsUpdate": {
          "!type": "boolean",
          "!doc": "If a texture is changed after creation, set this flag to true so that the texture is properly set up. Particularly important for setting the wrap mode."
        },
        "offset": {
          "!type": "Vector2",
          "!doc": "How much a single repetition of the texture is offset from the beginning, in each direction U and V. Typical range is 0.0 to 1.0."
        },
        "generateMipmaps": {
          "!type": "boolean",
          "!doc": "Whether to generate mipmaps (if possible) for a texture. True by default."
        },
        "mipmaps": {
          "!type": "array",
          "!doc": "Array of mipmaps generated."
        },
        "premultiplyAlpha": {
          "!type": "boolean",
          "!doc": "False by default, which is the norm for PNG images. Set to true if the RGB values have been stored premultiplied by alpha."
        }
      },
      "!doc": "Create a texture to apply to a surface or as a reflection or refraction map.",
      "!type": "fn(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)"
    }
  }
}
    };
  });
});