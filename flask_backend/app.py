from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import random
import pandas as pd
import numpy as np

# --- Import Logic from All Feature Modules ---
# This structure allows for easy integration of your teammates' code.
# The try/except blocks make the app runnable even if the other files don't exist yet.

try:
    # Placeholder for Feature 1 (Targeting)
    from feature_1_targeting.targeting_model import predict_best_segment
except ImportError:
    # This mock function will be used if the real one isn't available
    def predict_best_segment(user_data):
        print("Warning: predict_best_segment not found. Using placeholder.")
        return {"predicted_segment": "High-Engagement Millennials", "confidence": 0.88}

try:
    # Placeholder for Feature 2 (Content Creation)
    from feature_2_content_creation.content_generator import generate_ad_variations
except ImportError:
    # This mock function will be used if the real one isn't available
    def generate_ad_variations(brief):
        print("Warning: generate_ad_variations not found. Using placeholder.")
        return {"ad_variations": ["Ad Copy 1: A great product!", "Ad Copy 2: Buy now!"]}

# Your Feature 3 now imports BOTH text and image coaches
from feature_3_optimization.optimizer import EpsilonGreedyBandit
from feature_3_optimization.image_content_generator import get_image_ad_feedback
from feature_3_optimization.text_content_generator import get_text_ad_feedback

# --- App Initialization ---
# The static_folder points to the top-level 'images' directory, one level above this script's location.
app = Flask(__name__, static_folder='../images')
CORS(app)  # Enable CORS to allow requests from your separate frontend.

# === UNIFIED API ENDPOINTS FOR FEATURE 3 ===

@app.route('/optimize-creatives', methods=['POST'])
def optimize_creatives_api():
    """
    A single endpoint to optimize any type of creative (text or image).
    The frontend specifies the `creative_type` in the request.
    """
    data = request.json
    creative_type = data.get('creative_type')  # Expects "text" or "image"
    creatives = data.get('creatives')          # Expects a list of ad copy strings or image filenames

    if not creative_type or not creatives:
        return jsonify({"error": "Missing 'creative_type' or 'creatives' in the request body"}), 400

    num_ads = len(creatives)
    num_impressions = 2000
    
    # Simulate true CTRs for a realistic demo
    true_ctrs = list(np.random.uniform(0.02, 0.12, num_ads))
    if num_ads > 0:
        # Make one ad a clear winner for the demo
        true_ctrs[random.randrange(num_ads)] = 0.15 

    bandit = EpsilonGreedyBandit(num_ads=num_ads, epsilon=0.1)
    history = []

    for i in range(num_impressions):
        selected_ad_index = bandit.select_ad()
        was_clicked = random.random() < true_ctrs[selected_ad_index]
        bandit.update(selected_ad_index, was_clicked)
        current_ctrs = [(bandit.ad_clicks[j] / bandit.ad_counts[j]) if bandit.ad_counts[j] > 0 else 0 for j in range(num_ads)]
        history.append(current_ctrs)

    # Determine the worst-performing ad
    history_df = pd.DataFrame(history)
    worst_ad_index = int(np.argmin(history_df.iloc[-1].values))

    return jsonify({
        "optimization_history": history,
        "worst_creative": creatives[worst_ad_index] # Returns the actual text or filename of the worst ad
    })

@app.route('/get-creative-feedback', methods=['POST'])
def get_creative_feedback_api():
    """
    A single endpoint to get AI feedback for any creative type.
    Uses conditional logic based on 'creative_type'.
    """
    data = request.json
    creative_type = data.get('creative_type')  # Expects "text" or "image"
    creative_data = data.get('creative_data')  # Expects the ad copy string or image filename

    if not creative_type or not creative_data:
        return jsonify({"error": "Missing 'creative_type' or 'creative_data' in the request body"}), 400

    # --- Conditional Logic to Call the Correct AI Coach ---
    if creative_type == 'image':
        improved_image_path, feedback_text = get_image_ad_feedback(creative_data)
        response_data = {
            "feedback_text": feedback_text,
            "improved_creative_filename": os.path.basename(improved_image_path)
        }
    elif creative_type == 'text':
        feedback_response = get_text_ad_feedback(creative_data)
        response_data = {
            "feedback_text": feedback_response["feedback_text"],
            "improved_creative_data": feedback_response["improved_creative_data"]
        }
    else:
        return jsonify({"error": "Invalid creative_type specified. Use 'text' or 'image'."}), 400

    return jsonify(response_data)


# --- Route to Serve the Ad Images ---
@app.route('/images/<filename>')
def serve_image(filename):
    """
    Serves static image files from the top-level 'images' folder.
    """
    return send_from_directory(app.static_folder, filename)


# --- Main execution block ---
if __name__ == '__main__':
    # Runs the Flask server in debug mode on port 5000.
    app.run(debug=True, port=5000)