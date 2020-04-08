export class NeuralNetwork {

    constructor(private readonly config: NeuralNetworkConfig) {
    }

    evaluate(): number[] {
        const result: number[] = [];
        for (let i = 0; i < this.config.outputSize; ++i) {
            result.push(Math.random());
        }
        return result;
    }


}

export interface NeuralNetworkConfig {
    outputSize: number;
}