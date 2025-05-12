import { getComune, getAvailabilities } from "./client";
import { logger } from "./logger";

const COMUNE = "";

async function main() {
    logger.info("Inizializzo lo scanner...");

    while (true) {
        let disponibilita: { comune: string; data: string; posti: number; }[] = [];

        const comune = await getComune(COMUNE);
        if (!comune) {
            logger.info(`Comune ${COMUNE} non trovato!`)
            return;
        }

        const availabilities = await getAvailabilities(comune);
        availabilities.forEach(availability => {
            if (availability.dataPrimaDisponibilitaResidenti) {
                disponibilita.push({
                    comune: availability.comune, 
                    data: availability.dataPrimaDisponibilitaResidenti,
                    posti: availability.numeroMaxAppuntamenti
                });
            }
        });

        if (disponibilita.length > 0) {
            require("child_process").exec("powershell.exe [console]::beep(5000,5000)");

            disponibilita.forEach(disponibileEntry => {
                /*
                TODO: Integrazione con notifiche (Telegram/WA/SMS)
                */
               logger.info("NUOVA DISPONIBILITA':")
               logger.info(`Sede: ${disponibileEntry.comune}`)
               logger.info(`Data: ${disponibileEntry.data}`)
               logger.info(`Posti disponibili: ${disponibileEntry.posti}`)
            });
        } else {
            logger.info("Nessuna disponibilità trovata. Riprovo tra 10 secondi!")
        }
        
        await new Promise(resolve => setTimeout(resolve, 10000));
    } 
}

main();