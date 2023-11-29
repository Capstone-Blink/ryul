from flask import Flask, render_template, jsonify, request, session, redirect, url_for
from pymongo import MongoClient
from datetime import datetime
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

@app.route('/userConnect', methods=['GET', 'POST'])
def userConnect():
    data = request.get_json(force=True)
    token = data['token']
    user_id = data['userConnectId']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    p_id = user['id']
    result = db.user.find_one({'id': user_id, 'userInfo':"사용자"})
    if not ( user_id ):
        return jsonify(result="fail", error="아이디를 입력해주세요.")
    else:
        if result is None:
            return jsonify(result="fail", error="유효한 아이디를 입력해주세요.")
        else:
            result2 = db.connect1.find_one({'p_id':p_id, 'u_id': user_id})
            if result2 is None:
                db.connect1.insert_one({'p_id':p_id, 'u_id': user_id})
                return jsonify(result="success", message="사용자에게 요청을 보냈습니다.")
            else:  
                return jsonify(result="fail", error="이미 요청하거나 등록된 사용자입니다.")

@app.route('/userConnect2', methods=['GET', 'POST'])
def getUserConnect():
    data = request.get_json(force=True)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    p_id = user['id']
    result = list(db.connect2.find({'p_id': p_id}))
    result2 = []
    for i in range(0,len(result)):
        u = result[i]["u_id"]
        name = db.user.find_one({"id":u})['name']
        result2.append({"name":name, "u_id":u})
    return jsonify(result="success", list=result2)

@app.route('/protectorConnect', methods=['GET', 'POST'])
def getProtectorConnect():
    data = request.get_json(force=True)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    u_id = user['id']
    result = list(db.connect1.find({'u_id': u_id}))
    result2 = []
    for i in range(0,len(result)):
        p = result[i]["p_id"]
        name = db.user.find_one({"id":p})['name']
        result2.append({"name":name, "p_id":p})
    return jsonify(result="success", list=result2)

@app.route('/protectorConnect2', methods=['GET', 'POST'])
def getProtectorConnect2():
    data = request.get_json(force=True)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    u_id = user['id']
    result = list(db.connect2.find({'u_id': u_id}))
    result2 = []
    for i in range(0,len(result)):
        p = result[i]["p_id"]
        name = db.user.find_one({"id":p})['name']
        result2.append({"name":name, "p_id":p})
    return jsonify(result="success", list=result2)

@app.route('/acceptBtn', methods=['GET', 'POST'])
def accpetBtn():
    data = request.get_json(force=True)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    u_id = user['id']
    p_id = data['p_id']
    db.connect1.delete_one({'p_id':p_id, 'u_id':u_id})
    db.connect2.insert_one({'p_id':p_id, 'u_id':u_id})
    u_id = user['id']
    result = list(db.connect1.find({'u_id': u_id}))
    result2 = []
    for i in range(0,len(result)):
        p = result[i]["p_id"]
        name = db.user.find_one({"id":p})['name']
        result2.append({"name":name, "p_id":p})
    print(result2)
    return jsonify(result="success", list=result2)

@app.route('/deleteBtn', methods=['GET', 'POST'])
def deleteBtn():
    data = request.get_json(force=True)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    u_id = user['id']
    p_id = data['p_id']
    db.connect1.delete_one({'p_id':p_id, 'u_id':u_id})
    u_id = user['id']
    result = list(db.connect1.find({'u_id': u_id}))
    result2 = []
    for i in range(0,len(result)):
        p = result[i]["p_id"]
        name = db.user.find_one({"id":p})['name']
        result2.append({"name":name, "p_id":p})
    print(result2)
    return jsonify(result="success", list=result2)

#앱 실행 위치
@app.route('/getLocation1', methods=['GET', 'POST'])
def getLocation1():
    data = request.get_json(force=True)
    token = data['token']
    longitude = data['location']['coords']['longitude']
    latitude = data['location']['coords']['latitude']
    date = data['date']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    u_id = user['id']
    if (db.user.find_one({'id':u_id})['userInfo'] == "사용자"):
        db.alertLog.insert_one({'u_id':u_id, 'name':db.user.find_one({'id':u_id})['name'],
                                 'longitude':longitude, 'latitude':latitude, 'date':date, 'type': 1})
    return jsonify(result="success")
  
@app.route('/getAlertLog', methods=['GET', 'POST'])
def getAlertLog():
    data = request.get_json(force=True)
    print(data)
    token = data['token']
    user = jwt.decode(jwt=str(token), key=SECRET_KEY, algorithms='HS256')
    p_id = user['id']
    result = list(db.connect2.find({'p_id':p_id}))
    result2 = []
    for i in range(0,len(result)):
        u = result[i]["u_id"]
        log = list(db.alertLog.find({"u_id":u}))
        for j in range(0,len(log)):
            if log[j] != [] : result2.append({'u_id':log[j]['u_id'], 'name':log[j]['name'], 
                                              'longitude':log[j]['longitude'], 'latitude':log[j]['latitude'], 
                                              'date':log[j]['date'], 'type':log[j]['type']})
    print(result2)
    return jsonify(result="success", list=result2)



if __name__ == '__main__':
    app.run('0.0.0.0', port=7877, debug=True)