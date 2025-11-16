// JAVASCRIPTS

// 1. Verificar palíndromo
function verificarPalindromo() {
    const input = document.getElementById('palindromoInput').value;
    const resultado = document.getElementById('resultadoPalindromo');
    
    if (!input.trim()) {
        resultado.innerHTML = '<p style="color: var(--secondary);">Por favor ingresa una palabra o frase.</p>';
        return;
    }

    const cadenaLimpia = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cadenaReversa = cadenaLimpia.split('').reverse().join('');

    if (cadenaLimpia === cadenaReversa) {
        resultado.innerHTML = `<p style="color: green; font-weight: bold;">"${input}" ES un palíndromo ✅</p>`;
    } else {
        resultado.innerHTML = `<p style="color: var(--secondary); font-weight: bold;">"${input}" NO es un palíndromo ❌</p>`;
    }
}

// 2. Comparar números
function compararNumeros() {
    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);
    const resultado = document.getElementById('resultadoNumeros');

    if (isNaN(num1) || isNaN(num2)) {
        resultado.innerHTML = '<p style="color: var(--secondary);">Por favor ingresa ambos números.</p>';
        return;
    }

    if (num1 > num2) {
        resultado.innerHTML = `<p>El número <strong>${num1}</strong> es mayor que <strong>${num2}</strong></p>`;
    } else if (num2 > num1) {
        resultado.innerHTML = `<p>El número <strong>${num2}</strong> es mayor que <strong>${num1}</strong></p>`;
    } else {
        resultado.innerHTML = `<p>Ambos números son <strong>iguales</strong>: ${num1}</p>`;
    }
}

// 3. Mostrar vocales que aparecen
function mostrarVocales() {
    const frase = document.getElementById('fraseVocales').value;
    const resultado = document.getElementById('resultadoVocales');

    if (!frase.trim()) {
        resultado.innerHTML = '<p style="color: var(--secondary);">Por favor ingresa una frase.</p>';
        return;
    }

    const vocalesEncontradas = new Set();
    const vocales = 'aeiouáéíóú';

    for (let letra of frase.toLowerCase()) {
        if (vocales.includes(letra)) {
            vocalesEncontradas.add(letra);
        }
    }

    const vocalesArray = Array.from(vocalesEncontradas).sort();

    if (vocalesArray.length > 0) {
        resultado.innerHTML = `<p>Vocales encontradas: <strong>${vocalesArray.join(', ')}</strong></p>`;
    } else {
        resultado.innerHTML = '<p>No se encontraron vocales en la frase.</p>';
    }
}

// 4. Contar apariciones de cada vocal
function contarVocales() {
    const frase = document.getElementById('fraseContarVocales').value;
    const resultado = document.getElementById('resultadoContarVocales');

    if (!frase.trim()) {
        resultado.innerHTML = '<p style="color: var(--secondary);">Por favor ingresa una frase.</p>';
        return;
    }

    // Contar vocales (incluyendo tildes)
    const vocales = {
        'a': (frase.toLowerCase().match(/[aáàä]/g) || []).length,
        'e': (frase.toLowerCase().match(/[eéèë]/g) || []).length,
        'i': (frase.toLowerCase().match(/[iíìï]/g) || []).length,
        'o': (frase.toLowerCase().match(/[oóòö]/g) || []).length,
        'u': (frase.toLowerCase().match(/[uúùü]/g) || []).length
    };

    let html = '<div class="vocales-resultado">';
    
    for (let vocal in vocales) {
        html += `
            <div class="vocal-item">
                <div>${vocal.toUpperCase()}</div>
                <div class="vocal-count">${vocales[vocal]}</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    // Resumen
    const total = Object.values(vocales).reduce((sum, count) => sum + count, 0);
    html += `<div style="margin-top: 1rem; padding: 1rem; background: var(--light); border-radius: 5px;">
                <strong>Total de vocales:</strong> ${total} |
                A: ${vocales.a}, E: ${vocales.e}, I: ${vocales.i}, O: ${vocales.o}, U: ${vocales.u}
             </div>`;
    
    resultado.innerHTML = html;
}

//  AJAX 

// 1. Al cargar la página, mostrar URL por defecto
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('urlInput').value = window.location.href;
});

// 2. Mostrar contenidos mediante AJAX - CON MÚLTIPLES PROXIES
function mostrarContenidos() {
    let url = document.getElementById('urlInput').value;
    const estados = document.getElementById('estadosPeticion');
    const cabeceras = document.getElementById('cabecerasRespuesta');
    const codigo = document.getElementById('codigoEstado');
    const contenidos = document.getElementById('contenidosRespuesta');

    if (!url.trim()) {
        alert('Por favor ingresa una URL válida');
        return;
    }

    // Limpiar resultados anteriores
    estados.textContent = 'Estado: No iniciada';
    cabeceras.innerHTML = '';
    codigo.innerHTML = '';
    contenidos.textContent = '';

    // detectar si es URL LOCAL (file://)
    if (url.startsWith('file://') || url.includes('file:///')) {
        estados.textContent = 'Estado: Bloqueado por seguridad';
        cabeceras.innerHTML = '<pre>content-type: text/plain; charset=utf-8\nx-security-policy: same-origin</pre>';
        codigo.innerHTML = '<p><strong>Código:</strong> 0</p><p><strong>Texto:</strong> CORS Policy</p>';
        
        contenidos.textContent = `🚫 ACCESO BLOQUEADO POR POLÍTICAS DE SEGURIDAD

🔍 RAZÓN TÉCNICA:
Las URLs locales (protocolo file://) están BLOQUEADAS para peticiones AJAX debido a la 
"Política del Mismo Origen" (Same-Origin Policy) implementada en todos los navegadores.

📋 DETALLES TÉCNICOS:
• Origen actual: null (archivo local)
• Origen solicitado: file:// (archivo local)
• Protocolo: file:// (no HTTP/HTTPS)
• Error: CORS (Cross-Origin Resource Sharing)

🔒 MOTIVO DE SEGURIDAD:
Esta restricción evita que scripts maliciosos en páginas web puedan leer archivos 
locales del sistema del usuario sin su consentimiento.

💡 SOLUCIONES:
1. Usar un servidor local para desarrollo:
   # python -m http.server 8000
   # Luego acceder via: http://localhost:8000

2. Probar con URLs de internet:
   • https://jsonplaceholder.typicode.com/posts/1
   • www.example.com
   • www.google.com
   • cualquier-sitio-web.com

3. Para desarrollo local, configurar un entorno con servidor web local.

⚠️  NOTA: Esta es una limitación técnica de los navegadores por diseño de seguridad
y no puede ser evitada en aplicaciones web estándar.`;
        return;
    }

    // Si NO es URL local, proceder con proxies para URLs de internet
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    // Diferentes proxies CORS para probar
    const proxies = [
        `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
        `https://corsproxy.io/?${encodeURIComponent(url)}`,
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    ];

    let currentProxyIndex = 0;
    const maxRetries = proxies.length;

    function tryNextProxy() {
        if (currentProxyIndex >= maxRetries) {
            estados.textContent = 'Estado: Todos los proxies fallaron';
            contenidos.textContent = 'Error: Todos los proxies fallaron. Intenta con:\n• https://jsonplaceholder.typicode.com/posts/1\n• www.example.com\n• www.google.com';
            return;
        }

        const proxyUrl = proxies[currentProxyIndex];
        estados.textContent = `Estado: Probando proxy ${currentProxyIndex + 1} de ${proxies.length}...`;

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // Mostrar cabeceras
                const cabecerasRespuesta = xhr.getAllResponseHeaders();
                if (cabecerasRespuesta) {
                    cabeceras.innerHTML = '<pre>' + cabecerasRespuesta + '</pre>';
                } else {
                    cabeceras.innerHTML = '<p>No se recibieron cabeceras del proxy</p>';
                }

                // Mostrar código de estado
                codigo.innerHTML = `<p><strong>Código:</strong> ${xhr.status}</p><p><strong>Texto:</strong> ${xhr.statusText}</p>`;

                // Manejar la respuesta
                if (xhr.status === 200) {
                    estados.textContent = 'Estado: Completada ✅';
                    try {
                        let content = xhr.responseText;
                        
                        // Formato de respuesta según el proxy
                        if (currentProxyIndex === 2) { // allorigins.win
                            const response = JSON.parse(content);
                            content = response.contents || content;
                        }
                        
                        contenidos.textContent = content;
                    } catch (e) {
                        contenidos.textContent = xhr.responseText;
                    }
                } else {
                    contenidos.textContent = `Proxy ${currentProxyIndex + 1} falló (Código: ${xhr.status}).`;
                    currentProxyIndex++;
                    if (currentProxyIndex < maxRetries) {
                        contenidos.textContent += '\nProbando siguiente proxy...';
                        setTimeout(tryNextProxy, 1000);
                    } else {
                        estados.textContent = 'Estado: Todos los proxies fallaron';
                    }
                }
            }
        };

        xhr.onerror = function() {
            contenidos.textContent = `Proxy ${currentProxyIndex + 1} falló.`;
            currentProxyIndex++;
            if (currentProxyIndex < maxRetries) {
                contenidos.textContent += '\nProbando siguiente proxy...';
                setTimeout(tryNextProxy, 1000);
            } else {
                estados.textContent = 'Estado: Todos los proxies fallaron';
            }
        };

        xhr.ontimeout = function() {
            contenidos.textContent = `Proxy ${currentProxyIndex + 1} timeout.`;
            currentProxyIndex++;
            if (currentProxyIndex < maxRetries) {
                contenidos.textContent += '\nProbando siguiente proxy...';
                setTimeout(tryNextProxy, 1000);
            } else {
                estados.textContent = 'Estado: Todos los proxies fallaron';
            }
        };

        try {
            xhr.open('GET', proxyUrl, true);
            xhr.timeout = 10000;
            xhr.send();
        } catch (error) {
            contenidos.textContent = `Error: ${error.message}`;
        }
    }

    // Iniciar el primer intento
    tryNextProxy();
}
