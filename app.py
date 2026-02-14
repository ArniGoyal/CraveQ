from flask import Flask, request, jsonify
from flask_cors import CORS
from main import upgradeRecipe 

app = Flask(__name__)
CORS(app) 

@app.route("/", methods=["GET"])
def home():
    # This matches your screenshot image_903324.png
    return "Foodoscope API is running! Use /api/decode for POST requests."

@app.route("/api/decode", methods=["POST"])
def decode():
    data = request.json
    craving = data.get("craving")

    if not craving:
        return jsonify({"error": "Craving is required"}), 400

    # Call logic and return the JSON list
    result = upgradeRecipe(craving)
    
    if isinstance(result, dict) and "error" in result:
        return jsonify(result), 404

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)