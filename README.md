# passaporto-sniper
Questo script ti potrebbe aiutare a trovare un appuntamento nel momento in cui non ce ne sia alcuno disponibile senza dover continuare a refreshare la pagina :)

## Setup
1. Riempire il file .env con il cookie ottenuto una volta loggato con SPID o CIE al sito https://passaportonline.poliziadistato.it, CSRF token (header X-CSRF-TOKEN) e comune di appartenenza.
2. ```npm i```
3. ```npm run start```
5. profit?

## ATTENZIONE
Lo script è ancora un work in progress ma dovrebbe andare già bene come una base per iniziare. Manca l'integrazione per notificare l'utente della disponibiltà, dato che ora viene stampato soltanto a console.

## Qualche difficoltà con il setup?
Se ti serve una mano manda una mail a me@samu3l.wtf
