
![Untitled](https://github.com/user-attachments/assets/3258320d-35c9-40f4-8cf4-e1fe2c37428a)

Method for playing Spotify or other desktop audio through a discord bot.

Finding a discord bot that is capable of playing spotify audio has become more difficult in the recent years due to updates to discords bot policy. The provided code and instructions will help you in the creation of your very own bot that allows you to stream your own spotify music through a discord bot with very little coding knowledge. The method outlined is not perfect and can be expanded upon should you have the know-how and desire to, but works. Useful for putting on a playlist when not all friends have a spotify premium to "listen together".

**Method and notes (Read before continuing)**

    - I had trouble getting streaming audio to work with ffmeg and thus bootlegged the thing to be constantly saving , swaping, and overwriting, while playing audio files.
    - The script will save and loop through 3 audio files as it "listens" to the audio comming through the desired application meaning that audio will be played on a delay (you will notice this when you start the bot and everytime it swaps to a new file you will hear a minor .25 second break)
        - The length of each file in seconds is 50,80,50 and a intial delay of 55 seconds is present to give the script time to record the first file. You can adjust this in the code.
        - EX. I start a spotify song and then run my script, the bot will join and I hear nothing, After 55 seconds the bot will begin playing the audio and continue playing until you stop it.
        
**What does this all mean?**

        - The bot has a 55 second delay before you hear anything from it. 
        - Everytime it swaps to a new file 50 seconds then 80 seconds then 50 seconds and repeating, you will hear a .25 second break in the audio (not too oppressive). 
        - If you swap to another song , there is a 55 second delay before you hear the change. (EX. Song 1 starts playing, my friend wants the song to change, I change to song 2, Due to the delay, we will hear 55 more seconds of song 1 before you hear song 2)

**Instructions for Usage**
1. What you will need
    - An IDE ([https://code.visualstudio.com/download] VScode is what i use, its free)
    - VB-Audio Virtual Cable ([https://vb-audio.com/Cable/] Freeware that creates a virtual audio driver)
    - A Discord Bot (I will go over creating one below)
    - {optional} A virtual enviorment (good practice when downloading packages but not neccessary)
  
2. Getting Setup

    - Download and install VB-Audio Virtual Cable and ensure it is visible in your sounds panel. If it is showing as your default communication or default device, you will want to right-click your actual audio device and set it as the default. 

        ![image](https://github.com/user-attachments/assets/2a04e78c-8a41-4790-b29e-b37685e6f168)

    - Create a discord bot (skip if you already have one). You can create a discord bot by going to [https://discord.com/developers/docs/quick-start/getting-started] and creating a app. Once your app is created, name your bot and head over to the OAUTH2 tab to generate a invite link. In this tab you can ignore the top half of the page and in "OAuth2 URL Generator" select "bot". This will open a new set of options where you can select permissions. I believe all we will need are the 3 options selected in the image below (Connect, Speak, Use Voice Activity), we may not even need "Use Voice Activity" however i am unsure as my used bot is given "administrator" permissions. Lastly go ahead and copy and paste your generated link into your browser or discord, and add your bot to the desired server. (You may have to give your bot permissions once in the server if channels are hidden etc) 
        ![image](https://github.com/user-attachments/assets/14561280-e138-4087-ac78-66c694cb7b19)
    I haven't invited or created a bot recently so apologizes if my instructions are missing something.

    - Open up my provided JS code in your IDE of choice and set your directory to where ever you saved my file, I suggest making a new folder for it. (If you dont see a terminal when you open the file then -> Terminal - New Terminal)
      - Change your directory in the terminal with the cd command. Open the location of the MusicBot file, in the address bar you can copy the address as text. In the terminal type "cd" and paste the address and then enter (Dont use spaces when naming files or folders).
       ![image](https://github.com/user-attachments/assets/c1d5a229-8af8-4fca-af9c-bcff65314aad)
       ![image](https://github.com/user-attachments/assets/a3bb047d-c2c7-4174-a2ee-b59969038f35)

    - install the following packages (Terminal - New Terminal - Copy and paste each of the below into the terminal and run)
      - npm install discord.js
      - npm install @discordjs/voice
      - npm install fluent-ffmpeg
      - npm install @ffmpeg-installer/ffmpeg
        
    - In line 8 add your bot token between the ''
      - You can get your token by going in the "bot" tab of your created discord app and hittng the "reset token" button to have a token generated.
    - In line 9 add the channel id of the channel you want the bot to join between the ''
      - To get a channel id open the user setting of discord, go to "Advanced" then turn on developer mode. Afterward, right-click a channel and "copy channel id"
    - Ensure you save the file and when its time to run, you can type "node MusicBot.js" in the terminal. Replace "MusicBot" with whatever you renamed the file to if you renamed it.
  
3. Audio Setup

   - For my example I will be using Spotify however you can use the same steps for any application or audio player.
   - Open up sound settings (search in windows bar or right click your sounds and open it)
   - Scroll all the way to the bottom to "Advanced Sound Options" and select "App volume and device preferences"
   - Find the application you want to be played through your bot and change both output and input to the VB audio drive cable
     
     ![image](https://github.com/user-attachments/assets/7c3996a2-2cf0-4919-8fc9-268017ca20a4)

   - Run the bot using "node MusicBot.js" in the terminal and unmute it in discord if it joined muted. Ensure you started playing audio already and it should begin playing in about a minute through the bot.
  
**Additional Note**
    - Remember to change the audio output and input back to default when done with the script



     
      

    
  
   
      
