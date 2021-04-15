from flask import Flask, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS
import target_store
import logging
import average_market_price
import onnx
import argparse
######################
log = logging.getLogger('test')
log.setLevel(logging.DEBUG)

log.warning('warn')
log.debug('debug')

log.root.setLevel(logging.DEBUG)
log.debug('debug again')
logging.basicConfig(level=logging.DEBUG)


#####################



app = Flask(__name__)
api = Api(app)
CORS(app)

parser = reqparse.RequestParser()

# "employeeId","itemId","amount","type", "district","category","price","storeId"
# {
#     _id: "blah",
#     itemId: "blah",
#     amount: 15,
#     type: 'discrete',
#     dsitrict: "Mongkok",
#     storeId: "babi"
# }
# //initialise program 
target_store.init_program()

parser.add_argument('employeeId', location="form")
parser.add_argument('itemId', type=int, location="form")
parser.add_argument('amount',type=int, location="form")
parser.add_argument('type', location="form")
parser.add_argument('district', location="form")
parser.add_argument('category', location="form")
class Algorithm(Resource):

    def get(self):
        # for name in args["name"]:
        # customer_price, employee_target = test.algorithm(name)
        # temp = {'name' : name,'customerPrice': customer_price, 'targetPrice': employee_target}
        # data.append(temp)
        test = average_market_price.call()
        print(test)
        return test, 200
    def post(self):
        a = parser.parse_args()
        # args = parser.parse_args()
        total = []
        template = [a["employeeId"], a["itemId"], a["amount"], a["type"], a["district"], a["category"]]
        total.append(template)
        print(total)
        values=target_store.get_target_and_store(total)
        print(values)
        return values[0],200
def main(*args):
    import argparse

    parser = argparse.ArgumentParser(description='MyApp')
    # parser.add_argument('-o','--output',dest='output', help='Output file image', default='output.png')
    # parser.add_argument('files', metavar='IMAGE', nargs='+', help='Input image file(s)')

    a = parser.parse_args()
    print(a)
    return a


# @app.route("/", methods=['POST'])
# def get_price():
#     print(request.get_json())
#     return jsonify({"bbullshit" :request.get_json()}), 201

api.add_resource(Algorithm, '/test')

if __name__ == '__main__':
    main()
    app.run(debug=True) 