const { highLightTimings } = require('./highlight-timing')
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);
const ffmpegPattern = (name, timing, part) => `ffmpeg -ss ${timing.start} -i ${timing.input} -t ${timing.duration} -c copy highlights/${name}_${part}.mp4`

const ffmpegRunner = () => {

    const highlightFlat = highLightTimings.map(highlight => highlight.timings.map((timing, index) => execPromise(ffmpegPattern(highlight.name, timing, index + 1))))

    return Promise.all(highlightFlat.flat())
}

ffmpegRunner().then(() => {
    console.log("done")
    process.exit()
}).catch((err) => {
    console.log(err)
    process.exit()
})
