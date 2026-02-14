/**
 * Kira Spatial Library v1.0
 * Shared WebGL shader backgrounds and glass morphism utilities
 * For Kira OS ecosystem apps
 */

(function(global) {
    'use strict';

    const KiraSpatial = {
        version: '1.0.0',

        // Shader palettes for different apps
        palettes: {
            directory: {
                a: [0.0, 0.83, 1.0],
                b: [0.48, 0.23, 0.93],
                c: [1.0, 0.24, 0.37],
                d: [0.0, 0.33, 0.67],
                speed: 0.06
            },
            mev: {
                a: [0.95, 0.25, 0.35],
                b: [0.95, 0.6, 0.1],
                c: [1.0, 0.9, 0.5],
                d: [0.0, 0.33, 0.67],
                speed: 0.08
            },
            id: {
                a: [0.48, 0.23, 0.93],
                b: [0.0, 0.83, 1.0],
                c: [0.93, 0.27, 0.60],
                d: [0.0, 0.33, 0.67],
                speed: 0.06
            },
            analytics: {
                a: [0.23, 0.51, 0.96],
                b: [0.0, 0.83, 1.0],
                c: [0.38, 0.40, 0.94],
                d: [0.0, 0.33, 0.67],
                speed: 0.07
            },
            community: {
                a: [0.06, 0.72, 0.51],
                b: [0.0, 0.83, 1.0],
                c: [0.08, 0.72, 0.65],
                d: [0.0, 0.33, 0.67],
                speed: 0.08
            },
            landing: {
                a: [0.0, 0.83, 1.0],
                b: [0.48, 0.23, 0.93],
                c: [0.95, 0.25, 0.37],
                d: [0.0, 0.2, 0.4],
                speed: 0.05
            }
        },

        // Initialize WebGL background
        initShader: function(canvasId, paletteName) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return null;

            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return null;

            const palette = this.palettes[paletteName] || this.palettes.directory;

            // Vertex shader
            const vertexShaderSource = `
                attribute vec2 position;
                void main() {
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

            // Fragment shader with configurable palette
            const fragmentShaderSource = `
                precision mediump float;
                uniform vec2 resolution;
                uniform float time;
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform vec3 colorC;
                uniform float speed;

                vec3 palette(float t) {
                    return colorA + colorB * cos(6.28318 * (colorC * t + vec3(0.0, 0.33, 0.67)));
                }

                void main() {
                    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
                    vec2 uv0 = uv;
                    vec3 finalColor = vec3(0.0);

                    for (float i = 0.0; i < 2.0; i++) {
                        uv = fract(uv * 1.3) - 0.5;
                        float d = length(uv) * exp(-length(uv0));
                        vec3 col = palette(length(uv0) + i * 0.3 + time * speed);
                        d = sin(d * 8.0 + time) / 8.0;
                        d = abs(d);
                        d = pow(0.012 / d, 1.15);
                        finalColor += col * d * 0.55;
                    }

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `;

            // Compile shader
            function compileShader(source, type) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            }

            const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
            const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            // Setup geometry
            const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            const position = gl.getAttribLocation(program, 'position');
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

            // Get uniform locations
            const resolutionUniform = gl.getUniformLocation(program, 'resolution');
            const timeUniform = gl.getUniformLocation(program, 'time');
            const colorAUniform = gl.getUniformLocation(program, 'colorA');
            const colorBUniform = gl.getUniformLocation(program, 'colorB');
            const colorCUniform = gl.getUniformLocation(program, 'colorC');
            const speedUniform = gl.getUniformLocation(program, 'speed');

            // Set palette colors
            gl.uniform3f(colorAUniform, palette.a[0], palette.a[1], palette.a[2]);
            gl.uniform3f(colorBUniform, palette.b[0], palette.b[1], palette.b[2]);
            gl.uniform3f(colorCUniform, palette.c[0], palette.c[1], palette.c[2]);
            gl.uniform1f(speedUniform, palette.speed);

            // Resize handler
            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
            resize();
            window.addEventListener('resize', resize);

            // Animation loop
            let startTime = Date.now();
            let animationId;

            function render() {
                const time = (Date.now() - startTime) * 0.001;
                gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
                gl.uniform1f(timeUniform, time);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                animationId = requestAnimationFrame(render);
            }
            render();

            return {
                destroy: function() {
                    cancelAnimationFrame(animationId);
                    window.removeEventListener('resize', resize);
                }
            };
        },

        // Add mouse tracking glow to cards
        initCardGlow: function(selector) {
            document.querySelectorAll(selector).forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mouse-x', x + '%');
                    card.style.setProperty('--mouse-y', y + '%');
                });
            });
        },

        // Common CSS variables
        cssVariables: `
            :root {
                --bg-primary: #000000;
                --bg-elevated: rgba(20, 20, 25, 0.6);
                --accent-cyan: #00D4FF;
                --accent-purple: #7C3AED;
                --accent-rose: #F43F5E;
                --accent-green: #10B981;
                --text-primary: #FFFFFF;
                --text-secondary: rgba(255, 255, 255, 0.6);
                --glass-border: rgba(255, 255, 255, 0.08);
                --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
                --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
                --card-radius: 24px;
                --button-radius: 12px;
                --glass-blur: 20px;
                --glass-bg: rgba(255, 255, 255, 0.03);
            }
        `
    };

    // Export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = KiraSpatial;
    } else {
        global.KiraSpatial = KiraSpatial;
    }

})(typeof window !== 'undefined' ? window : this);
