<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ass3mbl3r | Low-Level Digital Solutions</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Fira Code', monospace;
        }

        .glitch:hover {
            text-shadow: 2px 0 #00ff00, -2px 0 #ff00ff;
        }
    </style>
</head>

<body class="bg-black text-gray-300 selection:bg-green-500 selection:text-black">
    <div id="loader"
        class="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center font-mono text-xs md:text-sm p-10">
        <div id="loader-content" class="text-green-500 max-w-md w-full">
        </div>
    </div>
    <nav class="p-6 border-b border-gray-800 flex justify-between items-center">
        <div class="text-green-500 font-bold text-xl glitch tracking-tighter cursor-default">
            [ass3mbl3r]
        </div>
        <div class="space-x-6 text-sm">
            <a href="#about" class="hover:text-green-400 transition">.sobre_mí</a>
            <a href="#stack" class="hover:text-green-400 transition">.stack</a> <a href="#projects"
                class="hover:text-green-400 transition">.proyectos</a>
            <a href="#contact" class="hover:text-green-400 transition">.contacto</a>
        </div>
    </nav>

    <header class="h-[70vh] flex flex-col justify-center px-10 max-w-5xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-light mb-4">
            Construyendo el futuro bit a bit.
        </h1>
        <p class="text-green-600 text-lg mb-8">
            > Soluciones digitales de bajo nivel, alta eficiencia.
        </p>
        <div class="flex space-x-4">
            <a href="#projects"
                class="border border-green-500 text-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition">
                Ver Proyectos
            </a>
        </div>
    </header>
    <section id="about" class="py-20 px-10 max-w-5xl mx-auto border-t border-gray-900">
        <div class="grid md:grid-cols-2 gap-12">
            <div>
                <h2 class="text-2xl text-green-500 mb-6 tracking-widest">// MANIFIESTO_0x01</h2>
                <p class="text-gray-400 leading-relaxed mb-4">
                    En un mundo saturado de software pesado, <span class="text-white">ass3mbl3r</span> nace de mi
                    necesidad de volver a lo esencial.
                </p>
                <p class="text-gray-400 leading-relaxed">
                    Creo en la arquitectura limpia y en el código que respeta el hardware. No solo programo; ensamblo
                    soluciones donde cada bit tiene un propósito.
                </p>
            </div>
            <div class="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 p-2 text-[10px] text-zinc-700 font-mono">v1.0.42</div>
                <ul class="space-y-4 text-sm font-mono">
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">01_</span>
                        <span>Eficiencia por sobre estética vacía.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">02_</span>
                        <span>Código artesanal, ejecución industrial.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">03_</span>
                        <span>Transparencia técnica absoluta.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">04_</span>
                        <span>YASUMI: Desarrollo en curso (Kernel v0.1).</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section id="stack" class="py-20 px-10 max-w-5xl mx-auto border-t border-gray-900">
        <h2 class="text-2xl text-green-500 mb-10 tracking-widest">// TECH_STACK_0x02</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="border border-zinc-800 p-6 bg-zinc-950/30">
                <h3 class="text-white mb-4 font-bold">.frontend</h3>
                <ul class="text-sm text-gray-500 space-y-2 font-mono">
                    <li>> HTML5 / CSS3 (Tailwind)</li>
                    <li>> JavaScript (ES6+)</li>
                    <li>> React / Next.js</li>
                </ul>
            </div>

            <div class="border border-zinc-800 p-6 bg-zinc-950/30">
                <h3 class="text-white mb-4 font-bold">.backend_logic</h3>
                <ul class="text-sm text-gray-500 space-y-2 font-mono">
                    <li>> Node.js (Runtime)</li>
                    <li>> Java (Core Logic)</li>
                    <li>> PostgreSQL / Supabase</li>
                    <li>> Docker / Containers</li>
                </ul>
            </div>

            <div class="border border-zinc-800 p-6 bg-zinc-950/30">
                <h3 class="text-white mb-4 font-bold">.devtools</h3>
                <ul class="text-sm text-gray-500 space-y-2 font-mono">
                    <li>> Git / GitHub</li>
                    <li>> Vercel Deployment</li>
                    <li>> WSL2 / Linux Environment</li>
                </ul>
            </div>
        </div>
    </section>
    <section id="projects" class="py-20 bg-zinc-950 px-10 border-y border-gray-900">
        <div class="max-w-5xl mx-auto">
            <div class="flex items-center space-x-4 mb-6">
                <div class="h-px bg-green-900 flex-grow"></div>
                <h2 class="text-xl text-white font-mono">LAB_LOG: YASUMI</h2>
            </div>
            <p class="text-gray-400 max-w-2xl mb-6 italic">
                Actualmente estoy refactorizando mi propio sistema ERP/POS. No es un producto comercial masivo
                (todavía); es un experimento de eficiencia comercial llevado al extremo.
            </p>
            <div class="inline-flex items-center space-x-2 text-xs font-mono text-zinc-500">
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span>ESTADO: REFACTORIZACIÓN DE NÚCLEO</span>
            </div>
        </div>
    </section>

    <footer id="contact" class="p-10 text-center text-xs text-gray-600">
        <p>© 2026 ass3mbl3r. All rights reserved.</p>
        <p class="mt-2 text-green-900">// Efficiency is not an option, it's the core.</p>
    </footer>

</body>
<script>
    const loaderContent = document.getElementById('loader-content');
    const logs = [
        "> INITIALIZING BOOT_SEQUENCE...",
        "> LOADING KERNEL_MODULES...",
        "> CONNECTING TO ass3mbl3r.com.ar...",
        "> ACCESS GRANTED.",
        "> STARTING INTERFACE..."
    ];

    let logIndex = 0;

    // Función para mostrar los logs de carga
    function showLogs() {
        if (logIndex < logs.length) {
            const p = document.createElement('p');
            p.textContent = logs[logIndex];
            p.className = "mb-2 opacity-0 animate-pulse";
            loaderContent.appendChild(p);

            // Animación simple de aparición
            setTimeout(() => { p.style.opacity = "1"; }, 50);

            logIndex++;
            setTimeout(showLogs, 400); // Velocidad de cada línea
        } else {
            // Cuando termina, esperamos un poco y ocultamos el loader
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.transition = "opacity 0.8s ease";
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    typeWriter(); // Iniciamos el efecto de tipeo del Hero
                }, 800);
            }, 500);
        }
    }

    // Código del Typewriter (tu texto del Hero)
    const heroText = "Construyendo el futuro bit a bit.";
    const speed = 50;
    let charIndex = 0;

    function typeWriter() {
        const target = document.querySelector('header h1');
        if (charIndex < heroText.length) {
            target.innerHTML += heroText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        }
    }

    // Arrancamos todo cuando carga la ventana
    window.onload = () => {
        const target = document.querySelector('header h1');
        target.innerHTML = ''; // Limpiamos el hero para que no se vea antes
        showLogs();
    };
</script>

</html>