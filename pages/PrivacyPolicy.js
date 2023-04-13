import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}


const Politica_De_Confidentialitate = () => {
  return ( 

    <>
    <Head>
     <title>Politica de confidenţialitate</title>
     <meta name="description" content="Politica de confidenţialitate" />
     <meta name="robots" content="noindex, nofollow" />
    </Head>
    <section className="privacy">
      <h1 style={{marginTop:"10%"}}>Politica de confidenţialitate</h1>
      <h2>PRELUCRARE DATE PERSONALE CONFORM REGULAMENT (UE) 2016/679</h2>
      <p>Politica de Confidențialitate descrie categoriile datelor dumneavoastră pe care le prelucrăm, modalitatea și scopurile în care le colectăm, în ce situații transferăm date cu caracter personal și diversele drepturi și opțiuni de care dispuneți în acest sens. În același timp, Politica noastră de Confidențialitate detaliază modul în care prelucrăm datele cu caracter personal în gestionarea relației cu clienții.</p>
    
       <h2>1. Principii de protectie a datelor</h2>
       <ul style={{marginBottom:'24px'}} >
        <li>Colectarea datelor personale se va face numai in scopurile specificate, explicite si legitime (prezentate la pct. 3) .</li>
        <li>Datele nu vor fi procesate catre terti intr-o maniera incompatibila cu acele scopuri;</li>
        <li>În cazul în care intervin actualizări ale datelor transmise, consimţământul rămâne în vigoare până la notificarea TMINOX în acest sens de către dumneavoastră;</li>
        <li>Procesarea datelor personale se va face într-o maniera legala, corecta si transparenta;</li>
        <li>Toate datele personale vor fi pastrate confidential si stocate intr-o maniera ce asigura securitatea necesara;</li>
        <li>Datele personale nu vor fi distribuite persoanelor terte, decat in cazul in care acest lucru este necesar pentru realizarea scopurilor prezentate la pct 3.;</li>
        <li>Persoanele vizate au dreptul de a solicita accesul la datele personale, rectificarea si stergerea acestora, impotrivirea sau restrictionarea de la procesarea datelor, cat si de la dreptul de portabilitate al datelor.</li>       
       </ul>
       <h2>2. Date personale si colectarea lor</h2>
       <p>Datele pe care le colectam pot include urmatoarele:</p>
       <ul style={{marginBottom:'24px'}}>
        <li>Datele personale includ toate tipurile de informatii directe sau indirecte (si anume utilizate in legatura cu alte date) ce se refera la persoana fizica subiect, cum ar fi : numele si prenumele,adresa de e-mail, adresa postala, numarul de telefon mobil sau fix si alte date de contact similare necesare realizarii contactului cu dvs in vederea procesarii comenzilor plasate sau pentru orice alte obiective planificate in relatia cu dvs;</li>
       </ul>
       <h2>3. Scopul colectarii datelor personale</h2>
       <ul style={{marginBottom:'24px'}}>
        <li>Orice comunicare legata de informarea persoanei fizice privind validarea, expedierea si facturarea comenzilor, rezolvarea anularilor sau a problemelor de orice natura referitoare la o comanda, la bunurile achizitionate prin site-ul TMINOX.COM.RO;</li>
        <li>Orice comunicare legata de informarea persoanei fizice privind expedierea postala/curierat de mostre, materiale informative, materiale promotionale;</li>       
        <li>Orice comunicare catre persoanele fizice din baza noastra de date legata de trimiterea de newslettere informative si/sau alerte periodice, noutati privind produsele, formulare de feedback, sau alte actiuni sau activitati ale companiei, transmise prin folosirea postei electronice (e-mail, SMS) a persoanei fizice;</li>
       <li>Respectarea obligatiilor legale</li>
       </ul>
   <p><span style={{fontWeight:'bold'}}>IMPORTANT:</span> De asemenea, acolo unde este cazul sau situatia o impune pentru realizarea scopului definit mai sus (cu titul de exemplu: expediere unei comenzi, procesare unei comenzi cu plata cu cardul, expedierea de colete cu materiale informative/promotionale), TMINOX poate furniza datele cu caracter personal altor companii partenere, dar numai in temeiul unui angajament de confidentialitate din partea acestora, prin care garanteaza ca aceste date sunt pastrate in siguranta si ca furnizarea acestor informatii personale se face conform legislatiei in vigoare, dupa cum urmeaza: furnizorilor de servicii de curierat, furnizorilor de servicii de marketing, furnizorilor de servicii de plata/bancare, furnizori de servicii in IT, sau alte servicii similare. Daca nu sunteti de acord cu divulgarea datelor personale acestor companii, sunteti rugati sa ne contactati la adresa de email office@tminox.com.ro.</p>
   <p>Informatiile cu caracter personal pot fi furnizate si catre Parchetul General, Politie, instantele judecatoresti si altor organe abilitate ale statului, in baza si in limitele prevederilor legale si ca urmare a unor cereri expres formulate.</p>
    <h2>4. Utilizarea datelor personale</h2>
    <ul style={{marginBottom:'24px'}}>
        <li>
        vom utiliza datele personale numai pentru scopul in care au fost colectate si vom stoca datele doar atat cat este necesar pentru scopurile mai sus mentionat (pct. 3);
        </li>    
       </ul>
       <h2>5. Securitatea procesarii</h2>
       <ul style={{marginBottom:'24px'}}>
        <li>
        Vom procesa datele in mod sigur, vom aplica si mentine masuri tehnice adecvate pentru a proteja datele personale impotriva distrugerii sau pierderii accidentale sau ilegale, alterare, divulgare sau acces neautorizat, in mod special atunci cand procesarea presupune transmiterea datelor printr-o retea, atat cat si impotriva oricarei alte forme de procesare ilegala.        </li>   
        <li>
        Întrebari legate de securitatea datelor personale pot fi trimise catre adresa de email office@tminox.com.ro
        </li>     
       </ul>
       <h2>6. Accesul si rectificarea sau stergerea datelor personale</h2>
       <ul style={{marginBottom:'24px'}}>
        <li>
        Aveti dreptul de a solicita in orice moment accesul la: rectificarea, portabilitatea, stergerea sau restrictionarea procesarii datelor colectate;
         </li>   
        <li>
        Pentru pastrarea datelor personale actualizate, va recomandam sa ne informati despre orice schimbare sau discrepanta;
        </li>     
       </ul>

       <p>
       Consimţământul exprimat va rămâne valabil până la retragerea lui de către dumneavoastră.

Odata ce v-ati exprimat in scris dezacordul, datele dvs. personale nu vor mai fi procesate și se vor lua măsurile corespunzătoare pentru ștergerea oricăror înregistrări cu datele dumneavoastră cu caracter personal.
<br /> <br />
Consimţământul poate fi retras oricând, în mod gratuit, accesand link-ul de DEZABONARE din footer-ul oricarui email primit de la TMINOX sau adresand direct cererea dvs. in scris pe email office@tminox.com.ro
<br /><br />
Pentru vizualizarea sau modificarea datelor personale sau pentru a obtine informatii legate de datele personale, precum si pentru pentru orice nemulţumire legată de prelucrarea datelor personale, vă puteţi adresa utilizând adresa de email office@tminox.com.ro
<br /><br />
Vă reamintim drepturile acordate de Regulamentul General privind Protecţia Datelor 679/2016, inclusiv dreptul de informare, acces, rectificare, de a nu fi supus unei decizii bazate exclusiv pe prelucrarea automată, dreptul de ştergere. 
<br /><br />
Puteţi să vă exercitaţi oricare din aceste drepturi prin email la adresa office@tminox.com.ro.
<br /><br />
Este posibil să vă cerem să vă dovediți identitatea comunicându-ne o copie a unui mijloc valabil de identificare pentru a ne conforma cu obligațiile de securitate pe care le avem și a împiedica divulgarea neautorizată a datelor. 
<br /><br />
Vom lua în considerare orice solicitări sau plângeri pe care le primim și vă vom transmite un răspuns în timp util. Dacă nu sunteți mulțumit de răspunsul nostru, puteți înainta plângerea către Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal.
       </p>


       <h2>7. Actualizari ale acesti politici de confidentialitate</h2>
       <p style={{marginBottom:'44px'}}>Ne rezervăm dreptul de a actualiza și modifica periodic această Politică de Confidențialitate, pentru a reflecta orice modificări ale modului în care prelucrăm datele dumneavoastră cu caracter personal sau orice modificări ale cerințelor legale. În cazul oricărei astfel de modificări, vom afișa pe website-urile companiei, versiunea modificată a Politicii de Confidențialitate .
</p>
    </section>

    </>
   );
}
 
export default Politica_De_Confidentialitate;