import { GameDoctor } from '@twocatmoon/game-doctor'

// Set up the page
document.body.innerHTML = `<div>
  <canvas id="canvas"></canvas>
  <img src="/path/to/overlay.png" id="overlayImage" />
  <button id="button" type="button">Generate Report</button>
</div>`

// Initialize Game Doctor
const doctor = new GameDoctor({
    gameName: 'Test Game',
    gameVersion: '1.0.0',
    canvasEl: document.getElementById('canvas') as HTMLCanvasElement,
    async canvasRenderFn () {
        // WebGL contexts will need to have their render function called immediately before the screenshot is taken
        // TODO: call your render function here
    },
    copyToClipboard: true,
    pingUrl: 'https://your.game.server/api/ping',
    outputToConsole: true,
    outputFormat: 'image/png',
    overlayImage: document.getElementById('overlayImage') as HTMLImageElement,
    attachToWindow: true,
    keyboardShortcuts: {
        generateReport: {
            key: 'p',
            shiftKey: true,
        },
        toggleFps: {
            key: 'l',
        }
    },
    async getAdditionalInfo () {
        return {
            playerId: 'foo',
            sessionId: 'bar',
        }
    },
})

// Attach to the game loop
setInterval(() => {
    doctor.onTick()
}, 1000 / 60)

// Bind event to button
const button = document.getElementById('button') as HTMLDivElement
button.addEventListener('click', async () => {
    await doctor.generateReport()
})
