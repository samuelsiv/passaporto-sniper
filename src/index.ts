import { getComune, getAvailabilities } from "./client";
import { logger } from "./logger";
import { Comune } from "./types";

async function main() {
    logger.info("Inizializzo lo scanner...");

    while (true) {
        let disponibilita: { comune: string; data: string; posti: number; }[] = [];

        const comune = await getComune(process.env.COMUNE);
        if (!comune) {
            logger.info(`Comune ${process.env.COMUNE} non trovato!`)
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
            disponibilita.forEach(disponibileEntry => {
                /*
                TODO: Integrazione con notifiche (Telegram/WA/SMS)
                */
               logger.info("NUOVA DISPONIBILITA':")
               logger.info(`Sede: ${disponibileEntry.comune}`)
               logger.info(`Data: ${disponibileEntry.data}`)
               logger.info(`Posti disponibili: ${disponibileEntry.posti}`)
            });
        }
        
        await new Promise(resolve => setTimeout(resolve, 10000));
    } 
}

main();