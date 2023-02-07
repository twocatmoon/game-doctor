<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Game Doctor</h3>

  <p align="center">
    Game Doctor generates diagnostic reports for HTML5 video games in easy-to-share formats. Reports contain information about graphics, device, network, fps, screenshots, client fingerprint, and much more. Easy to implement, easy to use, and fully configurable with key-bindings and global window hooks.
    <br /><br />
    Use our Diagnostic Formatting Tool to decode and generate human-friendly PDFs from diagnostic reports.
    <br /><br />
    <a href="https://twocatmoon.github.io/game-doctor"><strong>Diagnostic Formatting Tool »</strong></a>
    <br />
    <br />
    <a href="https://github.com/twocatmoon/game-doctor/issues">Report Bug</a>
    ·
    <a href="https://github.com/twocatmoon/game-doctor/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#example-output">Example Output</a></li>
      </ul>
    </li>
    <li><a href="#decoding-reports">Decoding Reports</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation

1. Install Game Doctor via NPM
   ```sh
   npm i @twocatmoon/game-doctor
   ``` 
   
2. Import the GameDoctor class into your project and initialize an instance
   ```ts
   import { GameDoctor } from '@twocatmoon/game-doctor'

   const doctor = new GameDoctor({
      gameName: 'My Game',
      gameVersion: '1.0.0',
      outputToConsole: true,
      outputFormat: 'base64',
      copyToClipboard: true,
      canvasEl: myGame.canvasEl,
      async canvasRenderFn () { myGame.render() },
   })
   ```
3. Call the `doTick` method somewhere in your main game loop so we can detect FPS
   ```ts
   doctor.doTick()
   ```

4. (Optional) Call the `generateReport` method
   ```ts
   await doctor.generateReport()
   ```

5. (Optional) Hook up the FPS indicator
   ```ts
   doctor.showFps()
   doctor.showFps(boolean)
   doctor.hideFps()
   ```

You should now see a diagnostic report in your console, and have the base64-encoded JSON copied to your clipboard. Have your users send the outputted report data to your support team, which can be used to generate human-readable reports via Game Doctor or the online <a href="https://twocatmoon.github.io/game-doctor">Diagnostic Formatting Tool</a>.

_Note: For full configuration options and further usage instructions see below._


### Configuration

```ts
type GameDoctorOptions = {
    // The name of your game
    gameName: string
    // The current version of your game client
    gameVersion: string
    // Copies output to clipboard while true
    copyToClipboard?: boolean
    // Add additional info to the fingerprinting hash algorithm
    additionalFingerprintInfo?: any
    // The canvas element your game is rendering to
    canvasEl?: HTMLCanvasElement
    // The method you call to render your game to the canvas (required for taking screenshots from WebGL contexts)
    canvasRenderFn?: () => Promise<void>
    // URL to use to determine ping duration
    pingUrl?: string
    // Add __toggleFps and __generateReport methods to the window object
    attachToWindow?: boolean
    // Any additional information you'd like included in the report
    getAdditionalInfo?: () => Promise<any>
    // Output the report to the console in a human-readable format
    outputToConsole?: boolean
    // Output format in json, base64 encoded json, or shareable png (Diagnostic Formatting Tool requires base64 or image/png formats)
    outputFormat?: 'json' | 'base64' | 'image/png'
    // Image to overlay ontop of image/png exports (like your game or company logo)
    overlayImage?: HTMLCanvasElement | HTMLImageElement
    // Configure keyboard shortcuts to generate reports and toggle the FPS counter
    keyboardShortcuts?: {
        generateReport: {
            key: string
            ctrlKey?: boolean
            altKey?: boolean
            shiftKey?: boolean
            metaKey?: boolean
        },
        toggleFps: {
            key: string
            ctrlKey?: boolean
            altKey?: boolean
            shiftKey?: boolean
            metaKey?: boolean
        },
    }
    // Which reports to generate (by default all are enabled except for location)
    reports?: {
        performance?: boolean
        network?: boolean
        window?: boolean
        device?: boolean
        graphicsDevice?: boolean
        screenshot?: boolean
        location?: boolean
        fingerprint?: boolean
        fps?: boolean
        lastError?: boolean
    }
}
```

### Example Output

```json
{
  "reportId": "f2301f0e5d35f",
  "date": "2023-02-07T19:43:21.133Z",
  "timezone": 420,
  "gameName": "Test Game",
  "gameVersion": "1.0.0",
  "additionalInfo": {
    "foo": "bar"
  },
  "performance": {
    "timeOrigin": 1675798998737.4,
    "timing": {
      "connectStart": 1675798998749,
      "navigationStart": 1675798998737,
      "secureConnectionStart": 0,
      "fetchStart": 1675798998741,
      "domContentLoadedEventStart": 1675798998860,
      "responseStart": 1675798998761,
      "domInteractive": 1675798998800,
      "domainLookupEnd": 1675798998749,
      "responseEnd": 1675798998762,
      "redirectStart": 0,
      "requestStart": 1675798998749,
      "unloadEventEnd": 1675798998771,
      "unloadEventStart": 1675798998771,
      "domLoading": 1675798998772,
      "domComplete": 1675798998885,
      "domainLookupStart": 1675798998749,
      "loadEventStart": 1675798998885,
      "domContentLoadedEventEnd": 1675798998860,
      "loadEventEnd": 1675798998885,
      "redirectEnd": 0,
      "connectEnd": 1675798998749
    },
    "navigation": {
      "type": 1,
      "redirectCount": 0
    },
    "memory": {
      "totalJSHeapSize": 10424393,
      "usedJSHeapSize": 8561557,
      "jsHeapSizeLimit": 2172649472
    },
    "eventCounts": {
      "size": 36
    }
  },
  "network": {
    "effectiveType": "4g",
    "rtt": 100,
    "downlink": 10,
    "ipAddress": "XX.XX.XX.XX",
    "ping": 158.89999999850988
  },
  "window": {
    "innerWidth": 1197,
    "innerHeight": 1181,
    "pixelRatio": 1,
    "href": "http://localhost:5173/",
    "title": "Test Game",
    "isEmbedded": false,
    "referrer": "http://localhost:5173/"
  },
  "device": {
    "language": "en-US",
    "languages": [
      "en-US",
      "en"
    ],
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "deviceMemory": 8,
    "doNotTrack": null,
    "hardwareConcurrency": 8,
    "maxTouchPoints": 0
  },
  "graphicsDevice": {
    "renderer": "WebKit WebGL",
    "rendererUnmasked": "ANGLE (Apple, Apple M1, OpenGL 4.1)",
    "vendor": "WebKit",
    "vendorUnmasked": "Google Inc. (Apple)"
  },
  "screenshot": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...",
  "fingerprint": "1845e3df8030e9bd8ada1ff6757b550c59b75b09f0459cae3686fe103afd809d",
  "fps": "55.3",
  "lastError": [
    "Uncaught Error: foo bar baz",
    "http://localhost:5173/src/main.ts?t=1675798998734",
    61
  ]
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Decoding Reports

### Via Game Doctor
Reports can be decoded programatically using a set of static methods on the Game Doctor class.
```ts
  const decoded = GameDoctor.decodeBase64(string)
  const decoded = await GameDoctor.decodeImageUrl(string)
  const decoded = await GameDoctor.decodeImage(HTMLImageElement | HTMLCanvasElement)
```

### Via the online Diagnostic Formatting Tool
Reports in the base64 or image/png formats can be decoded and formatted into human-readable, printable HTML pages using the <a href="https://twocatmoon.github.io/game-doctor">Diagnostic Formatting Tool</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Twitter - [@twocatmoon](https://twitter.com/twocatmoon)

Project Link - [https://github.com/twocatmoon/game-doctor](https://github.com/twocatmoon/game-doctor)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/twocatmoon/game-doctor.svg?style=for-the-badge
[contributors-url]: https://github.com/twocatmoon/game-doctor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/twocatmoon/game-doctor.svg?style=for-the-badge
[forks-url]: https://github.com/twocatmoon/game-doctor/network/members
[stars-shield]: https://img.shields.io/github/stars/twocatmoon/game-doctor.svg?style=for-the-badge
[stars-url]: https://github.com/twocatmoon/game-doctor/stargazers
[issues-shield]: https://img.shields.io/github/issues/twocatmoon/game-doctor.svg?style=for-the-badge
[issues-url]: https://github.com/twocatmoon/game-doctor/issues
[license-shield]: https://img.shields.io/github/license/twocatmoon/game-doctor.svg?style=for-the-badge
[license-url]: https://github.com/twocatmoon/game-doctor/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 