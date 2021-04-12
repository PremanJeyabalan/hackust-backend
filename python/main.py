from flask import Flask, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
import test

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('name', action="append", location='form')
parser.add_argument('array', action='append',location="form")
parser.add_argument('object', location='form')

class Algorithm(Resource):
    def post(self):
        args = parser.parse_args()
        data = []
        for name in args["name"]:
            customer_price, employee_target = test.algorithm(name)
            temp = {'name' : name,'customerPrice': customer_price, 'targetPrice': employee_target}
            data.append(temp)
        return data, 200

# @app.route("/", methods=['POST'])
# def get_price():
#     print(request.get_json())
#     return jsonify({"bbullshit" :request.get_json()}), 201

api.add_resource(Algorithm, '/test')

if __name__ == '__main__':
    app.run(debug=True) 