var sound = {

  errorSoundPath: "assets/sounds/error.wav",
  coinSoundPath: "assets/sounds/coin.wav",
  whipSoundPath: "assets/sounds/whip.wav",
  winSoundPath: "assets/sounds/win.wav",
  insaneSoundPath: "assets/sounds/crazy.mp3",
  histSoundPath: "assets/sounds/hit2.wav",
  musicPath: "assets/sounds/music.wav",
  slowMusicPath: "assets/sounds/slowmusic.mp3",
  typeSoundPath: "assets/sounds/type.wav",
  soundTrack: undefined,

  playError: function() {
    var snd = new Audio(this.errorSoundPath);
    snd.play();
  },

  playCollectCoin: function() {
    var snd = new Audio(this.coinSoundPath);
    snd.play();
  },

  playWhip: function() {
    var snd = new Audio(this.whipSoundPath);
    snd.play();
  },

  playWin: function() {
    var snd = new Audio(this.winSoundPath);
    snd.play();
  },
  playTyping: function() {
    var snd = new Audio(this.typeSoundPath);
    snd.play();
  },

  playHit: function() {
    var snd = new Audio(this.histSoundPath);
    snd.play();
  },

  playMusic: function() {
    this.soundTrack = new Audio(this.musicPath);
    this.soundTrack.addEventListener('ended', function() {
      this.currentTime = 0;
      this.loop = true;
      this.play();
    }, false);
    this.soundTrack.play();
  },

  stopMusic: function() {
    this.soundTrack.pause();
  }
}
