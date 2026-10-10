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

const TRANSLATIONS = {
  English: {
    travelGuide: "Travel Guide", travelCompanion: "AI Travel Companion", searchPlaceholder: "Search tourist places...",
    explore: "Explore", addPlace: "Add Place", worldWonder: "World Wonder",
    tajDescription: "An immense mausoleum of white marble, built in Agra between 1631 and 1648.",
    historicalFort: "Historical Fort", redFortDescription: "A historic fort in Delhi that served as the main residence of Mughal emperors.",
    monument: "Monument", gatewayDescription: "An arch-monument built in Bombay, India, during the 20th century.",
    architecture: "Architecture", hawaDescription: "The Palace of Winds, built from red and pink sandstone in Jaipur.",
    spiritual: "Spiritual", templeDescription: "Sri Harmandir Sahib is the holiest Gurdwara of Sikhism.",
    royalPalace: "Royal Palace", mysoreDescription: "A historic palace and royal residence in Mysore, Karnataka.",
    searchResult: "Search Result", backToPlaces: "Back to Places", guideReady: "AI Guide Ready",
    durationDetail: "Duration & Detail", summarized: "Summarized", oneMinute: "~1 min overview",
    detailed: "Detailed", threeMinute: "~3 min guide", audioSettings: "Audio Settings", language: "Language",
    english: "English", hindi: "Hindi", tamil: "Tamil", telugu: "Telugu", narrator: "Narrator",
    voiceType: "Voice type", male: "Male", female: "Female", narrationPace: "Narration pace",
    normal: "Normal", slower: "Slower", faster: "Faster", generateAudio: "Generate Audio Guide",
    generatingAudio: "Generating audio...", regenerateAudio: "Regenerate Audio Guide", readTranscript: "Read Transcript",
    planTrip: "Plan this trip", days: "Days", interests: "Interests", interestsPlaceholder: "History, food, architecture...",
    buildItinerary: "Build itinerary", buildingItinerary: "Building itinerary...", enterSearch: "Enter a destination or tourist place to search.",
    searching: "Searching places...", noResults: "No places found for {query}. Try a city, landmark, or region.",
    foundResults: "{count} places found for {query}. Select one to open its guide.",
    audioFailed: "Audio generation failed: {error}", itineraryFailed: "Itinerary generation failed. Please try again.",
    discoveredPlace: "Discovered place", yourTrip: "Your Trip", guideFallback: "Open this place to generate a historical audio guide.",
    custom: "Custom", delete: "Delete", addedPlace: "Added to your travel guide list for quick access.",
    placePrompt: "Enter the place name:", imagePrompt: "Enter the image URL (optional):"
  },
  Hindi: {
    travelGuide: "यात्रा मार्गदर्शिका", travelCompanion: "AI यात्रा साथी", searchPlaceholder: "पर्यटन स्थल खोजें...",
    explore: "खोजें", addPlace: "स्थान जोड़ें", worldWonder: "विश्व आश्चर्य",
    tajDescription: "1631 से 1648 के बीच आगरा में बना सफेद संगमरमर का विशाल मकबरा।",
    historicalFort: "ऐतिहासिक किला", redFortDescription: "दिल्ली का ऐतिहासिक किला, जो मुगल सम्राटों का मुख्य निवास था।",
    monument: "स्मारक", gatewayDescription: "20वीं सदी में मुंबई में बनाया गया एक विशाल प्रवेश-द्वार।",
    architecture: "वास्तुकला", hawaDescription: "जयपुर में लाल और गुलाबी बलुआ पत्थर से बना हवाओं का महल।",
    spiritual: "आध्यात्मिक", templeDescription: "श्री हरमंदिर साहिब सिख धर्म का सबसे पवित्र गुरुद्वारा है।",
    royalPalace: "शाही महल", mysoreDescription: "कर्नाटक के मैसूर में स्थित ऐतिहासिक महल और शाही निवास।",
    searchResult: "खोज परिणाम", backToPlaces: "स्थानों पर वापस जाएँ", guideReady: "AI गाइड तैयार है",
    durationDetail: "अवधि और विवरण", summarized: "संक्षिप्त", oneMinute: "~1 मिनट का परिचय",
    detailed: "विस्तृत", threeMinute: "~3 मिनट की गाइड", audioSettings: "ऑडियो सेटिंग्स", language: "भाषा",
    english: "अंग्रेज़ी", hindi: "हिंदी", tamil: "तमिल", telugu: "तेलुगु", narrator: "आवाज़",
    voiceType: "आवाज़ का प्रकार", male: "पुरुष", female: "महिला", narrationPace: "बोलने की गति",
    normal: "सामान्य", slower: "धीमी", faster: "तेज़", generateAudio: "ऑडियो गाइड बनाएँ",
    generatingAudio: "ऑडियो बनाया जा रहा है...", regenerateAudio: "ऑडियो गाइड फिर बनाएँ", readTranscript: "लिखित विवरण पढ़ें",
    planTrip: "यात्रा की योजना", days: "दिन", interests: "रुचियाँ", interestsPlaceholder: "इतिहास, भोजन, वास्तुकला...",
    buildItinerary: "यात्रा कार्यक्रम बनाएँ", buildingItinerary: "यात्रा कार्यक्रम बन रहा है...", enterSearch: "खोजने के लिए कोई गंतव्य या पर्यटन स्थल लिखें।",
    searching: "स्थान खोजे जा रहे हैं...", noResults: "{query} के लिए कोई स्थान नहीं मिला। शहर, स्मारक या क्षेत्र खोजें।",
    foundResults: "{query} के लिए {count} स्थान मिले। गाइड खोलने के लिए चुनें।",
    audioFailed: "ऑडियो नहीं बन सका: {error}", itineraryFailed: "यात्रा कार्यक्रम नहीं बन सका। फिर कोशिश करें।",
    discoveredPlace: "खोजा गया स्थान", yourTrip: "आपकी यात्रा", guideFallback: "इतिहास-आधारित ऑडियो गाइड के लिए स्थान खोलें।",
    custom: "कस्टम", delete: "हटाएँ", addedPlace: "त्वरित पहुँच के लिए आपकी यात्रा सूची में जोड़ा गया।",
    placePrompt: "स्थान का नाम लिखें:", imagePrompt: "चित्र का URL लिखें (वैकल्पिक):"
  },
  Tamil: {
    travelGuide: "பயண வழிகாட்டி", travelCompanion: "AI பயணத் துணை", searchPlaceholder: "சுற்றுலா இடங்களைத் தேடுங்கள்...",
    explore: "தேடு", addPlace: "இடத்தைச் சேர்", worldWonder: "உலக அதிசயம்",
    tajDescription: "1631 முதல் 1648 வரை ஆக்ராவில் கட்டப்பட்ட பிரம்மாண்டமான வெள்ளைப் பளிங்குக் கல்லறை.",
    historicalFort: "வரலாற்றுக் கோட்டை", redFortDescription: "முகலாயப் பேரரசர்களின் முதன்மை இல்லமாக இருந்த டெல்லியின் வரலாற்றுக் கோட்டை.",
    monument: "நினைவுச் சின்னம்", gatewayDescription: "20ஆம் நூற்றாண்டில் மும்பையில் கட்டப்பட்ட வளைவு நினைவுச் சின்னம்.",
    architecture: "கட்டிடக்கலை", hawaDescription: "ஜெய்ப்பூரில் சிவப்பு மற்றும் இளஞ்சிவப்பு மணற்கற்களால் கட்டப்பட்ட காற்று மாளிகை.",
    spiritual: "ஆன்மிகம்", templeDescription: "ஸ்ரீ ஹர்மந்திர் சாஹிப் சீக்கிய மதத்தின் மிகவும் புனிதமான குருத்வாரா.",
    royalPalace: "அரண்மனை", mysoreDescription: "கர்நாடகாவின் மைசூரில் உள்ள வரலாற்றுச் சிறப்புமிக்க அரண்மனை மற்றும் அரச இல்லம்.",
    searchResult: "தேடல் முடிவு", backToPlaces: "இடங்களுக்குத் திரும்பு", guideReady: "AI வழிகாட்டி தயார்",
    durationDetail: "நேரம் மற்றும் விவரம்", summarized: "சுருக்கம்", oneMinute: "~1 நிமிட அறிமுகம்",
    detailed: "விரிவானது", threeMinute: "~3 நிமிட வழிகாட்டி", audioSettings: "ஒலி அமைப்புகள்", language: "மொழி",
    english: "ஆங்கிலம்", hindi: "இந்தி", tamil: "தமிழ்", telugu: "தெலுங்கு", narrator: "குரல்",
    voiceType: "குரல் வகை", male: "ஆண்", female: "பெண்", narrationPace: "பேச்சு வேகம்",
    normal: "இயல்பு", slower: "மெதுவாக", faster: "வேகமாக", generateAudio: "ஒலி வழிகாட்டியை உருவாக்கு",
    generatingAudio: "ஒலி உருவாக்கப்படுகிறது...", regenerateAudio: "ஒலி வழிகாட்டியை மீண்டும் உருவாக்கு", readTranscript: "உரைநகலைப் படி",
    planTrip: "பயணத்தைத் திட்டமிடு", days: "நாட்கள்", interests: "விருப்பங்கள்", interestsPlaceholder: "வரலாறு, உணவு, கட்டிடக்கலை...",
    buildItinerary: "பயணத் திட்டத்தை உருவாக்கு", buildingItinerary: "பயணத் திட்டம் உருவாகிறது...", enterSearch: "தேட ஒரு இடம் அல்லது சுற்றுலாத் தலத்தை உள்ளிடுங்கள்.",
    searching: "இடங்கள் தேடப்படுகின்றன...", noResults: "{query} என்பதற்கு இடங்கள் இல்லை. நகரம், நினைவுச்சின்னம் அல்லது பகுதியை முயற்சிக்கவும்.",
    foundResults: "{query} என்பதற்கு {count} இடங்கள் கிடைத்தன. வழிகாட்டியைத் திறக்க ஒன்றைத் தேர்ந்தெடுக்கவும்.",
    audioFailed: "ஒலி உருவாக்கப்படவில்லை: {error}", itineraryFailed: "பயணத் திட்டம் உருவாக்கப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
    discoveredPlace: "கண்டறியப்பட்ட இடம்", yourTrip: "உங்கள் பயணம்", guideFallback: "வரலாற்று ஒலி வழிகாட்டிக்கு இந்த இடத்தைத் திறக்கவும்.",
    custom: "தனிப்பயன்", delete: "நீக்கு", addedPlace: "விரைவான அணுகலுக்காக உங்கள் பயணப் பட்டியலில் சேர்க்கப்பட்டது.",
    placePrompt: "இடத்தின் பெயரை உள்ளிடவும்:", imagePrompt: "பட URL-ஐ உள்ளிடவும் (விருப்பமானது):"
  },
  Telugu: {
    travelGuide: "ప్రయాణ మార్గదర్శి", travelCompanion: "AI ప్రయాణ సహచరుడు", searchPlaceholder: "పర్యాటక ప్రదేశాలను వెతకండి...",
    explore: "వెతకండి", addPlace: "ప్రదేశాన్ని జోడించండి", worldWonder: "ప్రపంచ వింత",
    tajDescription: "1631 నుంచి 1648 మధ్య ఆగ్రాలో నిర్మించిన విశాలమైన తెల్లటి పాలరాతి సమాధి.",
    historicalFort: "చారిత్రక కోట", redFortDescription: "మొఘల్ చక్రవర్తుల ప్రధాన నివాసంగా ఉన్న ఢిల్లీలోని చారిత్రక కోట.",
    monument: "స్మారక చిహ్నం", gatewayDescription: "20వ శతాబ్దంలో ముంబైలో నిర్మించిన ప్రసిద్ధ తోరణ స్మారకం.",
    architecture: "వాస్తుశిల్పం", hawaDescription: "జైపూర్‌లో ఎరుపు, గులాబీ ఇసుకరాళ్లతో నిర్మించిన గాలుల మహల్.",
    spiritual: "ఆధ్యాత్మికం", templeDescription: "శ్రీ హర్మందిర్ సాహిబ్ సిక్కు మతంలోని అత్యంత పవిత్రమైన గురుద్వారా.",
    royalPalace: "రాజభవనం", mysoreDescription: "కర్ణాటకలోని మైసూరులో ఉన్న చారిత్రక రాజభవనం మరియు రాజ నివాసం.",
    searchResult: "శోధన ఫలితం", backToPlaces: "ప్రదేశాలకు తిరిగి వెళ్లండి", guideReady: "AI మార్గదర్శి సిద్ధంగా ఉంది",
    durationDetail: "వ్యవధి మరియు వివరాలు", summarized: "సంక్షిప్తం", oneMinute: "~1 నిమిషం పరిచయం",
    detailed: "వివరణాత్మకం", threeMinute: "~3 నిమిషాల మార్గదర్శి", audioSettings: "ఆడియో సెట్టింగ్‌లు", language: "భాష",
    english: "ఆంగ్లం", hindi: "హిందీ", tamil: "తమిళం", telugu: "తెలుగు", narrator: "వాయిస్",
    voiceType: "వాయిస్ రకం", male: "పురుషుడు", female: "స్త్రీ", narrationPace: "మాట్లాడే వేగం",
    normal: "సాధారణం", slower: "నెమ్మదిగా", faster: "వేగంగా", generateAudio: "ఆడియో మార్గదర్శిని రూపొందించండి",
    generatingAudio: "ఆడియో రూపొందుతోంది...", regenerateAudio: "ఆడియో మార్గదర్శిని మళ్లీ రూపొందించండి", readTranscript: "లిఖిత రూపాన్ని చదవండి",
    planTrip: "యాత్రను ప్లాన్ చేయండి", days: "రోజులు", interests: "ఆసక్తులు", interestsPlaceholder: "చరిత్ర, ఆహారం, వాస్తుశిల్పం...",
    buildItinerary: "యాత్ర ప్రణాళిక రూపొందించండి", buildingItinerary: "యాత్ర ప్రణాళిక రూపొందుతోంది...", enterSearch: "వెతకడానికి గమ్యం లేదా పర్యాటక ప్రదేశాన్ని నమోదు చేయండి.",
    searching: "ప్రదేశాల కోసం వెతుకుతోంది...", noResults: "{query} కోసం ప్రదేశాలు కనబడలేదు. నగరం, కట్టడం లేదా ప్రాంతాన్ని ప్రయత్నించండి.",
    foundResults: "{query} కోసం {count} ప్రదేశాలు కనుగొనబడ్డాయి. మార్గదర్శిని తెరవడానికి ఒకదాన్ని ఎంచుకోండి.",
    audioFailed: "ఆడియో రూపొందలేదు: {error}", itineraryFailed: "యాత్ర ప్రణాళిక రూపొందలేదు. మళ్లీ ప్రయత్నించండి.",
    discoveredPlace: "కనుగొన్న ప్రదేశం", yourTrip: "మీ యాత్ర", guideFallback: "చారిత్రక ఆడియో మార్గదర్శిని కోసం ఈ ప్రదేశాన్ని తెరవండి.",
    custom: "అనుకూలం", delete: "తొలగించండి", addedPlace: "త్వరగా చేరుకోవడానికి మీ ప్రయాణ జాబితాలో చేర్చబడింది.",
    placePrompt: "ప్రదేశం పేరును నమోదు చేయండి:", imagePrompt: "చిత్ర URL నమోదు చేయండి (ఐచ్ఛికం):"
  }
};


// --- State ---
const state = {
  place: '',
  image: '',
  length: 'Summary',
  voice: 'Male',
  voiceId: VOICES.English.Male,
  speechRate: 0
};

// --- DOM Elements ---
const cardsContainer = document.querySelector('.cards');
const experiencePanel = document.getElementById('experience');
const previewTitle = document.getElementById('previewTitle');
const audioSection = document.getElementById('audioSection');
const audioPlayer = document.getElementById('audioPlayer');
const transcriptText = document.getElementById('scriptText');
const generateButton = document.getElementById('generateBtn');
const audioStatus = document.getElementById('audioStatus');
const languageSelect = document.getElementById('selectLanguage');
const appLanguageSelect = document.getElementById('appLanguageSelect');
const closeButton = document.getElementById('closeExperience');
const addPlaceBtn = document.getElementById('addPlaceBtn');
const searchPreviewCard = document.getElementById('searchPreviewCard');
const searchPreviewImage = document.getElementById('searchPreviewImage');
const searchPreviewTitle = document.getElementById('searchPreviewTitle');
const transcriptToggle = document.getElementById('transcriptToggle');
const transcriptContent = document.getElementById('transcriptContent');
const transcriptArrow = document.getElementById('transcriptArrow');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const searchStatus = document.getElementById('searchStatus');
const voiceSelect = document.getElementById('voiceSelect');
const speechRateInput = document.getElementById('speechRate');
const paceValue = document.getElementById('paceValue');
const planTripButton = document.getElementById('planTripBtn');
const itineraryOutput = document.getElementById('itineraryOutput');

function translate(key, values = {}) {
  const language = languageSelect.value;
  const text = TRANSLATIONS[language]?.[key] || TRANSLATIONS.English[key] || key;
  return text.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabel));
  });
  document.documentElement.lang = { English: 'en', Hindi: 'hi', Tamil: 'ta', Telugu: 'te' }[languageSelect.value];
  document.title = translate('travelGuide');
}

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
  audioStatus.textContent = '';
  audioStatus.classList.add('hidden');
  itineraryOutput.textContent = '';
  itineraryOutput.classList.add('hidden');
  generateButton.textContent = translate('generateAudio');
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
  const place = prompt(translate('placePrompt'));
  if (!place) return;

  const trimmedPlace = place.trim();
  if (!trimmedPlace) return;

  const imageUrl = prompt(translate('imagePrompt'), 'https://images.unsplash.com/...');
  const finalImageUrl = imageUrl && imageUrl.trim() ? imageUrl.trim() : 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80';

  const newCard = document.createElement('div');
  newCard.className = 'place-card bg-white rounded-[2rem] overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:border-orange-100 group relative lg:[&.active]:w-[480px] lg:[&.active]:max-w-none';
  newCard.dataset.place = trimmedPlace;
  newCard.dataset.image = finalImageUrl;
  newCard.innerHTML = `
    <div class="overflow-hidden h-[200px] relative">
      <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      <img src="${finalImageUrl}" alt="${trimmedPlace}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-gray-800 shadow-sm">${translate('custom')}</div>
      <button class="delete-place-btn absolute top-4 right-4 z-30 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md hover:bg-red-600 transition-all" aria-label="${translate('delete')}">${translate('delete')}</button>
    </div>
    <div class="p-6">
      <span class="text-[11px] text-[#ff8a1f] font-bold uppercase tracking-widest">${translate('yourTrip')}</span>
      <h3 class="mt-2 mb-1 text-xl font-['Playfair_Display',_serif] font-bold text-gray-900 group-hover:text-[#ff8a1f] transition-colors">${trimmedPlace}</h3>
      <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">${translate('addedPlace')}</p>
    </div>
  `;

  cardsContainer.insertBefore(newCard, searchPreviewCard);
  attachPlaceCardListeners(newCard);
}

// Close Button
closeButton.addEventListener('click', deselectDestination);
addPlaceBtn.addEventListener('click', addNewPlace);

function createPlaceCard(place, isSearchResult = false) {
  const card = document.createElement('div');
  card.className = 'place-card bg-white rounded-[2rem] overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:border-orange-100 group relative lg:[&.active]:w-[480px] lg:[&.active]:max-w-none';
  card.dataset.place = place.name;
  card.dataset.image = place.image;
  if (isSearchResult) card.dataset.searchResult = 'true';

  const imageFrame = document.createElement('div');
  imageFrame.className = 'overflow-hidden h-[200px] relative';
  const image = document.createElement('img');
  image.src = place.image;
  image.alt = place.name;
  image.className = 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-110';
  imageFrame.append(image);

  const details = document.createElement('div');
  details.className = 'p-6';
  const category = document.createElement('span');
  category.className = 'text-[11px] text-[#ff8a1f] font-bold uppercase tracking-widest';
  category.textContent = translate(isSearchResult ? 'discoveredPlace' : 'yourTrip');
  const title = document.createElement('h3');
  title.className = 'mt-2 mb-1 text-xl font-[\'Playfair_Display\',_serif] font-bold text-gray-900 group-hover:text-[#ff8a1f] transition-colors';
  title.textContent = place.name;
  const description = document.createElement('p');
  description.className = 'text-sm text-gray-500 line-clamp-2 leading-relaxed';
  description.textContent = place.description || translate('guideFallback');
  details.append(category, title, description);
  card.append(imageFrame, details);
  return card;
}

async function searchPlaces() {
  const query = searchInput.value.trim();
  if (!query) {
    searchStatus.textContent = translate('enterSearch');
    searchStatus.classList.remove('hidden');
    searchInput.focus();
    return;
  }

  searchButton.disabled = true;
  cardsContainer.classList.add('searching');
  searchStatus.textContent = translate('searching');
  searchStatus.classList.remove('hidden');
  document.querySelectorAll('[data-search-result]').forEach(card => card.remove());

  try {
    const response = await fetch('/api/search-places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Place search failed.');

    const places = data.places || [];
    if (!places.length) {
      searchStatus.textContent = translate('noResults', { query: data.correctedQuery || query });
      return;
    }

    const fallbackImage = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80';
    places.forEach(place => {
      const card = createPlaceCard({
        ...place,
        image: place.image || fallbackImage
      }, true);
      cardsContainer.insertBefore(card, searchPreviewCard);
      attachPlaceCardListeners(card);
    });
    const searchedFor = data.correctedQuery && data.correctedQuery.toLowerCase() !== query.toLowerCase()
      ? `${data.correctedQuery} (corrected from "${query}")`
      : `"${query}"`;
    searchStatus.textContent = translate('foundResults', { count: places.length, query: searchedFor });
  } catch (error) {
    searchStatus.textContent = error.message || 'Place search is unavailable. Please try again.';
  } finally {
    searchButton.disabled = false;
  }
}

searchButton.addEventListener('click', searchPlaces);
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') searchPlaces();
});
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) return;
  cardsContainer.classList.remove('searching');
  document.querySelectorAll('[data-search-result]').forEach(card => card.remove());
  searchStatus.textContent = '';
  searchStatus.classList.add('hidden');
});

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
    syncVoiceOptions();
  });
});

function syncVoiceOptions() {
  const voices = VOICES[languageSelect.value];
  voiceSelect.replaceChildren(...Object.entries(voices).map(([gender, voiceId]) => {
    const option = document.createElement('option');
    option.value = voiceId;
    option.textContent = `${voiceId} (${translate(gender.toLowerCase())})`;
    return option;
  }));
  state.voiceId = voices[state.voice];
  voiceSelect.value = state.voiceId;
}

function changeLanguage(language) {
  languageSelect.value = language;
  appLanguageSelect.value = language;
  syncVoiceOptions();
  applyTranslations();
}

languageSelect.addEventListener('change', () => changeLanguage(languageSelect.value));
appLanguageSelect.addEventListener('change', () => changeLanguage(appLanguageSelect.value));
voiceSelect.addEventListener('change', () => {
  state.voiceId = voiceSelect.value;
  state.voice = Object.entries(VOICES[languageSelect.value])
    .find(([, voiceId]) => voiceId === state.voiceId)?.[0] || state.voice;
  voiceButtons.forEach(button => button.classList.toggle('active', button.dataset.value === state.voice));
});

speechRateInput.addEventListener('input', () => {
  state.speechRate = Number(speechRateInput.value);
  paceValue.textContent = translate(state.speechRate < 0 ? 'slower' : state.speechRate > 0 ? 'faster' : 'normal');
});

planTripButton.addEventListener('click', async () => {
  planTripButton.disabled = true;
  planTripButton.querySelector('[data-i18n]').textContent = translate('buildingItinerary');
  itineraryOutput.textContent = '';
  itineraryOutput.classList.remove('hidden');

  try {
    const response = await fetch('/api/generate-itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place: state.place,
        days: document.getElementById('tripDays').value,
        interests: document.getElementById('tripInterests').value,
        language: languageSelect.value
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Itinerary generation failed.');
    itineraryOutput.textContent = data.itinerary;
  } catch (error) {
    itineraryOutput.textContent = error.message || translate('itineraryFailed');
  } finally {
    planTripButton.disabled = false;
    planTripButton.querySelector('[data-i18n]').textContent = translate('buildItinerary');
  }
});

syncVoiceOptions();
applyTranslations();


// Generate Audio guide button Logic

const GENERATE_AUDIO_GUIDE_API_URL = "/api/generate-audio-guide";

generateButton.addEventListener('click', async () => {
  generateButton.disabled = true;
  generateButton.textContent = translate('generatingAudio');

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
        voiceId: state.voiceId || VOICES[selectedLanguage][selectedVoice],
        locale: LOCALES[selectedLanguage],
        rate: state.speechRate
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const message = String(data.error || 'The audio guide could not be generated.');
      throw new Error(message);
    }

    // Update UI with Result
    audioStatus.textContent = '';
    audioStatus.classList.add('hidden');
    transcriptText.textContent = data.description;
    audioSection.classList.remove('hidden');

    if (data.audioBase64) {
      audioPlayer.src = `data:audio/mp3;base64,${data.audioBase64}`;
      audioPlayer.load();
      audioPlayer.classList.remove('hidden');
      generateButton.textContent = translate('regenerateAudio');
    } else {
      audioPlayer.classList.add('hidden');
      generateButton.textContent = translate('generateAudio');
    }
    generateButton.disabled = false;

  } catch (err) {
    console.error(err);
    audioStatus.textContent = translate('audioFailed', { error: err.message });
    audioStatus.classList.remove('hidden');
    generateButton.textContent = translate('generateAudio');
    generateButton.disabled = false;
  }
});

// Transcript Toggle
transcriptToggle.addEventListener('click', () => {
  transcriptContent.classList.toggle('hidden');
  transcriptArrow.classList.toggle('rotate-180');
});
