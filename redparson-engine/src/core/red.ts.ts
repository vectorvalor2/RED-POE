import { POE } from './poe';
import { Registry } from './ecs';

export interface Base44Dictionary {
    encode: (data: string) => string;
    decode: (data: string) => string;
}

/**
 * Class RED: Main orchestrator framework controlling memory detaching,
 * cross-layer dictionary transformations, and general pipeline lifecycle context layers.
 */
export class RED {
    public registry: Registry;
    public poe: POE;
    private dictionary: Base44Dictionary;

    constructor(poeInstance: POE, frameworkContext: string) {
        this.poe = poeInstance;
        this.registry = new Registry();
        this.dictionary = this.initBase44Dictionary();
        console.log(`[RED Engine] Loaded framework context: ${frameworkContext}`);
    }

    /**
     * Implements structured dictionaries for Base44 encoding/decoding operations
     */
    private initBase44Dictionary(): Base44Dictionary {
        const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh";
        return {
            encode: (input: string): string => {
                let num = input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                if (num === 0) return alphabet[0];
                let encoded = "";
                while (num > 0) {
                    encoded = alphabet[num % 44] + encoded;
                    num = Math.floor(num / 44);
                }
                return encoded;
            },
            decode: (input: string): string => {
                let decodedNum = 0;
                for (let i = 0; i < input.length; i++) {
                    const idx = alphabet.indexOf(input[i]);
                    decodedNum = decodedNum * 44 + idx;
                }
                return decodedNum.toString();
            }
        };
    }

    public executeDeduplication(target: object): object {
        return JSON.parse(JSON.stringify(target));
    }

    public getCryptoLayer(): Base44Dictionary {
        return this.dictionary;
    }
}