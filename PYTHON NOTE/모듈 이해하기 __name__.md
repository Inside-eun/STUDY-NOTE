**name** 은 파이썬의 내장 변수로, 각 파일이 실행되는 컨텍스트에 따라 값을 가지는 특수한 문자열이다.
이 변수는 해당 모듈이 직접 실행되었는지, 다른 파일에서 모듈로 임포트 되었는지를 알게 해 준다.

만약, example.py 이라는 파일에

print(f"**name** in example.py: {**name**}")

if **name** == "**main**":
print("example.py is being run directly!")
else:
print("example.py has been imported as a module!")

라고 적고,

main.py 라는 파일에는

import example
print("main.py is running!")

이렇게 적었다. 여기서

example.py 를 실행한다면 **name** in example.py: **main**
라는 값이 나오지만,
main.py를 실행한다면 **name** in example.py: example
이라는 값이 나오게 된다.

이런 기능을 이용해서 모듈과 스크립트를 구별해서 테스트 코드나 특정 실행 로직이 포함된 코드가 실행되지 않게 설정할 수 있다.
