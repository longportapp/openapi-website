export interface ParameterRow {
  name: string
  type: string
  required: string
  description: string
}

export interface ParametersTable {
  title: string
  parameters: ParameterRow[]
}

export interface HttpInfo {
  method: string
  url: string
}

export interface OpenApiInfo extends HttpInfo {
  parameters: ParameterRow[]
}
