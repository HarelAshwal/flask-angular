from flask import Flask, send_from_directory, redirect, jsonify
import pathlib

app = Flask(__name__)

@app.route("/<path:path>", methods=["GET"])
def static_proxy(path: str):
    p = pathlib.Path("../frontend/dist/frontend/" + path)
    if not p.is_file():  # or p.is_dir() to see if it is a directory
        return redirect("/")
    return send_from_directory("../frontend/dist/frontend", path)


@app.route("/")
def root():
    return send_from_directory("../frontend/dist/frontend", "index.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1")