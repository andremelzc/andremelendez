import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import skills from './skills'
import profile from './profile'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, skills, profile],
}
