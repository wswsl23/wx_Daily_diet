from flask import jsonify, request
from fun import find, find_name, update,show_recipe

import os

from flask import Flask

app = Flask(__name__)


@app.route('/show')
def show():
    a=show_recipe()
    s=''
    for x in a:
        s+=x[0]
        s+=' '
        for y in eval(x[1]):
            s=s+y+':'+str(eval(x[1])[y])
            s+=' '
        s+=','
    return s


# 搜索食材名
@app.route("/search", methods=['GET', 'POST'])
def search():
    search = request.form.get('search')
    a=find_name(search)
    s=''
    for x in a:
        s+=x
        s+=','
    return s


# 添加食谱
@app.route("/add", methods=['GET', 'POST'])
def add():
    add = request.form.get('add').split(' ')
    update(add)
    return 'success'


# 生成计划
@app.route("/recipe", methods=['GET', 'POST'])
def recipe():
    staple = request.form.get('staple').split(',')
    result = dict(find(staple[0], staple[1]))
    result=result.values()
    s=''
    for x in result:
        for y in x:
            s+=y
            s+=' '
        s+=','
    return s


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 80)))
