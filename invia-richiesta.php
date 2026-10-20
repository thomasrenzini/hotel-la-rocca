<?php
/**
 * invia-richiesta.php
 * Hotel La Rocca – San Marino
 *
 * Script di elaborazione ed invio email per richieste preventivo.
 * Email hotel (produzione): hotellarocca@omniway.sm
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ========================================
    // 1. Controllo Honeypot Anti-Spam
    // ========================================
    if (!empty($_POST['website'])) {
        die("Spam rilevato.");
    }

    // ========================================
    // 2. Verifica Google reCAPTCHA v2
    // ========================================
    $recaptchaSecret   = '6LeayI8tAAAAAB5KxJ_bNrDOG-pSTQBfaCY9fg3n';
    $recaptchaResponse = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    if (empty($recaptchaResponse)) {
        die("Per favore completa la verifica reCAPTCHA. <a href='javascript:history.back()'>Torna indietro</a>");
    }

    $verifyURL      = "https://www.google.com/recaptcha/api/siteverify";
    $verifyResponse = file_get_contents($verifyURL . "?secret=" . $recaptchaSecret . "&response=" . $recaptchaResponse);
    $responseData   = json_decode($verifyResponse);

    if (!$responseData->success) {
        die("Verifica reCAPTCHA fallita. <a href='javascript:history.back()'>Torna indietro e riprova.</a>");
    }

    // ========================================
    // 3. Sanificazione Input
    // ========================================
    $camera   = htmlspecialchars(trim($_POST['camera_selezionata']), ENT_QUOTES, 'UTF-8');
    $checkin  = htmlspecialchars(trim($_POST['checkin']), ENT_QUOTES, 'UTF-8');
    $checkout = htmlspecialchars(trim($_POST['checkout']), ENT_QUOTES, 'UTF-8');
    $adulti   = htmlspecialchars(trim($_POST['ospiti_adulti']), ENT_QUOTES, 'UTF-8');
    $bambini  = htmlspecialchars(trim($_POST['ospiti_bambini']), ENT_QUOTES, 'UTF-8');
    $nome     = htmlspecialchars(trim($_POST['nome_cognome']), ENT_QUOTES, 'UTF-8');
    $email    = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST['telefono']), ENT_QUOTES, 'UTF-8');
    $note     = htmlspecialchars(trim($_POST['richieste_speciali']), ENT_QUOTES, 'UTF-8');
    $raw_lang = isset($_POST['lang']) ? strtolower(trim($_POST['lang'])) : 'it';
    $lang     = in_array($raw_lang, ['it', 'en', 'de', 'fr']) ? $raw_lang : 'it';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Indirizzo email non valido. <a href='javascript:history.back()'>Torna indietro</a>");
    }

    $data_invio = date("d/m/Y \a\l\l\e H:i");

    // ========================================
    // 4. Template HTML Email Hotel (Notifica)
    // ========================================
    $hotel_html = '<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuova Richiesta Preventivo</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f1ec;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ec;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.10);">

      <!-- HEADER -->
      <tr>
        <td style="background-color:#232920;padding:32px 40px;text-align:center;">
          <!-- Tre Torri SVG -->
                    <table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <img src="https://www.hotellaroccasm.com/content/logo.png" alt="Hotel La Rocca" width="76" height="76" style="display:block;margin:0 auto 10px;width:76px;height:auto;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5));">
            <div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:24px;font-weight:600;letter-spacing:2px;color:#FAF8F5;text-transform:uppercase;">Hotel La Rocca</div>
            <div style="font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:6px;color:#C5A059;margin-top:4px;text-transform:uppercase;">San Marino &bull; Centro Storico</div>
          </td></tr></table>
        </td>
      </tr>

      <!-- BADGE RICHIESTA -->
      <tr>
        <td style="background:#C5A059;padding:12px 40px;text-align:center;">
          <span style="color:#0b1612;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">&#128274; Nuova Richiesta di Preventivo</span>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:36px 40px 24px;">
          <!-- NOTIFICA LINGUA UTENTE -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
              <td style="padding:10px 16px;background:#eef5f1;border-left:4px solid #1e5c3a;border-radius:4px;font-size:13px;color:#1e5c3a;font-weight:600;">
                &#127760; Attenzione: Questo utente ha navigato il sito e compilato la richiesta in lingua <strong>' . strtoupper($lang) . ' (' . ($lang === 'de' ? 'Tedesco' : ($lang === 'en' ? 'Inglese' : 'Italiano')) . ')</strong>.
              </td>
            </tr>
          </table>

          <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
            È arrivata una nuova richiesta di preventivo dal sito web. Di seguito tutti i dettagli:
          </p>

          <!-- SEZIONE: SOGGIORNO -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding-bottom:10px;border-bottom:2px solid #C5A059;">
                <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C5A059;">&#127970; Dettagli Soggiorno</span>
              </td>
            </tr>
            <tr><td style="height:16px;"></td></tr>
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:50%;padding:10px 16px;background:#f9f7f3;border-radius:6px 0 0 6px;border-bottom:1px solid #eee;">
                      <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Camera</div>
                      <div style="font-size:15px;font-weight:700;color:#0b1612;">' . $camera . '</div>
                    </td>
                    <td style="width:4px;"></td>
                    <td style="width:50%;padding:10px 16px;background:#f9f7f3;border-radius:0 6px 6px 0;border-bottom:1px solid #eee;">
                      <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Ospiti</div>
                      <div style="font-size:15px;font-weight:700;color:#0b1612;">' . $adulti . ' adulti &ndash; ' . $bambini . ' bambini</div>
                    </td>
                  </tr>
                  <tr><td colspan="3" style="height:4px;"></td></tr>
                  <tr>
                    <td style="padding:10px 16px;background:#f9f7f3;border-radius:6px 0 0 6px;">
                      <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Check-in</div>
                      <div style="font-size:15px;font-weight:700;color:#0b1612;">&#128197; ' . $checkin . '</div>
                    </td>
                    <td style="width:4px;"></td>
                    <td style="padding:10px 16px;background:#f9f7f3;border-radius:0 6px 6px 0;">
                      <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Check-out</div>
                      <div style="font-size:15px;font-weight:700;color:#0b1612;">&#128197; ' . $checkout . '</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- SEZIONE: DATI CLIENTE -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding-bottom:10px;border-bottom:2px solid #C5A059;">
                <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C5A059;">&#128100; Dati Cliente</span>
              </td>
            </tr>
            <tr><td style="height:16px;"></td></tr>
            <tr>
              <td style="padding:10px 16px 0;background:#f9f7f3;border-radius:6px 6px 0 0;">
                <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Nome e Cognome</div>
                <div style="font-size:16px;font-weight:700;color:#0b1612;">' . $nome . '</div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 16px;background:#f9f7f3;border-top:1px solid #eee;">
                <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Indirizzo Email</div>
                <div style="font-size:14px;color:#0b1612;"><a href="mailto:' . $email . '" style="color:#C5A059;text-decoration:none;">' . $email . '</a></div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 16px;background:#f9f7f3;border-top:1px solid #eee;border-radius:0 0 6px 6px;">
                <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Telefono</div>
                <div style="font-size:14px;color:#0b1612;">' . ($telefono ? '<a href="tel:' . $telefono . '" style="color:#0b1612;text-decoration:none;">' . $telefono . '</a>' : '<em style="color:#bbb;">Non fornito</em>') . '</div>
              </td>
            </tr>
          </table>

          ' . ($note ? '
          <!-- SEZIONE: NOTE -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding-bottom:10px;border-bottom:2px solid #C5A059;">
                <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C5A059;">&#128203; Note / Richieste Speciali</span>
              </td>
            </tr>
            <tr><td style="height:16px;"></td></tr>
            <tr>
              <td style="padding:14px 16px;background:#fffbf0;border-left:3px solid #C5A059;border-radius:0 6px 6px 0;font-size:14px;color:#333;line-height:1.7;">
                ' . $note . '
              </td>
            </tr>
          </table>' : '') . '

          <!-- PULSANTE RISPOSTA RAPIDA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:8px 0 0;">
                <a href="mailto:' . $email . '?subject=Re: Preventivo ' . rawurlencode($camera) . ' - Hotel La Rocca"
                   style="display:inline-block;background:#C5A059;color:#0b1612;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;border-radius:4px;">
                  &#9993; Rispondi al Cliente
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- FOOTER EMAIL -->
      <tr>
        <td style="background:#232920;padding:26px 40px;text-align:center;border-top:1px solid rgba(197,160,89,0.25);">
          <p style="margin:0 0 6px;color:#FAF8F5;font-weight:600;font-size:12px;letter-spacing:0.5px;">
            LA ROCCA SRL
          </p>
          <p style="margin:0 0 4px;color:#B3AC9A;font-size:11px;">
            Via Salita alla Rocca n° 33/35 &middot; 47890 San Marino (R.S.M.)
          </p>
          <p style="margin:0 0 8px;color:#B3AC9A;font-size:11px;">
            C.O.E. SM 30254 &middot; Tel. <a href="tel:+3780549991166" style="color:#C5A059;text-decoration:none;">+378 0549 991166</a> &middot; <a href="mailto:hotellarocca@omniway.sm" style="color:#C5A059;text-decoration:none;">hotellarocca@omniway.sm</a>
          </p>
          <p style="margin:0;color:#7C8565;font-size:10px;letter-spacing:1px;text-transform:uppercase;">
            Richiesta ricevuta il ' . $data_invio . '
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>';

    // ======================================================================
    // CONFIGURAZIONE INDIRIZZI EMAIL DESTINATARI
    // ======================================================================
    // 1. Destinatario Hotel: riceve la notifica della nuova richiesta preventivo
    // Per test impostato su renzinithomas@gmail.com (in produzione: hotellarocca@omniway.sm)
    $destinatario_hotel = "renzinithomas@gmail.com";

    // 2. Destinatario Cliente: riceve l'email di conferma presa in carico
    // Per test forzato su francescocarrido@gmail.com (in produzione: $email)
    $destinatario_cliente = "francescocarrido@gmail.com";

    // ========================================
    // 5. Invio EMAIL 1 – Notifica Hotel
    // ========================================
    $subject = "=?UTF-8?B?" . base64_encode("Nuova Richiesta Preventivo – " . $camera . " | Hotel La Rocca") . "?=";

    $headers_hotel   = array();
    $headers_hotel[] = "MIME-Version: 1.0";
    $headers_hotel[] = "Content-Type: text/html; charset=UTF-8";
    $headers_hotel[] = "From: Hotel La Rocca Sito Web <noreply@hotellaroccasm.com>";
    $headers_hotel[] = "Reply-To: " . $nome . " <" . $email . ">";
    $headers_hotel[] = "X-Mailer: PHP/" . phpversion();

    $mailSent = mail($destinatario_hotel, $subject, $hotel_html, implode("\r\n", $headers_hotel));

    // ========================================
    // 6. Template HTML Email Cliente (Autoresponder Multilingua)
    // ========================================
    switch ($lang) {
        case 'en':
            $clientSubjectRaw = "Inquiry received – Hotel La Rocca, San Marino";
            $clientBadge      = "✓ INQUIRY RECEIVED";
            $clientGreeting   = "Dear " . $nome . ",";
            $clientIntro      = "Thank you for contacting Hotel La Rocca. We have received your quote request for the <strong>" . $camera . "</strong> room.";
            $clientReplyTime  = "Our reception team is checking suite availability and will send you our best bespoke offer via email within a few hours.";
            $clientWarning    = "<strong>Please note:</strong> This message confirms that we have safely received your inquiry and does not constitute a finalized booking. Official confirmation will be arranged by our reception.";
            $clientSummary    = "YOUR INQUIRY SUMMARY";
            $clientLblRoom    = "ROOM";
            $clientLblGuests  = "GUESTS";
            $clientGuestsVal  = $adulti . " adults" . ((int)$bambini > 0 ? ", " . $bambini . " children" : "");
            $clientLblNotes   = "NOTES / REQUESTS";
            $clientHelpTitle  = "DIRECT HOTEL RECEPTION";
            $clientFooterSign = "Exclusive Hospitality in the Heart of San Marino";
            $redirectPage     = "en/grazie";
            break;

        case 'de':
            $clientSubjectRaw = "Anfrage erhalten – Hotel La Rocca, San Marino";
            $clientBadge      = "✓ ANFRAGE ERHALTEN";
            $clientGreeting   = "Guten Tag " . $nome . ",";
            $clientIntro      = "Vielen Dank für Ihre Anfrage an das Hotel La Rocca. Wir haben Ihre Angebotsanfrage für das Zimmer <strong>" . $camera . "</strong> erhalten.";
            $clientReplyTime  = "Unser Rezeptionsteam prüft derzeit die Verfügbarkeit und wird Ihnen in Kürze unser bestes Angebot per E-Mail zusenden.";
            $clientWarning    = "<strong>Wichtiger Hinweis:</strong> Diese Bestätigung belegt den ordnungsgemäßen Eingang Ihrer Anfrage und stellt noch keine verbindliche Buchung dar. Die endgültige Bestätigung erfolgt direkt durch unser Team.";
            $clientSummary    = "ÜBERSICHT IHRER ANFRAGE";
            $clientLblRoom    = "ZIMMER";
            $clientLblGuests  = "GÄSTE";
            $clientGuestsVal  = $adulti . " Erwachsene" . ((int)$bambini > 0 ? ", " . $bambini . " Kinder" : "");
            $clientLblNotes   = "BESONDERE WÜNSCHE";
            $clientHelpTitle  = "DIREKTER KONTAKT REZEPTION";
            $clientFooterSign = "Exklusive Gastfreundschaft im Herzen von San Marino";
            $redirectPage     = "de/grazie";
            break;

        case 'fr':
            $clientSubjectRaw = "Demande reçue – Hôtel La Rocca, Saint-Marin";
            $clientBadge      = "✓ DEMANDE REÇUE AVEC SUCCÈS";
            $clientGreeting   = "Bonjour " . $nome . ",";
            $clientIntro      = "Merci d'avoir contacté l'Hôtel La Rocca. Nous avons bien reçu votre demande de devis pour la chambre <strong>" . $camera . "</strong>.";
            $clientReplyTime  = "Notre équipe de réception vérifie actuellement la disponibilité et vous fera parvenir notre meilleure offre personnalisée par e-mail d'ici quelques heures.";
            $clientWarning    = "<strong>Remarque importante :</strong> Ce message atteste de la bonne réception de votre demande et ne constitue pas une réservation confirmée définitive. La confirmation officielle sera effectuée directement par notre équipe.";
            $clientSummary    = "RÉCAPITULATIF DE VOTRE DEMANDE";
            $clientLblRoom    = "CHAMBRE";
            $clientLblGuests  = "VOYAGEURS";
            $clientGuestsVal  = $adulti . " adulte" . ((int)$adulti > 1 ? "s" : "") . ((int)$bambini > 0 ? ", " . $bambini . " enfant" . ((int)$bambini > 1 ? "s" : "") : "");
            $clientLblNotes   = "DEMANDES PARTICULIÈRES";
            $clientHelpTitle  = "RÉCEPTION DIRECTE DE L'HÔTEL";
            $clientFooterSign = "Demeure d'exception et d'élégance à Saint-Marin";
            $redirectPage     = "fr/grazie";
            break;

        case 'it':
        default:
            $clientSubjectRaw = "Richiesta ricevuta – Hotel La Rocca, San Marino";
            $clientBadge      = "✓ RICHIESTA RICEVUTA CON SUCCESSO";
            $clientGreeting   = "Gentile " . $nome . ",";
            $clientIntro      = "Grazie per aver contattato l'Hotel La Rocca. Abbiamo ricevuto la tua richiesta di preventivo per la camera <strong>" . $camera . "</strong>.";
            $clientReplyTime  = "La nostra reception sta già verificando la disponibilità delle suite e ti invierà la nostra migliore proposta su misura via email entro poche ore.";
            $clientWarning    = "<strong>Nota importante:</strong> Questa email attesta la corretta ricezione della richiesta e non costituisce una prenotazione confermata definitiva. La conferma ufficiale avverrà tramite email dalla reception.";
            $clientSummary    = "RIEPILOGO DELLA TUA RICHIESTA";
            $clientLblRoom    = "CAMERA";
            $clientLblGuests  = "OSPITI";
            $clientGuestsVal  = $adulti . " adulti" . ((int)$bambini > 0 ? ", " . $bambini . " bambini" : "");
            $clientLblNotes   = "NOTE / RICHIESTE";
            $clientHelpTitle  = "CONTATTI DIRETTI RECEPTION";
            $clientFooterSign = "Autentica dimora di fascino ed eleganza a San Marino";
            $redirectPage     = "grazie";
            break;
    }

    $client_html = '<!DOCTYPE html>
<html lang="' . $lang . '">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>' . htmlspecialchars($clientSubjectRaw, ENT_QUOTES, 'UTF-8') . '</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#232920;border:1px solid rgba(197,160,89,0.35);border-radius:8px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.20);">

      <!-- HEADER DARK LUXURY -->
      <tr>
        <td style="background-color:#1C2219;padding:32px 40px;text-align:center;border-bottom:1px solid rgba(197,160,89,0.25);">
          <table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <img src="https://www.hotellaroccasm.com/content/logo.png" alt="Hotel La Rocca" width="76" height="76" style="display:block;margin:0 auto 10px;width:76px;height:auto;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.6));">
            <div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:24px;font-weight:600;letter-spacing:2px;color:#FAF8F5;text-transform:uppercase;">Hotel La Rocca</div>
            <div style="font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:6px;color:#C5A059;margin-top:4px;text-transform:uppercase;">San Marino &bull; Centro Storico</div>
          </td></tr></table>
        </td>
      </tr>

      <!-- BADGE DORATO -->
      <tr>
        <td style="background:#C5A059;padding:12px 40px;text-align:center;">
          <span style="color:#0b1612;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;">' . $clientBadge . '</span>
        </td>
      </tr>

      <!-- BODY DARK LUXURY -->
      <tr>
        <td style="padding:36px 40px 28px;background-color:#232920;">
          <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#FAF8F5;font-family:\'Cormorant Garamond\',Georgia,serif;letter-spacing:0.5px;">' . $clientGreeting . '</h1>
          <p style="margin:0 0 12px;font-size:15px;color:#E2DDD5;line-height:1.7;">
            ' . $clientIntro . '
          </p>
          <p style="margin:0 0 28px;font-size:14px;color:#B3AC9A;line-height:1.6;">
            ' . $clientReplyTime . '
          </p>

          <!-- NOTA IMPORTANTE (DISCLAIMER) -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding:14px 18px;background:rgba(197,160,89,0.10);border-left:3px solid #C5A059;border-radius:0 6px 6px 0;font-size:13px;color:#D1C7B7;line-height:1.6;">
                ' . $clientWarning . '
              </td>
            </tr>
          </table>

          <!-- RIEPILOGO RICHIESTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding-bottom:10px;border-bottom:2px solid #C5A059;">
                <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C5A059;">&#127970; ' . $clientSummary . '</span>
              </td>
            </tr>
            <tr><td style="height:14px;"></td></tr>
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="4">
                  <tr>
                    <td style="padding:12px 16px;background:#1B2118;border:1px solid rgba(197,160,89,0.22);border-radius:6px;width:50%;">
                      <div style="font-size:10px;color:#8C9381;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">' . $clientLblRoom . '</div>
                      <div style="font-size:15px;font-weight:700;color:#FAF8F5;">' . $camera . '</div>
                    </td>
                    <td style="width:4px;"></td>
                    <td style="padding:12px 16px;background:#1B2118;border:1px solid rgba(197,160,89,0.22);border-radius:6px;width:50%;">
                      <div style="font-size:10px;color:#8C9381;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">' . $clientLblGuests . '</div>
                      <div style="font-size:15px;font-weight:700;color:#FAF8F5;">' . $clientGuestsVal . '</div>
                    </td>
                  </tr>
                  <tr><td colspan="3" style="height:4px;"></td></tr>
                  <tr>
                    <td style="padding:12px 16px;background:#1B2118;border:1px solid rgba(197,160,89,0.22);border-radius:6px;">
                      <div style="font-size:10px;color:#8C9381;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Check-in</div>
                      <div style="font-size:15px;font-weight:700;color:#FAF8F5;">&#128197; ' . $checkin . '</div>
                    </td>
                    <td style="width:4px;"></td>
                    <td style="padding:12px 16px;background:#1B2118;border:1px solid rgba(197,160,89,0.22);border-radius:6px;">
                      <div style="font-size:10px;color:#8C9381;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Check-out</div>
                      <div style="font-size:15px;font-weight:700;color:#FAF8F5;">&#128197; ' . $checkout . '</div>
                    </td>
                  </tr>
                  ' . ($note ? '<tr><td colspan="3" style="height:4px;"></td></tr>
                  <tr>
                    <td colspan="3" style="padding:12px 16px;background:#1B2118;border:1px solid rgba(197,160,89,0.22);border-left:3px solid #C5A059;border-radius:6px;">
                      <div style="font-size:10px;color:#8C9381;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">' . $clientLblNotes . '</div>
                      <div style="font-size:13px;color:#E2DDD5;line-height:1.5;">' . $note . '</div>
                    </td>
                  </tr>' : '') . '
                </table>
              </td>
            </tr>
          </table>

          <!-- CONTATTI RECEPTION -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#1B2118;border:1px solid rgba(197,160,89,0.28);border-radius:6px;padding:20px 20px;">
            <tr>
              <td>
                <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C5A059;margin-bottom:12px;">' . $clientHelpTitle . '</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:13px;color:#E2DDD5;padding-bottom:6px;">
                      &#128222; Tel. <a href="tel:+3780549991166" style="color:#FAF8F5;text-decoration:none;font-weight:700;">+378 0549 991166</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#E2DDD5;padding-bottom:6px;">
                      &#9993; Email: <a href="mailto:hotellarocca@omniway.sm" style="color:#C5A059;text-decoration:none;font-weight:600;">hotellarocca@omniway.sm</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#B3AC9A;">
                      &#127968; Salita alla Rocca, 35 &middot; 47890 Citt&agrave; di San Marino (R.S.M.)
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- FOOTER DARK LUXURY -->
      <tr>
        <td style="background:#171C15;padding:26px 40px;text-align:center;border-top:1px solid rgba(197,160,89,0.22);">
          <p style="margin:0 0 6px;color:#FAF8F5;font-weight:600;font-size:12px;letter-spacing:0.5px;">
            LA ROCCA SRL
          </p>
          <p style="margin:0 0 4px;color:#B3AC9A;font-size:11px;">
            Via Salita alla Rocca n° 33/35 &middot; 47890 San Marino (R.S.M.)
          </p>
          <p style="margin:0 0 8px;color:#B3AC9A;font-size:11px;">
            C.O.E. SM 30254 &middot; Tel. +378 0549 991166 &middot; hotellarocca@omniway.sm
          </p>
          <p style="margin:0;color:#7C8565;font-size:10px;letter-spacing:1px;text-transform:uppercase;">
            <em>' . $clientFooterSign . '</em>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>';

    // ========================================
    // 7. Invio EMAIL 2 – Autoresponder Cliente
    // ========================================
    $clientSubject = "=?UTF-8?B?" . base64_encode($clientSubjectRaw) . "?=";

    $clientHeaders   = array();
    $clientHeaders[] = "MIME-Version: 1.0";
    $clientHeaders[] = "Content-Type: text/html; charset=UTF-8";
    $clientHeaders[] = "From: Hotel La Rocca <noreply@hotellaroccasm.com>";
    $clientHeaders[] = "Reply-To: Hotel La Rocca <hotellarocca@omniway.sm>";
    $clientHeaders[] = "X-Mailer: PHP/" . phpversion();

    mail($destinatario_cliente, $clientSubject, $client_html, implode("\r\n", $clientHeaders));

    // ========================================
    // 8. Debug locale – salva log e anteprime
    // ========================================
    $debugLog  = "========== EMAIL ALL'HOTEL (RICHIESTA PREVENTIVO) ==========\n";
    $debugLog .= "A: $destinatario_hotel\nOggetto: Nuova Richiesta Preventivo – $camera | Hotel La Rocca\n\n";
    $debugLog .= "Lingua Sito: $lang\nCamera: $camera\nCheck-in: $checkin | Check-out: $checkout\n";
    $debugLog .= "Adulti: $adulti | Bambini: $bambini\n";
    $debugLog .= "Nome: $nome\nEmail Cliente inserita: $email\nTelefono: " . ($telefono ?: 'N/A') . "\n";
    $debugLog .= "Note: " . ($note ?: 'Nessuna') . "\n\n";
    $debugLog .= "========== EMAIL AL CLIENTE (CONFERMA PRESA IN CARICO) ==========\n";
    $debugLog .= "A: $destinatario_cliente\nOggetto: $clientSubjectRaw\n\n";
    file_put_contents('test_email.txt', $debugLog);
    file_put_contents('preview_email_hotel.html', $hotel_html);
    file_put_contents('preview_email_cliente.html', $client_html);

    // Salva l'anteprima HTML dell'email hotel
    // file_put_contents('email_preview.html', $hotel_html);

    // ========================================
    // 9. Reindirizzamento pagina di conferma
    // ========================================
    if ($mailSent || true) {
        header("Location: " . $redirectPage);
        exit();
    } else {
                echo "<!DOCTYPE html><html lang='" . $lang . "'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Errore</title><link rel='stylesheet' href='css/style.css'></head><body style='display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem;'><div><h1 style='color:var(--color-gold);margin-bottom:1rem;'>Ops!</h1><p style='color:var(--color-cream-muted);margin-bottom:2rem;'>Si è verificato un errore. Riprova tra qualche istante.</p><a href='javascript:history.back()' class='btn btn-primary'>Torna Indietro</a></div></body></html>";
    }

} else {
    header("Location: index.html");
    exit();
}
?>
