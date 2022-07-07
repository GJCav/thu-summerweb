import eventlet
from eventlet import wsgi
eventlet.monkey_patch()

from random import random
import os
from flask import Flask, send_file
from flask import request, session, abort
from time import time


app = Flask(__name__)
if os.environ.get("STATIC_HOST"):
    app = Flask(__name__, static_folder = "./dist/", static_url_path = "/")
else:
    app = Flask(__name__)

app.secret_key = os.urandom(24)

userdb = {
    "alice": {
        "login": False,
        "volume": 0,
        "passwd": "alice",
        "login_time": 0
    },
    "bob": {
        "login": False,
        "volume": 0,
        "passwd": "bob",
        "login_time": 0
    }
}

if os.environ.get("STATIC_HOST"):
    @app.route("/")
    def index():
        return send_file("./dist/index.html")


@app.route("/api/")
def hello():
    return """API list: profile, login, logout, reset"""


def getProfile(name):
    return {
        "user_name": name,
        "login": userdb[name]["login"],
        "flow_volume": userdb[name]["volume"],
        "duration": time() - userdb[name]["login_time"]
    }

@app.route("/api/profile")
def profile():
    name = session.get("name", None)
    if name in userdb.keys():
        return getProfile(name)
    else:
        return {
            "user_name": None,
            "login": False,
            "flow_volume": 0
        }


@app.route("/api/login", methods=["POST"])
def login():
    name = session.get("name", None)
    if name:
        return getProfile(name)
    else:
        session.clear()
        json = request.get_json()
        name = json.get("name", None)
        passwd = json.get("passwd", None)
        
        if name in userdb.keys() and userdb[name]["passwd"] == passwd:
            session["name"] = name
            userdb[name]["login"] = True
            userdb[name]["login_time"] = time()

            return getProfile(name)
        else:
            abort(403)


@app.route("/api/logout")
def logout():
    name = session.get("name", None)
    session.clear()
    if name and name in userdb.keys():
        userdb[name]["login"] = False
        userdb[name]["volume"] += random() * 6 * 1024 * 1024 * 1024
    return {
        "msg": "success"
    }


@app.route("/api/reset")
def reset():
    for k in userdb:
        userdb[k]["volume"] = 0
    return {
        "msg": "success"
    }


if __name__ == "__main__":
    # app.run("localhost", 3001, debug=True)
    wsgi.server(eventlet.listen(("", int(os.environ.get("FLASK_PORT", 3001)))), app)