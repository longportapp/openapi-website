const lightTheme = {
  plain: {
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#808080',
      },
    },
    {
      types: ['number', 'variable', 'inserted'],
      style: {
        color: '#a87f00',
      },
    },
    {
      types: ['operator'],
      style: {
        color: 'rgb(0, 0, 0)',
      },
    },
    {
      types: ['constant', 'char'],
      style: {
        color: '#FF0000',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(128, 0, 0)',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'rgb(255, 0, 0)',
      },
    },
    {
      types: ['deleted', 'string'],
      style: {
        color: '#00b51c',
      },
    },
    {
      types: ['changed', 'punctuation'],
      style: {
        color: '#222222',
      },
    },
    {
      types: ['function', 'keyword', 'builtin'],
      style: {
        color: '#0068ff',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#c40505',
      },
    },
  ],
}

module.exports = {
  lightTheme,
}
