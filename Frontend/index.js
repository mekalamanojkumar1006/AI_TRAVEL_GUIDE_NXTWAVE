// --- Constants ---
const VOICES = {
  English: { Male: "Matthew", Female: "Alicia" },
  Hindi: { Male: "Aman", Female: "Namrita" },
  Tamil: { Male: "Murali", Female: "Iniya" },
  Telugu: { Male: "Zion", Female: "Josie" }
};

const LOCALES = {
  English: "en-US",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN"
};


// --- State ---
const state = {
  place: '',
  image: '',
  length: 'Summary',
  voice: 'Male'
};

// --- DOM Elements ---
const cardsContainer = document.querySelector('.cards');
const experiencePanel = document.getElementById('experience');
const previewTitle = document.getElementById('previewTitle');
const audioSection = document.getElementById('audioSection');
const audioPlayer = document.getElementById('audioPlayer');
const transcriptText = document.getElementById('scriptText');
const generateButton = document.getElementById('generateBtn');
const languageSelect = document.getElementById('selectLanguage');
const closeButton = document.getElementById('closeExperience');
const addPlaceBtn = document.getElementById('addPlaceBtn');
const searchPreviewCard = document.getElementById('searchPreviewCard');
const searchPreviewImage = document.getElementById('searchPreviewImage');
const searchPreviewTitle = document.getElementById('searchPreviewTitle');
const transcriptToggle = document.getElementById('transcriptToggle');
const transcriptContent = document.getElementById('transcriptContent');
const transcriptArrow = document.getElementById('transcriptArrow');

// --- Functions ---

function selectDestination(place, image, clickedCard = null) {
  state.place = place;
  state.image = image;

  // Update UI content
  previewTitle.textContent = place;
  cardsContainer.classList.add('faded');

  // Reset previous states
  document.querySelectorAll('.place-card').forEach(card => card.classList.remove('active'));
  searchPreviewCard.classList.add('hidden');

  // Handle Card Visibility
  if (clickedCard) {
    clickedCard.classList.add('active');
  } else {
    // If it's a search result, show the preview card
    searchPreviewImage.src = image;
    searchPreviewTitle.textContent = place;
    searchPreviewCard.classList.remove('hidden');
    searchPreviewCard.classList.add('active');
  }

  // Reset Audio Panel
  audioSection.classList.add('hidden');
  audioPlayer.src = '';
  transcriptText.textContent = '';
  generateButton.textContent = 'Generate Audio Guide';
  generateButton.disabled = false;

  // Show Panel with animation
  experiencePanel.classList.remove('hidden');
  setTimeout(() => {
    experiencePanel.classList.add('visible');
  }, 10);
}

function deselectDestination() {
  experiencePanel.classList.remove('visible');

  // Wait for animation to finish before hiding
  setTimeout(() => {
    experiencePanel.classList.add('hidden');
    cardsContainer.classList.remove('faded');
    searchPreviewCard.classList.add('hidden');
    document.querySelectorAll('.place-card').forEach(card => card.classList.remove('active'));
  }, 300);
}

// --- Event Listeners ---

function attachPlaceCardListeners(card) {
  const removeButton = card.querySelector('.delete-place-btn');

  if (removeButton) {
    removeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      card.remove();
    });
  }

  card.addEventListener('click', (event) => {
    if (event.target.closest('.delete-place-btn')) return;
    selectDestination(card.dataset.place, card.dataset.image, card);
  });
}

function addNewPlace() {
  const place = prompt('Enter the place name:');
  if (!place) return;

  const trimmedPlace = place.trim();
  if (!trimmedPlace) return;

  const imageUrl = prompt('Enter the image URL (optional):', 'https://images.unsplash.com/...');
  const finalImageUrl = imageUrl && imageUrl.trim() ? imageUrl.trim() : 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80';

  const newCard = document.createElement('div');
  newCard.className = 'place-card bg-white rounded-[2rem] overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:border-orange-100 group relative lg:[&.active]:w-[480px] lg:[&.active]:max-w-none';
  newCard.dataset.place = trimmedPlace;
  newCard.dataset.image = finalImageUrl;
  newCard.innerHTML = `
    <div class="overflow-hidden h-[200px] relative">
      <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      <img src="${finalImageUrl}" alt="${trimmedPlace}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-gray-800 shadow-sm">Custom</div>
      <button class="delete-place-btn absolute top-4 right-4 z-30 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md hover:bg-red-600 transition-all" aria-label="Delete place">Delete</button>
    </div>
    <div class="p-6">
      <span class="text-[11px] text-[#ff8a1f] font-bold uppercase tracking-widest">Your Trip</span>
      <h3 class="mt-2 mb-1 text-xl font-['Playfair_Display',_serif] font-bold text-gray-900 group-hover:text-[#ff8a1f] transition-colors">${trimmedPlace}</h3>
      <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">Added to your travel guide list for quick access.</p>
    </div>
  `;

  cardsContainer.insertBefore(newCard, searchPreviewCard);
  attachPlaceCardListeners(newCard);
}

// Close Button
closeButton.addEventListener('click', deselectDestination);
addPlaceBtn.addEventListener('click', addNewPlace);

// Card Clicks
document.querySelectorAll('.place-card:not(.search-preview-card)').forEach(card => {
  attachPlaceCardListeners(card);
});

// Option Toggles (History Type)
const lengthButtons = document.querySelectorAll('[data-group="length"] button');
lengthButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    lengthButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.length = btn.dataset.value;
  });
});

// Option Toggles (Voice Gender)
const voiceButtons = document.querySelectorAll('[data-group="voice"] button');
voiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    voiceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.voice = btn.dataset.value;
  });
});


// Generate Audio guide button Logic

const GENERATE_AUDIO_GUIDE_API_URL = "/api/generate-audio-guide";

generateButton.addEventListener('click', async () => {
  generateButton.disabled = true;
  generateButton.textContent = '⏳ Generating Audio...';

  try {
    const selectedLanguage = languageSelect.value;
    const selectedVoice = state.voice;

    const response = await fetch(GENERATE_AUDIO_GUIDE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place: state.place,
        answerType: state.length,
        language: selectedLanguage,
        voiceId: VOICES[selectedLanguage][selectedVoice],
        locale: LOCALES[selectedLanguage]
      })
    });

    if (!response.ok) throw new Error('Generation failed');

    const data = await response.json();

    // Update UI with Result
    transcriptText.textContent = data.description;
    audioSection.classList.remove('hidden');

    if (data.audioBase64) {
      audioPlayer.src = `data:audio/mp3;base64,${data.audioBase64}`;
      audioPlayer.load();
      audioPlayer.classList.remove('hidden');
      generateButton.textContent = 'Listen to Audio';
    } else {
      audioPlayer.classList.add('hidden');
      generateButton.textContent = 'Audio Not Available';
    }

  } catch (err) {
    console.error(err);
    alert('Generation failed. Please check your connection.');
    generateButton.textContent = 'Generate Audio Guide';
    generateButton.disabled = false;
  }
});

// Transcript Toggle
transcriptToggle.addEventListener('click', () => {
  transcriptContent.classList.toggle('hidden');
  transcriptArrow.classList.toggle('rotate-180');
});
