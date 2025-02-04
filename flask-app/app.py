from flask import Flask, jsonify
import snowflake.connector
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

# Snowflake connection configuration
def get_snowflake_connection():
    conn = snowflake.connector.connect(
        user=os.getenv('SNOWFLAKE_USER'),
        password=os.getenv('SNOWFLAKE_PASSWORD'),
        account=os.getenv('SNOWFLAKE_ACCOUNT'),
        warehouse=os.getenv('SNOWFLAKE_WAREHOUSE'),
        database=os.getenv('SNOWFLAKE_DATABASE'),
        schema=os.getenv('SNOWFLAKE_SCHEMA'),
        role=os.getenv('SNOWFLAKE_ROLE')
    )
    return conn

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Flask API. Use the /data endpoint to retrieve data."})

@app.route('/data', methods=['GET'])
def get_data():
    try:
        conn = get_snowflake_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM finance.recordkeeper_connect.participant")  # Replace YOUR_TABLE with the actual table name
        columns = [col[0] for col in cursor.description]
        data = cursor.fetchall()
        cursor.close()
        conn.close()

        return jsonify({
            'columns': columns,
            'data': data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)