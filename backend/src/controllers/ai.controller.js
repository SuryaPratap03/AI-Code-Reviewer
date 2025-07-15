import aiService from "../services/ai.service.js";

export class aiController {


  async getReview(req, res) {
    try {
      const prompt = req.body.prompt;

      if (!prompt) {
        return res.status(400).send("Prompt is required");
      }

      const response = await aiService(prompt);
      let newResponse = await response()
      res.send(newResponse).status(200);
    } catch (error) {
      console.error("Error in getting Response from AI", error);
      throw new Error("Error in getting Response from AI", error);
    }
  }
}
