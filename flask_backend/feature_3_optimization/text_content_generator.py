import google.generativeai as genai

def get_ad_feedback(ad_copy):
    """
    Calls the Gemini API to get real-time feedback on ad copy.
    """
    try:
        # The model is configured in the main Streamlit app using secrets.
        model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
        
        # This is the prompt that instructs the AI on its role and desired output format.
        prompt = f"""
            You are an expert advertising copywriter named 'AdAstra'.
            The following ad copy performed poorly. Your task is to provide feedback to improve it for greater engagement.
            Structure your response using Markdown with these two sections exactly:

            ### 1. Constructive Feedback
            (Provide 3 specific, actionable bullet points of feedback explaining the issues and suggesting improvements.)

            ### 2. AI-Improved Versions
            (Provide 2 completely rewritten, improved versions of the ad that incorporate your feedback. Start each with "Version A:" or "Version B:")

            ---
            Ad Copy to Analyze: "{ad_copy}"
            ---
        """
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        # This will display a helpful error message in the Streamlit app if something goes wrong.
        return f"An error occurred while calling the Gemini API: {e}"
