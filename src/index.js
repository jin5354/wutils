/**
 * initProgramWithShadersSource 使用 vShader fShader glsl 初始化 program
 *
 * @export
 * @param {webglContext} gl
 * @param {glsl} vShaderSource
 * @param {glsl} fShaderSource
 * @returns {program}
 */
export function initProgramWithShadersSource(gl, vShaderSource, fShaderSource) {
  let vertexShader = initShader(gl, gl.VERTEX_SHADER, vShaderSource)
  let fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, fShaderSource)

  let program = gl.createProgram()

  if(!program) {
    console.log('Failed to create program')
    return null
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  gl.linkProgram(program)

  let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if(!linked) {
    let error = gl.getProgramInfoLog(program)
    console.log('Failed to link program: ' + error)
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null
  }

  gl.useProgram(program)
  gl.program = program

  return program
}

/**
 * initShader 初始化 shader
 *
 * @export
 * @param {webglContext} gl
 * @param {string} type
 * @param {glsl} source
 * @returns {shader}
 */
export function initShader(gl, type, source) {
  let shader = gl.createShader(type)
  if (!shader) {
    console.log('Unable to create shader!')
    return null
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader);

  let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    let error = gl.getShaderInfoLog(shader)
    console.log('Failed to compile shader: ' + error)
    gl.deleteShader(shader)
    return null
  }

  return shader
}