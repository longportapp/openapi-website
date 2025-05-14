import { usePaths } from 'vitepress-openapi'
import spec from '../../../public/openapi.json'
import fs from 'fs'

export default {
  paths() {
    fs.writeFileSync(
      './path.json',
      JSON.stringify(
        usePaths({ spec })
          .getPathsByVerbs()
          .map(({ operationId, summary }) => {
            return {
              params: {
                operationId,
                pageTitle: `${summary} - Longbridge API`,
              },
            }
          }),
        null,
        2
      )
    )
    return usePaths({ spec })
      .getPathsByVerbs()
      .map(({ operationId, summary }) => {
        return {
          params: {
            operationId,
            pageTitle: `${summary} - Longbridge API`,
          },
        }
      })
  },
}
