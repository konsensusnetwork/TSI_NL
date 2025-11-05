// Only include audio player on specific pages
const audioPages = ['ch00','ch00b','ch00c','p1-quote','ch01','ch02','ch03','ch04','p2-quote','ch05'];
const audioUrlMap = {
  'ch00': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch00.mp3',
  'ch00b': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch00b.mp3',
  'ch00c': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch00c.mp3',
  'p1-quote': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//p1-quote.mp3',
  'ch01': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch01.mp3',
  'ch02': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch02.mp3',
  'ch03': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch03.mp3',
  'ch04': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch04.mp3',
  'p2-quote': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//p2-quote.mp3',
  'ch05': 'https://znkyculecqbalnhfsojt.supabase.co/storage/v1/object/public/geldnood//ch05.mp3',
  // Add more as needed
};
const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

if (audioPages.includes(currentPage)) {
  document.write(`
    <div class="audio-player-container">
      <audio id="book-audio" controls>
        <source src="${audioUrlMap[currentPage] || '/audio/' + currentPage + '.mp3'}" type="audio/mpeg">
        Je browser ondersteunt geen audio element.
      </audio>
      <div class="audio-controls">
        <button id="play-pause" class="audio-button">
          <i class="fas fa-play"></i>
        </button>
        <div class="progress-container">
          <div class="progress-bar"></div>
        </div>
        <span class="time-display">00:00 / 00:00</span>
      </div>
    </div>
  `);

  // Audio player functionality
  document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('book-audio');
    const playPauseBtn = document.getElementById('play-pause');
    const progressBar = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time-display');
    const progressContainer = document.querySelector('.progress-container');

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });

    // Update progress bar
    audio.addEventListener('timeupdate', function() {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = progress + '%';
      
      // Update time display
      const currentMinutes = Math.floor(audio.currentTime / 60);
      const currentSeconds = Math.floor(audio.currentTime % 60);
      const durationMinutes = Math.floor(audio.duration / 60);
      const durationSeconds = Math.floor(audio.duration % 60);
      
      timeDisplay.textContent = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
    });

    // Click on progress bar to seek
    progressContainer.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pos * audio.duration;
    });

    // Update play/pause button when audio ends
    audio.addEventListener('ended', function() {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
  });
} 