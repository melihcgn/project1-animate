function multiplyMatrices(matrixA, matrixB) {
    var result = [];

    for (var i = 0; i < 4; i++) {
        result[i] = [];
        for (var j = 0; j < 4; j++) {
            var sum = 0;
            for (var k = 0; k < 4; k++) {
                sum += matrixA[i * 4 + k] * matrixB[k * 4 + j];
            }
            result[i][j] = sum;
        }
    }

    // Flatten the result array
    return result.reduce((a, b) => a.concat(b), []);
}
function createIdentityMatrix() {
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}
function createScaleMatrix(scale_x, scale_y, scale_z) {
    return new Float32Array([
        scale_x, 0, 0, 0,
        0, scale_y, 0, 0,
        0, 0, scale_z, 0,
        0, 0, 0, 1
    ]);
}

function createTranslationMatrix(x_amount, y_amount, z_amount) {
    return new Float32Array([
        1, 0, 0, x_amount,
        0, 1, 0, y_amount,
        0, 0, 1, z_amount,
        0, 0, 0, 1
    ]);
}

function createRotationMatrix_Z(radian) {
    return new Float32Array([
        Math.cos(radian), -Math.sin(radian), 0, 0,
        Math.sin(radian), Math.cos(radian), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])
}

function createRotationMatrix_X(radian) {
    return new Float32Array([
        1, 0, 0, 0,
        0, Math.cos(radian), -Math.sin(radian), 0,
        0, Math.sin(radian), Math.cos(radian), 0,
        0, 0, 0, 1
    ])
}

function createRotationMatrix_Y(radian) {
    return new Float32Array([
        Math.cos(radian), 0, Math.sin(radian), 0,
        0, 1, 0, 0,
        -Math.sin(radian), 0, Math.cos(radian), 0,
        0, 0, 0, 1
    ])
}

function getTransposeMatrix(matrix) {
    return new Float32Array([
        matrix[0], matrix[4], matrix[8], matrix[12],
        matrix[1], matrix[5], matrix[9], matrix[13],
        matrix[2], matrix[6], matrix[10], matrix[14],
        matrix[3], matrix[7], matrix[11], matrix[15]
    ]);
}

const vertexShaderSource = `
attribute vec3 position;
attribute vec3 normal; // Normal vector for lighting

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;

uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
    vNormal = vec3(normalMatrix * vec4(normal, 0.0));
    vLightDirection = lightDirection;

    gl_Position = vec4(position, 1.0) * projectionMatrix * modelViewMatrix; 
}

`

const fragmentShaderSource = `
precision mediump float;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform float shininess;

varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vLightDirection);
    
    // Ambient component
    vec3 ambient = ambientColor;

    // Diffuse component
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * diffuseColor;

    // Specular component (view-dependent)
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // Assuming the view direction is along the z-axis
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = spec * specularColor;

    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}

`

/**
 * @WARNING DO NOT CHANGE ANYTHING ABOVE THIS LINE
 */



/**
 * 
 * @TASK1 Calculate the model view matrix by using the chatGPT
 */

function getChatGPTModelViewMatrix() {
    const transformationMatrix = new Float32Array([
        0.4330126941204071, 0.4330126941204071, -0.5, 0,
    -0.21650634706020355, 0.6495190505981445, 0.5, 0,
    0.8660253882408142, -0.8660253882408142, 0, 0,
    0.3, -0.25, 0, 1

    ]);
    return getTransposeMatrix(transformationMatrix);
}


/**
 * 
 * @TASK2 Calculate the model view matrix by using the given 
 * transformation methods and required transformation parameters
 * stated in transformation-prompt.txt
 */
function getModelViewMatrix() {
    // calculate the model view matrix by using the transformation
    // methods and return the modelView matrix in this method
    const transformationMatrix = new Float32Array([
        // ACTUAL VALUES WHICH I USED
        0.1767766953,	-0.3061862178,	0.3535533906,	0,
        0.4633883476,	0.06341324202,	-0.1767766953,	0,
        0.126826484,	0.7803300859,	0.6123724357,	0,
        -0.1256281566,	-0.2154183517,	0.300520382,	1,


// REVISED MATRIX CELL VALUES
        // 0.3061862178,	-0.25,	1.224744871,	0,
        // 0.3298698042,	0.375,	-0.09473434549,	0,
        // -0.1088989351,	0.1082531755,	0.789149131,	0,
        // 0.004694207149,	-0.084375,	0.1955535239,	1

        //         0.1767766953,	-0.4330127019,	0.1767766953,	0,
        //         0.4419417382,	0.2165063509,	0.08838834764,	0,
        //         -0.3061862178,	0.25,	0.9185586535,	0,
        //         -0.1149048519,	-0.3680607966,	0.06187184335,	1,


        //         0.3298698042	-0.2177978702	0.3061862178	0
        //         0.375	0.2165063509	-0.25	0
        //         -0.04736717275	0.789149131	0.6123724357	0
        //         0.01042188253	-0.2389318976	0.3087117307	1

        //         0.1767766953	-0.3061862178	0.3535533906	0
        // 0.4633883476	0.06341324202	-0.1767766953	0
        // 0.126826484	0.7803300859	0.6123724357	0
        // -0.1256281566	-0.2154183517	0.300520382	1


    ]);
    return getTransposeMatrix(transformationMatrix);
}

/**
 * 
 * @TASK3 Ask CHAT-GPT to animate the transformation calculated in 
 * task2 infinitely with a period of 10 seconds. 
 * First 5 seconds, the cube should transform from its initial 
 * position to the target position.
 * The next 5 seconds, the cube should return to its initial position.
 */

// this metdo should return the model view matrix at the given time
    // to get a smooth animation
    function interpolateMatrices(matrix1, matrix2, progress) {
        const interpolatedMatrix = new Float32Array(matrix1.length);
        for (let i = 0; i < matrix1.length; i++) {
            //console.log(progress);
            interpolatedMatrix[i] = matrix1[i] * (1 - progress) + matrix2[i] * progress;
        }
        return interpolatedMatrix;
    }
    

    function getPeriodicMovement(startTime) {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const animationDuration = 10 * 1000; // Total animation duration in milliseconds
    
        const initialMatrix = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    
        const targetMatrix = getModelViewMatrix(); // Get the provided transformation matrix
    
        // Calculate the phase within the entire animation cycle using modulo
        const phase = ((elapsed % animationDuration) + animationDuration) % animationDuration;
    
        let progress = 0;
        if (phase <= 5 * 1000) {
            // In the first 5 seconds, interpolate from initial to target matrix
            progress = phase / (5 * 1000);
            return interpolateMatrices(initialMatrix, targetMatrix, progress);
        } else {
            // In the next 5 seconds, interpolate from target to initial matrix
            progress = (phase - (5 * 1000)) / (5 * 1000);
            return interpolateMatrices(targetMatrix, initialMatrix, progress);
        }
    }
    
    
    
    
    
    
    

// Call getPeriodicMovement with the current time


