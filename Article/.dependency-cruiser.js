/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'info',
      comment:
        '이 의존성은 순환 관계의 일부입니다. 해결책을 수정하는 것이 좋습니다 ' +
        '(예: 의존성 역전을 사용하거나, 모듈이 단일 책임을 가지도록 확인하세요) ',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-orphans',
      comment:
        "이것은 고립된 모듈입니다 - 아마도 더 이상 사용되지 않을 수 있습니다. 사용하거나 " +
        "제거하세요. 만약 이 모듈이 고립되어 있는 것이 논리적이라면 (예: 설정 파일인 경우), " +
        "dependency-cruiser 설정에서 예외를 추가하세요. 기본적으로 " +
        "이 규칙은 점으로 시작하는 파일들(.eslintrc.js 등), TypeScript 선언 " +
        "파일(.d.ts), tsconfig.json 및 일부 babel과 webpack 설정들을 검사하지 않습니다.",
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$',                  // 점으로 시작하는 파일들
          '[.]d[.]ts$',                                                       // TypeScript 선언 파일
          '(^|/)tsconfig[.]json$',                                            // TypeScript 설정
          '(^|/)(?:babel|webpack)[.]config[.](?:js|cjs|mjs|ts|cts|mts|json)$' // 기타 설정 파일들
        ]
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      comment:
        '모듈이 더 이상 사용되지 않는 node 코어 모듈에 의존하고 있습니다. 대안을 찾으세요 - 반드시 ' +
        "존재할 것입니다 - node는 쉽게 기능을 폐기하지 않습니다.",
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'core'
        ],
        path: [
          '^v8/tools/codemap$',
          '^v8/tools/consarray$',
          '^v8/tools/csvparser$',
          '^v8/tools/logreader$',
          '^v8/tools/profile_view$',
          '^v8/tools/profile$',
          '^v8/tools/SourceMap$',
          '^v8/tools/splaytree$',
          '^v8/tools/tickprocessor-driver$',
          '^v8/tools/tickprocessor$',
          '^node-inspect/lib/_inspect$',
          '^node-inspect/lib/internal/inspect_client$',
          '^node-inspect/lib/internal/inspect_repl$',
          '^async_hooks$',
          '^punycode$',
          '^domain$',
          '^constants$',
          '^sys$',
          '^_linklist$',
          '^_stream_wrap$'
        ],
      }
    },
    {
      name: 'not-to-deprecated',
      comment:
        '이 모듈은 더 이상 사용되지 않는 npm 모듈(또는 특정 버전)을 사용합니다. 해당 모듈의 최신 버전으로 ' +
        '업그레이드하거나 대안을 찾으세요. 폐기된 모듈은 보안 위험이 될 수 있습니다.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'deprecated'
        ]
      }
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment:
        "이 모듈은 package.json의 'dependencies' 섹션에 없는 npm 패키지에 의존합니다. " +
        "이는 문제가 될 수 있는데, 패키지가 (1) 프로덕션 환경에서 사용할 수 없거나 (2 - 더 심각) " +
        "프로덕션 환경에서 보장되지 않은 버전으로 사용될 수 있기 때문입니다. package.json의 dependencies에 " +
        "해당 패키지를 추가하여 해결하세요.",
      from: {},
      to: {
        dependencyTypes: [
          'npm-no-pkg',
          'npm-unknown'
        ]
      }
    },
    {
      name: 'not-to-unresolvable',
      comment:
        "이 모듈은 찾을 수 없는('디스크에서 해결할 수 없는') 모듈에 의존합니다. npm " +
        '모듈인 경우: package.json에 추가하세요. 다른 모든 경우에는 이미 해결 방법을 알고 있을 것입니다.',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true
      }
    },
    {
      name: 'no-duplicate-dep-types',
      comment:
        "이 모듈은 package.json에서 두 번 이상 나타나는 외부('npm') 패키지에 의존할 가능성이 있습니다. " +
        "즉, devDependencies와 dependencies 모두에 있다는 의미입니다. 이는 나중에 " +
        "유지보수 문제를 일으킬 수 있습니다.",
      severity: 'warn',
      from: {},
      to: {
        moreThanOneDependencyType: true,
        // 타입 임포트가 타입 전용 임포트이면서 devDependency인 것이 일반적이므로
        // 이 규칙에서는 타입 전용 의존성 타입을 고려하지 않습니다
        dependencyTypesNot: ["type-only"]
      }
    },

    /* 특정 상황에 맞게 조정할 수 있는 규칙들: */
    
    {
      name: 'not-to-spec',
      comment:
        '이 모듈은 스펙(테스트) 파일에 의존합니다. 스펙 파일의 유일한 책임은 코드를 테스트하는 것입니다. ' +
        "만약 스펙 파일에 다른 모듈에서 사용할 만한 것이 있다면, 그것은 더 이상 단일 " +
        '책임을 가지지 않는 것입니다. 이를 별도의 유틸리티/헬퍼나 목(mock)으로 분리하세요.',
      severity: 'error',
      from: {},
      to: {
        path: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      }
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment:
        "이 모듈은 package.json의 'devDependencies' 섹션에 있는 npm 패키지에 의존합니다. " +
        '하지만 프로덕션에 배포되는 것처럼 보입니다. 프로덕션 환경에 없는 npm 패키지로 인한 문제를 ' +
        "방지하기 위해, 이를 package.json의 'dependencies' 섹션에만 선언하세요. " +
        '만약 이 모듈이 개발용으로만 사용된다면 - dependency-cruiser 설정의 not-to-dev-dep 규칙의 ' +
        'from.pathNot에 추가하세요',
      from: {
        path: '^(src)',
        pathNot: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        dependencyTypes: [
          'npm-dev',
        ],
        // 타입 전용 의존성은 프로덕션 코드에 포함되지 않거나 런타임에서 무시되므로
        // 문제가 되지 않습니다
        dependencyTypesNot: [
          'type-only'
        ],
        pathNot: [
          'node_modules/@types/'
        ]
      }
    },
    {
      name: 'optional-deps-used',
      severity: 'info',
      comment:
        "이 모듈은 package.json에서 선택적 의존성으로 선언된 npm 패키지에 의존합니다. " +
        "이는 제한된 상황에서만 의미가 있으므로, 여기서 표시됩니다. " +
        "만약 의도적으로 선택적 의존성을 사용하는 것이라면 - dependency-cruiser 설정에 " +
        "예외를 추가하세요.",
      from: {},
      to: {
        dependencyTypes: [
          'npm-optional'
        ]
      }
    },
    {
      name: 'peer-deps-used',
      comment:
        "이 모듈은 package.json에서 피어 의존성으로 선언된 npm 패키지에 의존합니다. " +
        "이는 당신의 패키지가 플러그인 등인 경우에는 의미가 있지만, 다른 경우에는 " +
        "그렇지 않을 수 있습니다. 피어 의존성 사용이 의도적인 경우 " +
        "dependency-cruiser 설정에 예외를 추가하세요.",
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'npm-peer'
        ]
      }
    }
  ],
  options: {
    /* 발견했을 때 더 이상 따라가지 않을 모듈들 */
    doNotFollow: {
      path: ['node_modules']
    },
    /* 성능 최적화: 검사할 모듈 시스템 지정 */
    moduleSystems: ['cjs', 'es6'],
    /* 의존성 해결을 위한 최대 깊이 증가 */
    maxDepth: 10,
    /* 그래프 레이아웃 엔진 설정 개선 */
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      extensions: [".js", ".jsx", ".json"]
    },
    /* skipAnalysisNotInRules는 dependency-cruiser가 
       규칙 세트를 검사하는 데 필요한 분석만 실행하도록 합니다.

       자세한 내용은 https://github.com/sverweij/dependency-cruiser/blob/main/doc/options-reference.md#skipanalysisnotinrules
       를 참조하세요
     */
    skipAnalysisNotInRules: true,
    
    reporterOptions: {
      dot: {
        /* 상세 그래픽 의존성 그래프에서 통합될 수 있는 모듈들의 패턴.
           이 설정의 기본 패턴은 node_modules의 모든 것을 한 폴더 깊이로
           축소하여 외부 모듈은 보이지만 내부는 보이지 않게 합니다.
         */
        collapsePattern: 'node_modules/(?:@[^/]+/[^/]+|[^/]+)',

        /* 그래프의 모양을 조정하는 옵션들. 자세한 내용과 예시는
           https://github.com/sverweij/dependency-cruiser/blob/main/doc/options-reference.md#reporteroptions
           를 참조하세요. 테마를 지정하지 않으면 dependency-cruiser는
           내장된 테마를 사용합니다.
        */
        // theme: {
        //   graph: {
        //     /* splines: "ortho"는 직선을 제공하지만 큰 그래프에서는 느립니다
        //        splines: "true"는 베지어 곡선을 제공합니다 (빠르지만 ortho만큼 깔끔하지 않음)
        //    */
        //     splines: "true"
        //   },
        // }
      },
      archi: {
        /* 상위 수준 그래픽 의존성 그래프에서 통합될 수 있는 모듈들의 패턴.
           상위 수준 그래픽 의존성 그래프 리포터('archi')를 사용하는 경우
           이 collapsePattern을 상황에 맞게 조정하고 싶을 것입니다.
        */
        collapsePattern: '^(?:packages|src|lib(s?)|app(s?)|bin|test(s?)|spec(s?))/[^/]+|node_modules/(?:@[^/]+/[^/]+|[^/]+)',

        /* 그래프의 모양을 조정하는 옵션들. 'archi'에 대한 테마를
           지정하지 않으면 dependency-cruiser는 위의 dot 섹션에서 지정한
           테마를 사용하고, 그렇지 않으면 기본 테마를 사용합니다.
         */
        // theme: { },
      },
      "text": {
        "highlightFocused": true
      },
    }
  }
};
// generated: dependency-cruiser@16.10.3 on 2025-06-19T07:47:48.759Z
