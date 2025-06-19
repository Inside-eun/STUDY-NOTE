https://iamsjy17.github.io/typescript/2021/12/18/typescript-migration.html


# Dependency-cruiser 사용하기

## Dependency-cruiser란?

Dependency-cruiser는 JavaScript/TypeScript 프로젝트의 의존성을 분석하고 시각화하는 도구입니다. 이 도구를 사용하면 프로젝트의 의존성 구조를 쉽게 파악하고 관리할 수 있습니다.

## 프로젝트 의존성 구조가 중요한 이유

프로젝트의 초기 개발을 보지 않고 투입된 개발자라면 프로젝트가 어떤 구조로 짜여져 있는지를 보는 것이 중요합니다. 이 상황에서 정리가 잘 되어 있다면 파악하기 쉬우나 규모가 큰 프로젝트의 일부, 복잡하게 정리가 잘 되지 않은 프로젝트 등과 같은 경우에는 쉬운 일이 아닙니다. 이런 상황에서 시각적 자료는 프로젝트의 이해도를 높이고 디자이너와 기획자들에게 프로젝트의 사이드 이펙트나 변경 구조에 대한 설명을 하기도 용이합니다.

### 의존성 구조 파악의 실질적 이점

1. **신규 개발자 온보딩 시간 단축**
   - 복잡한 프로젝트 구조를 시각적으로 파악할 수 있어 학습 곡선을 완만하게 만듭니다.
   - 코드베이스의 주요 모듈과 그들 간의 관계를 빠르게 이해할 수 있습니다.

2. **리팩토링 및 유지보수 용이성**
   - 특정 모듈의 변경이 어떤 다른 모듈에 영향을 미칠지 사전에 파악할 수 있습니다.
   - 순환 참조나 잘못된 의존성 관계를 시각적으로 확인하고 수정할 수 있습니다.
   - 레거시 코드를 현대화할 때 의존성 구조를 참고하여 점진적인 개선이 가능합니다.

3. **협업 및 커뮤니케이션 개선**
   - 개발팀 내부적으로 코드 구조에 대한 토론을 할 때 명확한 시각 자료로 활용됩니다.
   - 비개발자(기획자, 디자이너 등)와 기술적 의사결정을 논의할 때 시각적 자료로 활용할 수 있습니다.
   - 새로운 기능 추가나 변경 시 영향도를 이해관계자들과 쉽게 공유할 수 있습니다.

4. **아키텍처 품질 관리**
   - 설계된 아키텍처가 실제 구현에서 잘 지켜지고 있는지 모니터링할 수 있습니다.
   - 의도하지 않은 의존성이나 아키텍처 규칙 위반을 조기에 발견할 수 있습니다.
   - 마이크로서비스나 모듈형 아키텍처를 설계할 때 경계를 명확하게 정의하고 관리할 수 있습니다.


## 사용법

사용법은 간단합니다. 라이브러리를 설치하고, 설정을 조정한 명령어를 입력하면 svg 파일이 생성됩니다. 

### 기본 설치

```bash
npm install --save-dev dependency-cruiser
# or
yarn add -D dependency-cruiser
```
### 초기 설정 파일

```bash
npx depcruise --validate .dependency-cruiser.js src
```

이 명령어는 src 디렉토리의 의존성을 분석하고, .dependency-cruiser.js 파일에 정의된 규칙에 따라 검증합니다. 


- 규칙 설명
  
1. forbidden 섹션: 금지된 의존성 패턴을 정의합니다.
   -  no-circular: 순환 의존성 감지
   -  no-orphans: 사용되지 않는 고립된 모듈 감지
   -  no-deprecated-core: 더 이상 사용되지 않는 Node.js 코어 모듈 사용 감지
   - not-to-deprecated: 더 이상 사용되지 않는 npm 패키지 사용 감지
   -  no-non-package-json: package.json에 없는 의존성 감지
   -  not-to-unresolvable: 해결할 수 없는 의존성 감지
   -  no-duplicate-dep-types: 중복된 의존성 타입 감지
2. 특수 규칙:
   not-to-spec: 테스트 파일에 대한 의존성 제한
   not-to-dev-dep: devDependencies의 프로덕션 사용 감지
   optional-deps-used: 선택적 의존성 사용 감지
   peer-deps-used: 피어 의존성 사용 감지
3. options 섹션: 전반적인 설정 옵션
   doNotFollow: 분석에서 제외할 모듈 지정
   moduleSystems: 검사할 모듈 시스템 지정
   maxDepth: 의존성 분석 최대 깊이
   enhancedResolveOptions: 모듈 해석 옵션
   skipAnalysisNotInRules: 규칙 검사에 필요한 분석만 실행
4. reporterOptions: 결과 보고서 형식 설정
   dot: 상세 그래픽 의존성 그래프 설정
   archi: 상위 수준 그래픽 의존성 그래프 설정
   text: 텍스트 보고서 설정
