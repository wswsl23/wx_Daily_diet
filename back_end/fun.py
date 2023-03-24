import mysql.connector

config = {'host': '',  # 内网ip
          'user': 'root',  # 用户名
          'password': '',  # 密码
         'port': 3306,  # 端口，默认为3306
          'database': 'diet',  # 数据库名称
          'charset': 'utf8'  # 字符编码
          }

# 人体一天需求值
stand = [2000, 60, 65, 30, 225, 800, 1.4, 1.4, 14, 800, 15, 100, 700]


# 计算距离
def distance(value):
    s = 0
    for i in range(len(stand)):
        # s += (abs(stand[i] * 2 - value[i]) / stand[i] * 2) ** 2
        s += (abs(stand[i] - value[i]) / stand[i]) ** 2
    return pow(s, 0.5)


# 计算组合的营养
def find(staple, weight):
    dist = dict()

    cnn = mysql.connector.connect(**config)  # 建立MySQL连接
    cursor = cnn.cursor()  # 获得游标

    sql = "SELECT * FROM `staple` where `名字`='{}'".format(staple)  # SQL语句
    cursor.execute(sql)  # 执行SQL语句
    staple = cursor.fetchall()[0]  # 通过fetchall方法获得数据
    sql = "SELECT * FROM `recipe`"  # SQL语句
    cursor.execute(sql)  # 执行SQL语句
    data = cursor.fetchall()  # 通过fetchall方法获得数据
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            for k in range(j + 1, len(data)):
                value = [data[i][2 + x] + data[j][2 + x]+ data[k][2 + x] +staple[1 + x] * int(weight) / 100 for x in range(len(data[i][2:]))]
                dist[distance(value)] = [data[i][0], data[j][0],data[k][0]]
    return sorted(dist.items(), key=lambda x: x[0])


# 添加食谱
def update(add):
    cnn = mysql.connector.connect(**config)  # 建立MySQL连接
    cursor = cnn.cursor()  # 获得游标
    food = eval(add[1])
    sum_v = []
    for x in food:
        sql = "SELECT * FROM `food` WHERE `食物名` = '{}'".format(x)  # SQL语句
        cursor.execute(sql)  # 执行SQL语句
        value = cursor.fetchall()  # 通过fetchall方法获得数据
        value = [y * food[x] / 100 for y in list(value[0][1:])]
        sum_v.append(value)
    for x in sum_v[:-1]:
        value = [x[i] + value[i] for i in range(len(x))]

    sql = "INSERT INTO recipe VALUES ('{}','{}',{});".format(add[0], add[1].replace("'", "\\'"),
                                                             str(value)[1:-1])  # SQL语句
    cursor.execute(sql)  # 执行SQL语句
    cnn.commit()
    cnn.close()  # 关闭连接


# 搜索
def find_name(s):
    cnn = mysql.connector.connect(**config)  # 建立MySQL连接
    cursor = cnn.cursor()  # 获得游标
    sql = "SELECT * FROM `food` WHERE `食物名` LIKE '%{}%'".format(s)  # SQL语句
    cursor.execute(sql)  # 执行SQL语句
    data = cursor.fetchall()  # 通过fetchall方法获得数据
    return [x[0] for x in data]


def show_recipe():
    cnn = mysql.connector.connect(**config)  # 建立MySQL连接
    cursor = cnn.cursor()  # 获得游标
    sql = "SELECT * FROM `recipe`"  # SQL语句
    cursor.execute(sql)  # 执行SQL语句
    data = cursor.fetchall()  # 通过fetchall方法获得数据
    return [(x[0],x[1]) for x in data]