import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-pmlsRed transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Torna indietro</span>
        </button>

        <article className="prose prose-lg max-w-none">
          <h1 className="font-serif text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">1. Introduzione</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Benvenuto nella Privacy Policy della Parthenope Machine Learning Society (PMLS).
              Ci impegniamo a proteggere la tua privacy e a garantire la sicurezza dei tuoi dati personali.
              Questa policy descrive come raccogliamo, utilizziamo e proteggiamo le tue informazioni.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">2. Informazioni che raccogliamo</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Potremmo raccogliere le seguenti tipologie di informazioni:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Informazioni di contatto:</strong> nome, cognome, email, numero di telefono quando ci contatti o ti iscrivi ai nostri eventi.</li>
              <li><strong>Informazioni accademiche:</strong> università, corso di studi, anno accademico (se pertinente per le attività della società).</li>
              <li><strong>Dati di navigazione:</strong> informazioni tecniche raccolte automaticamente quando visiti il nostro sito web, come indirizzo IP, tipo di browser, e pagine visitate.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">3. Come utilizziamo le tue informazioni</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizziamo le tue informazioni per:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Organizzare e gestire eventi, workshop e attività della società</li>
              <li>Comunicare con te riguardo eventi, novità e opportunità</li>
              <li>Rispondere alle tue richieste e fornire supporto</li>
              <li>Migliorare i nostri servizi e il nostro sito web</li>
              <li>Inviare newsletter e aggiornamenti (solo con il tuo consenso)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">4. Base giuridica del trattamento</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Trattiamo i tuoi dati personali in base alle seguenti basi giuridiche:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Consenso:</strong> quando ci fornisci il tuo consenso esplicito per trattare i tuoi dati</li>
              <li><strong>Esecuzione di un contratto:</strong> quando necessario per la tua partecipazione a eventi o attività</li>
              <li><strong>Legittimo interesse:</strong> per migliorare i nostri servizi e comunicare con i membri della comunità</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">5. Condivisione dei dati</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Non vendiamo né affittiamo i tuoi dati personali a terze parti. Potremmo condividere le tue informazioni solo nei seguenti casi:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Con fornitori di servizi che ci aiutano a gestire il sito web e le nostre attività</li>
              <li>Con l'Università degli Studi di Napoli "Parthenope" per attività istituzionali</li>
              <li>Quando richiesto dalla legge o da autorità competenti</li>
              <li>Con il tuo consenso esplicito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">6. Conservazione dei dati</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conserviamo i tuoi dati personali solo per il tempo necessario a soddisfare gli scopi per cui sono stati raccolti,
              o come richiesto dalla legge. Quando i dati non sono più necessari, vengono eliminati o resi anonimi in modo sicuro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">7. I tuoi diritti</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In conformità con il GDPR, hai i seguenti diritti:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Diritto di accesso:</strong> puoi richiedere una copia dei tuoi dati personali</li>
              <li><strong>Diritto di rettifica:</strong> puoi chiedere la correzione di dati inesatti o incompleti</li>
              <li><strong>Diritto di cancellazione:</strong> puoi richiedere l'eliminazione dei tuoi dati in determinate circostanze</li>
              <li><strong>Diritto di limitazione:</strong> puoi chiedere di limitare il trattamento dei tuoi dati</li>
              <li><strong>Diritto di portabilità:</strong> puoi ricevere i tuoi dati in un formato strutturato e leggibile</li>
              <li><strong>Diritto di opposizione:</strong> puoi opporti al trattamento dei tuoi dati per determinate finalità</li>
              <li><strong>Diritto di revocare il consenso:</strong> puoi ritirare il tuo consenso in qualsiasi momento</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Per esercitare questi diritti, contattaci all'indirizzo email fornito nella sezione Contatti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">8. Cookie e tecnologie simili</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Il nostro sito web utilizza cookie e tecnologie simili per migliorare l'esperienza utente.
              I cookie sono piccoli file di testo memorizzati sul tuo dispositivo. Puoi gestire le preferenze
              sui cookie attraverso le impostazioni del tuo browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">9. Sicurezza dei dati</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati
              personali da accesso non autorizzato, alterazione, divulgazione o distruzione. Tuttavia, nessun
              metodo di trasmissione su Internet o di archiviazione elettronica è completamente sicuro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">10. Link a siti esterni</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Il nostro sito web può contenere link a siti esterni. Non siamo responsabili per le pratiche
              di privacy di questi siti. Ti invitiamo a leggere le loro privacy policy quando visiti questi siti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">11. Modifiche a questa Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ci riserviamo il diritto di aggiornare questa Privacy Policy periodicamente. Le modifiche
              saranno pubblicate su questa pagina con la data di "Ultimo aggiornamento" rivista.
              Ti invitiamo a controllare regolarmente questa pagina per rimanere informato su come
              proteggiamo i tuoi dati.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">12. Contatti</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Per qualsiasi domanda o richiesta riguardante questa Privacy Policy o il trattamento dei tuoi dati personali,
              puoi contattarci attraverso:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:parthenope.mls@gmail.com" className="text-pmlsRed hover:underline">parthenope.mls@gmail.com</a></li>
              <li><strong>Indirizzo:</strong> Università degli Studi di Napoli "Parthenope", Via Acton 38, 80133 Napoli, Italia</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">13. Autorità di controllo</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hai il diritto di presentare un reclamo al Garante per la Protezione dei Dati Personali se
              ritieni che il trattamento dei tuoi dati personali violi il GDPR.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Garante per la Protezione dei Dati Personali</strong><br />
              Piazza Venezia, 11 - 00187 Roma<br />
              Telefono: (+39) 06.696771<br />
              Email: <a href="mailto:garante@gpdp.it" className="text-pmlsRed hover:underline">garante@gpdp.it</a><br />
              Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-pmlsRed hover:underline">www.garanteprivacy.it</a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
