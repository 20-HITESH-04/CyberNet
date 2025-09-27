import os
import pickle
import tensorflow as tf
from transformers import BertTokenizer, TFBertModel
from tensorflow.keras.layers import Layer
import traceback

# --- Step 1: Define the Custom BertLayer in this file ---
# Keras needs this class definition to know how to load the saved model.
class BertLayer(Layer):
    def __init__(self, bert_model_name='bert-base-uncased', **kwargs):
        super(BertLayer, self).__init__(**kwargs)
        self.bert_model_name = bert_model_name
        self.bert = TFBertModel.from_pretrained(self.bert_model_name, use_safetensors=False)
        self.bert.trainable = False

    def call(self, inputs):
        return self.bert(inputs)[1]

    def get_config(self):
        config = super().get_config()
        config.update({"bert_model_name": self.bert_model_name})
        return config

# --- Define Asset Paths ---
ASSETS_DIR = 'assets'
MODEL_PATH = os.path.join(ASSETS_DIR, 'ctr_prediction_model.keras')
TOKENIZER_PATH = os.path.join(ASSETS_DIR, 'ctr_tokenizer')
PREPROCESSING_PATH = os.path.join(ASSETS_DIR, 'preprocessing_assets.pkl')

def load_ctr_model_assets():
    """Loads all saved assets for the CTR prediction model."""
    print("--- Loading CTR prediction assets ---")
    try:
        # --- Step 2: Pass the custom layer to the load_model function ---
        custom_objects = {'BertLayer': BertLayer}
        model = tf.keras.models.load_model(MODEL_PATH, custom_objects=custom_objects)
        
        tokenizer = BertTokenizer.from_pretrained(TOKENIZER_PATH)
        with open(PREPROCESSING_PATH, 'rb') as f:
            assets = pickle.load(f)
        
        print("✅ CTR prediction assets loaded successfully.")
        return model, tokenizer, assets

    except Exception as e:
        print("\n!!!!!!!!!! AN ERROR OCCURRED WHILE LOADING ASSETS !!!!!!!!!!")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {e}")
        print("Full Traceback:")
        traceback.print_exc()
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
        return None, None, None