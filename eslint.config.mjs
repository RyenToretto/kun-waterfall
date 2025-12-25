// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      // 逗号后面必须有空格，逗号前不允许有空格，保持逗号风格统一
      'comma-spacing': ['error', { before: false, after: true }],

      // 分号后允许有空格，分号前不允许有空格，保证分号规范
      'semi-spacing': ['error', { before: false, after: true }],

      // 关键字（如 if, else, for）前后必须有空格，提升可读性
      'keyword-spacing': ['error', { before: true, after: true }],

      // 函数名和括号之间不允许有空格，符合 JS 习惯写法
      'space-before-function-paren': ['error', 'never'],

      // 箭头函数 => 两边必须有空格，增强可读性
      'arrow-spacing': ['error', { before: true, after: true }],

      // 块语句（{ }）前必须有空格，代码格式一致
      'space-before-blocks': ['error', 'always'],

      // 块内部前后必须有空格，提升代码整洁度
      'block-spacing': ['error', 'always'],

      // 逗号必须放在行尾，避免换行时歧义
      'comma-style': ['error', 'last'],

      // 禁止连续多行空行，最多保留一行空行，避免代码过于松散
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],

      // 注释符号后必须有空格，规范注释格式
      'spaced-comment': ['error', 'always'],

      // --- Vue 相关规则 ---

      // Vue 模板缩进为 2 个空格，保证模板风格统一
      'vue/html-indent': ['error', 2],

      // 单行标签最多 3 个属性，多行标签每行最多 1 个属性，提升模板可读性
      'vue/max-attributes-per-line': ['warn', { singleline: 3, multiline: 1 }],

      eqeqeq: ['error', 'always'],
      'no-console': 'off',
      'no-new-func': 'off',
      'new-cap': 'off',
      semi: ['error', 'never'],
      indent: ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'space-infix-ops': ['error', { int32Hint: false }],
      'quote-props': ['warn', 'as-needed'],
      'comma-dangle': ['warn', 'never'],
      'brace-style': ['warn', '1tbs'],
      'arrow-parens': ['error', 'always'],
      'no-trailing-spaces': ['error', { skipBlankLines: false }],
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style']
      }],
      'vue/script-indent': ['error', 2],
      'vue/comma-dangle': ['warn', 'never'],
      'antfu/top-level-function': 'off',
      'node/prefer-global/process': 'off',
      'vue/html-self-closing': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },

  // stylistic preferences
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2]
    }
  }

  // .vue 文件中关闭 style/indent（避免和 vue/script-indent 冲突）
  /*{
      files: ['**!/!*.vue'],
      rules: {
          'indent': 'off'
      }
  }*/
])
