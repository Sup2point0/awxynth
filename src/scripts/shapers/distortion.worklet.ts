class DistortionWorkletProcessor extends AudioWorkletProcessor
{
  static get parameterDescriptors() {
    return [
      {
        name: "amps",
      }
    ];
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    params
  ): boolean
  {
    let input = inputs.at(0);
    let output = outputs.at(0);
    if (input == undefined || output == undefined) return false;

    let shaper_samples = 

    if (input.length != output.length) return false;

    for (let c = 0; c < input.length; c++) {
      let input_channel = input[c];
      let output_channel = output[c];

      for (let i = 0; i < input_channel.length; i++) {
        output_channel[i] = input_channel[i] ** 2;
      }
    }

    return true;
  }
}

registerProcessor("Distortion", DistortionWorkletProcessor);
