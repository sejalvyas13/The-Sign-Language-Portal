

// [START speech_quickstart]
async function main() {
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  // Creates a client
  const client = new speech.SpeechClient();

  // The name of the audio file to transcribe
  const fileName = './resources/rec2.flac';

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'FLAC',
    sampleRateHertz: 44100,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);

  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  //console.log(`Transcription: ${transcription}`);
  //console.log(typeof transcription)
  //console.log(response)
  //console.log(response.alternatives)
}
main().catch(console.error);
// [END speech_quickstart]