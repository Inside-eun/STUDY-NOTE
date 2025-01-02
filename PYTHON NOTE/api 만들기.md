주로 flask 와 fastAPI가 사용된다.

간단하게 사용할 예정이라 flask로 사용해보기로 함

<아래 flask 공식문서의 기초적인 코드>
from flask import Flask : Flask 클래스를 가져옴

app = Flask(**name**) : Flask 클래스의 인스턴스를 생성하고, 이것을 app이라는 이름의 변수에 저장

@app.route("/") : 데코레이터, 특정 url이 호출되었을 때, 어떤 함수를 실행할지 Flask에 알려준다

def hello_world():
return "<p>Hello, World!</p>" : 루트 경로로 요청이 들어왔을 때 실행된다

if **name** == "**main**":
app.run(debug=True)

위와같은 api를 테스트 하려면 배포가 필요하다.

주로 사용되는 배포 방법은 ...
