/* ============================================================
   Hotel La Rocca – Sistema Multilingua (IT, EN, DE, FR)
   i18n.js
   ============================================================ */

const translations = {
  it: {
    // Navigation
    nav_home: "Home",
    nav_rooms: "Camere",
    nav_services: "Servizi",
    nav_bar: "Il nostro bar",
    nav_activities: "Attività",
    nav_location: "Dove Siamo",
    nav_book: "Prenota Ora",
    nav_book_short: "PRENOTA",
    nav_shop: "SHOP",
    nav_menu: "MENU",
    nav_close: "CHIUDI",
    nav_contact: "Contatti",
    
    // Hero Index
    hero_subtitle: "San Marino · Centro Storico",
    hero_title: "Hotel La Rocca",
    hero_tagline: "Un'esperienza unica nel cuore della Repubblica più antica del mondo. Eleganza, comfort e una vista che toglie il fiato sulla colline e valli di San Marino.",
    hero_btn_rooms: "Scopri le Camere",
    hero_btn_story: "La Nostra Storia",
    hero_scroll: "Scorri",
    
    // About
    about_overline: "La Nostra Storia",
    about_title: "Un Rifugio di Eleganza nel Centro Storico",
    about_lead: "Situato nel cuore della Repubblica di San Marino, l'Hotel La Rocca è il punto di partenza perfetto per esplorare il patrimonio UNESCO della città più antica d'Europa.",
    about_story_h3: "Dove la Storia Incontra il Comfort",
    about_p1: "Incastonato tra le antiche mura del Monte Titano e le torri simbolo della Repubblica, l'Hotel La Rocca offre un'ospitalità raffinata in un contesto unico al mondo. Ogni camera è stata progettata per offrire un'esperienza indimenticabile, con arredi curati nei minimi dettagli e viste spettacolari.",
    about_p2: "A pochi passi dalle Tre Torri, dai musei e dalle boutique del centro, siamo il luogo ideale per chi desidera vivere San Marino nella sua essenza più autentica.",
    feat_unesco_title: "Centro Storico UNESCO",
    feat_unesco_desc: "A pochi passi dalle Tre Torri",
    feat_view_title: "Vista Panoramica",
    feat_view_desc: "Sulle colline e valli di San Marino",
    feat_hospitality_title: "Ospitalità Personalizzata",
    feat_hospitality_desc: "Servizio attento ai dettagli",
    feat_parking_title: "Parcheggio Convenzionato",
    feat_parking_desc: "Comodo accesso al centro storico",

    // Rooms Preview Index
    rooms_overline: "Le Camere",
    rooms_title: "Il Tuo Rifugio a San Marino",
    rooms_lead: "Dieci camere dal carattere unico, pensate per regalarti momenti di puro relax. Scegli quella perfetta per il tuo soggiorno.",
    room_all_btn: "Tutte le Camere",
    room_detail_btn: "Dettagli Camera",
    room_request_btn: "Richiedi Preventivo",

    // Services
    services_overline: "I Nostri Servizi",
    services_title: "Esperienza di Soggiorno Impeccabile",
    services_lead: "Ogni dettaglio è pensato per offrirti il massimo comfort durante la tua permanenza.",
    srv_breakfast_title: "Colazione Panoramica",
    srv_breakfast_desc: "Prodotti freschi del territorio, pasticceria artigianale e una vista mozzafiato per iniziare la giornata.",
    srv_wifi_title: "Wi-Fi Ultraveloce Gratuito",
    srv_wifi_desc: "Connessione in fibra ad alta velocità disponibile in tutte le camere e negli spazi comuni.",
    srv_parking_title: "Accesso ZTL & Parcheggio",
    srv_parking_desc: "Assistenza per il transito nel centro storico e convenzioni con parcheggi custoditi limitrofi.",
    srv_concierge_title: "Concierge & Assistenza",
    srv_concierge_desc: "Consigli personalizzati su ristoranti tipici, itinerari storici ed esperienze sul Monte Titano.",

    // Reviews Section
    reviews_overline: "Esperienze e Recensioni",
    reviews_title: "Cosa Dicono i Nostri Ospiti",
    reviews_lead: "L'autenticità della nostra accoglienza raccontata dalle parole di chi ha soggiornato all'Hotel La Rocca.",
    reviews_badge_sub: "Valutazione eccellente dai viaggiatori",
    rev1_text: "Posizione eccezionale, a due passi dalla Prima Torre. Dalla nostra camera la vista sulle colline all'alba è stata semplicemente magica. Pulizia impeccabile e colazione ottima!",
    rev1_author: "Marco & Giulia",
    rev1_origin: "Milano, Italia",
    rev2_text: "Ein wunderschönes Hotel im Herzen von San Marino. Fantastische Aussicht, sehr saubere Zimmer und ein unvergesslicher Service. Wir werden auf jeden Fall wiederkommen!",
    rev2_author: "Thomas & Elena",
    rev2_origin: "München, Deutschland",
    rev3_text: "An unforgettable boutique stay! Perched on top of Mount Titano with breathtaking panoramas. Friendly staff, peaceful atmosphere, and exquisite rooms.",
    rev3_author: "Sarah & David",
    rev3_origin: "London, UK",
    rev_cta_title: "Hai soggiornato da noi?",
    rev_cta_desc: "La tua opinione è preziosa. Condividi la tua esperienza su TripAdvisor o Google.",
    rev_cta_tripadvisor: "Lascia una recensione su TripAdvisor",
    rev_cta_google: "Recensiscici su Google",

    // Booking & Quote Form
    quote_overline: "Prenotazione Diretta",
    quote_title: "Richiedi un Preventivo Personalizzato",
    quote_lead: "Compila il modulo per ricevere la migliore tariffa garantita e verificare la disponibilità delle nostre camere.",
    services_quote_overline: "Informazioni & Servizi",
    services_quote_title: "Hai bisogno di maggiori informazioni?",
    services_quote_lead: "Contattaci per scoprire tutti i dettagli sui nostri servizi, come le opzioni di parcheggio o l'organizzazione delle escursioni guidate a San Marino.",
    services_quote_btn: "Richiedi Informazioni",
    form_room_label: "Camera Desiderata",
    form_checkin: "Check-in",
    form_checkout: "Check-out",
    form_adults: "Adulti",
    form_children: "Bambini",
    form_name: "Nome e Cognome",
    form_name_ph: "Es. Mario Rossi",
    form_email: "Email",
    form_email_ph: "nome@esempio.com",
    form_phone: "Telefono",
    form_phone_ph: "+39 333 1234567",
    form_notes: "Richieste Speciali / Note",
    form_notes_ph: "Es. arrivo previsto tardivo, culla per neonati, allergie o preferenze...",
    form_badge: "Hotel La Rocca • San Marino",
    form_subtitle: "Preventivo gratuito e senza impegno con la miglior tariffa garantita.",
    form_optional: "(opzionale)",
    form_privacy: "Ho letto e accetto l'informativa sulla Privacy Policy",
    form_submit: "Invia Richiesta Preventivo",

    // Attività
    att_overline: "Esperienze Uniche",
    att_title: "Attività ed Escursioni",
    att_subtitle: "Vivi San Marino con esperienze autentiche e memorabili.",
    att_notice_title: "Nota Importante:",
    att_notice_desc: "Tutte le attività ed escursioni devono essere prenotate con almeno 3 giorni di anticipo rispetto alla data di arrivo in hotel, contattando direttamente la nostra struttura.",
    att_section_overline: "Le Nostre Proposte",
    att_section_title: "Scopri le Attività",
    att_section_desc: "Una selezione di esperienze uniche pensate per farti vivere la storia, la natura e il fascino panoramico del Monte Titano.",
    att_card1_title: "Trekking e Passeggiate",
    att_card1_desc: "Percorsi immersi nel verde lungo i sentieri del Monte Titano. Un'esperienza unica tra natura e storia.",
    att_card2_title: "Degustazione Enogastronomica",
    att_card2_desc: "Un viaggio tra i sapori tipici, i vini autoctoni e i formaggi del territorio sammarinese.",
    att_card3_title: "Visite Guidate del Centro Storico",
    att_card3_desc: "Tour culturali tra torri medievali, contrade e monumenti storici con guide autorizzate.",
    att_card4_title: "Escursioni in E-Bike",
    att_card4_desc: "Avventure su due ruote assistite per esplorare i panorami sammarinesi senza fatica, con guida esperta.",
    att_card5_title: "Volo su San Marino",
    att_card5_desc: "Un'esperienza mozzafiato per ammirare la Repubblica dall'alto. Vista a 360° sul territorio.",
    att_card6_title: "Tiro con l'Arco in Natura",
    att_card6_desc: "Disciplina e divertimento immersi nella cornice naturale del Titano.",

    // Footer
    footer_about: "Un'autentica dimora di fascino ed eleganza incastonata tra le mura medievali del Monte Titano, patrimonio mondiale UNESCO. Panorami mozzafiato e calda accoglienza romagnola.",
    footer_col_explore: "Navigazione",
    footer_col_contacts: "Contatti Diretti",
    footer_col_reviews: "Ospiti & Recensioni",
    footer_rating_label: "sulla base di recensioni certificate",
    footer_btn_tripadvisor: "Recensiscici su TripAdvisor",
    footer_btn_google: "Recensiscici su Google",
    footer_checkin_info: "Check-in: 14:00 - 19:00",
    footer_request: "Richiedi Preventivo",
    footer_privacy: "Privacy Policy",
    footer_cookie: "Termini e Condizioni",

    // 404 Page
    page404_title: "Pagina Non Trovata",
    page404_desc: "La pagina che stai cercando sembra essersi persa tra le antiche contrade e i bastioni del Monte Titano, oppure è stata spostata.",
    page404_btn_home: "Torna alla Home",
    page404_btn_rooms: "Scopri le Camere",
    page404_btn_contact: "Contattaci"
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_rooms: "Rooms",
    nav_services: "Services",
    nav_bar: "Our Bar",
    nav_activities: "Activities",
    nav_location: "Location",
    nav_book: "Book Now",
    nav_book_short: "BOOK",
    nav_shop: "SHOP",
    nav_menu: "MENU",
    nav_close: "CLOSE",
    nav_contact: "Contact",

    // Hero Index
    hero_subtitle: "San Marino · Historic Old Town",
    hero_title: "Hotel La Rocca",
    hero_tagline: "A unique experience in the heart of the world's oldest Republic. Elegance, comfort, and breathtaking views over the hills and valleys of San Marino.",
    hero_btn_rooms: "Discover Rooms",
    hero_btn_story: "Our Heritage",
    hero_scroll: "Scroll",

    // About
    about_overline: "Our Heritage",
    about_title: "A Haven of Elegance in the Historic Center",
    about_lead: "Located in the very heart of the Republic of San Marino, Hotel La Rocca is the ideal starting point to explore this UNESCO World Heritage town.",
    about_story_h3: "Where History Meets Contemporary Comfort",
    about_p1: "Nestled between the ancient ramparts of Mount Titano and the iconic medieval towers, Hotel La Rocca provides refined hospitality in a truly incomparable setting. Every room has been carefully crafted for an unforgettable stay, featuring fine details and scenic panoramas.",
    about_p2: "Just steps away from the Three Towers, museums, and historic boutiques, our hotel is the perfect choice for those who wish to experience the authentic soul of San Marino.",
    feat_unesco_title: "UNESCO Historic Center",
    feat_unesco_desc: "A few steps from the Three Towers",
    feat_view_title: "Panoramic View",
    feat_view_desc: "Over the hills and valleys of San Marino",
    feat_hospitality_title: "Boutique Hospitality",
    feat_hospitality_desc: "Attentive, personalized care",
    feat_parking_title: "Affiliated Parking",
    feat_parking_desc: "Convenient access to the center",

    // Rooms Preview Index
    rooms_overline: "The Rooms",
    rooms_title: "Your Sanctuary in San Marino",
    rooms_lead: "Ten uniquely designed boutique rooms, created to offer serene tranquility. Choose the perfect haven for your holiday.",
    room_all_btn: "All Rooms",
    room_detail_btn: "Room Details",
    room_request_btn: "Request a Quote",

    // Services
    services_overline: "Our Services",
    services_title: "An Impeccable Stay Experience",
    services_lead: "Every amenity is thoughtfully designed to ensure your maximum comfort throughout your stay.",
    srv_breakfast_title: "Panoramic Breakfast",
    srv_breakfast_desc: "Fresh local delicacies, handmade pastries, and panoramic vistas to begin your day.",
    srv_wifi_title: "Complimentary High-Speed Wi-Fi",
    srv_wifi_desc: "Reliable fiber-optic internet connection across all rooms and common areas.",
    srv_parking_title: "ZTL Access & Parking",
    srv_parking_desc: "Driving authorization inside the restricted historic area and parking arrangements.",
    srv_concierge_title: "Concierge & Guidance",
    srv_concierge_desc: "Tailored recommendations for fine dining, cultural landmarks, and scenic strolls.",

    // Reviews Section
    reviews_overline: "Guest Experiences",
    reviews_title: "What Our Guests Say",
    reviews_lead: "The warmth of our authentic hospitality reflected through the words of our visitors.",
    reviews_badge_sub: "Superb rating by verified travelers",
    rev1_text: "Stunning location, just two minutes from the First Tower. The sunrise view over the hills from our room was magical. Spotless room and delightful breakfast!",
    rev1_author: "Marco & Giulia",
    rev1_origin: "Milan, Italy",
    rev2_text: "A marvelous hotel in the center of San Marino. Fantastic vistas, pristine rooms, and heartwarming service. We will definitely come back again!",
    rev2_author: "Thomas & Elena",
    rev2_origin: "Munich, Germany",
    rev3_text: "An unforgettable boutique stay! Perched on top of Mount Titano with breathtaking panoramas. Friendly staff, peaceful atmosphere, and exquisite rooms.",
    rev3_author: "Sarah & David",
    rev3_origin: "London, UK",
    rev_cta_title: "Have you stayed with us?",
    rev_cta_desc: "Your feedback is deeply appreciated. Share your experience on TripAdvisor or Google.",
    rev_cta_tripadvisor: "Write a Review on TripAdvisor",
    rev_cta_google: "Review us on Google",

    // Booking & Quote Form
    quote_overline: "Direct Booking",
    quote_title: "Request Your Personalized Offer",
    quote_lead: "Fill out the form below to receive the best guaranteed direct rate and room availability.",
    services_quote_overline: "Information & Services",
    services_quote_title: "Need More Information?",
    services_quote_lead: "Contact us to discover all details about our services, such as parking options or arranging guided excursions in San Marino.",
    services_quote_btn: "Request Information",
    form_room_label: "Preferred Room",
    form_checkin: "Check-in",
    form_checkout: "Check-out",
    form_adults: "Adults",
    form_children: "Children",
    form_name: "Full Name",
    form_name_ph: "e.g. John Smith",
    form_email: "Email Address",
    form_email_ph: "name@example.com",
    form_phone: "Phone",
    form_phone_ph: "+44 7123 456789",
    form_notes: "Special Requests / Notes",
    form_notes_ph: "e.g. late check-in, baby cot, dietary preferences...",
    form_badge: "Hotel La Rocca • San Marino",
    form_subtitle: "Free, non-binding quote with best rate guarantee.",
    form_optional: "(optional)",
    form_privacy: "I have read and agree to the Privacy Policy",
    form_submit: "Send Quote Request",

    // Activities
    att_overline: "Unique Experiences",
    att_title: "Activities & Excursions",
    att_subtitle: "Experience San Marino with authentic, unforgettable adventures.",
    att_notice_title: "Important Note:",
    att_notice_desc: "All activities and excursions must be booked at least 3 days prior to your arrival date by contacting our reception directly.",
    att_section_overline: "Our Suggestions",
    att_section_title: "Discover the Activities",
    att_section_desc: "A selection of unique experiences designed to let you experience the history, nature, and panoramic beauty of Mount Titano.",
    att_card1_title: "Trekking & Scenic Walks",
    att_card1_desc: "Lush green pathways along the ancient trails of Mount Titano. A unique adventure blending pristine nature and medieval history.",
    att_card2_title: "Food & Wine Tastings",
    att_card2_desc: "A sensory journey through traditional culinary delicacies, native wine labels, and artisanal local cheeses of San Marino.",
    att_card3_title: "Historic Center Guided Tours",
    att_card3_desc: "Cultural explorations among medieval fortress towers, ancient contrade, and landmarks accompanied by licensed expert guides.",
    att_card4_title: "E-Bike Guided Excursions",
    att_card4_desc: "Effortless two-wheel adventures to explore the spectacular hills and viewpoints of San Marino with expert local assistance.",
    att_card5_title: "Scenic Flight over San Marino",
    att_card5_desc: "A breathtaking flight experience to admire the ancient Republic from above, offering 360° panoramas of the mountains and coastline.",
    att_card6_title: "Outdoor Archery",
    att_card6_desc: "Focus, balance, and outdoor recreational fun immersed in the peaceful natural environment of Mount Titano.",

    // Footer
    footer_about: "An authentic sanctuary of charm and timeless beauty nestled within the medieval towers of Mount Titano, a UNESCO World Heritage site. Breathtaking panoramas and warm hospitality.",
    footer_col_explore: "Navigation",
    footer_col_contacts: "Direct Contacts",
    footer_col_reviews: "Guests & Reviews",
    footer_rating_label: "based on verified guest reviews",
    footer_btn_tripadvisor: "Review us on TripAdvisor",
    footer_btn_google: "Review us on Google",
    footer_checkin_info: "Check-in: 14:00 - 19:00",
    footer_request: "Request a Quote",
    footer_privacy: "Privacy Policy",
    footer_cookie: "Terms and Conditions",

    // 404 Page
    page404_title: "Page Not Found",
    page404_desc: "The page you are looking for seems to have wandered through the ancient alleys of Mount Titano, or has been moved.",
    page404_btn_home: "Back to Home",
    page404_btn_rooms: "Explore Rooms",
    page404_btn_contact: "Contact Us"
  },

  de: {
    // Navigation
    nav_home: "Startseite",
    nav_rooms: "Zimmer",
    nav_services: "Leistungen",
    nav_bar: "Unsere Bar",
    nav_activities: "Aktivitäten",
    nav_location: "Lage & Anfahrt",
    nav_book: "Jetzt Buchen",
    nav_book_short: "BUCHEN",
    nav_shop: "SHOP",
    nav_menu: "MENÜ",
    nav_close: "SCHLIESSEN",
    nav_contact: "Kontakt",

    // Hero Index
    hero_subtitle: "San Marino · Historisches Zentrum",
    hero_title: "Hotel La Rocca",
    hero_tagline: "Ein einzigartiges Erlebnis im Herzen der ältesten Republik der Welt. Eleganz, Komfort und ein atemberaubender Blick auf die sanften Hügel und Täler von San Marino.",
    hero_btn_rooms: "Zimmer Entdecken",
    hero_btn_story: "Unsere Geschichte",
    hero_scroll: "Scrollen",

    // About
    about_overline: "Unsere Geschichte",
    about_title: "Ein Ort der Eleganz im historischen Zentrum",
    about_lead: "Im Herzen der Republik San Marino gelegen, ist das Hotel La Rocca der perfekte Ausgangspunkt, um das UNESCO-Welterbe der Stadt zu erkunden.",
    about_story_h3: "Wo Geschichte auf modernen Komfort trifft",
    about_p1: "Eingebettet zwischen den alten Mauern des Monte Titano und den drei Türmen der Republik, bietet das Hotel La Rocca erlesene Gastfreundschaft. Jedes Zimmer wurde mit viel Liebe zum Detail gestaltet.",
    about_p2: "Nur wenige Schritte von den Festungstürmen, Museen und Boutiquen entfernt – ideal, um das echte San Marino in vollen Zügen zu genießen.",
    feat_unesco_title: "UNESCO Welterbe",
    feat_unesco_desc: "Nur wenige Schritte zu den drei Türmen",
    feat_view_title: "Panoramablick",
    feat_view_desc: "Über die sanften Hügel und Täler San Marinos",
    feat_hospitality_title: "Herzliche Gastfreundschaft",
    feat_hospitality_desc: "Aufmerksamer, persönlicher Service",
    feat_parking_title: "Parkplatz-Service",
    feat_parking_desc: "Bequeme Zufahrt in die Altstadt",

    // Rooms Preview Index
    rooms_overline: "Die Zimmer",
    rooms_title: "Ihr Rückzugsort in San Marino",
    rooms_lead: "Zehn individuelle Zimmer mit stilvollem Charakter für vollkommene Entspannung. Finden Sie das perfekte Zimmer für Ihre Auszeit.",
    room_all_btn: "Alle Zimmer",
    room_detail_btn: "Zimmerdetails",
    room_request_btn: "Angebot Anfragen",

    // Services
    services_overline: "Unser Service",
    services_title: "Ein unvergesslicher Aufenthalt",
    services_lead: "Jedes Detail wurde sorgfältig ausgewählt, um Ihnen höchsten Komfort zu bieten.",
    srv_breakfast_title: "Panoramisches Frühstück",
    srv_breakfast_desc: "Regionale Spezialitäten, hausgemachtes Gebäck und ein herrlicher Ausblick für einen perfekten Morgen.",
    srv_wifi_title: "Kostenfreies Highspeed-WLAN",
    srv_wifi_desc: "Schnelles Glasfaser-Internet in allen Zimmern und Gemeinschaftsbereichen.",
    srv_parking_title: "ZTL-Zufahrt & Parken",
    srv_parking_desc: "Fahrerlaubnis für das historische Zentrum und Parkmöglichkeiten in unmittelbarer Nähe.",
    srv_concierge_title: "Concierge & Beratung",
    srv_concierge_desc: "Persönliche Empfehlungen für Restaurants, Kultur und Wanderwege auf dem Monte Titano.",

    // Reviews Section
    reviews_overline: "Gästeerfahrungen",
    reviews_title: "Was Unsere Gäste Sagen",
    reviews_lead: "Echte Gastfreundschaft, beschrieben von Gästen, die im Hotel La Rocca verweilt haben.",
    reviews_badge_sub: "Hervorragende Bewertung von verifizierten Reisenden",
    rev1_text: "Außergewöhnliche Lage, nur zwei Minuten vom ersten Turm entfernt. Der Blick über die Hügel beim Sonnenaufgang war einfach magisch. Tadellose Sauberkeit und feines Frühstück!",
    rev1_author: "Marco & Giulia",
    rev1_origin: "Mailand, Italien",
    rev2_text: "Ein traumhaftes Hotel im Herzen von San Marino. Fantastische Aussicht, sehr saubere Zimmer und ein unvergesslicher Service. Wir werden auf jeden Fall wiederkommen!",
    rev2_author: "Thomas & Elena",
    rev2_origin: "München, Deutschland",
    rev3_text: "Ein unvergesslicher Boutique-Aufenthalt! Auf dem Gipfel des Monte Titano mit spektakulärem Panorama. Herzliches Personal und geschmackvolle Zimmer.",
    rev3_author: "Sarah & David",
    rev3_origin: "London, UK",
    rev_cta_title: "Waren Sie bereits unser Gast?",
    rev_cta_desc: "Ihre Meinung ist uns wichtig. Teilen Sie Ihre Eindrücke auf TripAdvisor oder Google.",
    rev_cta_tripadvisor: "Bewerten Sie uns auf TripAdvisor",
    rev_cta_google: "Bewerten Sie uns auf Google",

    // Booking & Quote Form
    quote_overline: "Direktanfrage",
    quote_title: "Individuelles Angebot anfordern",
    quote_lead: "Füllen Sie das Formular aus, um das beste garantierte Angebot für Ihren Wunschtermin zu erhalten.",
    services_quote_overline: "Informationen & Services",
    services_quote_title: "Benötigen Sie weitere Informationen?",
    services_quote_lead: "Kontaktieren Sie uns, um alle Details zu unseren Services zu erfahren – wie Parkmöglichkeiten oder die Organisation geführter Ausflüge in San Marino.",
    services_quote_btn: "Informationen Anfragen",
    form_room_label: "Gewünschtes Zimmer",
    form_checkin: "Check-in",
    form_checkout: "Check-out",
    form_adults: "Erwachsene",
    form_children: "Kinder",
    form_name: "Vor- und Nachname",
    form_name_ph: "z.B. Max Mustermann",
    form_email: "E-Mail-Adresse",
    form_email_ph: "name@beispiel.de",
    form_phone: "Telefon",
    form_phone_ph: "+49 170 1234567",
    form_notes: "Besondere Wünsche / Notizen",
    form_notes_ph: "z.B. späte Anreise, Babybett, Allergien...",
    form_badge: "Hotel La Rocca • San Marino",
    form_subtitle: "Kostenloses und unverbindliches Angebot mit Bestpreisgarantie.",
    form_optional: "(optional)",
    form_privacy: "Ich habe die Datenschutzerklärung gelesen und stimme zu",
    form_submit: "Anfrage Absenden",

    // Aktivitäten
    att_overline: "Einzigartige Erlebnisse",
    att_title: "Aktivitäten & Ausflüge",
    att_subtitle: "Erleben Sie San Marino mit authentischen und unvergesslichen Aktivitäten.",
    att_notice_title: "Wichtiger Hinweis:",
    att_notice_desc: "Alle Aktivitäten und Ausflüge müssen mindestens 3 Tage vor dem Anreisedatum direkt über unser Hotel reserviert werden.",
    att_section_overline: "Unsere Angebote",
    att_section_title: "Aktivitäten Entdecken",
    att_section_desc: "Eine Auswahl exklusiver Erlebnisse, um Natur, Kultur und das atemberaubende Panorama des Monte Titano hautnah zu spüren.",
    att_card1_title: "Trekking & Wanderungen",
    att_card1_desc: "Malerische Wege im Grünen entlang der Pfade des Monte Titano. Ein einzigartiges Natur- und Geschichtserlebnis.",
    att_card2_title: "Wein- & Spezialitätenverkostung",
    att_card2_desc: "Eine Genussreise durch typische Aromen, einheimische Weine und traditionelle Käsesorten der Region San Marino.",
    att_card3_title: "Geführte Touren im Historischen Zentrum",
    att_card3_desc: "Kulturelle Entdeckungstouren zwischen mittelalterlichen Wehrtürmen, Gassen und Denkmälern mit autorisierten Guides.",
    att_card4_title: "Geführte E-Bike-Touren",
    att_card4_desc: "Mühelose Ausflüge mit modernen E-Bikes, um die faszinierenden Panoramen von San Marino mit ortskundiger Begleitung zu entdecken.",
    att_card5_title: "Rundflug über San Marino",
    att_card5_desc: "Ein unvergesslicher Panoramaflug, um die älteste Republik der Welt und die Adriaküste aus der Vogelperspektive zu bewundern.",
    att_card6_title: "Bogenschießen in der Natur",
    att_card6_desc: "Konzentration, Geschicklichkeit und Freizeitspaß inmitten der erholsamen Naturkulisse des Monte Titano.",

    // Footer
    footer_about: "Ein historischer Ort voller Charme und zeitloser Schönheit an den mittelalterlichen Festungsmauern des Monte Titano, UNESCO-Welterbe. Traumhafte Aussichten und herzliche Gastfreundschaft.",
    footer_col_explore: "Navigation",
    footer_col_contacts: "Direktkontakt",
    footer_col_reviews: "Gäste & Bewertungen",
    footer_rating_label: "basierend auf echten Gästebewertungen",
    footer_btn_tripadvisor: "Bewerten Sie uns auf TripAdvisor",
    footer_btn_google: "Bewerten Sie uns auf Google",
    footer_checkin_info: "Check-in: 14:00 - 19:00 Uhr",
    footer_request: "Angebot Anfordern",
    footer_privacy: "Datenschutz",
    footer_cookie: "Allgemeine Geschäftsbedingungen",

    // 404 Page
    page404_title: "Seite Nicht Gefunden",
    page404_desc: "Die von Ihnen gesuchte Seite hat sich offenbar in den mittelalterlichen Gassen des Monte Titano verirrt oder wurde verschoben.",
    page404_btn_home: "Zur Startseite",
    page404_btn_rooms: "Zimmer Entdecken",
    page404_btn_contact: "Kontaktieren Sie Uns"
  },

  fr: {
    // Navigation
    nav_home: "Accueil",
    nav_rooms: "Chambres",
    nav_services: "Services",
    nav_bar: "Notre bar",
    nav_activities: "Activités",
    nav_location: "Nous trouver",
    nav_book: "Réserver",
    nav_book_short: "RÉSERVER",
    nav_shop: "BOUTIQUE",
    nav_menu: "MENU",
    nav_close: "FERMER",
    nav_contact: "Contact",

    // Hero Index
    hero_subtitle: "Saint-Marin · Centre Historique",
    hero_title: "Hôtel La Rocca",
    hero_tagline: "Une expérience unique au cœur de la plus ancienne République du monde. Élégance, confort et une vue à couper le souffle sur les collines et les vallées de Saint-Marin.",
    hero_btn_rooms: "Découvrir les Chambres",
    hero_btn_story: "Notre Histoire",
    hero_scroll: "Défiler",

    // About
    about_overline: "Notre Histoire",
    about_title: "Un Havre d'Élégance au Cœur du Centre Historique",
    about_lead: "Situé au cœur même de la République de Saint-Marin, l'Hôtel La Rocca est le point de départ idéal pour explorer cette ville inscrite au patrimoine mondial de l'UNESCO.",
    about_story_h3: "Là où l'Histoire Rencontre le Confort Contemporain",
    about_p1: "Niché entre les anciens remparts du Mont Titano et les célèbres tours médiévales, l'Hôtel La Rocca offre une hospitalité raffinée dans un cadre véritablement incomparable. Chaque chambre a été soigneusement conçue pour un séjour inoubliable, avec des détails raffinés et des panoramas exceptionnels.",
    about_p2: "À quelques pas des Trois Tours, des musées et des boutiques historiques, notre hôtel est le choix idéal pour ceux qui souhaitent découvrir l'âme authentique de Saint-Marin.",
    feat_unesco_title: "Centre Historique UNESCO",
    feat_unesco_desc: "À quelques pas des Trois Tours",
    feat_view_title: "Vue Panoramique",
    feat_view_desc: "Sur les collines et vallées de Saint-Marin",
    feat_hospitality_title: "Hospitalité Personnalisée",
    feat_hospitality_desc: "Un service attentif et sur mesure",
    feat_parking_title: "Parking Conventionné",
    feat_parking_desc: "Accès facilité au centre",

    // Rooms Preview Index
    rooms_overline: "Les Chambres",
    rooms_title: "Votre Refuge à Saint-Marin",
    rooms_lead: "Dix chambres boutique au design unique, pensées pour offrir calme et sérénité. Choisissez le refuge idéal pour vos vacances.",
    room_all_btn: "Toutes les Chambres",
    room_detail_btn: "Détails de la Chambre",
    room_request_btn: "Demander un Devis",

    // Services
    services_overline: "Nos Services",
    services_title: "Une Expérience de Séjour Impeccable",
    services_lead: "Chaque prestation est pensée avec soin pour garantir votre confort maximal tout au long de votre séjour.",
    srv_breakfast_title: "Petit-déjeuner Panoramique",
    srv_breakfast_desc: "Délices locaux frais, viennoiseries artisanales et vues panoramiques pour bien commencer la journée.",
    srv_wifi_title: "Wi-Fi Haut Débit Gratuit",
    srv_wifi_desc: "Connexion internet fiable par fibre optique dans toutes les chambres et les espaces communs.",
    srv_parking_title: "Accès ZTL & Parking",
    srv_parking_desc: "Autorisation de circulation dans la zone historique à accès limité et solutions de stationnement.",
    srv_concierge_title: "Conciergerie & Conseils",
    srv_concierge_desc: "Recommandations sur mesure pour la gastronomie, les sites culturels et les promenades panoramiques.",

    // Reviews Section
    reviews_overline: "Expériences de nos Hôtes",
    reviews_title: "Ce que Disent nos Hôtes",
    reviews_lead: "La chaleur de notre hospitalité authentique à travers les mots de nos visiteurs.",
    reviews_badge_sub: "Note exceptionnelle de voyageurs vérifiés",
    rev1_text: "Emplacement magnifique, à seulement deux minutes de la Première Tour. Voir le lever du soleil sur les collines depuis notre chambre était magique. Chambre impeccable et petit-déjeuner délicieux !",
    rev1_author: "Marco & Giulia",
    rev1_origin: "Milan, Italie",
    rev2_text: "Un hôtel merveilleux au centre de Saint-Marin. Vues fantastiques, chambres impeccables et un accueil chaleureux. Nous reviendrons sans aucun doute !",
    rev2_author: "Thomas & Elena",
    rev2_origin: "Munich, Allemagne",
    rev3_text: "Un séjour boutique inoubliable ! Perché au sommet du Mont Titano avec des panoramas à couper le souffle. Personnel aimable, atmosphère paisible et chambres raffinées.",
    rev3_author: "Sarah & David",
    rev3_origin: "Londres, Royaume-Uni",
    rev_cta_title: "Avez-vous séjourné chez nous ?",
    rev_cta_desc: "Votre avis nous est très précieux. Partagez votre expérience sur TripAdvisor ou Google.",
    rev_cta_tripadvisor: "Laisser un Avis sur TripAdvisor",
    rev_cta_google: "Laissez-nous un avis sur Google",

    // Booking & Quote Form
    quote_overline: "Réservation Directe",
    quote_title: "Demandez votre Offre Personnalisée",
    quote_lead: "Remplissez le formulaire ci-dessous pour recevoir le meilleur tarif direct garanti et la disponibilité des chambres.",
    services_quote_overline: "Informations & Services",
    services_quote_title: "Besoin de plus d'Informations ?",
    services_quote_lead: "Contactez-nous pour découvrir tous les détails de nos services, comme les options de stationnement ou l'organisation d'excursions guidées à Saint-Marin.",
    services_quote_btn: "Demander des Informations",
    form_room_label: "Chambre Souhaitée",
    form_checkin: "Check-in",
    form_checkout: "Check-out",
    form_adults: "Adultes",
    form_children: "Enfants",
    form_name: "Nom et Prénom",
    form_name_ph: "ex. Jean Dupont",
    form_email: "Adresse E-mail",
    form_email_ph: "nom@exemple.fr",
    form_phone: "Téléphone",
    form_phone_ph: "+33 6 12 34 56 78",
    form_notes: "Demandes Particulières / Remarques",
    form_notes_ph: "ex. arrivée tardive, lit bébé, préférences alimentaires...",
    form_badge: "Hôtel La Rocca • Saint-Marin",
    form_subtitle: "Devis gratuit et sans engagement avec la garantie du meilleur tarif.",
    form_optional: "(facultatif)",
    form_privacy: "J'ai lu et j'accepte la Politique de Confidentialité",
    form_submit: "Envoyer la Demande de Devis",

    // Activities
    att_overline: "Expériences Uniques",
    att_title: "Activités & Excursions",
    att_subtitle: "Vivez Saint-Marin à travers des aventures authentiques et inoubliables.",
    att_notice_title: "Remarque Importante :",
    att_notice_desc: "Toutes les activités et excursions doivent être réservées au moins 3 jours avant votre date d'arrivée en contactant directement notre réception.",
    att_section_overline: "Nos Suggestions",
    att_section_title: "Découvrez les Activités",
    att_section_desc: "Une sélection d'expériences uniques pour vivre l'histoire, la nature et la beauté panoramique du Mont Titano.",
    att_card1_title: "Trekking & Balades Panoramiques",
    att_card1_desc: "Des sentiers verdoyants le long des anciens chemins du Mont Titano. Une aventure unique mêlant nature préservée et histoire médiévale.",
    att_card2_title: "Dégustations Œnogastronomiques",
    att_card2_desc: "Un voyage sensoriel à travers les spécialités culinaires traditionnelles, les vins locaux et les fromages artisanaux de Saint-Marin.",
    att_card3_title: "Visites Guidées du Centre Historique",
    att_card3_desc: "Explorations culturelles parmi les tours médiévales, les anciennes contrade et les monuments, accompagnées de guides experts agréés.",
    att_card4_title: "Excursions Guidées en E-Bike",
    att_card4_desc: "Des balades à deux roues sans effort pour explorer les collines et belvédères spectaculaires de Saint-Marin avec un accompagnement local expert.",
    att_card5_title: "Vol Panoramique sur Saint-Marin",
    att_card5_desc: "Une expérience de vol à couper le souffle pour admirer l'ancienne République d'en haut, avec des panoramas à 360° sur les montagnes et la côte.",
    att_card6_title: "Tir à l'Arc en Plein Air",
    att_card6_desc: "Concentration, équilibre et loisirs en plein air, au cœur de la nature paisible du Mont Titano.",

    // Footer
    footer_about: "Une authentique demeure de charme et d'élégance intemporelle nichée parmi les tours médiévales du Mont Titano, patrimoine mondial de l'UNESCO. Panoramas à couper le souffle et accueil chaleureux.",
    footer_col_explore: "Navigation",
    footer_col_contacts: "Contacts Directs",
    footer_col_reviews: "Hôtes & Avis",
    footer_rating_label: "sur la base d'avis vérifiés",
    footer_btn_tripadvisor: "Laissez-nous un avis sur TripAdvisor",
    footer_btn_google: "Laissez-nous un avis sur Google",
    footer_checkin_info: "Check-in : 14h00 - 19h00",
    footer_request: "Demander un Devis",
    footer_privacy: "Politique de Confidentialité",
    footer_cookie: "Conditions Générales",

    // 404 Page
    page404_title: "Page Introuvable",
    page404_desc: "La page que vous recherchez semble s'être égarée dans les ruelles anciennes du Mont Titano, ou a été déplacée.",
    page404_btn_home: "Retour à l'Accueil",
    page404_btn_rooms: "Découvrir les Chambres",
    page404_btn_contact: "Nous Contacter"
  }

};

class I18nManager {
  constructor() {
    const path = window.location.pathname;
    if (path.includes('/en/') || path.endsWith('/en')) {
      this.currentLang = 'en';
    } else if (path.includes('/de/') || path.endsWith('/de')) {
      this.currentLang = 'de';
    } else if (path.includes('/fr/') || path.endsWith('/fr')) {
      this.currentLang = 'fr';
    } else {
      this.currentLang = 'it';
    }
    localStorage.setItem('hotel_lang', this.currentLang);
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.setupListeners();
  }

  applyLanguage(lang) {
    if (!translations[lang]) lang = 'it';
    this.currentLang = lang;
    localStorage.setItem('hotel_lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang];
    const flagMap = { it: '🇮🇹', en: '🇬🇧', de: '🇩🇪', fr: '🇫🇷' };

    // Aggiorna indicatori del trigger dropdown
    document.querySelectorAll('#activeLangFlag').forEach(el => el.textContent = flagMap[lang] || '🇮🇹');
    document.querySelectorAll('#activeLangCode').forEach(el => el.textContent = lang.toUpperCase());

    // Aggiorna tutti gli elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Aggiorna i placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Aggiorna stato opzioni dropdown e pulsanti legacy
    document.querySelectorAll('.lang-option, .lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setupListeners() {
    const closeAllDropdowns = () => {
      document.querySelectorAll('.lang-dropdown').forEach(d => {
        d.classList.remove('open');
        d.querySelector('.lang-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    };

    // Toggle dropdown al click/tap sul trigger
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.lang-dropdown-trigger');
      const dropdown = e.target.closest('.lang-dropdown');
      
      if (trigger && dropdown) {
        e.preventDefault();
        e.stopPropagation();
        const wasOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!wasOpen) {
          dropdown.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        return;
      }

      // Selezione lingua da opzione dropdown -> Navigazione a cartella (/ , /en/ , /de/)
      const opt = e.target.closest('.lang-option') || e.target.closest('.lang-btn');
      if (opt) {
        e.preventDefault();
        e.stopPropagation();
        closeAllDropdowns();

        const selectedLang = opt.getAttribute('data-lang');
        if (selectedLang) {
          localStorage.setItem('hotel_lang', selectedLang);

          if (selectedLang === this.currentLang) {
            return;
          }

          // Calcola il percorso di destinazione in modo affidabile con URL puliti
          const path = window.location.pathname;
          const segments = path.split('/').filter(Boolean);
          let page = '';
          if (segments.length > 0) {
            let last = segments[segments.length - 1];
            if (last !== 'en' && last !== 'de' && last !== 'fr' && last !== 'index.html' && last !== 'index') {
              page = last.replace(/\.html$/, '');
            }
          }

          // Lingua corrente dedotta dal percorso (cartelle /en/, /de/, /fr/)
          const inSubfolder = ['en', 'de', 'fr'].some(l => path.includes('/' + l + '/') || path.endsWith('/' + l));
          const prefix = inSubfolder ? '../' : '';
          let targetUrl = '';
          if (selectedLang === 'it') {
            targetUrl = prefix + (page ? page : (inSubfolder ? '' : './'));
          } else {
            targetUrl = prefix + selectedLang + '/' + page;
          }
          if (!targetUrl) targetUrl = './';

          const hash = window.location.hash || '';
          const search = window.location.search || '';
          window.location.href = targetUrl + search + hash;
        }
        return;
      }

      // Click fuori: chiudi tutti i dropdown
      closeAllDropdowns();
    });

    // Touch per chiudere toccando fuori su dispositivi mobili
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.lang-dropdown')) {
        closeAllDropdowns();
      }
    }, { passive: true });

    // Chiudi con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });
  }
}

// Inizializza globalmente
window.hotelI18n = new I18nManager();
