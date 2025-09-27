import google.generativeai as genai
import json

def check_ad_fairness(ad_copy):
    """
    Analyzes ad copy for ethical concerns using the Gemini API.
    
    Returns:
        A tuple containing the score (int) and explanation (str),
        or (None, "Error message") if something goes wrong.
    """
    try:
        model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
        
        prompt = f"""
            You are an AI ethics assistant. Analyze the following ad copy for potential bias 
            (gender, racial, cultural), manipulative language, unsupported claims, or other ethical concerns.
            
            Provide your response as a single, clean JSON object with two keys:
            1. "score": An integer from 1 to 5, where 1 is a high ethical concern and 5 means it looks good.
            2. "explanation": A brief, one-sentence explanation for your score.

            Ad Copy to Analyze: "{ad_copy}"
        """
        
        response = model.generate_content(prompt)
        
        # Clean up the response to ensure it's valid JSON
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "")
        
        # Parse the JSON string into a Python dictionary
        result = json.loads(cleaned_response)
        
        score = result.get("score")
        explanation = result.get("explanation")
        
        if isinstance(score, int) and isinstance(explanation, str):
            return score, explanation
        else:
            return None, "AI response was not in the expected format."

    except Exception as e:
        return None, f"An error occurred during the fairness check: {e}"
