from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route('/api/send-steering', methods=['POST'])
def send_steering():
    data = request.get_json()
    print(f"Received Steering Data: {data}")
    return jsonify({"status": "success"}), 200

@app.route('/api/collect-data', methods=['GET'])
def collect_data():
    data = {
        "images": [
            "http://localhost:5000/static/temp_image_1.jpg",
            "http://localhost:5000/static/temp_image_2.jpg"
        ],
        "gyro_data": [
            {"timestamp": 123456789, "angle": 30},
            {"timestamp": 123456790, "angle": 31}
        ]
    }
    return jsonify(data)

@app.route('/api/review-data', methods=['GET'])
def review_data():
    sessions = [
        {"id": "session1", "name": "Test Session 1", "date": "2024-11-16"},
        {"id": "session2", "name": "Test Session 2", "date": "2024-11-15"}
    ]
    return jsonify(sessions)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)