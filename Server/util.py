import json, pickle, os
import numpy as np
__locations = None
__data_columns = None
__model = None

def get_estiated_price(location, sqft,bath, bhk):
    try:
        loc_index = __data_columns. index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round (__model.predict([x])[0], 2)

def get_location_names():
    return __locations

def load_artifacts():
    print("Loading artifacts")
    global __data_columns
    global __locations
    global __model
    
    base_path = os.path.dirname(__file__)

    columns_path = os.path.join(base_path, "artifacts/banglore_home_prices_columns.json")
    model_path = os.path.join(base_path, "artifacts/banglore_home_prices_model.pickle")

    with open(columns_path, 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    with open(model_path, 'rb') as f:
        __model = pickle.load(f)
    print("loading artifacts done")

if __name__ == '__main__':
    load_artifacts()
    print(get_location_names())
    print(get_estiated_price('Indira Nagar', 1000, 2, 2))
    print(get_estiated_price('Indira Nagar', 1000, 3, 3))