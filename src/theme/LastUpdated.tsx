import React from 'react'
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import IconEdit from '@theme/Icon/Edit';
import type {Props} from '@theme/EditThisPage';

export default () => {
  // 获取当前路径
  let  currentPath = window.location.pathname;
  // 如果路径等于 /docs/ 或 /docs，使用 index.md 替换它
  // 否则，添加 .md 后缀
  if (currentPath.endsWith('docs')) {
    currentPath = `${currentPath}/index.md`
  } else if (currentPath.endsWith('docs/')) {
    currentPath = `${currentPath}index.md`
  } else {
    currentPath = `${currentPath}.md`
  }
  return (
    <div className="flex items-center justify-end w-full">
      <a
        href={currentPath}
        target="_blank"
        className={ThemeClassNames.common.editThisPage}>
        Raw
      </a>
    </div>
  )
}