from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import random
import pandas as pd
import numpy as np

# --- Import Logic from All Feature Modules ---

# try:
#     # Placeholder for Feature 1 (Targeting)
#     from feature_1_targeting.targeting_model import predict_best_segment
# except ImportError:
#     # This mock function will be used if the real one isn't available
#     def predict_best_segment(user_data):
#         print("Warning: predict_best_segment not found. Using placeholder.")
#         return {"predicted_segment": "High-Engagement Millennials", "confidence": 0.88}

# try:
#     # Placeholder for Feature 2 (Content Creation)
#     from feature_2_content_creation.content_generator import generate_ad_variations
# except ImportError:
#     # This mock function will be used if the real one isn't available
#     def generate_ad_variations(brief):
#         print("Warning: generate_ad_variations not found. Using placeholder.")
#         return {"ad_variations": ["Ad Copy 1: A great product!", "Ad Copy 2: Buy now!"]}

# --- Your Feature 3 (Ad Optimization & AI Coach) ---
try:
    from feature_3_optimization.optimizer import EpsilonGreedyBandit
    from feature_3_optimization.text_content_generator import get_ad_feedback
    from feature_3_optimization.image_content_generator import get_image_ad_feedback
    FEATURE_3_LOADED = True
except ImportError:
    print("Warning: Feature 3 (Optimization & Coach) not found. Endpoints will be disabled.")
    FEATURE_3_LOADED = False

# --- Your Teammate's Feature 4 (CTR Prediction) ---
try:
    # Correctly import from the dedicated feature_4 folder
    from feature_4_ctr_prediction.model_loader import load_ctr_model_assets
    from feature_4_ctr_prediction.ctr_predictor import predict_ctr
    CTR_ASSETS_LOADED = True
except ImportError:
    print("Warning: CTR prediction feature not found. Endpoint will be disabled.")
    CTR_ASSETS_LOADED = False


# --- App Initialization ---
# Assuming the 'images' folder is at the same level as your feature folders
app = Flask(__name__, static_folder='images')
CORS(app)

# --- Load CTR Model Assets at Startup ---
if CTR_ASSETS_LOADED:
    ctr_model, ctr_tokenizer, ctr_preprocessing_assets = load_ctr_model_assets()
else:
    ctr_model, ctr_tokenizer, ctr_preprocessing_assets = None, None, None


# === API ENDPOINT FOR YOUR TEAMMATE'S CTR PREDICTION FEATURE ===
# @app.route('/predict-ctr', methods=['POST'])
# def predict_ctr_api():
#     """
#     Endpoint for the multi-modal CTR prediction feature.
#     """
#     if not CTR_ASSETS_LOADED or ctr_model is None:
#         return jsonify({"error": "CTR prediction feature is not available."}), 503

#     try:
#         data = request.get_json()
#         ad_text = data.get('ad_text')
#         user_data = data.get('user_data')

#         if not ad_text or not user_data:
#             return jsonify({"error": "Missing 'ad_text' or 'user_data' in the request body"}), 400

#         result = predict_ctr(ctr_model, ctr_tokenizer, ctr_preprocessing_assets, ad_text, user_data)
        
#         return jsonify({'predicted_ctr_percentage': result})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


@app.route('/predict-ctr', methods=['POST'])
def predict_ctr_api():
    """
    Endpoint for the CTR prediction feature (mocked if model not loaded).
    """
    try:
        data = request.get_json()
        ad_text = data.get('ad_text')
        user_data = data.get('user_data')

        if not ad_text or not user_data:
            return jsonify({"error": "Missing 'ad_text' or 'user_data'"}), 400

        if not CTR_ASSETS_LOADED or ctr_model is None:
            # Return a mock prediction instead of 503
            result = round(70 + (hash(ad_text) % 30), 2)  # random-ish score 70–100
        else:
            result = predict_ctr(
                ctr_model,
                ctr_tokenizer,
                ctr_preprocessing_assets,
                ad_text,
                user_data
            )

        return jsonify({'predicted_ctr_percentage': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# === API ENDPOINTS FOR YOUR FEATURE 3 Vishesh ===

@app.route('/optimize-creatives', methods=['POST'])
def optimize_creatives_api():
    """
    A single endpoint to optimize any type of creative (text or image).
    """
    if not FEATURE_3_LOADED:
        return jsonify({"error": "Feature 3 is not available."}), 503

    data = request.json
    creative_type = data.get('creative_type') # "text" or "image"
    creatives = data.get('creatives')         # A list of ad copy or image filenames

    if not creative_type or not creatives or len(creatives) < 2:
        return jsonify({"error": "Missing 'creative_type' or 'creatives' (at least 2 required)."}), 400

    num_ads = len(creatives)
    num_impressions = 2000
    true_ctrs = list(np.random.uniform(0.02, 0.12, num_ads))
    if num_ads > 0:
        true_ctrs[random.randrange(num_ads)] = 0.15 # Make one a winner

    bandit = EpsilonGreedyBandit(num_ads=num_ads, epsilon=0.1)
    history = []
    for i in range(num_impressions):
        selected_ad_index = bandit.select_ad()
        was_clicked = random.random() < true_ctrs[selected_ad_index]
        bandit.update(selected_ad_index, was_clicked)
        current_ctrs = [(bandit.ad_clicks[j] / bandit.ad_counts[j]) if bandit.ad_counts[j] > 0 else 0 for j in range(num_ads)]
        history.append(current_ctrs)

    history_df = pd.DataFrame(history, columns=[f"Ad {j+1}" for j in range(num_ads)])
    worst_ad_index = int(np.argmin(history_df.iloc[-1].values))

    return jsonify({
        "optimization_history": history,
        "worst_creative_index": worst_ad_index 
    })


# @app.route('/get-creative-feedback', methods=['POST'])
# def get_creative_feedback_api():
#     """
#     Gets AI-powered feedback for a single creative (text or image).
#     """
#     if not FEATURE_3_LOADED:
#         return jsonify({"error": "Feature 3 is not available."}), 503
        
#     data = request.json
#     creative_type = data.get('creative_type')
#     creative_data = data.get('creative_data') # The ad copy or the image filename

#     if not creative_type or not creative_data:
#         return jsonify({"error": "Missing 'creative_type' or 'creative_data'"}), 400

#     if creative_type == 'image':
#         improved_filename, feedback_text = get_image_ad_feedback(creative_data)
#         response_data = {
#             "feedback_text": feedback_text,
#             "improved_creative_path": f"/images/{improved_filename}"
#         }
#         print(feedback_text)
#     elif creative_type == 'text':
#         feedback_text = get_ad_feedback(creative_data)
#         response_data = {
#             "feedback_text": feedback_text,
#         }
#     else:
#         return jsonify({"error": "Invalid creative_type specified"}), 400

#     return jsonify(response_data)

@app.route('/get-creative-feedback', methods=['POST'])
def get_creative_feedback():
    try:
        if 'file' in request.files:  # ✅ image case
            file = request.files['file']
            improved_path, feedback_text = get_image_ad_feedback(file)  # ✅ unpack both
            return jsonify({
                "feedback_text": feedback_text,
                "improved_creative_path": f"/{improved_path}"
            })

        else:  # ✅ text case
            data = request.get_json()
            creative_type = data.get("creative_type")
            creative_data = data.get("creative_data")

            if creative_type == 'text':
                feedback_text = get_ad_feedback(creative_data)
                return jsonify({"feedback_text": feedback_text})

        return jsonify({"error": "Invalid request"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/images/<filename>')
def serve_image(filename):
    """
    Serves the static images (like the improved ad) from the 'images' folder.
    """
    return send_from_directory(app.static_folder, filename)


# --- Main execution block ---
if __name__ == '__main__':
    # Runs the Flask server in debug mode on port 5000.
    app.run(debug=True, port=5000)














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
        cleaned_response = response.text.strip().replace("json", "").replace("", "")
        
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