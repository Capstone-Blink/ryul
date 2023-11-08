from flask import Flask, render_template, jsonify, request, session, redirect, url_for
from pymongo import MongoClient
import jwt
import datetime
import hashlib

app = Flask(__name__)

client = MongoClient('mongodb://127.0.0.1', 27017)
db = client.login_test

SECRET_KEY = 'RYUL'

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    data = request.get_json(force=True)
    id = data['id']
    pw = data['pw']
    pw2 = data['pw2']
    name = data['name']
    sex = data['sex']
    userInfo = data['userInfo']

    pw_hash = hashlib.sha256(pw.encode('utf-8')).hexdigest()
    result = db.user.find_one({'id': id})
    print(result)
    if not ( id and pw and pw2 and name and sex and userInfo ):
        return jsonify(result="fail", error="모두 입력해주세요.")
    elif pw != pw2:
        return jsonify(result="fail", error="비밀번호 확인이 일치하지 않습니다.")
    else:
        if result is not None:
            return jsonify(result="fail", error="이미 존재하는 id 입니다.")
        else:
            db.user.insert_one({'id': id, 'pw': pw_hash, 'name': name, 'sex': sex, 'userInfo': userInfo})
            return jsonify(result='success', message="회원가입 완료.")

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    data = request.get_json(force=True)
    id = data['id']
    pw = data['pw']
    pw_hash = hashlib.sha256(pw.encode('utf-8')).hexdigest()
    result = db.user.find_one({'id': id, 'pw': pw_hash})

    if result is not None:
        payload = {
            'id': id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=10000)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify(result='success', token=str(token), message="로그인 완료.")
    else:
        return jsonify(result="fail", error="아이디/비밀번호가 일치하지 않습니다.")

@app.route('/userInfo', methods=['GET', 'POST'])
def userInfo():
    data = request.get_json(force=True)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    user_id = user['id']
    result = db.user.find_one({'id': user_id})
    user_name = result['name']
    user_sex = result['sex']
    user_info = result['userInfo']
    
    return jsonify(result="success", user_name=str(user_name), user_sex=str(user_sex), user_info=str(user_info))
if __name__ == '__main__':
    app.run('0.0.0.0', port=7878, debug=True)