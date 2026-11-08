// Desde @sanity/client y no desde la raíz de next-sanity: esa raíz re-exporta
// componentes de cliente (edición visual, contenido en vivo) que el compilador
// enviaría al navegador aunque este módulo solo se use en el servidor.
import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // false: using tag-based ISR (see app/api/revalidate) to keep pages fresh
})
