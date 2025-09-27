# feature_4_ctr_prediction/ctr_predictor.py
import numpy as np
import pandas as pd

def predict_ctr(model, tokenizer, assets, ad_text, user_data):
    """Takes loaded assets and input data to return a CTR percentage."""
    category_mappings = assets['category_mappings']
    integer_medians = assets['integer_medians']
    integer_cols = list(integer_medians.keys())
    categorical_cols = list(category_mappings.keys())

    # 1. Vectorize Text
    tokenized_text = tokenizer(ad_text, max_length=32, truncation=True, padding='max_length', return_tensors='tf')['input_ids']

    # 2. Preprocess Tabular Data
    df_tabular = pd.DataFrame([user_data])
    for col, median in integer_medians.items():
        df_tabular[col] = df_tabular[col].fillna(median)
    for col, mapping in category_mappings.items():
        df_tabular[col] = df_tabular[col].fillna('missing').map(mapping).fillna(0)
    
    # 3. Prepare model inputs
    model_inputs = {
        'integer_features': df_tabular[integer_cols].values.astype(np.float32),
        'text_features': tokenized_text
    }
    for col in categorical_cols:
        model_inputs[col] = df_tabular[col].values

    # 4. Make prediction and format output
    prediction_prob = model.predict(model_inputs)[0][0]
    percentage_output = f"{prediction_prob * 100:.1f}%"
    
    return percentage_output