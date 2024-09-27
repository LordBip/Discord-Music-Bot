const { Client, GatewayIntentBits, Events } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

const TOKEN = 'YOUR BOT CODE HERE'; // Your bot token
const CHANNEL_ID = 'YOUR CHANNEL ID HERE'; // Your voice channel ID
const AUDIO_FILE1_PATH = path.join(__dirname, 'file1.opus'); // Path to the first audio file
const AUDIO_FILE2_PATH = path.join(__dirname, 'file2.opus'); // Path to the second audio file
const AUDIO_FILE3_PATH = path.join(__dirname, 'file3.opus'); // Path to the third audio file 
const DURATION_FILE1 = 50; // Duration of the first file in seconds
const DURATION_FILE2 = 80; // Duration of the second file in seconds
const DURATION_FILE3 = 50; // Duration of the third file in seconds
const START_DELAY = 55 * 1000; // 55 seconds delay

ffmpeg.setFfmpegPath(ffmpegPath);

// Ensure the output files are empty before starting
fs.writeFileSync(AUDIO_FILE1_PATH, '');
fs.writeFileSync(AUDIO_FILE2_PATH, '');
fs.writeFileSync(AUDIO_FILE3_PATH, '');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.get(CHANNEL_ID);

  if (channel) {
    console.log('Channel found, attempting to connect...');
    const connection = joinVoiceChannel({
      channelId: CHANNEL_ID,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('The bot has connected to the channel!');
      startRecording(); // Start recording audio
      // Delay the start of streaming
      setTimeout(() => {
        startStreaming(connection);
      }, START_DELAY);
    });

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      console.log('Bot disconnected from the voice channel!');
    });

    connection.on('error', (error) => {
      console.error('Connection error:', error);
    });

  } else {
    console.error('Voice channel not found!');
  }
});

function startRecording() {
  let currentFile = AUDIO_FILE1_PATH;
  let duration = DURATION_FILE1;

  function record() {
    console.log(`Recording to ${currentFile}...`);

    ffmpeg()
      .input('audio=CABLE Output (VB-Audio Virtual Cable)')
      .inputFormat('dshow') // Use 'dshow' for Windows DirectShow devices
      .audioCodec('libopus') // Use the Opus codec
      .audioBitrate('128k') // Bitrate of the audio
      .duration(duration) // Duration of the recording
      .save(currentFile)
      .on('end', () => {
        console.log(`Recording saved to ${currentFile}`);
        // Switch to the next file and update duration
        if (currentFile === AUDIO_FILE1_PATH) {
          currentFile = AUDIO_FILE2_PATH;
          duration = DURATION_FILE2;
        } else if (currentFile === AUDIO_FILE2_PATH) {
          currentFile = AUDIO_FILE3_PATH;
          duration = DURATION_FILE3;
        } else {
          currentFile = AUDIO_FILE1_PATH;
          duration = DURATION_FILE1;
        }
        // Start the next recording after a short delay
        setTimeout(record, 1000); // Adjust the delay as needed
      })
      .on('error', (err) => {
        console.error('Error occurred:', err);
      });
  }

  record(); // Start the first recording
}

function startStreaming(connection) {
  const audioPlayer = createAudioPlayer();
  let currentFile = AUDIO_FILE1_PATH;

  const playNextFile = () => {
    const audioResource = createAudioResource(currentFile, {
      inputType: StreamType.Opus, // Use Opus for audio format
    });

    // Remove previous listeners to avoid duplication
    audioPlayer.removeAllListeners(AudioPlayerStatus.Idle);
    audioPlayer.removeAllListeners('error');

    audioPlayer.play(audioResource);

    audioPlayer.on(AudioPlayerStatus.Idle, () => {
      // Switch to the other file
      if (currentFile === AUDIO_FILE1_PATH) {
        currentFile = AUDIO_FILE2_PATH;
      } else if (currentFile === AUDIO_FILE2_PATH) {
        currentFile = AUDIO_FILE3_PATH;
      } else {
        currentFile = AUDIO_FILE1_PATH;
      }
      playNextFile(); // Play the next file
    });

    audioPlayer.on('error', (error) => {
      console.error('Error playing audio:', error);
    });
  };

  connection.subscribe(audioPlayer);
  playNextFile(); // Start playing the first file
}

client.login(TOKEN);