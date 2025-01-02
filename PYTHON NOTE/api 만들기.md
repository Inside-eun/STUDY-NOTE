주로 flask 와 fastAPI가 사용된다.

간단하게 사용할 예정이라 flask로 사용해보기로 함

<아래 flask 공식문서의 기초적인 코드>
from flask import Flask : Flask 클래스를 가져옴

app = Flask(**name**) : Flask 클래스의 인스턴스를 생성하고, 이것을 app이라는 이름의 변수에 저장

@app.route("/") :
def hello_world():
return "<p>Hello, World!</p>"
