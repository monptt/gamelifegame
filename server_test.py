import flask
from flask import Flask
from flask import render_template
from flask import request
from flask import send_from_directory

app = Flask(__name__)


# application
@app.route("/gamelifegame/")
def gamelifegame():
    return send_from_directory("gamelifegame", "index.html")
@app.route("/<path:path>")
def gamelifegame_static(path):
    return send_from_directory("./", path)

if __name__ == "__main__":
    app.run(debug=True)

