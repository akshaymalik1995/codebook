
```python
from flask import Flask, jsonify, request, make_response
import jwt
import datetime
from functools import wraps
app = Flask(_name_)

app.config['SECREY_KEY'] = "thisisthesecretkey"

def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = request.args.get("token")
		if not token:
			return jsonify({"message" : "Token is missing"}), 403
		try:
			data = jwt.decode(token, app.config["SECRET_TOKEN"])
		execpt:
			return jsonify({"message" : "Token is invalid"}), 403
	return decorated


@app.route("/unprotected")
def unprotected():
	return jsonify({"message" : "Anyone can view this"})

@app.route("/protected")
@token_required
def protected():
	return jsonify({"message" : "This is only available for people with valid tokens   "})

@app.route("/login")
def login():
	auth = request.authorization
	if auth and auth.password == "password":
		token = jwt.encode({"user" : auth.username, "exp" : datetime.datetime.utcnow() + datetimne.timedelta(minutes=30)}, app.config["SECRET_KEY"])
		return jsonify({"token" : token.decode("UTF-8")})
	return make_response("Could not verify", 401, {"www-Authenticate" : "Basic realm=Login Required"})

if __name__ == "__main__":
	app.run(debug=True)
```

