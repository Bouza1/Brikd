from flask import Flask, render_template, request
import os
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/add_score', methods=['POST'])
def add_score_2_board():
  data = request.get_json()
  site_root = os.path.realpath(os.path.dirname(__file__))
  json_url = os.path.join(site_root, "data", "scores.json")
  with open(json_url) as openfile:
      full_json_object = json.load(openfile)
  full_json_object['scores'].append({"username":data['username'], "score":data['score']})
  with open(json_url, "w") as json_file:
    json.dump(full_json_object, json_file, indent=4)
  return {"message":"Score Recieved"}

@app.route('/return_scores', methods=['GET'])
def return_leaderboard_scores():
  if request.method == "GET":
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "data", "scores.json")
    with open(json_url) as openfile:
        full_json_object = json.load(openfile)
    sorted_scores = sorted(full_json_object["scores"], key=lambda x: x["score"], reverse=True)
    return {"scores":sorted_scores}

@app.route('/return_usernames', methods=['GET'])
def return_username_list():
  if request.method == 'GET':
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "data", "scores.json")
    with open(json_url) as openfile:
        full_json_object = json.load(openfile)
    sorted_scores = sorted(full_json_object["scores"], key=lambda x: x["score"], reverse=True)
    usernames = list(map(lambda entry: entry["username"], sorted_scores))
    return usernames

@app.route('/update_score', methods=['POST'])
def update_score():
  data = request.get_json()
  site_root = os.path.realpath(os.path.dirname(__file__))
  json_url = os.path.join(site_root, "data", "scores.json")
  with open(json_url) as openfile:
      full_json_object = json.load(openfile)
  for item in full_json_object['scores']:
    if item['username'] == data['username']:
      item['score'] +=  data['score']
  sorted_scores = sorted(full_json_object["scores"], key=lambda x: x["score"], reverse=True)
  result = next(({"index": i, "username": item['username'], "score": item['score']} for i, item in enumerate(sorted_scores) if item['username'] == data['username']), None)
  with open(json_url, "w") as json_file:
    json.dump({"scores":sorted_scores}, json_file, indent=4)
  return {"pos":result['index']+1, 'username':result['username'], 'score':result['score']}
    
app.run(host='0.0.0.0', port=81)
